import { pool } from '../database';
import { getUserAccountId } from '../helpers/auth';
import { createError } from '../helpers/error';
import * as expenseService from '../services/expenses';

export const getExpenseGroupsByUserAccountId = async (token) => {
  const userAccountId = getUserAccountId(token);

  try {
    const { rows } = await pool.query(
      `SELECT * 
       FROM expense_group
       WHERE user_account_id = $1`,
      [userAccountId],
    );

    return { data: rows };
  } catch (error) {
    return { error };
  }
};

export const getExpensesByExpenseGroupId = async (expenseGroupId) => {
  try {
    const { rows } = await pool.query(
      `SELECT
        expense.*,
        expense_group_expense.balance,
        expense_group_expense.due_date,
        expense_group_expense.is_paid,
        expense_group_expense.note
      FROM expense
        INNER JOIN expense_group_expense
                ON expense.expense_id = expense_group_expense.expense_id
      WHERE expense_group_expense.expense_group_id = $1`,
      [expenseGroupId],
    );

    return { data: rows };
  } catch (error) {
    return { error };
  }
};

export const getExpenseGroupById = async (expenseGroupId) => {
  try {
    const {
      rows: [expense],
    } = await pool.query(
      `SELECT * 
       FROM expense_group
       WHERE expense_group_id = $1`,
      [expenseGroupId],
    );

    return { data: expense };
  } catch (error) {
    return { error };
  }
};

export const createExpenseGroup = async (
  { startDate, endDate, totalBudget },
  token,
) => {
  try {
    const userAccountId = getUserAccountId(token);

    const {
      rows: [expense],
    } = await pool.query(
      `INSERT INTO expense_group (
        user_account_id, 
        start_date, 
        end_date, 
        total_budget
      )
       VALUES ($1, $2, $3, $4)
       RETURNING expense_group_id`,
      [userAccountId, startDate, endDate, totalBudget],
    );

    return { data: { createdId: expense.expense_group_id } };
  } catch (error) {
    return { error };
  }
};

export const updateExpenseGroupById = (expenseGroupId) => {
  try {
  } catch (error) {
    return { error };
  }
};

export const deleteExpenseGroupById = async (expenseGroupId) => {
  try {
    const {
      rows: [expense],
    } = await pool.query(
      `DELETE FROM expense_group
       WHERE expense_group_id = $1
       RETURNING expense_group_id`,
      [expenseGroupId],
    );

    return { data: { deletedId: expense.expense_group_id } };
  } catch (error) {
    return { error };
  }
};

export const addExpenseToExpenseGroup = async ({
  name,
  expenseGroupId,
  balance,
  dueDate,
  isPaid = false,
  note = null,
}) => {
  try {
    let expenseId;

    // Check if expense already exists
    const {
      rows: [existingExpense],
    } = await pool.query(
      `SELECT expense_id 
       FROM expense
       WHERE LOWER(name) = $1`,
      [name.toLowerCase()],
    );

    // If the expense DOES NOT exist
    if (!existingExpense) {
      // automatically save as new expense
      const {
        rows: [newExpense],
      } = await pool.query(
        `INSERT INTO expense (name)
         VALUES ($1)
         RETURNING expense_id`,
        [name],
      );

      expenseId = newExpense.expense_id;
    }
    // If the expense DOES exist,
    else {
      expenseId = existingExpense.expense_id;

      // Check if expense already exists in expense group
      const {
        rows: [expenseGroupExpense],
      } = await pool.query(
        `SELECT exists 
          (SELECT 1 
            FROM expense_group_expense 
            WHERE expense_group_id = $1
            AND expense_id = $2
            LIMIT 1)`,
        [expenseGroupId, expenseId],
      );

      // If expense already exists in expense group, throw 409 error
      if (expenseGroupExpense.exists) {
        throw createError(409, `${name} already exists`);
      }
    }

    // If no errors, add expense to expense_group_expense table
    await pool.query(
      `INSERT INTO expense_group_expense (
        expense_id,
        expense_group_id,
        balance,
        due_date,
        is_paid,
        note
      ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [expenseId, expenseGroupId, balance, dueDate, isPaid, note],
    );

    return { data: { createdId: expenseId } };
  } catch (error) {
    return { error };
  }
};

export const updateExpenseGroupExpenseById = async (
  body,
  expenseGroupId,
  expenseId,
) => {
  try {
    const { name, balance, dueDate, isPaid, note } = body;

    const {
      rows: [expenseGroupExpense],
    } = await pool.query(
      `UPDATE expense_group_expense
       SET balance = $1,
           dueDate = $2,
           isPaid = $3,
           note = $4
       WHERE expense_group_id = $5
       AND expense_id = $6
       RETURNING expense_id`,
      [name, balance, dueDate, isPaid, note, expenseGroupId, expenseId],
    );

    await pool.query(
      `UPDATE expense
       SET name = $1
       WHERE expense_id = $2`,
      [name, expenseId],
    );

    return { data: { updatedId: expenseGroupExpense.expense_id } };
  } catch (error) {
    return { error };
  }
};

export const deleteExpenseFromExpenseGroupById = async (
  body,
  expenseGroupId,
  expenseId,
) => {
  try {
    // 1. Delete the expense record from the expense_group_expense table
    //      Expense name will persist in the expense table.
    // 2. Return deletedId
  } catch (error) {
    return { error };
  }
};
