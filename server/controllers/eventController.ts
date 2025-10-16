import { asyncHandler } from "../middleware/errorHandler";
import Event from "../models/Events";
import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { ForbiddenError, NotFoundError, ValidationError } from "../utils/error";
import { validateEvent } from "../utils/validation";
import mongoose from "mongoose";
import {
  deleteMediaFromCloudinary,
  getOptimizedImageUrl,
  uploadMediaToCloudinary,
} from "../utils/cloudinary";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const invalidateEventCache = async (
  req: Request,
  eventId: string,
  organizerId: string
) => {
  //// * means to match anything related
  const keysToDelete = [
    `event:${eventId}`,
    `events:organizer:${organizerId}`,
    `events:all:*`,
    `events:category:*`,
    `events:trending:*`,
    `events:trending:top5`,
    `event:organizer:*`,
  ];
  await req.redisClient.del(...keysToDelete);
};

///create events for promoters
const createEvent = asyncHandler(async (req: MulterRequest, res: Response) => {
  // when you send multipart data you cant send nested objects directly, you have to parse it
  const parsedVenue = JSON.parse(req.body.venue);
  const parsedTickets = JSON.parse(req.body.tickets);

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const organizerId = req.user?._id;
  if (!organizerId) {
    throw new NotFoundError("User not found");
  }

  const {
    title,
    slug,
    eventDate,
    eventTime,
    // venue,
    charge,
    category,
    description,
    // tickets,
  } = req.body;

  //validate the schema
  const { error } = validateEvent({
    ...req.body,
    venue: parsedVenue,
    tickets: parsedTickets,
  });
  if (error) {
    logger.warn("Validation error", error.details[0].message);
    throw new ValidationError(error.details[0].message, 400);
  }

  const { originalname, mimetype } = req.file;

  // Upload to Cloudinary
  const cloudinaryUploadResult: any = await uploadMediaToCloudinary(req.file);

  const event = new Event({
    organizerId: req.user?._id,
    title,
    slug,
    eventDate,
    eventTime,
    venue: parsedVenue,
    charge,
    category,
    description,
    image: {
      publicId: cloudinaryUploadResult.public_id,
      mimeType: mimetype,
      url: cloudinaryUploadResult.secure_url,
      originalName: originalname,
    },
    tickets: parsedTickets,
  });

  await event.save();
  // Transform the response to include optimized URLs
  const eventResponse = event.toObject();
  eventResponse.image.optimizedUrl = getOptimizedImageUrl(
    cloudinaryUploadResult.public_id
  );
  await invalidateEventCache(req, event._id.toString(), organizerId);

  res.status(201).json({
    success: true,
    message: "Event created successfully!",
    // data: event,
    data: eventResponse,
  });
});

export const paginate = (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

///get all evenst for public
const getAllEvents = asyncHandler(async (req: Request, res: Response) => {
  logger.info("get all events endpoint hit");
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const { skip } = paginate(page, limit);

  const cacheKey = `events:all:page:${page}:limit:${limit}`;

  ///we firts of all check if its exists in cache then fetch
  const cached = await req.redisClient.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const [events, total] = await Promise.all([
    Event.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Event.countDocuments(),
  ]);

  if (!events) {
    throw new NotFoundError(
      "No event available at this time, check back later"
    );
  }

  const response = {
    success: true,
    data: events,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };

  await req.redisClient.set(cacheKey, JSON.stringify(response), "EX", 300); ///5 mins ttl

  res.status(200).json(response);
});

//get event by category for public
const getEventsByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { category } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { skip } = paginate(page, limit);

    if (!category || typeof category !== "string") {
      throw new ValidationError("Category is required", 400);
    }

    const cacheKey = `events:category:${category}:page:${page}:limit:${limit}`;
    const cached = await req.redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    const [events, total] = await Promise.all([
      Event.find({ category }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Event.countDocuments({ category }),
    ]);

    if (!events) {
      throw new NotFoundError("No events with this category");
    }

    const response = {
      success: true,
      data: events,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    await req.redisClient.set(cacheKey, JSON.stringify(response), "EX", 300);
    res.status(200).json(response);
  }
);

///get a particular event for public
const getSingleEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventkey = `event:${id}`;
  const cachedPost = await req.redisClient.get(eventkey);

  //to check if theres an id
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError("Invalid or No event ID", 400);
  }
  if (cachedPost) {
    return res.status(200).json({
      success: true,
      message: "Event fetched successfully (from cache)",
      data: JSON.parse(cachedPost),
    });
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new NotFoundError("Event not found");
  }

  await req.redisClient.setex(eventkey, 3600, JSON.stringify(event));

  res.status(200).json({
    success: true,
    message: "Event fetched successfully",
    data: event,
  });
});

