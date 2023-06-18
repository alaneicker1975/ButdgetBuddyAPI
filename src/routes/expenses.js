import { Router } from 'express';
import * as expense from '../controllers/expenses';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { expenseSchema } from '../schemas/expenses';

const router = Router();

// Gets all expenses
router.get('/', expense.getAllExpenses);

// Creates an expense
router.post('/', validateRequestBody(expenseSchema), expense.createExpense);

// Gets an expense by Id
router.get('/:expenseId', expense.getExpenseById);

// Updates an expense
router.patch(
  '/:expenseId',
  validateRequestBody(expenseSchema),
  expense.updateExpense,
);

// Deletes and expense
router.delete('/:expenseId', expense.deleteExpense);

export default router;
