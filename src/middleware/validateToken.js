import { setErrorResponse } from '../helpers/response';
import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send(setErrorResponse({ message: 'Not Authorized' }, 401));
    return;
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res
        .status(401)
        .send(setErrorResponse({ message: 'Not Authorized' }, 401));
    } else {
      next();
    }
  });
};
