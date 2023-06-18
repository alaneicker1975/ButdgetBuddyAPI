import Joi from 'joi';

export const expenseGroupSchema = Joi.object({
  userAccountId: Joi.string(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  totalBudget: Joi.number().required(),
});

export const expenseGroupExpenseSchema = Joi.object({
  expenseGroupId: Joi.number().required(),
  name: Joi.string().max(50).required(),
  balance: Joi.number().required(),
  dueDate: Joi.string().required(),
  isPaid: Joi.boolean(),
  note: Joi.string().max(150),
});
