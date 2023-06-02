import jwt from 'jsonwebtoken';
import * as authService from '../services/auth';

export const authenticateUser = async (req, res, next) => {
  try {
    const { data, error } = await authService.authenticateUser(req.body);

    if (error) return next(error);

    return res.status(200).send({
      data: {
        token: jwt.sign(data, process.env.JWT_SECRET, {
          expiresIn: 3600,
        }),
      },
    });
  } catch (error) {
    return next(error);
  }
};
