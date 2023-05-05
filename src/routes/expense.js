import { Router } from 'express';
import * as expense from '../controllers/expense';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { expenseSchema } from '../schemas/expenses';

const router = Router();

router.get('/', expense.getAll);
router.get('/:id', expense.getOne);
router.post('/', validateRequestBody(expenseSchema), expense.insertOne);
router.patch('/:id', expense.updateOne);
router.delete('/:id', expense.deleteOne);

export default router;
