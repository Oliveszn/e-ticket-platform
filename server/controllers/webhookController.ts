import crypto from "crypto";
import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import Order from "../models/Order";
import Event from "../models/Events";
import { emailJobs } from "../jobs/emailQueues";
import logger from "../utils/logger";

///midlewaree to vwerify paystack
export const verifyPaystackSignature = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signature = req.headers["x-paystack-signature"];

  if (!signature) {
    return res.status(400).send("Missing signature");
  }
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== signature) {
    logger.warn("Invalid Paystack webhook signature");
    return res.status(400).send("Invalid signature");
  }

  next();
};

/////webhook handler for paystack events
export const handlePaystackWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    const { event, data } = req.body;

    logger.info("Paystack webhook received:", {
      event,
      reference: data.reference,
    });

    switch (event) {
      case "charge.success":
        await handleSuccessfulPayment(data);
        break;

      case "charge.failed":
        await handleFailedPayment(data);
        break;

      case "transfer.success":
        // Handle successful transfers
        logger.info("Transfer successful:", data.reference);
        break;

      case "transfer.failed":
        // Handle failed transfers
        logger.warn("Transfer failed:", data.reference);
        break;

      default:
        logger.info("Unhandled webhook event:", event);
    }

    // Always respond with 200 OK to acknowledge receipt
    res.status(200).send("Webhook received");
  }
);

async function handleSuccessfulPayment(paymentData: any) {
  try {
    const { reference, status, amount, metadata } = paymentData;

    if (status !== "success") {
      logger.warn("Payment not successful:", reference);
      return;
    }

    let order = null;

    if (metadata?.orderNumber) {
      order = await Order.findOne({ orderNumber: metadata.orderNumber });
    }

    if (!order) {
      order = await Order.findOne({ paymentId: reference });
    }

    if (!order) {
      logger.warn("Order not found for payment:", reference);
      return;
    }

    // Check if already processed
    if (order.paymentStatus === "PAID" && order.paymentId === reference) {
      logger.info("Payment already processed:", reference);
      return;
    }

    // Verify amount matches
    const paidAmountInNaira = amount / 100;
    if (paidAmountInNaira !== order.totalAmount) {
      logger.error("Payment amount mismatch:", {
        reference,
        expected: order.totalAmount,
        received: paidAmountInNaira,
      });
      return;
    }

    // Find event and update ticket count
    const event = await Event.findById(order.eventId);
    if (!event) {
      logger.error("Event not found:", order.eventId);
      return;
    }

    const ticket = event.ticket.id(metadata.ticketId);
    if (!ticket) {
      logger.error("Ticket type not found:", metadata.ticketId);
      return;
    }

    // Check availability
    const available = ticket.quantity - ticket.sold;
    if (available < order.tickets.length) {
      logger.error("Insufficient tickets available:", {
        reference,
        available,
        requested: order.tickets.length,
      });

      // Mark order as failed - need to initialize refund here
      order.paymentStatus = "FAILED";
      order.orderStatus = "CANCELLED";
      await order.save();
      return;
    }

    // Update ticket count
    ticket.sold += order.tickets.length;
    await event.save();

    // Update order status
    order.paymentStatus = "PAID";
    order.orderStatus = "CONFIRMED";
    order.paymentId = reference;
    await order.save();

    // Prepare email data
    const orderData = {
      customerEmail: order.buyer.email,
      orderNumber: order.orderNumber,
      eventTitle: event.title,
      eventDate: event.eventDate,
      eventTime: event.eventTime,
      eventVenue: event.venue.name,
      tickets: order.tickets.map((t: any) => ({
        ticketNumber: t.ticketNumber,
        recipientEmail: t.recipientEmail,
        recipientFirstName: t.recipientFirstName,
        recipientLastName: t.recipientLastName,
        ticketTypeName: t.ticketType,
      })),
      totalAmount: order.totalAmount,
    };

    const individualTickets = order.tickets.map((t: any) => ({
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

    // Send emails (don't await to avoid blocking webhook)
    emailJobs
      .completeTicketPurchase(orderData, individualTickets)
      .catch((error) => {
        logger.error(
          "Email sending failed for order:",
          order.orderNumber,
          error
        );
      });

    logger.info("Payment processed successfully:", reference);
  } catch (error) {
    logger.error("Error processing successful payment:", error);
  }
}

async function handleFailedPayment(paymentData: any) {
  try {
    const { reference, metadata } = paymentData;

    // Find the order
    let order = null;

    if (metadata?.orderNumber) {
      order = await Order.findOne({ orderNumber: metadata.orderNumber });
    }

    if (!order) {
      order = await Order.findOne({ paymentId: reference });
    }

    if (!order) {
      logger.warn("Order not found for failed payment:", reference);
      return;
    }

    // Update order status
    order.paymentStatus = "FAILED";
    order.orderStatus = "CANCELLED";
    order.paymentId = reference;
    await order.save();

    logger.info("Payment marked as failed:", reference);

    // Optionally send failure notification email
  } catch (error) {
    logger.error("Error processing failed payment:", error);
  }
}
