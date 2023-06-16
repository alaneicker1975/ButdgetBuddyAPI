import Joi from 'joi';

export const expenseSchema = Joi.object({
  name: Joi.string().max(50).required(),
});
