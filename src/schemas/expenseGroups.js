import Joi from 'joi';

export const expenseGroupSchema = Joi.object({
  userAccountId: Joi.number().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  totalBudget: Joi.number().required(),
});

export const expenseGroupExpenseSchema = Joi.object({
  expenseGroupId: Joi.string().required(),
  name: Joi.string().max(50).required(),
  balance: Joi.number().required(),
  dueDate: Joi.string().required(),
  isPaid: Joi.boolean().default(false),
  note: Joi.string().max(200).required(),
});
