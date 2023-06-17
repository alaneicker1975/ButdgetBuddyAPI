import * as expenseGroupService from '../services/expenseGroups';

export const getExpenseGroupsByUserAccountId = async (req, res, next) => {
  try {
    const { data, error } =
      await expenseGroupService.getExpenseGroupsByUserAccountId(
        req.cookies.token,
      );

    if (error) return next(error);

    return res.status(200).send({ data });
  } catch (error) {
    return next(error);
  }
};

export const getExpenseGroupById = async (req, res, next) => {
  try {
    const { expenseGroupId } = req.params;

    const { data, error } = await expenseGroupService.getExpenseGroupById(
      expenseGroupId,
    );

    if (error) return next(error);

    return res.status(200).send({ data });
  } catch (error) {
    return next(error);
  }
};

export const createExpenseGroup = async (req, res, next) => {
  try {
    const { error, data } = await expenseGroupService.createExpenseGroup(
      req.body,
      req.cookies.token,
    );

    if (error) return next(error);

    res.send({ data });
  } catch (error) {
    return next(error);
  }
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
  try {
    const { expenseGroupId } = req.params;

    const { data, error } = await expenseGroupService.deleteExpenseGroupById(
      expenseGroupId,
    );

    if (error) return next(error);

    return res.status(200).send({ data });
  } catch (error) {
    return next(error);
  }
};

export const getExpensesByExpenseGroupId = async (req, res, next) => {
  try {
    const { expenseGroupId } = req.params;

    const { data, error } =
      await expenseGroupService.getExpensesByExpenseGroupId(expenseGroupId);

    if (error) return next(error);

    return res.status(200).send({ data });
  } catch (error) {
    return next(error);
  }
};

export const addExpenseToExpenseGroup = async (req, res, next) => {
  try {
    const { data, error } = await expenseGroupService.addExpenseToExpenseGroup(
      req.body,
    );

    if (error) return next(error);

    return res.status(200).send({ data });
  } catch (error) {
    return next(error);
  }
};
