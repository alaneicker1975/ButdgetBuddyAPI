import * as expense from '../services/expenses';

export const getAllExpenses = async (req, res, next) => {
  const { data, error } = await expense.getAllExpenses();

  if (error) return next(error);

  return res.status(200).send({ data });
};

export const getExpenseById = async (req, res, next) => {
  const { expenseId } = req.params;
  const { data, error } = await expense.getExpenseById(expenseId);

  if (error) return next(error);

  return res.status(200).send({ data: data[0] });
};

export const createExpense = async (req, res, next) => {
  const { body } = req;
  const { data, error } = await expense.createExpense(body);

  if (error) return next(error);

  res.status(201).send({ data });
};

export const updateExpense = async (req, res, next) => {
  const { body } = req;
  const { expenseId } = req.params;
  const { data, error } = await expense.updateExpense(expenseId, body);

  if (error) return next(error);

  res.status(200).send({ data });
};

export const deleteExpense = async (req, res, next) => {
  const { expenseId } = req.params;
  const { data, error } = await expense.deleteExpense(expenseId);

  if (error) return next(error);

  res.status(200).send({ data });
};
