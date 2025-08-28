import express from "express";
import {
  buyTicket,
  ticketAvailability,
  getTicket,
  getSingleTicket,
} from "../controllers/ticketController";
const router = express.Router();

router.get("/events/:id/tickets/:ticketId", ticketAvailability);
// /api/tickets/buy

// /api/tickets/:eventId
router.get("/events/:id", getTicket);
router.get("/events/:id/ticket/:ticketId", getSingleTicket);
// /api/tickets/my-ticket?email=...&ref=...

export default router;
