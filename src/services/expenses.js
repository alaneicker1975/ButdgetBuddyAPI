import { pool } from '../database';

export const getAllExpenses = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT * 
       FROM expense
       ORDER BY name`,
    );

    return { data: rows };
  } catch (error) {
    return { error };
  }
};

export const getExpenseById = async (expenseId) => {
  try {
    const { rows } = await pool.query(
      `SELECT * 
       FROM expense 
       WHERE expense_id = $1`,
      [expenseId],
    );

    console.log(rows);

    return { data: rows };
  } catch (error) {
    return { error };
  }
};

export const createExpense = async (body) => {
  try {
    const { name } = body;

    const { rows } = await pool.query(
      `INSERT INTO expense (name)
       VALUES ($1)
       RETURNING expense_id`,
      [name],
    );

    return { data: { createdId: rows[0].expense_id } };
  } catch (error) {
    return { error };
  }
};

export const updateExpense = async (expenseId, body) => {
  try {
    const { name } = body;

    const { rows } = await pool.query(
      `UPDATE expense
       SET name = $1
       WHERE expense_id = $2
       RETURNING expense_id`,
      [name, expenseId],
    );

    return { data: { updatedId: rows[0].expense_id } };
  } catch (error) {
    return { error };
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM expense
       WHERE expense_id = $1
       RETURNING expense_id`,
      [expenseId],
    );

    return { data: { deletedId: rows[0].expense_id } };
  } catch (error) {
    return { error };
  }
};
