import jwt from 'jsonwebtoken';
import * as authService from '../services/auth';

export const authenticateUser = async (req, res, next) => {
  try {
    const { data, error } = await authService.authenticateUser(req.body);

    if (error) return next(error);

    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    return res
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .send({ data });
  } catch (error) {
    return next(error);
  }
};
