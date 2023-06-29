import * as expenseService from '../services/expenses';

export const getAllExpenses = async (req, res, next) => {
  try {
    const { data, error } = await expenseService.getAllExpenses();

    if (error) return next(error);

    return res.status(200).send({ data });
  } catch (error) {
    return next(error);
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const { data, error } = await expenseService.getExpenseById(expenseId);

    if (error) return next(error);

    return res.status(200).send({ data });
  } catch (error) {
    return next(error);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const { body } = req;
    const { data, error } = await expenseService.createExpense(body);

    if (error) return next(error);

    res.status(201).send({ data });
  } catch (error) {
    return next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const { body } = req;
    const { expenseId } = req.params;
    const { data, error } = await expenseService.updateExpense(expenseId, body);

    if (error) return next(error);

    res.status(200).send({ data });
  } catch (error) {
    return next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const { data, error } = await expenseService.deleteExpense(expenseId);

    if (error) return next(error);

    res.status(200).send({ data });
  } catch (error) {
    return next(error);
  }
};
