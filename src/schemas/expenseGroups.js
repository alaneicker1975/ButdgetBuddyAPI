import Joi from 'joi';

export const expenseGroupSchema = Joi.object({
  expense_group_id: Joi.number(),
  user_account_id: Joi.number().required(),
  start_date: Joi.string().required(),
  end_date: Joi.string().required(),
  total_budget: Joi.number().required(),
});

export const expenseGroupExpenseSchema = Joi.object({
  expense_group_id: Joi.number(),
  name: Joi.string().max(50).required(),
});
