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
    const {
      rows: [expense],
    } = await pool.query(
      `SELECT * 
       FROM expense 
       WHERE expense_id = $1`,
      [expenseId],
    );

    return { data: expense };
  } catch (error) {
    return { error };
  }
};

export const createExpense = async (body) => {
  try {
    const { name } = body;

    const {
      rows: [expense],
    } = await pool.query(
      `INSERT INTO expense (name)
       VALUES ($1)
       RETURNING expense_id`,
      [name],
    );

    return { data: { createdId: expense.expense_id } };
  } catch (error) {
    return { error };
  }
};

export const updateExpense = async (expenseId, body) => {
  try {
    const { name } = body;

    const {
      rows: [expense],
    } = await pool.query(
      `UPDATE expense
       SET name = $1
       WHERE expense_id = $2
       RETURNING expense_id`,
      [name, expenseId],
    );

    return { data: { updatedId: expense.expense_id } };
  } catch (error) {
    return { error };
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const {
      rows: [expense],
    } = await pool.query(
      `DELETE FROM expense
       WHERE expense_id = $1
       RETURNING expense_id`,
      [expenseId],
    );

    return { data: { deletedId: expense.expense_id } };
  } catch (error) {
    return { error };
  }
};
