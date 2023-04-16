import { setErrorResponse } from '../helpers/response';
import Expense from '../models/Expense';

const expense = new Expense();

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
