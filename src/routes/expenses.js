import { Router } from 'express';
import * as expense from '../controllers/expenses';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { expenseSchema } from '../schemas/expenses';

const router = Router();

router.get('/', expense.getAllExpenses);
router.post('/', validateRequestBody(expenseSchema), expense.createExpense);
router.get('/:expenseId', expense.getExpenseById);
router.patch(
  '/:expenseId',
  validateRequestBody(expenseSchema),
  expense.updateExpense,
);
router.delete('/:expenseId', expense.deleteExpense);

export default router;
