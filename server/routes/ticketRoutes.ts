import express from "express";
import {
  getTicket,
  getSingleTicket,
  initializeTicketPurchase,
  verifyTicketPurchase,
} from "../controllers/ticketController";
import { purchaseLimiter } from "../middleware/rateLimit";
const router = express.Router();

// purchase ticket
router.post(
  "/events/:id/tickets/:ticketId/purchase",
  purchaseLimiter,
  initializeTicketPurchase
);
router.get("/events/verify-purchase", verifyTicketPurchase);
// get tickets
router.get("/events/:id", getTicket);
router.get("/events/:id/ticket/:ticketId", getSingleTicket);

export default router;
