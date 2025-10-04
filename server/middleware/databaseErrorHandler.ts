// added this to get network errors 'no internet/poor connection'
import type { Request, Response, NextFunction } from "express";

export const databaseErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // MongoDB connection errors
  if (
    err.name === "MongoNetworkError" ||
    err.message?.includes("ENOTFOUND") ||
    err.message?.includes("ECONNREFUSED")
  ) {
    return res.status(503).json({
      success: false,
      message: "Database connection error. Please try again later.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }

  next(err);
};
