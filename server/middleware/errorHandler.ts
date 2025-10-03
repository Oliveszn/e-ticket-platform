import type { Request, Response, NextFunction } from "express";
import { ApiError, ValidationError, UnauthorizedError } from "../utils/error";
import logger from "../utils/logger";

interface ExtendedError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  errors?: any;
  code?: string | number;
  detail?: string;
  column?: string;
  keyValue?: any;
  path?: any;
  value?: any;
}

const errorHandler = (
  err: ExtendedError | undefined,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default to 500 if no status code set

  if (!err) {
    err = new ApiError("Unknown error occurred", 500);
  }

  // Create a working copy of the error
  let error: ExtendedError = err;

  // Log the error for debugging

  logger.error("ERROR 💥:", {
    timestamp: new Date().toISOString(),
    method: req?.method || "UNKNOWN",
    url: req?.originalUrl || "UNKNOWN",
    ip: req?.ip || "UNKNOWN",
    userAgent: req?.get?.("User-Agent") || "UNKNOWN",
    error: {
      name: err.name || "Error",
      message: err.message || "Unknown error",
      stack: err.stack || "No stack trace",
      statusCode: err.statusCode || 500,
      code: err.code || null,
    },
  });

  // Special handling for common error types
  if (err.name === "ValidationError") {
    error = new ValidationError("Validation failed", err.errors);
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    error = new UnauthorizedError("Invalid token. Please log in again");
  }
  if (err.name === "TokenExpiredError") {
    error = new UnauthorizedError("Token expired. Please log in again");
  }

  // Handle Mongo duplicate key
  ///for a case like slug which is unique
  if (err.code === 11000 && err.keyValue) {
    const keys = Object.keys(err.keyValue);
    if (keys.length > 0) {
      const field = keys[0] as string;
      const value = err.keyValue[field];
      return res.status(400).json({
        success: false,
        message: `The ${field} "${value}" already exists. Please choose another.`,
      });
    }
  }

  if (err.name === "CastError") {
    error = new ValidationError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // Handle bad JSON
  if (err instanceof SyntaxError && "body" in err) {
    error = new ValidationError("Invalid JSON payload", 400);
  }

  const statusCode = error.statusCode || 500;

  const responseData: any = {
    success: false,
    message: error.message || err.message || "Unknown error",
    statusCode: statusCode,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "development") {
    responseData.debug = {
      name: error.name || err.name || "Error",
      stack: error.stack || err.stack,
      ...(error.errors && { errors: error.errors }),
      ...(err.code && { code: err.code }),
    };
  } else {
    ////wehn in production we hide sensitive detials
    if (!error.isOperational || statusCode >= 500) {
      responseData.message = "Something went wrong. Please try again later.";
    }
  }

  return res.status(statusCode).json(responseData);
};

const asyncHandler = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export { errorHandler, asyncHandler };
