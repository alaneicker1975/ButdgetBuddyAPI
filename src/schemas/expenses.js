import Joi from 'joi';

export const expenseSchema = Joi.object({
  expense_id: Joi.number(),
  name: Joi.string().max(50).required(),
});
