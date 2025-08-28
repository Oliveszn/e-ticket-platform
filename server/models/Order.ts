import { Schema } from "mongoose";

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    buyer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      Info: { type: String }, // could be name/phone/address etc.
    },

    sendToMultipleRecipients: { type: Boolean, default: false },
    tickets: [
      {
        ticketTypeId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        ticketType: {
          type: String,
          required: true,
        },
        recipientFirstName: { type: String, required: true },
        recipientLastName: { type: String, required: true },
        recipientEmail: {
          type: String,
          required: true,
        },
        ticketNumber: {
          type: String,
        },
      },
    ],
    orderStatus: {
      type: String,
      default: "PENDING", // ["PENDING", "CONFIRMED", "CANCELLED"]
    },
    paymentMethod: {
      type: String, // "Paystack", "Flutterwave", "Stripe"...
    },
    paymentStatus: {
      type: String,
      default: "UNPAID", // ["UNPAID", "PAID", "FAILED"]
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentId: String,
    payerId: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
