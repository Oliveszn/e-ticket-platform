import express from "express";
import EmailService from "../services/emailService";
import { emailJobs } from "../jobs/emailQueues";
import logger from "../utils/logger";

const router = express.Router();

router.post("/test-email", async (req, res) => {
  try {
    const { to } = req.body;
    const result = await EmailService.sendEmail({
      to: to,
      subject: "Test Email from TicketPlatform",
      html: "<h1>This is a test</h1><p>If you see this, it works 🎉</p>",
      text: "This is a test email from TicketPlatform",
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.post("/promoter", async (req, res) => {
  try {
    const { email, firstName } = req.body;

    // Instead of sending email directly
    await emailJobs.sendPromoterWelcome({ email, firstName });

    res.json({ success: true, message: "Promoter registered, email queued!" });
  } catch (error) {
    logger.error(error);
  }
});

router.post("/confirmation", async (req, res) => {
  const { email } = req.body;

  // mock order data
  const mockOrderData = {
    customerEmail: email,
    orderNumber: "ORDER-123456",
    tickets: [
      {
        _id: "t1",
        name: "Concert Night",
        price: 50,
        quantity: 1,
        sold: 0,
        description: "Regular ticket",
        benefits: ["General Admission"],
        showVolume: true,
      },
      {
        _id: "t2",
        name: "Concert Night",
        price: 50,
        quantity: 1,
        sold: 0,
        description: "Regular ticket",
        benefits: ["General Admission"],
        showVolume: true,
      },
    ],
    totalAmount: 15000,
    eventDate: "2025-09-10",
    eventTitle: "Summer Music Festival",
    eventVenue: "Madison Square Garden",
  };

  const result = await emailJobs.sendTicketConfirmation(mockOrderData);
  res.json({ success: true, result });
});

router.post("/reminder", async (req, res) => {
  const { customerEmails, eventData } = req.body;

  try {
    const result = await emailJobs.sendEventReminder(customerEmails, eventData);
    res.json({ success: true, message: "Reminder email job queued!", result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
