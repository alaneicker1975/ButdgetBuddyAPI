import { setErrorResponse } from '../helpers/response';
import jwt from 'jsonwebtoken';

export const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    const error = new Error();
    error.status = 401;
    return next(error);
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    const error = new Error();
    error.status = 401;
    return next(error);
  }
};
