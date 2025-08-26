import { asyncHandler } from "../middleware/errorHandler";
import User from "../models/user";
import type { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "../utils/error";
import logger from "../utils/logger";

///get profile
const getProfile = asyncHandler(async (req: Request, res: Response) => {
  logger.info("profile endpoint hit...");
  const userId = req.user?._id;
  if (!userId) {
    throw new NotFoundError("User not found");
  }

  const UserProfile = await User.findById(userId);
  res.status(200).json({
    success: true,
    data: UserProfile,
  });
});
///edit profile
const editProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new NotFoundError("User not found");
  }

  const { firstName, lastName, address, number, bio } = req.body;

  if (!firstName && !lastName && !address && !number && !bio) {
    throw new ValidationError("No update fields provided", 400);
  }

  const updateProfile: Record<string, any> = {};
  if (firstName) updateProfile.firstName = firstName;
  if (lastName) updateProfile.lastName = lastName;
  if (address) updateProfile.address = address;
  if (number) updateProfile.number = number;
  if (bio) updateProfile.bio = bio;

  const updatedUser = await User.findByIdAndUpdate(userId, updateProfile, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

///delete account
const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new NotFoundError("User not found");
  }
  const existingUser = await User.findByIdAndDelete(userId);

  res.status(200).json({
    data: existingUser,
    success: true,
    message: "Account deletion successful",
  });
});

export { deleteAccount, editProfile, getProfile };
