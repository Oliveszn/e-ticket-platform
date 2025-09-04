import { asyncHandler } from "../middleware/errorHandler";
import Event from "../models/Events";
import Order from "../models/Order";
import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { NotFoundError, ValidationError } from "../utils/error";
import mongoose from "mongoose";
import type { Ticket } from "../types";
import { validateTicketPurchase } from "../utils/validation";
import { emailJobs } from "../jobs/emailQueues";

////check ticket availability
///we have to first validate theres actually tickets for that particular ticket field(vip, regular)
const ticketAvailability = asyncHandler(async (req: Request, res: Response) => {
  ///event id
  //two ids here, the event itself and ticket id, (vip, regular)
  const { id, ticketId } = req.params;
  //to check if theres an id
  if (!id) {
    throw new ValidationError("Event ID is required", 400);
  }
  ///actuallyy confirm its a valid mongodb id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError("Invalid event ID", 400);
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new NotFoundError("Event not found");
  }

  //this is a mongoose helper to check in objects
  const ticket = event?.ticket.id(ticketId);
  if (!ticket) {
    throw new ValidationError("Ticket sold out", 409);
  }

  ///had to change tis to use math.max just in case sold > quantity, so available doesnt go negative
  const available = Math.max(0, ticket.quantity - ticket.sold);
  if (available === 0) {
    throw new NotFoundError("No Ticket available");
  }
  res.status(200).json({
    success: true,
    message: "Ticket Available",
    data: available,
  });
});

