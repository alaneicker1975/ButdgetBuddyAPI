import * as user from '../models/user';

export const createUser = async (req, res, next) => {
  const { body } = req;
  const { data, error } = await user.createUser(body);

  if (error) return next(error);

  res.status(201).send({ data });
};

export const updateUser = async (req, res, next) => {
  const { body } = req;
  const { data, error } = await user.updateUser(body);

  if (error) return next(error);

  res.status(201).send({ data });
};

export const deleteUser = async (req, res, next) => {
  const { userAccountId } = req.params;
  const { data, error } = await user.deleteUser(userAccountId);

  if (error) return next(error);

  res.status(201).send({ data });
};
