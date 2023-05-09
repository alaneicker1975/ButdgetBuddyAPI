import jwt from 'jsonwebtoken';
import * as auth from '../models/auth';

export const authenticateUser = async (req, res, next) => {
  const { user, error } = await auth.authenticateUser(req.body);

  if (error) return next(error);

  return res.status(200).send({
    data: {
      token: jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 3600,
      }),
    },
  });
};
