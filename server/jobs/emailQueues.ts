import Queue from "bull";
import EmailService from "../services/emailService";
import MailingService from "../services/nodeMailerService";
import logger from "../utils/logger";
import type { OrderData, PromoterData } from "../types";

interface EventReminderJob {
  eventData: {
    dateTime: string;
    [key: string]: any;
  };
  customerEmails: string[];
}

///we create a new queue and name it email processing, we also use redis as aack3nd to store queued jobs
const emailQueue = new Queue("email processing", process.env.REDIS_URL!);

//this is the worker part, "ticket-conrim" listend to jobs of type "ticket-confirm"
///te number is just the amount of jobs it can process at the same time

/////ticket confirma sent to buyer
emailQueue.process("ticket-confirmation", 5, async (job) => {
  const { orderData } = job.data;

  try {
    // Send main confirmation email
    await MailingService.sendTicketConfirmation(orderData);

    // Send individual tickets to each recipient
    // await MailingService.sendIndividualTickets(orderData.tickets);

    // return { success: true, emailsSent: orderData.tickets.length + 1 };
    return { success: true, emailSent: orderData.customerEmail };
  } catch (error) {
    logger.error("Ticket email job failed:", error);
    throw error;
  }
});

//Individual Ticket Job (sends one ticket to one recipient)
emailQueue.process("individual-ticket", 10, async (job) => {
  const { ticketData } = job.data;

  try {
    await MailingService.sendIndividualTicket(ticketData);
    return { success: true, emailSent: ticketData.recipientEmail };
  } catch (error) {
    logger.info("Individual ticket email failed:", error);
    throw error;
  }
});

// 3. Bulk Ticket Distribution Job (sends individual tickets to all recipients)
emailQueue.process("ticket-distribution", 3, async (job) => {
  const { tickets } = job.data;

  try {
    // Create individual jobs for each ticket (better for tracking and retries)
    const ticketJobs = tickets.map((ticket: any) =>
      emailQueue.add(
        "individual-ticket",
        { ticketData: ticket },
        {
          delay: Math.random() * 2000, // Spread out emails over 2 seconds
          attempts: 3,
          backoff: { type: "exponential", delay: 3000 },
        }
      )
    );

    await Promise.all(ticketJobs);
    logger.info(`Distributed ${tickets.length} individual tickets`);
    return { success: true, ticketsDistributed: tickets.length };
  } catch (error) {
    throw error;
  }
});

emailQueue.process("event-reminder", 3, async (job) => {
  const { eventData, customerEmails } = job.data;

  try {
    await MailingService.sendEventReminder(eventData, customerEmails);
    return { success: true, emailsSent: customerEmails.length };
  } catch (error) {
    logger.error("Reminder email job failed:", error);
    throw error;
  }
});

emailQueue.process("promoter-welcome", 10, async (job) => {
  const { promoterData } = job.data;

  try {
    await MailingService.sendPromoterWelcome(promoterData);
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

  // Send individual ticket to one recipient
  sendIndividualTicket: async (
    ticketData: any,
    options: { delay?: number } = {}
  ) => {
    return await emailQueue.add(
      "individual-ticket",
      { ticketData },
      {
        delay: options.delay || 0,
        attempts: 3,
        backoff: { type: "exponential", delay: 3000 },
        removeOnComplete: 50,
        removeOnFail: 20,
      }
    );
  },

  // Distribute all tickets to their respective recipients
  distributeTickets: async (
    tickets: any[],
    options: { delay?: number } = {}
  ) => {
    return await emailQueue.add(
      "ticket-distribution",
      { tickets },
      {
        delay: options.delay || 1000, // Small delay to let confirmation email go first
        attempts: 2,
        removeOnComplete: 50,
        removeOnFail: 20,
      }
    );
  },

  // Complete ticket purchase workflow (confirmation + distribution)
  completeTicketPurchase: async (orderData: any, tickets: any[]) => {
    try {
      // 1. Send order confirmation to buyer (immediate)
      const confirmationJob = await emailJobs.sendTicketConfirmation(orderData);

      // 2. Distribute individual tickets (with small delay)
      const distributionJob = await emailJobs.distributeTickets(tickets, {
        delay: 2000,
      });

      return {
        confirmationJob: confirmationJob.id,
        distributionJob: distributionJob.id,
        totalEmails: tickets.length + 1, // +1 for confirmation
      };
    } catch (error) {
      throw error;
    }
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
