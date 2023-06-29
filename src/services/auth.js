import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../database';
import { createError } from '../helpers/error';

export const authenticateUser = async (body) => {
  try {
    const {
      rows: [foundUser],
    } = await pool.query(
      `SELECT * 
       FROM user_account
       WHERE username = $1`,
      [body.username],
    );

    if (!foundUser) {
      throw createError(401);
    }

    const { password, ...user } = foundUser;

    const isValidUser = await bcrypt.compare(body.password, password);

    if (!isValidUser) {
      throw createError(401);
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '30m',
    });

    return { token, user };
  } catch (error) {
    return { error };
  }
};
