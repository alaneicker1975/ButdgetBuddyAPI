import { setErrorResponse } from '../helpers/response';
import jwt from 'jsonwebtoken';
import { NOT_AUTHORIZED } from '../constants/errors';

export const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send(setErrorResponse({ message: NOT_AUTHORIZED }, 401));
    return;
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).send(setErrorResponse({ message: NOT_AUTHORIZED }, 401));
  }
};
