const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    venue: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      isPublic: { type: Boolean, default: true },
    },
    charge: {
      type: String,
      enum: ["Host", "Buyer"],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Music",
        "Sports",
        "Tech",
        "Education",
        "Health",
        "Seminars",
        "Arts & Culture",
      ],
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      publicId: {
        type: String,
        required: true,
      },
      mimeType: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      originalName: {
        type: String,
        required: true,
      },
    },
    tickets: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        sold: { type: Number, default: 0 },
        description: { type: String },
        personsPerTicket: { type: Number, required: false, default: 1 },
        showVolume: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
