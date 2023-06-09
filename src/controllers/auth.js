import * as authService from '../services/auth';

export const authenticateUser = async (req, res, next) => {
  try {
    const { token, user, error } = await authService.authenticateUser(req.body);

    if (error) return next(error);

    return res
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .send({ data: user });
  } catch (error) {
    return next(error);
  }
};
