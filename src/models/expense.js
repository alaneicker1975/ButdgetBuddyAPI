import { pool } from '../db';
import { setUpdatePlaceholders, getValues } from '../helpers/query';

export const getAll = async () => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * 
       FROM expense`,
    );
    return { data };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const getOne = async (expenseId) => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * 
       FROM expense 
       WHERE expense_id = ${expenseId}`,
    );
    return { data };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const insertOne = async (body) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO expense (name)
       VALUES ($1)
       RETURNING expense_id`,
      getValues(body),
    );
    return { data: { created_id: rows[0].expense_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const updateOne = async (expenseId, body) => {
  try {
    const { rows } = await pool.query(
      `UPDATE expense
       SET ${setUpdatePlaceholders(body)}
       WHERE expense_id = ${expenseId}
       RETURNING expense_id`,
      getValues(body),
    );

    return { data: { updated_id: rows[0].expense_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const deleteOne = async (expenseId) => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM expense
       WHERE expense_id = ${expenseId}
       RETURNING expense_id`,
    );
    return { data: { deleted_id: rows[0].expense_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};