///get trending events for public and we determine what events are trending by the tickets sold
const getTrendingEvents = asyncHandler(async (req: Request, res: Response) => {
  const cacheKey = `events:trending:top5`;
  const cached = await req.redisClient.get(cacheKey);
  if (cached) {
    return res.status(200).json(JSON.parse(cached));
  }

  const events = await Event.aggregate([
    { $unwind: "$tickets" },
    {
      $group: {
        _id: "$_id",
        totalSold: { $sum: "$tickets.sold" },
        organizerId: { $first: "$organizerId" },
        title: { $first: "$title" },
        slug: { $first: "$slug" },
        eventDate: { $first: "$eventDate" },
        eventTime: { $first: "$eventTime" },
        venue: { $first: "$venue" },
        charge: { $first: "$charge" },
        category: { $first: "$category" },
        description: { $first: "$description" },
        image: { $first: "$image" },
        allTickets: { $push: "$tickets" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
      },
    },
    //sort by total sold
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
    {
      $project: {
        _id: 1,
        organizerId: 1,
        title: 1,
        slug: 1,
        eventDate: 1,
        eventTime: 1,
        venue: 1,
        charge: 1,
        category: 1,
        description: 1,
        image: 1,
        tickets: "$allTickets",
        totalSold: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  const response = {
    success: true,
    message: "Top trending events fetched successfully",
    data: events,
  };

  await req.redisClient.set(cacheKey, JSON.stringify(response), "EX", 300);
  res.status(200).json(response);
});

////edit event for promoters
const editEvent = asyncHandler(async (req: Request, res: Response) => {
  //   const { error } = validateEvent(req.body);
  //   if (error) {
  //     logger.warn("Validation error", error.details[0].message);
  //     throw new ValidationError(error.details[0].message, 400);
  //   }

  const organizerId = req.user?._id;
  if (!organizerId) {
    throw new NotFoundError("User not found");
  }

  ///event id
  const { id } = req.params;
  //to check if theres an id
  if (!id) {
    throw new ValidationError("Event ID is required", 400);
  }
  ///actuallyy confirm its a valid mongodb id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError("Invalid event ID", 400);
  }

  const {
    title,
    slug,
    eventDate,
    eventTime,
    venue,
    charge,
    category,
    description,
    image,
    ticket,
  } = req.body;
  if (
    !title &&
    !slug &&
    !eventDate &&
    !eventTime &&
    !venue &&
    !charge &&
    !category &&
    !description &&
    !image &&
    !ticket
  ) {
    throw new ValidationError("No update fields provided", 400);
  }

  const updateEvent: Record<string, any> = {};
  if (title) updateEvent.title = title;
  if (slug) updateEvent.slug = slug;
  if (eventDate) updateEvent.eventDate = eventDate;
  if (eventTime) updateEvent.eventTime = eventTime;
  if (venue) updateEvent.venue = venue;
  if (charge) updateEvent.charge = charge;
  if (category) updateEvent.category = category;
  if (description) updateEvent.description = description;
  if (image) updateEvent.image = image;
  if (ticket) updateEvent.ticket = ticket;

  // we first find the event to check ownership
  const event = await Event.findById(id);
  if (!event) {
    throw new NotFoundError("Event not found");
  }

  if (event.organizerId.toString() !== organizerId.toString()) {
    throw new ForbiddenError("You are not authorized to update this event");
  }
  //then update if it belons to that owner
  const updatedEvent = await Event.findByIdAndUpdate(id, updateEvent, {
    new: true,
    runValidators: true,
  });
  await invalidateEventCache(req, event._id.toString(), organizerId);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedEvent,
  });
});

////delete evnt for promoters
const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  //promoters id
  const organizerId = req.user?._id;
  if (!organizerId) {
    throw new NotFoundError("User not found");
  }

  ///event id
  const { id } = req.params;
  //to check if theres an id
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError("Invalid or No event ID", 400);
  }

  //Find the event first so as to get image.publicId)
  const existingEvent = await Event.findOne({
    _id: id,
    organizerId,
  });

  if (!existingEvent) {
    throw new NotFoundError(
      "Event not found or you are not authorized to delete it"
    );
  }

  //Delete the image from cloud if excists
  if (existingEvent.image?.publicId) {
    try {
      await deleteMediaFromCloudinary(existingEvent.image.publicId);
    } catch (err) {
      logger.warn(
        `Failed to delete image from Cloudinary: ${existingEvent.image.publicId}`,
        err
      );
      throw new Error("Couldn't delete image from cloudinary");
    }
  }

  //Delete from db
  await existingEvent.deleteOne();

  await invalidateEventCache(req, id.toString(), organizerId);
  res.status(200).json({
    success: true,
    message: "Event deletion successful",
    data: existingEvent,
  });
});

