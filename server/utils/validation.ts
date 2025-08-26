import type { RegistrationInput } from "../types";

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
export { validateRegistration, validatelogin };
