import jwt from 'jsonwebtoken';
import { createError } from '../helpers/error';

export const validateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(createError(401));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch {
    return next(createError(401));
  }
};
