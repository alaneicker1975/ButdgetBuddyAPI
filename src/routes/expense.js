import { Router } from 'express';
import * as expense from '../controllers/expense';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { expenseSchema } from '../schemas/expenses';

const router = Router();

router.get('/', expense.getAll);
router.get('/:expenseId', expense.getOne);
router.post('/', validateRequestBody(expenseSchema), expense.insertOne);
router.patch('/:expenseId', expense.updateOne);
router.delete('/:expenseId', expense.deleteOne);

export default router;
