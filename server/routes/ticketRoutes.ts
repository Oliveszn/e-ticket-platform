import express from "express";
import {
  buyTicket,
  ticketAvailability,
  getTicket,
  getSingleTicket,
} from "../controllers/ticketController";
const router = express.Router();

//check available
router.get("/events/:id/tickets/:ticketId", ticketAvailability);
// purchase ticket
router.post("/events/:id/tickets/:ticketId", buyTicket);
// get tickets
router.get("/events/:id", getTicket);
router.get("/events/:id/ticket/:ticketId", getSingleTicket);
// /api/tickets/my-ticket?email=...&ref=...

export default router;
