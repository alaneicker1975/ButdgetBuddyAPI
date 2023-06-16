import jwt from 'jsonwebtoken';
import { createError } from '../helpers/error';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(createError(401));
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch {
    res.clearCookie('token');
    return next(createError(401));
  }
};
