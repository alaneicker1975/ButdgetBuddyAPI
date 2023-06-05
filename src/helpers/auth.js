import jwt from 'jsonwebtoken';

export const getUserAccountId = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET).user_account_id;
};
