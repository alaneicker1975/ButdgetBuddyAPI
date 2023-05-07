import { setErrorResponse } from '../helpers/response';
import jwt from 'jsonwebtoken';

export const validateToken = (token) => (req, res, next) => {
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err) => {
    if (err) {
      res.status(401).send(setErrorResponse(err.message, 401));
    } else {
      next();
    }
  });
};
