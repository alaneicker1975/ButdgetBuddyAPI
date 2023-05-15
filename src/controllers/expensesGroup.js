import * as expenseGroup from '../models/expensesGroup';

export const getExpenseGroupsByUserAccountId = async (req, res, next) => {
  const { userAccountId } = req.params;

  const { data, error } = await expenseGroup.getExpenseGroupsByUserAccountId(
    userAccountId,
  );

  if (error) return next(error);

  return res.status(200).send({ data });
};

export const getExpenseGroupByExpenseGroupId = async (req, res, next) => {};

export const getExpensesByExpenseGroupId = async (req, res, next) => {
  const { expenseGroupId } = req.params;

  const { data: expenses, error } =
    await expenseGroup.getExpensesByExpenseGroupId(expenseGroupId);

  if (error) return next(error);

  return res.status(200).send({
    data: {
      expenseGroupId,
      expenses,
    },
  });
};
