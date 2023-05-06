import { setErrorResponse } from '../helpers/response';
import * as expense from '../models/expense';

export const getAll = async (req, res) => {
  try {
    const { data, error } = await expense.getAll();
    const status = error?.status || 200;

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const getOne = async (req, res) => {
  const { expenseId } = req.params;

  try {
    const { data, error } = await expense.getOne(expenseId);
    const status = error?.status || 200;

    res
      .status(status)
      .send(error ? setErrorResponse(error, status) : { data: data[0] });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const insertOne = async (req, res) => {
  const { body } = req;

  try {
    const { data, error } = await expense.insertOne(body);
    const status = error?.status || 201;

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const updateOne = async (req, res) => {
  const { body } = req;
  const { expenseId } = req.params;

  try {
    const { data, error } = await expense.updateOne(expenseId, body);
    const status = error?.status || 200;

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const deleteOne = async (req, res) => {
  const { expenseId } = req.params;

  try {
    const { data, error } = await expense.deleteOne(expenseId);
    const status = error?.status || 200;

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};
