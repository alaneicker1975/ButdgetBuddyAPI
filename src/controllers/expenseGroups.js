import * as expenseGroupService from '../services/expensesGroups';

export const getExpenseGroupsByUserAccountId = async (req, res, next) => {
  const { userAccountId } = req.params;

  const { data, error } =
    await expenseGroupService.getExpenseGroupsByUserAccountId(userAccountId);

  if (error) return next(error);

  return res.status(200).send({ data });
};

export const createExpenseGroup = async (req, res, next) => {
  const { userAccountId } = req.params;
};

export const getExpenseGroupById = async (req, res, next) => {
  const { expenseGroupId } = req.params;

  const { data, error } = await expenseGroupService.getExpenseGroupById(
    expenseGroupId,
  );

  if (error) return next(error);

  return res.status(200).send({ data });
};

export const updateExpenseGroupById = async (req, res, next) => {
  const { expenseGroupId } = req.params;

  // const { data, error } = await expenseGroupService.getExpenseGroupById(
  //   expenseGroupId,
  // );

  // if (error) return next(error);

  // return res.status(200).send({ data });
};

export const deleteExpenseGroupById = async (req, res, next) => {
  const { expenseGroupId } = req.params;

  // const { data, error } = await expenseGroupService.getExpenseGroupById(
  //   expenseGroupId,
  // );

  // if (error) return next(error);

  // return res.status(200).send({ data });
};

export const getExpensesByExpenseGroupId = async (req, res, next) => {
  const { expenseGroupId } = req.params;

  const { data, error } = await expenseGroupService.getExpensesByExpenseGroupId(
    expenseGroupId,
  );

  if (error) return next(error);

  return res.status(200).send({ data });
};
