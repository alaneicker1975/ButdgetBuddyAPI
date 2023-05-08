import jwt from 'jsonwebtoken';
import { setErrorResponse } from '../helpers/response';
import { createError } from '../helpers/error';

export const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError(401));
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return next(createError(401));
  }
};
