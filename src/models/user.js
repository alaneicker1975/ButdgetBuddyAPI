import { pool } from '../db';
import { hashPassword } from '../helpers/password';

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

export const updateUser = async (body) => {
  const { username, oldPassword, newPassword } = body;

  // 1. Query user_account table and find user by username
  // 2. validate user-provided old password vs stored password
  // 3. If passwords match, encrypt and update record with new password
  // 3a. Return 200 with updated_id
  // 4. If passwords match, return 401
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
