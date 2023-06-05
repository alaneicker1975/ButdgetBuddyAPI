import jwt from 'jsonwebtoken';
import { createError } from '../helpers/error';

export const validateToken = async (req, res, next) => {
  try {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    return next();
  } catch {
    return next(createError(401));
  }
};
