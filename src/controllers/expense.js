import { setErrorResponse } from '../helpers/response';
import * as expense from '../models/expense';

export const getAll = async (req, res) => {
  try {
    const { data, error } = await expense.getAll();
    const status = error ? 500 : 200;

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await expense.getOne(id);
    const status = error ? 500 : 200;

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
    const status = error ? 500 : 201;

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const updateOne = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const { data, error } = await expense.updateOne(id, body);
    const status = error ? 500 : 200;

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await expense.deleteOne(id);
    const status = error ? 500 : 200;

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};
