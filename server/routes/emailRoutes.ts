import express from "express";
import EmailService from "../services/emailService";

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
  const { to } = req.body;
  const result = await EmailService.sendPromoterWelcome({ email: to });
  res.json({ success: true, result });
});

router.post("/confirmation", async (req, res) => {
  const { email } = req.body;

  // mock order data
  const mockOrderData = {
    customerEmail: email,
    orderNumber: "ORDER-123456",
    tickets: [
      { seat: "A1", event: "Concert Night", price: 50 },
      { seat: "A2", event: "Concert Night", price: 50 },
    ],
    totalAmount: 15000,
    eventDate: "2025-09-10",
  };

  const result = await EmailService.sendTicketConfirmation(mockOrderData);
  res.json({ success: true, result });
});

export default router;
