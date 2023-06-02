import * as expenseGroupService from '../services/expenseGroups';
import { getToken } from '../helpers/auth';

export const getExpenseGroupsByUserAccountId = async (req, res, next) => {
  try {
    const { userAccountId } = req.params;

    const { data, error } =
      await expenseGroupService.getExpenseGroupsByUserAccountId(userAccountId);

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
    const { body, headers } = req;
    const token = getToken(headers);
    const { error, data } = await expenseGroupService.createExpenseGroup(
      body,
      token,
    );

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
  const { expenseGroupId } = req.params;

  // const { data, error } = await expenseGroupService.getExpenseGroupById(
  //   expenseGroupId,
  // );

  // if (error) return next(error);

  // return res.status(200).send({ data });
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
