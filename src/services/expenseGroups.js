import { pool } from '../database';
import { setInsertPlaceholders, getValues } from '../helpers/query';
import { getUserAccountId } from '../helpers/auth';

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

export const createExpenseGroup = async (body, token) => {
  try {
    const userAccountId = getUserAccountId(token);
    const values = [userAccountId, ...getValues(body)];

    const { rows } = await pool.query(
      `INSERT INTO expense_group (user_account_id, start_date, end_date, total_budget)
       VALUES (${setInsertPlaceholders(values)})
       RETURNING expense_group_id`,
      values,
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

export const addExpenseToExpenseGroup = async (body) => {
  try {
    const { name, ...rest } = body;

    let expenseId;

    const { rows: foundExpense } = pool.query(
      `SELECT expense_id 
       FROM expense
       WHERE LOWER(name) = $1`,
      [name.toLowerCase()],
    );

    if (foundExpense.length === 0) {
      const { rows: newExpense } = await pool.query(
        `INSERT INTO expense (name)
         VALUES ($1)
         RETURNING expense_id`,
        [name],
      );

      expenseId = newExpense[0].expense_id;
    } else {
      expenseId = foundExpense[0].expense_id;
    }

    const values = [expenseId, ...getValues(rest)];

    await pool.query(
      `INSERT INTO expense_group_expense (
        expense_id,
        expense_group_id,
        balance,
        due_date,
        is_paid,
        note
      ) VALUES (${setInsertPlaceholders(values)})`,
      values,
    );

    return { data: { createdId: expenseId } };
  } catch (error) {
    return { error };
  }
};
