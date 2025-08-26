const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    ///common for all users
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },

    ///for clerk users
    // clerkId: {
    //   type: String,
    //   required: true,
    //   unique: true, // maps directly to Clerk's user.id
    //   sparse: true, // allows null if not using Clerk
    // },

    ///for local users
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    ///normal normal
    role: {
      type: String,
      enum: ["user", "promoter", "admin"],
      default: "promoter",
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "This user has not added a bio yet.",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
