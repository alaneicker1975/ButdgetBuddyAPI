import { pool } from '../database';
import { setInsertPlaceholders, getValues } from '../helpers/query';
import { getUserAccountId } from '../helpers/auth';

export const getExpenseGroupsByUserAccountId = async (token) => {
  const userAccountId = getUserAccountId(token);

  try {
    const { rows } = await pool.query(
      `SELECT * 
       FROM expense_group
       WHERE user_account_id = '${userAccountId}'`,
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
      WHERE expense_group_expense.expense_group_id = ${expenseGroupId}`,
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
       WHERE expense_group_id = '${expenseGroupId}'`,
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

    return { data: { created_id: rows[0].expense_group_id } };
  } catch (error) {
    return { error };
  }
};

export const deleteExpenseGroupById = async (expenseGroupId) => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM expense_group
       WHERE expense_group_id = '${expenseGroupId}'
       RETURNING expense_group_id`,
    );

    return { data: { deleted_id: rows[0].expense_group_id } };
  } catch (error) {
    return { error };
  }
};

export const addExpenseToExpenseGroup = async (body, userAccountId) => {
  // To complete this request we need:
  //
  // 1. request body for expense.
  // 2. expense_group_id the expense will belong to.
  //
  // STEPS
  // 1. Check if expense defined in request body is new or existing.
  //      1a. An existing expense will contain the expense_id in the request body.
  // 2. If new expense:
  //      2a. Add the expense to expense table and return the new expense_id.
  //      2b. Add the expense to expense_group_expense table along with
  //          the expense_id and expense_group_id.
  // 3. If existing expense:
  //      3a. just update the expense_group_expense table.
  // 4. If successful return the expense_id of the new expense.
  // 5. If error, return the error.
};
