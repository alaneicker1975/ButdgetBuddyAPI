import * as expenseGroup from '../models/expenseGroup';

export const getExpenseGroupsByUserAccountId = async (req, res, next) => {
  const { userAccountId } = req.params;

  const { data, error } = await expenseGroup.getExpenseGroupsByUserAccountId(
    userAccountId,
  );

  if (error) return next(error);

  return res.status(200).send({ data });
};
