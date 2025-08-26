import logger from "../utils/logger";
import { validatelogin, validateRegistration } from "../utils/validation";
import User from "../models/user";
import generateTokens from "../utils/generateToken";
import bcrypt from "bcryptjs";
import RefreshToken from "../models/RefreshToken";
import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import { UnauthorizedError, ValidationError } from "../utils/error";

const resgiterUser = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Registration endpoint hit...");
  //validate the schema
  const { error } = validateRegistration(req.body);
  if (error) {
    logger.warn("Validation error", error.details[0].message);
    throw new ValidationError(error.details[0].message, 400);
  }
  const { email, firstName, lastName, address, number, password } = req.body;

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
    address,
    number,
    password: hash,
  });
  await user.save();
  logger.warn("User saved successfully", user._id);

  const { accessToken, refreshToken } = await generateTokens(user);

  ///here we send both tokens to frontend
  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    accessToken,
    refreshToken,
  });
});

const registerWithClerk = async (req: Request, res: Response) => {
  const { userId, sessionId } = req.auth!; // Clerk adds this

  // Clerk also exposes more user data via their SDK if needed
  // e.g. const clerkUser = await clerkClient.users.getUser(userId);

  // Check if user exists in Mongo
  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    user = new User({
      clerkId: userId,
      // You could also sync name/email from Clerk
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: "User authenticated via Clerk",
    user,
    sessionId,
  });
};

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

  res.json({
    accessToken,
    refreshToken,
    userId: existingUser._id,
  });
});

const refreshTokenUser = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Refresh token endpoint hit...");
  //refresh sent from body
  const { refreshToken } = req.body;
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
  //send tokens back
  res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});

//logout
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Logout endpoint hit...");
  const { refreshToken } = req.body;
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
  registerWithClerk,
  resgiterUser,
  loginUser,
  refreshTokenUser,
  logoutUser,
  changePassword,
};
