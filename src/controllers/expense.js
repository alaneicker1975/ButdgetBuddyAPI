import { setErrorResponse } from '../helpers/response';
import * as expense from '../models/expense';

export const getAll = async (req, res) => {
  try {
    const { data, error, status } = await expense.getAll();

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error, status } = await expense.getOne(id);

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
    const { data, error, status } = await expense.insertOne(body);

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const updateOne = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const { data, error, status } = await expense.updateOne(id, body);

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error, status } = await expense.deleteOne(id);

    res.status(status).send(error ? setErrorResponse(error, status) : { data });
  } catch (error) {
    res.status(500).send(setErrorResponse(error, 500));
  }
};
