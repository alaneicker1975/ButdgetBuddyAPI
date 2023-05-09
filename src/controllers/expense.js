import * as expense from '../models/expense';

export const getAll = async (req, res, next) => {
  const { data, error } = await expense.getAll();

  if (error) return next(error);

  return res.status(200).send({ data });
};

export const getOne = async (req, res, next) => {
  const { expenseId } = req.params;
  const { data, error } = await expense.getOne(expenseId);

  if (error) return next(error);

  return res.status(200).send({ data: data[0] });
};

export const insertOne = async (req, res, next) => {
  const { body } = req;
  const { data, error } = await expense.insertOne(body);

  if (error) return next(error);

  res.status(201).send({ data });
};

export const updateOne = async (req, res, next) => {
  const { body } = req;
  const { expenseId } = req.params;
  const { data, error } = await expense.updateOne(expenseId, body);

  if (error) return next(error);

  res.status(200).send({ data });
};

export const deleteOne = async (req, res, next) => {
  const { expenseId } = req.params;
  const { data, error } = await expense.deleteOne(expenseId);

  if (error) return next(error);

  res.status(200).send({ data });
};
