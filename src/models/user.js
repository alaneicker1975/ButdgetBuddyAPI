import { pool } from '../db';
import { hashPassword } from '../helpers/password';

export const createUser = async (body) => {
  try {
    const { username, password: pswd, email } = body;

    const password = await hashPassword(pswd, 10);

    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    const { rows } = await pool.query(
      `INSERT INTO
          user_account (user_account_id, username, password, email)
        VALUES (uuid_generate_v4(), $1, $2, $3)
        RETURNING user_account_id`,
      [username, password, email],
    );

    return { data: { created_id: rows[0].user_account_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const updateUser = async (userId, body) => {
  // Updates a user
};

export const deleteUser = async (userId) => {
  // Deletes a user
};
