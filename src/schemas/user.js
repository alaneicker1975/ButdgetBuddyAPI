import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().min(8).max(50).required(),
  password: Joi.string().min(8).max(16).required(),
  email: Joi.string().email().required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(8).max(50).required(),
  password: Joi.string().min(8).max(16).required(),
});
