import { expense } from '../models/expense';
import { setErrorResponse } from '../helpers/response';

export const getAll = async (req, res) => {
  const { rows: data } = await expense.getAll();
  res.status(200).send({ data });
  // expense.getAll()
  //   .then(({ rows: data }, error) => {
  //     const status = error ? 500 : 200;
  //     res
  //       .status(status)
  //       .send(error ? setErrorResponse(error, status) : { data });
  //   })
  //   .catch((error) => {
  //     res.status(500).send(setErrorResponse(error, 500));
  //   });
};

export const getOne = (req, res) => {
  const { id } = req.params;
  expense
    .getOne(id)
    .then(({ rows }, error) => {
      const status = error ? 500 : 200;
      res
        .status(status)
        .send(error ? setErrorResponse(error, status) : { data: rows[0] });
    })
    .catch((error) => {
      res.status(500).send(setErrorResponse(error, 500));
    });
};
