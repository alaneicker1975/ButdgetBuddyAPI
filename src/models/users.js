import bcrypt from 'bcrypt';
import { pool } from '../db';
import { createError } from '../helpers/error';
import { hashPassword } from '../helpers/password';

// bcrypt.hash('qawsed44', 12, function (err, hash) {
//   console.log(hash);
// });

export const createUser = async (body) => {
  try {
    const { email, username, password } = body;
    const hashedPassword = await hashPassword(password);

    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    const { rows } = await pool.query(
      `INSERT INTO user_account (user_account_id, username, password, email)
       VALUES (uuid_generate_v4(), $1, $2, $3)
       RETURNING user_account_id`,
      [username, hashedPassword, email],
    );

    return { data: { created_id: rows[0].user_account_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const updateUser = async (userAccountId, body) => {
  try {
    console.log(await hashPassword('qawsed44'));
    const { oldPassword, newPassword } = body;

    const { rows: user } = await pool.query(
      `SELECT password
       FROM user_account
       WHERE user_account_id = '${userAccountId}'
    `,
    );

    const { password } = user[0];

    const isValidUser = await bcrypt.compare(oldPassword, password);

    if (!isValidUser) {
      throw createError(401);
    }

    const hashedPassword = await hashPassword(newPassword);

    const { rows: updatedUser } = await pool.query(
      `UPDATE user_account
       SET password = $1
       WHERE user_account_id = '${userAccountId}' 
       RETURNING user_account_id
      `,
      [hashedPassword],
    );

    return { data: { updated_id: updatedUser[0].user_account_id } };
  } catch (error) {
    error.status = error.status || 500;
    return { error };
  }
};

export const deleteUser = async (userAccountId) => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM user_account
       WHERE user_account_id = '${userAccountId}'
       RETURNING user_account_id`,
    );

    return { data: { deleted_id: rows[0].user_account_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};
