import jwt from 'jsonwebtoken';
import { createError } from '../helpers/error';
import { getToken } from '../helpers/auth';

export const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError(401));
  }

  const token = getToken(req.headers);

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return next(createError(401));
  }
};
