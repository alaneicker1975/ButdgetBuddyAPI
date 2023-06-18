import { pool } from '../database';
import { getUserAccountId } from '../helpers/auth';
import { createError } from '../helpers/error';

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
    const { rows } = await pool.query(
      `SELECT * 
       FROM expense_group
       WHERE expense_group_id = $1`,
      [expenseGroupId],
    );

    return { data: rows[0] };
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

    const { rows } = await pool.query(
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

    return { data: { createdId: rows[0].expense_group_id } };
  } catch (error) {
    return { error };
  }
};

export const deleteExpenseGroupById = async (expenseGroupId) => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM expense_group
       WHERE expense_group_id = $1
       RETURNING expense_group_id`,
      [expenseGroupId],
    );

    return { data: { deletedId: rows[0].expense_group_id } };
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

    const { rows: existingExpense } = await pool.query(
      `SELECT expense_id 
       FROM expense
       WHERE LOWER(name) = $1`,
      [name.toLowerCase()],
    );

    if (existingExpense.length === 0) {
      const { rows: newExpense } = await pool.query(
        `INSERT INTO expense (name)
         VALUES ($1)
         RETURNING expense_id`,
        [name],
      );

      expenseId = newExpense[0].expense_id;
    } else {
      expenseId = existingExpense[0].expense_id;

      const { rows: existingExpenseGroupExpense } = await pool.query(
        `SELECT expense_group_id
         FROM expense_group_expense
         WHERE expense_group_id = $1
         AND expense_id = $2`,
        [expenseGroupId, expenseId],
      );

      if (existingExpenseGroupExpense.length !== 0) {
        throw createError(409, `${name} already exists`);
      }
    }

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
