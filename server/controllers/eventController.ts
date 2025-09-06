import { asyncHandler } from "../middleware/errorHandler";
import Event from "../models/Events";
import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { ForbiddenError, NotFoundError, ValidationError } from "../utils/error";
import { validateEvent } from "../utils/validation";
import mongoose from "mongoose";

const invalidateEventCache = async (
  req: Request,
  eventId: string,
  organizerId: string
) => {
  const keysToDelete = [`event:${eventId}`, `events:organizer:${organizerId}`];
  await req.redisClient.del(...keysToDelete);
};

///create events for promoters
const createEvent = asyncHandler(async (req: Request, res: Response) => {
  //validate the schema
  const { error } = validateEvent(req.body);
  if (error) {
    logger.warn("Validation error", error.details[0].message);
    throw new ValidationError(error.details[0].message, 400);
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
    venue,
    charge,
    category,
    description,
    image,
    ticket,
  } = req.body;

  const event = new Event({
    organizerId: req.user?._id,
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
  });

  await event.save();
  await invalidateEventCache(req, event._id.toString(), organizerId);

  res.status(201).json({
    success: true,
    message: "Event created successfully!",
    data: event,
  });
});

///get all evenst for public with filters

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

  const existingEvent = await Event.findOneAndDelete({
    _id: id,
    organizerId,
  });

  if (!existingEvent) {
    throw new NotFoundError(
      "Event not found or you are not authorized to delete it"
    );
  }
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
  if (!allEvents) {
    throw new NotFoundError("You have no existing event");
  }

  await req.redisClient.setex(listKey, 43200, JSON.stringify(allEvents)); //save in cache

  res.status(200).json({
    success: true,
    message: "Events retrievd",
    data: allEvents,
  });
});

export {
  createEvent,
  getSingleEvent,
  deleteEvent,
  getPromoterEvent,
  editEvent,
  searchEvents,
};
