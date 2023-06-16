import Joi from 'joi';

export const authSchema = Joi.object({
  username: Joi.string().min(8).max(50).required(),
  password: Joi.string().min(8).max(60).required(),
});
