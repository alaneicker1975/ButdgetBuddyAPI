import * as userService from '../services/users';

export const createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { data, error } = await userService.createUser(body);

    if (error) return next(error);

    res.status(201).send({ data });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userAccountId } = req.params;
    const { body } = req;
    const { data, error } = await userService.updateUser(userAccountId, body);

    if (error) return next(error);

    res.status(201).send({ data });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userAccountId } = req.params;
    const { data, error } = await userService.deleteUser(userAccountId);

    if (error) return next(error);

    res.status(201).send({ data });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};