////search for evnt
const searchEvents = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  if (!keyword || typeof keyword !== "string") {
    throw new ValidationError(
      "Keyword is required and must be in string format"
    );
  }

  const escapeRegex = (str: string) =>
    str.replace(/[.+?^${}()|[\]\\]/g, "\\$&"); // notice: no * here

  const keywordRegex = new RegExp(
    escapeRegex(keyword).replace(/\*/g, ".*"),
    "i"
  );

  const createSearchQuery = {
    $or: [{ title: keywordRegex }, { category: keywordRegex }],
  };

  const searchResults = await Event.find(createSearchQuery);
  if (searchResults.length === 0) {
    return res.status(200).json({
      success: false,
      message: `Could not find ${keyword} in search`,
    });
  }

  res.status(200).json({
    success: true,
    data: searchResults,
  });
});

////get event for promoters
const getPromoterEvent = asyncHandler(async (req: Request, res: Response) => {
  const organizerId = req.user?._id;
  if (!organizerId) {
    throw new NotFoundError("User not found");
  }

  const listKey = `events:organizer:${organizerId}`;
  const cachedEvent = await req.redisClient.get(listKey);

  if (cachedEvent) {
    return res.status(200).json({
      success: true,
      message: "Successfully retrieved events (from cache)",
      data: JSON.parse(cachedEvent),
    });
  }

  const allEvents = await Event.find({ organizerId });

  await req.redisClient.setex(listKey, 43200, JSON.stringify(allEvents)); //save in cache

  res.status(200).json({
    success: true,
    message: "Events retrievd",
    data: allEvents,
  });
});

// GET SINGLE EVENT FOR PROMOTER (requires auth)
const getPromoterSingleEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const organizerId = req.user?._id;
    const { id } = req.params;

    if (!organizerId) {
      throw new NotFoundError("User not found");
    }

    // Validate event ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError("Invalid or missing event ID", 400);
    }

    const eventKey = `event:organizer:${organizerId}:${id}`;
    const cachedEvent = await req.redisClient.get(eventKey);

    if (cachedEvent) {
      return res.status(200).json(JSON.parse(cachedEvent));
    }

    // Find event and verify ownership
    const event = await Event.findOne({
      _id: id,
      organizerId: organizerId,
    });

    if (!event) {
      throw new NotFoundError(
        "Event not found or you don't have permission to view it"
      );
    }

    const response = {
      success: true,
      message: "Event retrieved successfully",
      data: event,
    };

    // Cache for 1 hour (3600 seconds)
    await req.redisClient.setex(eventKey, 3600, JSON.stringify(response));

    res.status(200).json(response);
  }
);

const trackEventView = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const viewTimestamps = req.cookies.viewTimestamps
    ? JSON.parse(req.cookies.viewTimestamps)
    : {};

  const now = Date.now();
  const lastViewTime = viewTimestamps[id as any] || 0;
  const fiveMinutes = 5 * 60 * 1000;

  // Only count if more than 5 minutes since last view
  if (now - lastViewTime > fiveMinutes) {
    const event = await Event.findById(id);
    if (!event) throw new NotFoundError("Event not found");

    event.views = (event.views || 0) + 1;
    await event.save();

    // Update timestamp
    viewTimestamps[id as any] = now;
    res.cookie("viewTimestamps", JSON.stringify(viewTimestamps), {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }

  res.status(200).json({ success: true });
});

export {
  createEvent,
  getSingleEvent,
  deleteEvent,
  getPromoterEvent,
  editEvent,
  searchEvents,
  getAllEvents,
  getEventsByCategory,
  getPromoterSingleEvent,
  getTrendingEvents,
  trackEventView,
};
