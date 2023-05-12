// Query to get Expenses related to expense group

// SELECT expense.*, expense_group.*
// FROM expense
// INNER JOIN expense_group_expense
// ON expense.expense_id = expense_group_expense.expense_id
// INNER JOIN expense_group
// ON expense_group_expense.expense_group_id = expense_group.expense_group_id
// WHERE expense_group_expense.expense_group_id = 1
