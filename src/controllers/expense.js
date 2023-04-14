import { setErrorResponse } from '../helpers/response';
import { runQuery } from '../db';

export const getAll = async (req, res) => {
  const { data, error } = await runQuery('SELECT * FROM expense');
  const status = error ? 500 : 200;

  res.status(status).send(error ? setErrorResponse(error, status) : { data });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await runQuery(
    `SELECT * FROM expense WHERE expense_id = ${id}`,
  );
  const status = error ? 500 : 200;

  res
    .status(status)
    .send(error ? setErrorResponse(error, status) : { data: data[0] });
};
