import jwt from "jsonwebtoken";
import { asyncHandler } from "./errorHandler";
import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "../utils/error";
import User from "../models/user";

const requireAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    ///get token from multiple sources
    const token =
      req.cookies?.token ||
      req.headers.authorization?.replace("Bearer", "").trim() ||
      req.headers["x-access-token"];

    if (!token) {
      throw new ValidationError("Access Denied, No token Provided", 401);
    }

    ///verify token structure
    if (
      !/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token)
    ) {
      throw new ValidationError("Malformed token.", 401);
    }

    ///Verify JWt and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    if (!decoded?.userId) {
      throw new ValidationError("Invalid token payload.", 401);
    }

    // Fetch user from MongoDB
    const user = await User.findById(decoded.userId).select(
      "id email firstName lastName role"
    );

    if (!user) {
      throw new ValidationError("Invalid token. User not found.", 401);
    }

    // Attach user data to the request
    (req as any).user = user;
    (req as any).isAuthenticated = true;

    next();
  }
);

export default requireAuth;
