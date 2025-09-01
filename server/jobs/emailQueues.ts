import Queue from "bull";
import emailService from "../services/emailService";

// Create email queue
const emailQueue = new Queue("email processing", {
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "127.0.0.1",
    password: process.env.REDIS_PASSWORD,
  },
});

// Process different types of email jobs
emailQueue.process("ticket-confirmation", 5, async (job) => {
  const { orderData } = job.data;

  try {
    // Send main confirmation email
    await emailService.sendTicketConfirmation(orderData);

    // Send individual tickets to each recipient
    await emailService.sendIndividualTickets(orderData.tickets);

    return { success: true, emailsSent: orderData.tickets.length + 1 };
  } catch (error) {
    console.error("Ticket email job failed:", error);
    throw error;
  }
});

emailQueue.process("event-reminder", 3, async (job) => {
  const { eventData, customerEmails } = job.data;

  try {
    await emailService.sendEventReminder(eventData, customerEmails);
    return { success: true, emailsSent: customerEmails.length };
  } catch (error) {
    console.error("Reminder email job failed:", error);
    throw error;
  }
});

emailQueue.process("promoter-welcome", 10, async (job) => {
  const { promoterData } = job.data;

  try {
    await emailService.sendPromoterWelcome(promoterData);
    return { success: true, emailsSent: 1 };
  } catch (error) {
    console.error("Welcome email job failed:", error);
    throw error;
  }
});

// Queue event handlers
emailQueue.on("completed", (job, result) => {
  console.log(
    `Email job ${job.id} completed: ${result.emailsSent} emails sent`
  );
});

emailQueue.on("failed", (job, err) => {
  console.error(`Email job ${job.id} failed:`, err.message);
});

emailQueue.on("stalled", (job) => {
  console.warn(`Email job ${job.id} stalled`);
});

// Helper functions to add jobs to queue
const emailJobs = {
  // Add ticket confirmation to queue
  sendTicketConfirmation: async (orderData, options = {}) => {
    return await emailQueue.add(
      "ticket-confirmation",
      { orderData },
      {
        delay: options.delay || 0,
        attempts: 3,
        backoff: "exponential",
        removeOnComplete: 50,
        removeOnFail: 20,
      }
    );
  },

  // Add event reminder to queue
  sendEventReminder: async (eventData, customerEmails, options = {}) => {
    return await emailQueue.add(
      "event-reminder",
      { eventData, customerEmails },
      {
        delay: options.delay || 0,
        attempts: 2,
        backoff: "exponential",
      }
    );
  },

  // Add promoter welcome to queue
  sendPromoterWelcome: async (promoterData, options = {}) => {
    return await emailQueue.add(
      "promoter-welcome",
      { promoterData },
      {
        delay: options.delay || 0,
        attempts: 3,
        backoff: "exponential",
      }
    );
  },

  // Schedule event reminders (24 hours before)
  scheduleEventReminder: async (eventData, customerEmails) => {
    const eventDate = new Date(eventData.dateTime);
    const reminderTime = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours before
    const delay = reminderTime.getTime() - Date.now();

    if (delay > 0) {
      return await emailQueue.add(
        "event-reminder",
        { eventData, customerEmails },
        { delay }
      );
    }
  },

  // Get queue statistics
  getQueueStats: async () => {
    const waiting = await emailQueue.getWaiting();
    const active = await emailQueue.getActive();
    const completed = await emailQueue.getCompleted();
    const failed = await emailQueue.getFailed();

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      total: waiting.length + active.length + completed.length + failed.length,
    };
  },
};

// Start queue processing
function startEmailQueue() {
  console.log("Email queue started");
  return emailQueue;
}

module.exports = {
  emailQueue,
  emailJobs,
  startEmailQueue,
};
