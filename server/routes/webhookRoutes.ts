import express from "express";
import {
  verifyPaystackSignature,
  handlePaystackWebhook,
} from "../controllers/webhookController";

const router = express.Router();

// Paystack webhook endpoint
router.post(
  "/paystack",
  express.json({ type: "application/json" }), // Important: use raw body for signature verification
  verifyPaystackSignature,
  handlePaystackWebhook
);

export default router;
