import { Router } from 'express';
import * as expense from '../controllers/expense';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { expenseSchema } from '../schemas/expenses';

const router = Router();

router.get('/', expense.getAll);
router.post('/', validateRequestBody(expenseSchema), expense.insertOne);
router.get('/:expenseId', expense.getOne);
router.patch(
  '/:expenseId',
  validateRequestBody(expenseSchema),
  expense.updateOne,
);
router.delete('/:expenseId', expense.deleteOne);

export default router;
