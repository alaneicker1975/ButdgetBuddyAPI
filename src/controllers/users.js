import * as userService from '../services/users';

export const createUser = async (req, res, next) => {
  const { body } = req;
  const { data, error } = await userService.createUser(body);

  if (error) return next(error);

  res.status(201).send({ data });
};

export const updateUser = async (req, res, next) => {
  const { userAccountId } = req.params;
  const { body } = req;
  const { data, error } = await userService.updateUser(userAccountId, body);

  if (error) return next(error);

  res.status(201).send({ data });
};

export const deleteUser = async (req, res, next) => {
  const { userAccountId } = req.params;
  const { data, error } = await userService.deleteUser(userAccountId);

  if (error) return next(error);

  res.status(201).send({ data });
};
