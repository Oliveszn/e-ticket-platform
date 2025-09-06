import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import type { RedisReply } from "rate-limit-redis";
import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL!);

const createLimiter = (options: { windowMs: number; max: number }) =>
  rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]): Promise<RedisReply> => {
        return redisClient.call(
          ...(args as [string, ...string[]])
        ) as Promise<RedisReply>;
      },
    }),
    windowMs: options.windowMs,
    max: options.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  });

// General API limiter
export const generalLimiter = createLimiter({
  windowMs: 60 * 1000,
  max: 100,
});

// Login/Register limiter
export const authLimiter = createLimiter({
  windowMs: 60 * 1000,
  max: 5,
});

// Ticket purchase limiter
export const purchaseLimiter = createLimiter({
  windowMs: 60 * 1000,
  max: 10,
});
