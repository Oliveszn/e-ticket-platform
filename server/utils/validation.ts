import { title } from "process";
import type { EventInput, RegistrationInput, TicketInfo } from "../types";

const Joi = require("joi");

const validateRegistration = (data: RegistrationInput) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    businessName: Joi.string().required(),
    address: Joi.string().required(),
    number: Joi.string()
      .pattern(/^[0-9]+$/) // only digits
      .min(10)
      .max(15)
      .required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const validatelogin = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const validateEvent = (data: EventInput) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    eventDate: Joi.string().required(),
    eventTime: Joi.string().required(),
    venue: Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      isPublic: Joi.boolean().required(),
    }).required(),
    charge: Joi.string().valid("Host", "Buyer").required(),
    category: Joi.string()
      .valid(
        "Music",
        "Sports",
        "Tech",
        "Education",
        "Health",
        "Seminars",
        "Arts & Culture",
        "Charity",
        "Networking"
      )
      .required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    ticket: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().required(),
          quantity: Joi.number().required(),
          sold: Joi.number().default(0),
          description: Joi.string().allow(""), // optional but allow empty
          benefits: Joi.array().items(Joi.string()),
          showVolume: Joi.boolean().required(),
        })
      )
      .required(),
  });
  return schema.validate(data);
};

const validateTicketPurchase = (data: TicketInfo) => {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be empty",
    }),
    lastName: Joi.string().required().messages({
      "any.required": "Last name is required",
      "string.empty": "Last name cannot be empty",
    }),

    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Please provide a valid email address",
    }),
    numberOfTickets: Joi.number().integer().min(1).required().messages({
      "any.required": "Number of tickets is required",
      "number.min": "Must purchase at least 1 ticket",
      "number.integer": "Number of tickets must be a whole number",
    }),
    info: Joi.string().optional(),
    sendToMultipleRecipients: Joi.boolean().default(false),

    // recipients: Joi.array().items(),
    recipients: Joi.when("sendToMultipleRecipients", {
      is: true,
      then: Joi.array()
        .items(
          Joi.object({
            firstName: Joi.string().required().messages({
              "any.required": "Recipient first name is required",
            }),
            lastName: Joi.string().required().messages({
              "any.required": "Recipient last name is required",
            }),
            email: Joi.string().email().required().messages({
              "any.required": "Recipient email is required",
              "string.email": "Recipient email must be valid",
            }),
          })
        )
        .required()
        .messages({
          "any.required":
            "Recipients array is required when sendToMultipleRecipients is true",
        }),
      otherwise: Joi.optional(),
    }),
  })
    .custom((value: any, helpers: any) => {
      // Custom validation: prevent sendToMultipleRecipients=true with only 1 ticket
      if (value.sendToMultipleRecipients && value.numberOfTickets === 1) {
        return helpers.error("custom.singleTicketMultipleRecipients");
      }

      // Custom validation: check recipients count matches expected count
      if (value.sendToMultipleRecipients && value.recipients) {
        const expectedRecipients = value.numberOfTickets - 1;
        if (value.recipients.length !== expectedRecipients) {
          return helpers.error("custom.recipientCountMismatch", {
            expected: expectedRecipients,
            received: value.recipients.length,
          });
        }
      }

      return value;
    })
    .messages({
      "custom.singleTicketMultipleRecipients":
        "Cannot send to multiple recipients with only 1 ticket",
      "custom.recipientCountMismatch":
        "Expected {{#expected}} recipients for {{numberOfTickets}} tickets (buyer gets 1 ticket), but received {{#received}}",
    });

  return schema.validate(data);
};
export {
  validateRegistration,
  validatelogin,
  validateEvent,
  validateTicketPurchase,
};