////buy ticket
///we also have to validate that the amount of tickets the user entered is available
const buyTicket = asyncHandler(async (req: Request, res: Response) => {
  //validate the schema
  const { error } = validateTicketPurchase(req.body);
  if (error) {
    logger.warn("Validation error", error.details[0].message);
    throw new ValidationError(error.details[0].message, 400);
  }
  // `recipients` can be an array of { firstName, lastName, email } if user chose multiple
  const {
    firstName,
    lastName,
    email,
    numberOfTickets,
    info,
    recipients,
    sendToMultipleRecipients,
  } = req.body;
  const { id, ticketId } = req.params;

  //we check if multiplerecip is true and ticket is 1
  if (sendToMultipleRecipients && numberOfTickets === 1) {
    throw new ValidationError(
      "Cannot send to multiple recipients with only 1 ticket. Either buy more tickets or set sendToMultipleRecipients to false.",
      400
    );
  }

  ///if its true recipients array is needed
  if (sendToMultipleRecipients) {
    if (!recipients || !Array.isArray(recipients)) {
      throw new ValidationError(
        "Recipients array is required when sendToMultipleRecipients is true",
        400
      );
    }

    ///for multiple recipinetts we need numberoftickets - 1
    ///cos buyer gets one ticket then recipinet for the rest
    const expectedRecipients = numberOfTickets - 1;
    if (recipients.length !== expectedRecipients) {
      throw new ValidationError(
        `Expected ${expectedRecipients} recipients for ${numberOfTickets} tickets (buyer gets 1 ticket)`,
        400
      );
    }

    // Validate each recipient has required fields
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      if (!recipient.firstName || !recipient.lastName || !recipient.email) {
        throw new ValidationError(
          `Recipient ${
            i + 1
          } is missing required fields (firstName, lastName, email)`,
          400
        );
      }
    }
  }

  const orderNumber = `ORDER-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;

  //to check if theres an id
  if (!id) {
    throw new ValidationError("Event ID is required", 400);
  }
  ///actuallyy confirm its a valid mongodb id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError("Invalid event ID", 400);
  }

  //  Find the event
  const event = await Event.findById(id);
  if (!event) {
    throw new NotFoundError("Event not found");
  }

  //  Find the ticket type
  const ticket = event.ticket.id(ticketId);
  if (!ticket) {
    throw new NotFoundError("Ticket type not found");
  }

  const available = ticket.quantity - ticket.sold;
  if (available < numberOfTickets) {
    throw new ValidationError(
      `There are only ${available}tickets available`,
      409
    );
  }

  ticket.sold += numberOfTickets;
  await event.save();

  let tickets: any[] = [];
  if (sendToMultipleRecipients) {
    // First ticket goes to buyer
    tickets.push({
      ticketTypeId: ticketId,
      ticketType: ticket.name,
      recipientFirstName: firstName,
      recipientLastName: lastName,
      recipientEmail: email,
      ticketNumber: `${orderNumber}-1`,
    });

    // Additional tickets go to recipients
    recipients.forEach((recipient: any, idx: any) => {
      tickets.push({
        ticketTypeId: ticketId,
        ticketType: ticket.name,
        recipientFirstName: recipient.firstName,
        recipientLastName: recipient.lastName,
        recipientEmail: recipient.email,
        ticketNumber: `${orderNumber}-${idx + 2}`, // Start from 2 since buyer gets ticket 1
      });
    });
  } else {
    // All tickets go to buyer
    tickets = Array.from({ length: numberOfTickets }, (_, idx) => ({
      ticketTypeId: ticketId,
      ticketType: ticket.name,
      recipientFirstName: firstName,
      recipientLastName: lastName,
      recipientEmail: email,
      ticketNumber: `${orderNumber}-${idx + 1}`,
    }));
  }

  //  Save purchase record
  const order = new Order({
    orderNumber,
    eventId: id,
    buyer: {
      firstName,
      lastName,
      email,
      info,
    },
    sendToMultipleRecipients,
    tickets,
    orderStatus: "CONFIRMED", // since dummy
    paymentMethod: "DUMMY",
    paymentStatus: "PAID", // fake it
    totalAmount: ticket.price * numberOfTickets,
  });
  await order.save();

  try {
    // Prepare order confirmation data (goes to buyer)
    const orderData = {
      customerEmail: email, // buyer's email
      orderNumber,
      eventTitle: event.title, // Make sure you have event name
      eventDate: event.eventDate, // Make sure you have event date
      eventTime: event.eventTime,
      eventVenue: event.venue.name, // Make sure you have event venue
      tickets: tickets.map((t) => ({
        ticketNumber: t.ticketNumber,
        recipientEmail: t.recipientEmail,
        recipientFirstName: t.recipientFirstName,
        recipientLastName: t.recipientLastName,
        ticketTypeName: t.ticketType,
      })),
      totalAmount: ticket.price * numberOfTickets,
    };

    // Prepare individual ticket data (goes to each recipient)
    const individualTickets = tickets.map((t) => ({
      ticketNumber: t.ticketNumber,
      recipientEmail: t.recipientEmail,
      recipientFirstName: t.recipientFirstName,
      recipientLastName: t.recipientLastName,
      ticketTypeName: t.ticketType,
      eventTitle: event.title,
      eventDate: event.eventDate,
      eventTime: event.eventTime,
      eventVenue: event.venue.name,
    }));
    const emailResult = await emailJobs.completeTicketPurchase(
      orderData,
      individualTickets
    );
    logger.info("email jobs, queued", emailResult);
    res.status(201).json({
      success: true,
      message: "Ticket purchase successful",
      // data: order,
      data: {
        ...order.toObject(),
        emailJobs: emailResult, // Include job info for debugging
      },
    });
  } catch (emailError) {
    // Don't fail the ticket purchase if emails fail
    logger.error("Email job queueing failed:", emailError);

    res.status(201).json({
      success: true,
      message: "Ticket purchase successful (emails will be sent shortly)",
      data: order.toObject(),
      warning: "Email delivery may be delayed",
    });
  }
});

////get ticket details for an event, (types of ticket, vip, genral)
const getTicket = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  //to check if theres an id
  if (!id) {
    throw new ValidationError("Event ID is required", 400);
  }
  ///actuallyy confirm its a valid mongodb id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError("Invalid event ID", 400);
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new NotFoundError("Event not found");
  }

  const tickets = event.ticket.map((t: Ticket) => ({
    id: t._id,
    name: t.name,
    quantity: t.quantity,
    price: t.price,
    benefits: t.benefits,
    available: t.quantity - t.sold,
    sold: t.sold,
  }));

  if (tickets === 0) {
    throw new ValidationError(
      "No ticket available at this time, Check Later",
      409
    );
  }
  res.status(200).json({
    success: true,
    message: "Ticket Available",
    data: tickets,
  });
});

const getSingleTicket = asyncHandler(async (req: Request, res: Response) => {
  const { id, ticketId } = req.params;
  //to check if theres an id
  if (!id) {
    throw new ValidationError("Event ID is required", 400);
  }
  ///actuallyy confirm its a valid mongodb id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError("Invalid event ID", 400);
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new NotFoundError("Event not found");
  }

  //this is a mongoose helper to check in objects
  const ticket = event?.ticket.id(ticketId);
  if (!ticket) {
    throw new NotFoundError("Ticket type not found");
  }

  const available = ticket.quantity - ticket.sold;
  if (available <= 0) {
    throw new ValidationError("No tickets available", 409);
  }

  res.status(200).json({
    success: true,
    message: "Ticket Available",
    data: {
      id: ticket._id,
      name: ticket.name,
      price: ticket.price,
      benefits: ticket.benefits,
      available,
    },
  });
});
////view buyers ticket, User can re-download their ticket by providing email + purchase reference

export { ticketAvailability, buyTicket, getTicket, getSingleTicket };
