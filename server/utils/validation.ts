import { title } from "process";
import type { EventInput, RegistrationInput } from "../types";

const Joi = require("joi");

const validateRegistration = (data: RegistrationInput) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    address: Joi.string().required(),
    number: Joi.string()
      .pattern(/^[0-9]+$/) // only digits
      .length(11)
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
export { validateRegistration, validatelogin, validateEvent };
