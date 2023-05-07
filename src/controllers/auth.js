import jwt from 'jsonwebtoken';
import { setErrorResponse } from '../helpers/response';
import * as auth from '../models/auth';

export const authenticateUser = (req, res) => {
  const { username, password } = req.body;
};
