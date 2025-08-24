import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import type { Express } from "express";
import Redis from "ioredis";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import logger from "./utils/logger";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;
//this was neccessary to tell ts we are adding redisclient to req
declare global {
  namespace Express {
    interface Request {
      redisClient: Redis;
    }
  }
}

///added the ! at the end to tell ts we know its not undefined since it kept throwing errors
const redisClient = new Redis(process.env.REDIS_URL!);

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => logger.info("Connected to mongodb"))
  .catch((error) => logger.error("Mongo connection error", error));

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

app.listen(PORT, () => {
  logger.info(`live on ${PORT}`);
});
