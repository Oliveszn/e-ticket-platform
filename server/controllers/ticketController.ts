import { asyncHandler } from "../middleware/errorHandler";
import Event from "../models/Events";
import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { NotFoundError, ValidationError } from "../utils/error";
import mongoose from "mongoose";
import type { Ticket } from "../types";

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
