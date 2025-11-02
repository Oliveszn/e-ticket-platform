import logger from "../utils/logger";
import { validatelogin, validateRegistration } from "../utils/validation";
import User from "../models/user";
import generateTokens from "../utils/generateToken";
import bcrypt from "bcryptjs";
import RefreshToken from "../models/RefreshToken";
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import { UnauthorizedError, ValidationError } from "../utils/error";
import { emailJobs } from "../jobs/emailQueues";
import { isTokenExpired } from "../utils/helper";

const isProduction = process.env.NODE_ENV === "production";

const resgiterUser = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Registration endpoint hit...");
  //validate the schema
  const { error } = validateRegistration(req.body);
  if (error) {
    logger.warn("Validation error", error.details[0].message);
    throw new ValidationError(error.details[0].message, 400);
  }
  const {
    email,
    firstName,
    lastName,
    businessName,
    address,
    number,
    password,
  } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    logger.warn("User already exists");
    throw new ValidationError("User already exists", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  user = new User({
    email,
    firstName,
    lastName,
    businessName,
    address,
    number,
    password: hash,
  });
  await user.save();
  logger.warn("User saved successfully", user._id);

  const { accessToken, refreshToken } = await generateTokens(user);

  await emailJobs.sendPromoterWelcome({ email, firstName });
  logger.info(`Promoter welcome email queued for ${email}`);

  //we return the user for the frontend to receive without password
  const safeUser = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    businessName: user.businessName,
    address: user.address,
    number: user.number,
    createdAt: user.createdAt,
  };

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 min
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });

  ///here we send both tokens to frontend
  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    user: safeUser,
    accessToken,
    refreshToken,
  });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Login endpoint hit...");
  const { error } = validatelogin(req.body);
  if (error) {
    logger.warn("Validation error", error.details[0].message);

    throw new ValidationError(error.details[0].message, 400);
  }
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    logger.warn("Invalid user");
    throw new ValidationError("Invalid credentials", 400);
  }

  const checkPasswordMatch = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!checkPasswordMatch) {
    logger.warn("Invalid password");
    throw new ValidationError("Invalid Password", 400);
  }
  const { accessToken, refreshToken } = await generateTokens(existingUser);

  const safeUser = {
    id: existingUser._id,
    email: existingUser.email,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    address: existingUser.address,
    number: existingUser.number,
    createdAt: existingUser.createdAt,
  };

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 min
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });

  res.json({
    success: true,
    message: "Login successful!",
    user: safeUser,
    accessToken,
    refreshToken,
  });
});

const refreshTokenUser = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Refresh token endpoint hit...");
  logger.info("Cookies received:", req.cookies);

  //had to change were we got refreshtoken from get it from cookies instead of body
  const refreshToken = req.cookies?.refreshToken;
  //we check if refresh token is missing
  if (!refreshToken) {
    logger.warn("Refresh token missing");
    throw new ValidationError("Refresh token missing", 400);
  }

  //if thers a refreshtoken sent we check the db to confirm it exists
  const storedToken = await RefreshToken.findOne({ token: refreshToken });

  if (!storedToken) {
    logger.warn("Invalid refresh token provided");

    throw new ValidationError("Invalid refresh token", 400);
  }

  ///we confirm if the token is not found or its expired
  if (!storedToken || storedToken.expiresAt < new Date()) {
    logger.warn("Invalid or expired refresh token");
    throw new UnauthorizedError(`Invalid or expired refresh token`);
  }

  //we look for the user who owns the token
  const user = await User.findById(storedToken.user);

  if (!user) {
    logger.warn("User not found");
    throw new UnauthorizedError(`User not found`);
  }
  //then genrate new access & refresh tokens if theres a refresh token
  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await generateTokens(user);

  //delete the old refresh token cos we generated a new one
  await RefreshToken.deleteOne({ _id: storedToken._id });

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 min
    path: "/",
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });

  //send tokens back
  res.json({
    success: true,
    message: "Tokens refreshed successfully",
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});

const getMe = asyncHandler(async (req: Request, res: Response) => {
  logger.info("getme endpoint hit...");
  let token = req.cookies?.accessToken;

  // If no access token or expired, try to refresh
  if (!token || isTokenExpired(token)) {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      try {
        // Validate refresh token and get user
        const storedToken = await RefreshToken.findOne({ token: refreshToken });

        if (storedToken && storedToken.expiresAt > new Date()) {
          const user = await User.findById(storedToken.user);

          if (user) {
            // Generate new tokens
            const { accessToken, refreshToken: newRefreshToken } =
              await generateTokens(user);

            // Delete old refresh token
            await RefreshToken.deleteOne({ _id: storedToken._id });

            // Set new cookies
            res.cookie("accessToken", accessToken, {
              httpOnly: true,
              secure: isProduction,
              sameSite: isProduction ? "none" : "lax",
              maxAge: 15 * 60 * 1000,
              path: "/",
            });

            res.cookie("refreshToken", newRefreshToken, {
              httpOnly: true,
              secure: isProduction,
              sameSite: isProduction ? "none" : "lax",
              maxAge: 7 * 24 * 60 * 60 * 1000,
              path: "/",
            });

            // Return user data
            return res.json({
              success: true,
              user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
              },
              isAuthenticated: true,
              accessToken,
              refreshToken: newRefreshToken,
              message: "Session restored successfully",
            });
          }
        }
      } catch (error) {
        throw new UnauthorizedError("Session expired");
      }
    }

    throw new UnauthorizedError("Access token missing");
  }

  // Token is valid, return user data
  res.json({
    success: true,
    user: (req as any).user,
    isAuthenticated: (req as any).isAuthenticated,
    message: "User authenticated successfully",
  });
});

//logout
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Logout endpoint hit...");
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    logger.warn("Refresh token missing");
    throw new ValidationError("Refresh token missing", 400);
  }

  const storedToken = await RefreshToken.findOneAndDelete({
    token: refreshToken,
  });
  if (!storedToken) {
    logger.warn("Invalid refresh token provided");
    throw new UnauthorizedError("Invalid refresh token");
  }
  logger.info("Refresh token deleted for logout");

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: isProduction ? "none" : "lax",
    path: "/", // must match how it was set
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: isProduction ? "none" : "lax",
    path: "/", // must match how it was set
  });
  res.json({
    success: true,
    message: "Logged out successfully!",
  });
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { oldPassword, newPassword } = req.body;

  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new ValidationError(`User not found`, 400);
  }

  const isPasswordMatch = await bcrypt.compare(
    oldPassword,
    existingUser.password
  );
  if (!isPasswordMatch) {
    throw new ValidationError("Passwords do not match, Please try again", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  existingUser.password = hash;
  await existingUser.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Succesfully",
  });
});

///verify email
///reset password

export {
  resgiterUser,
  loginUser,
  refreshTokenUser,
  logoutUser,
  changePassword,
  getMe,
};
