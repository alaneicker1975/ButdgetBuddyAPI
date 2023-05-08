import * as expense from '../models/expense';

export const getAll = async (req, res, next) => {
  try {
    const { data, error } = await expense.getAll();

    if (error) return next(error);

    return res.status(200).send({ data });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const { data, error } = await expense.getOne(expenseId);

    if (error) return next(error);

    return res.status(200).send({ data: data[0] });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

export const insertOne = async (req, res, next) => {
  try {
    const { body } = req;
    const { data, error } = await expense.insertOne(body);

    if (error) return next(error);

    res.status(201).send({ data });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

export const updateOne = async (req, res, next) => {
  try {
    const { body } = req;
    const { expenseId } = req.params;
    const { data, error } = await expense.updateOne(expenseId, body);

    if (error) return next(error);

    res.status(200).send({ data });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

export const deleteOne = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const { data, error } = await expense.deleteOne(expenseId);

    if (error) return next(error);

    res.status(200).send({ data });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};
