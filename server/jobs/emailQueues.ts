import Queue from "bull";
import EmailService from "../services/emailService";
import connectRedis from "../config/redis";
import logger from "../utils/logger";
import type { OrderData, PromoterData } from "../types";

interface TicketConfirmationJob {
  orderData: {
    tickets: any[]; // replace with your actual ticket type
    [key: string]: any;
  };
}

interface EventReminderJob {
  eventData: {
    dateTime: string;
    [key: string]: any;
  };
  customerEmails: string[];
}

interface PromoterWelcomeJob {
  promoterData: Record<string, any>;
}

///we create a new queue and name it email processing, we also use redis as aack3nd to store queued jobs
const emailQueue = new Queue("email processing", process.env.REDIS_URL!);

//this is the worker part, "ticket-conrim" listend to jobs of type "ticket-confirm"
///te number is just the amount of jobs it can process at the same time
emailQueue.process("ticket-confirmation", 5, async (job) => {
  const { orderData } = job.data;

  try {
    // Send main confirmation email
    await EmailService.sendTicketConfirmation(orderData);

    // Send individual tickets to each recipient
    await EmailService.sendIndividualTickets(orderData.tickets);

    return { success: true, emailsSent: orderData.tickets.length + 1 };
  } catch (error) {
    logger.error("Ticket email job failed:", error);
    throw error;
  }
});

emailQueue.process("event-reminder", 3, async (job) => {
  const { eventData, customerEmails } = job.data;

  try {
    await EmailService.sendEventReminder(eventData, customerEmails);
    return { success: true, emailsSent: customerEmails.length };
  } catch (error) {
    logger.error("Reminder email job failed:", error);
    throw error;
  }
});

emailQueue.process("promoter-welcome", 10, async (job) => {
  const { promoterData } = job.data;

  try {
    await EmailService.sendPromoterWelcome(promoterData);
    return { success: true, emailsSent: 1 };
  } catch (error) {
    logger.error("Welcome email job failed:", error);
    throw error;
  }
});

// Queue event handlers for logging, these are helpful to know when a job succedds, fails or stalled, thst is took to long and might need retries
emailQueue.on("completed", (job, result) => {
  logger.info(
    `Email job ${job.id} completed: ${result.emailsSent} emails sent`
  );
});

emailQueue.on("failed", (job, err) => {
  logger.error(`Email job ${job.id} failed:`, err.message);
});

emailQueue.on("stalled", (job) => {
  logger.warn(`Email job ${job.id} stalled`);
});

// Here we add jobs to queue
const emailJobs = {
  // Add ticket confirmation to queue
  sendTicketConfirmation: async (
    orderData: OrderData,
    options: { delay?: number } = {}
  ) => {
    return await emailQueue.add(
      "ticket-confirmation",
      { orderData },
      {
        delay: options.delay || 0,
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
        removeOnComplete: 50,
        removeOnFail: 20,
      }
    );
  },

  // Add event reminder to queue
  sendEventReminder: async (
    eventData: EventReminderJob["eventData"],
    customerEmails: string[],
    options: { delay?: number } = {}
  ) => {
    return await emailQueue.add(
      "event-reminder",
      { eventData, customerEmails },
      {
        delay: options.delay || 0,
        attempts: 2,
        backoff: { type: "exponential", delay: 5000 },
      }
    );
  },

  // Add promoter welcome to queue
  sendPromoterWelcome: async (
    promoterData: PromoterData,
    options: { delay?: number } = {}
  ) => {
    return await emailQueue.add(
      "promoter-welcome", //job-type
      { promoterData }, //job-data
      {
        delay: options.delay || 0, //delays, can be optional
        attempts: 3, ///how many times to retry
        backoff: { type: "exponential", delay: 5000 }, ///here we say if it fails, it waits 5 secs before retrying`
      }
    );
  },

  // Schedule event reminders (24 hours before)
  scheduleEventReminder: async (
    eventData: EventReminderJob["eventData"],
    customerEmails: string[]
  ) => {
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
  logger.info("Email queue started");
  return emailQueue;
}

export { emailQueue, emailJobs, startEmailQueue };
