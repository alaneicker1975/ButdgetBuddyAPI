import bcrypt from 'bcrypt';
import { pool } from '../db';

export const authenticateUser = async (body) => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * 
       FROM user_account
       WHERE username = $1`,
      [body.username],
    );

    const { password, ...user } = data[0];

    const isValidUser = await bcrypt.compare(body.password, password);

    if (!isValidUser) {
      throw new Error();
    }

    return { user };
  } catch (error) {
    error.status = 401;
    return { error };
  }
};
