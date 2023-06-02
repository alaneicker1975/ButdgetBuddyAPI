export const expenseGroupSchema = {
  type: 'Object',
  properties: {
    expense_group_id: { type: 'number' },
    user_account_id: { type: 'number' },
    start_date: { type: 'string' },
    end_date: { type: 'string' },
    total_budget: { type: 'number' },
  },
};
