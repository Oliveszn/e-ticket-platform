import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import type { Express } from "express";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import connectDB from "./config/db";
import connectRedis from "./config/redis";
// import { ClerkExpressRequireAuth } from "@clerk/express";

const app: Express = express();
const PORT = process.env.PORT;

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

// Initialize connections and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Connect to Redis
    await connectRedis();

    // Start background jobs
    // startEmailQueue();
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
