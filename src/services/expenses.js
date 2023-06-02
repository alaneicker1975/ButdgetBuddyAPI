import { pool } from '../db';
import { setUpdatePlaceholders, getValues } from '../helpers/query';

export const getAllExpenses = async () => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * 
       FROM expense
       ORDER BY name`,
    );

    return { data };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const getExpenseById = async (expenseId) => {
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

export const createExpense = async (body) => {
  try {
    const { data } = await pool.query(
      `INSERT INTO expense (name)
       VALUES ($1)
       RETURNING expense_id`,
      getValues(body),
    );

    return { data: { created_id: data[0].expense_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const updateExpense = async (expenseId, body) => {
  try {
    const { data } = await pool.query(
      `UPDATE expense
       SET ${setUpdatePlaceholders(body)}
       WHERE expense_id = ${expenseId}
       RETURNING expense_id`,
      getValues(body),
    );

    return { data: { updated_id: data[0].expense_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const { data } = await pool.query(
      `DELETE FROM expense
       WHERE expense_id = ${expenseId}
       RETURNING expense_id`,
    );

    return { data: { deleted_id: data[0].expense_id } };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};
