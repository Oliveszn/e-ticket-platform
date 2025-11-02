import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";
import type { EmailData, OrderData, PromoterData, TicketData } from "../types";
import logger from "../utils/logger";

const EmailService = {
  provider: process.env.EMAIL_PROVIDER || "resend",
  resend: undefined as Resend | undefined,
  setupProvider() {
    switch (this.provider) {
      case "resend":
        this.resend = new Resend(process.env.RESEND_API_KEY);
        break;

      default:
        throw new Error(`Unsupported email provider: ${this.provider}`);
    }
  },

  // Send single email
  async sendEmail(emailData: EmailData) {
    const { to, subject, html, text } = emailData;

    try {
      switch (this.provider) {
        case "resend":
          return await this.sendWithResend(to, subject, html ?? "", text ?? "");

        default:
          throw new Error("Invalid email provider");
      }
    } catch (error) {
      logger.error("Email sending failed:", error);
      throw error;
    }
  },

  async sendWithResend(
    to: string | string[],
    subject: string,
    html: string,
    text: string
  ) {
    if (!this.resend) throw new Error("Resend client not initialized");

    const result = await this.resend.emails.send({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      react: undefined,
      html,
      text,
    });
    logger.warn("Resend API Response:", result);

    return { messageId: result.data?.id, provider: "resend" };
  },

  // confirmation data that goes to buyer and summarizes data
  async sendTicketConfirmation(orderData: OrderData) {
    const { customerEmail, orderNumber, eventTitle, tickets, totalAmount } =
      orderData;

    const html = this.generateTicketConfirmationHTML(orderData);
    const text = this.generateTicketConfirmationText(orderData);

    return await this.sendEmail({
      to: customerEmail,
      subject: `Your tickets for ${eventTitle} - Order #${orderNumber} - Total ${totalAmount}`,
      html,
      text,
    });
  },

  //individual ticket email goes to each recipient with their specific ticket
  async sendIndividualTicket(ticketData: TicketData) {
    const html = this.generateIndividualTicketHTML(ticketData);
    const text = this.generateIndividualTicketText(ticketData);

    return this.sendEmail({
      to: ticketData.recipientEmail,
      subject: `Your Ticket - ${ticketData.eventTitle} - ${ticketData.ticketNumber}`,
      html,
      text,
    });
  },

  // BULK INDIVIDUAL TICKETS (sends to all recipients)
  async sendIndividualTickets(tickets: TicketData[]) {
    const promises = tickets.map((ticket) => {
      return this.sendIndividualTicket(ticket);
    });

    return await Promise.all(promises);
  },

  ///event reminder 24 hours before event
  async sendEventReminder(eventData: any, customerEmails: any) {
    const html = this.generateEventReminderHTML(eventData);
    const text = this.generateEventReminderText(eventData);

    const promises = customerEmails.map((email: any) =>
      this.sendEmail({
        to: email,
        subject: `Reminder: ${eventData.title} is tomorrow!`,
        html,
        text,
      })
    );

    return await Promise.all(promises);
  },

  //welcome email when a user(promoter) reisters
  async sendPromoterWelcome(promoterData: PromoterData) {
    if (!promoterData) {
      return;
    }
    const { email, firstName } = promoterData;
    const html = this.generatePromoterWelcomeHTML(promoterData);
    const text = this.generatePromoterWelcomeText(promoterData);

    return await this.sendEmail({
      to: email,
      subject: `Welcome to TicketPlatform, ${firstName} - Start Selling Today!`,
      html,
      text,
    });
  },

  // HTML Template generators
  generateTicketConfirmationHTML(orderData: OrderData) {
    const {
      customerEmail,
      orderNumber,
      eventTitle,
      eventDate,
      tickets,
      totalAmount,
      eventVenue,
    } = orderData;

    return `
   <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .ticket { border: 1px solid #ddd; margin: 10px 0; padding: 15px; background: white; }
        .footer { text-align: center; padding: 20px; color: #666; }
        .summary { background: #e7f3ff; padding: 15px; margin: 20px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎫 Order Confirmation</h1>
        </div>
        
        <div class="content">
          <h2>Thank you for your purchase!</h2>
          
          <div class="summary">
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Event:</strong> ${eventTitle}</p>
            <p><strong>Date:</strong> ${new Date(
              eventDate
            ).toLocaleDateString()}</p>
            <p><strong>Venue:</strong> ${eventVenue}</p>
            <p><strong>Total Paid:</strong> ₦${totalAmount.toLocaleString()}</p>
            <p><strong>Number of Tickets:</strong> ${tickets.length}</p>
          </div>
          
          <h3>Ticket Distribution:</h3>
          ${tickets
            .map(
              (ticket: any) => `
            <div class="ticket">
              <p><strong>Ticket #:</strong> ${ticket.ticketNumber}</p>
              <p><strong>Recipient:</strong> ${ticket.recipientFirstName} ${
                ticket.recipientLastName
              }</p>
              <p><strong>Email:</strong> ${ticket.recipientEmail}</p>
              <p><strong>Type:</strong> ${
                ticket.ticketTypeName || "General"
              }</p>
            </div>
          `
            )
            .join("")}
          
          <div class="summary">
            <h4>📧 What happens next?</h4>
            <ul>
              <li>Each recipient will receive their individual ticket via email</li>
              <li>Individual tickets might contain QR codes for entry</li>
              <li>This is your order summary for record keeping</li>
              <li>Contact us if you need to make changes</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p>Need help? Contact us at support@ticketplatform.com</p>
        </div>
      </div>
    </body>
    </html>`;
  },

  generateIndividualTicketHTML(ticketData: TicketData) {
    const {
      ticketNumber,
      recipientFirstName,
      recipientLastName,
      ticketTypeName,
      eventTitle,
      eventDate,
      eventVenue,
    } = ticketData;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2196F3; color: white; padding: 20px; text-align: center; }
        .ticket-main { border: 2px solid #2196F3; margin: 20px 0; padding: 30px; background: white; border-radius: 10px; }
        .qr-section { text-align: center; padding: 20px; background: #f5f5f5; margin: 20px 0; border-radius: 5px; }
        .instructions { background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #ffeaa7; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎟️ Your Event Ticket</h1>
        </div>
        
        <div class="ticket-main">
          <h2>Hello ${recipientFirstName}!</h2>
          
          <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
            <h3>${eventTitle}</h3>
            <p><strong>Date:</strong> ${new Date(
              eventDate
            ).toLocaleDateString()}</p>
            <p><strong>Venue:</strong> ${eventVenue}</p>
            <p><strong>Ticket Type:</strong> ${
              ticketTypeName || "General Admission"
            }</p>
          </div>
          
          <p><strong>Ticket Number:</strong> ${ticketNumber}</p>
          <p><strong>Holder:</strong> ${recipientFirstName} ${recipientLastName}</p>
          
          <div class="qr-section">
            <h4>🔲 QR Code</h4>
            <p><em>QR Code will be generated here</em></p>
            <p style="font-size: 12px; color: #666;">Show this code at the venue entrance</p>
          </div>
        </div>
        
        <div class="instructions">
          <h4>📱 Entry Instructions:</h4>
          <ul>
            <li>Present this email (with QR code) at the venue</li>
            <li>Arrive 30 minutes before event start time</li>
            <li>Bring a valid ID matching the ticket holder name</li>
            <li>Screenshots or printed copies are acceptable</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>This ticket is non-transferable and valid for one entry only.</p>
          <p>Need help? Contact support@ticketplatform.com</p>
        </div>
      </div>
    </body>
    </html>`;
  },

  generateEventReminderHTML(eventData: any) {
    const { title, date, venue, description } = eventData;

    return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #FF9800; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; background: #f9f9f9; }
      .footer { text-align: center; padding: 20px; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📅 Event Reminder</h1>
      </div>
      <div class="content">
        <h2>${title} is happening tomorrow!</h2>
        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
        <p><strong>Venue:</strong> ${venue}</p>
        ${description ? `<p>${description}</p>` : ""}
        <p>We look forward to seeing you there — don't forget your tickets!</p>
      </div>
      <div class="footer">
        <p>Need help? Contact us at support@ticketplatform.com</p>
        <p>© 2024 TicketPlatform. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>`;
  },

  generatePromoterWelcomeHTML(promoterData: PromoterData) {
    const { firstName } = promoterData;

    return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; background: #f9f9f9; }
      .button { display: inline-block; padding: 12px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      .footer { text-align: center; padding: 20px; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🎉 Welcome to TicketPlatform!</h1>
      </div>
      <div class="content">
        <p>Hi ${firstName || "there"},</p>
        <p>We're excited to have you join as a promoter! You can now start creating events, selling tickets, and reaching your audience with ease.</p>
        <p>Click below to set up your first event:</p>
        <a href="https://yourapp.com/promoter/dashboard" class="button">Create Your First Event</a>
      </div>
      <div class="footer">
        <p>Need help? Contact us at support@ticketplatform.com</p>
        <p>© 2024 TicketPlatform. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>`;
  },

  // Text versions for better deliverability
  generateTicketConfirmationText(orderData: OrderData) {
    return `
TICKET CONFIRMATION

Thank you for your purchase!

Order Number: ${orderData.orderNumber}
Event: ${orderData.eventTitle}
Date: ${new Date(orderData.eventDate).toLocaleDateString()}
Venue: ${orderData.eventVenue}
Total Paid: ₦${orderData.totalAmount.toLocaleString()}

Your tickets have been sent to the respective email addresses.

Need help? Contact us at support@ticketplatform.com
    `;
  },

  generateIndividualTicketText(ticketData: any) {
    return `
YOUR EVENT TICKET

Event: ${ticketData.eventTitle}
Date: ${new Date(ticketData.eventDate).toLocaleDateString()}
Venue: ${ticketData.eventVenue}
Ticket Number: ${ticketData.ticketNumber}

Show the attached QR code at the venue entrance.
Arrive 30 minutes early with valid ID.

See you at the event!
    `;
  },

  generateEventReminderText(eventData: any) {
    return `
EVENT REMINDER

${eventData.title} is happening tomorrow!

Date: ${new Date(eventData.date).toLocaleDateString()}
Venue: ${eventData.venue}

${
  eventData.description ? eventData.description + "\n\n" : ""
}Don't forget your tickets!

Need help? Contact us at support@ticketplatform.com
  `;
  },

  generatePromoterWelcomeText(promoterData: PromoterData) {
    return `
WELCOME TO TICKETPLATFORM

Hi ${promoterData.firstName || "there"},

We're excited to have you join as a promoter! You can now create events, sell tickets, and reach your audience with ease.

Start by setting up your first event:
https://yourapp.com/promoter/dashboard

Need help? Contact us at support@ticketplatform.com
  `;
  },
};

EmailService.setupProvider();

export default EmailService;
