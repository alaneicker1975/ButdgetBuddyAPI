import jwt from 'jsonwebtoken';
import { setErrorResponse } from '../helpers/response';
import * as auth from '../models/auth';

const loginError = 'Username or password is incorrect';

export const authenticateUser = async (req, res) => {
  try {
    const { user, error } = await auth.authenticateUser(req.body);
    const status = error?.status || 200;

    res.status(status).send(
      error
        ? setErrorResponse(error, status)
        : {
            data: {
              token: jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: 1800,
              }),
            },
          },
    );
  } catch (error) {
    res.status(500).send(setErrorResponse({ message: loginError }, 500));
  }
};
