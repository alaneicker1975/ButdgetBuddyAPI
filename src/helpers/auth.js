import jwt from 'jsonwebtoken';

export const getToken = (headers) => {
  if (headers.authorization) {
    return headers.authorization.split(' ')[1];
  }

  return null;
};

export const getUserAccountId = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET).user_account_id;
};
