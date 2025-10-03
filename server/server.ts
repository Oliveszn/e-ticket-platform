import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import type { Express } from "express";
import Redis from "ioredis";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import connectDB from "./config/db";
import connectRedis from "./config/redis";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import emailRoutes from "./routes/emailRoutes";
import webhookRoutes from "./routes/webhookRoutes";
import { startEmailQueue } from "./jobs/emailQueues";
import { rateLimiter } from "./middleware/rateLimit";
// import { ClerkExpressRequireAuth } from "@clerk/express";

const app: Express = express();
const PORT = process.env.PORT;
let redisClient: Redis;
//middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Protect a route with Clerk auth
// app.get("/api/protected", ClerkExpressRequireAuth(), (req, res) => {
//   res.json({ message: "You are authenticated!", user: req.auth });
// });

// Apply middleware globally
app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip as string) // here we deduct a point for thta ip
    .then(() => next()) // we only contine if theres still points
    .catch(() => {
      // If they exceeded their limit, block
      logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
      res.status(429).json({ success: false, message: "Too many requests" });
    });
});

///Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/events",
  (req, res, next) => {
    req.redisClient = redisClient;
    next();
  },
  eventRoutes
);
app.use("/api/tickets", ticketRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api", emailRoutes);

// Global error handler
app.use(errorHandler);

// Initialize connections and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Connect to Redis
    redisClient = await connectRedis();

    // Start background jobs
    startEmailQueue();
    // startCleanupQueue();

    app.listen(PORT, () => {
      logger.info(`live on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
