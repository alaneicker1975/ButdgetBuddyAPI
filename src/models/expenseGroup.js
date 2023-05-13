import { pool } from '../db';
import { setUpdatePlaceholders, getValues } from '../helpers/query';

export const getExpenseGroupById = async (expenseGroupId) => {
  try {
    const { rows: expenseGroup } = await pool.query(
      `SELECT * 
       FROM expense_group
       WHERE expense_group_id = ${expenseGroupId}`,
    );

    const { rows: expenses } = await pool.query(
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

    return {
      data: {
        ...expenseGroup[0],
        expenses,
      },
    };
  } catch (error) {
    error.status = 500;
    return { error };
  }
};
