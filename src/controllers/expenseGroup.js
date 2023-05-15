import * as expenseGroup from '../models/expenseGroup';

export const getExpenseGroupsByUserAccountId = async (req, res, next) => {
  const { userAccountId } = req.params;

  const { data, error } = await expenseGroup.getExpenseGroupsByUserAccountId(
    userAccountId,
  );

  if (error) return next(error);

  return res.status(200).send({ data });
};

export const getExpensesByExpenseGroupId = async (req, res, next) => {
  const { expenseGroupId } = req.params;

  const { data, error } = await expenseGroup.getExpensesByExpenseGroupId(
    expenseGroupId,
  );

  if (error) return next(error);

  return res.status(200).send({ data });
};
