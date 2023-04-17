import { Router } from 'express';
import * as expense from '../controllers/expense';

const router = Router();

router.get('/', expense.getAll);
router.get('/:id', expense.getOne);
router.post('/', expense.insertOne);
router.patch('/:id', expense.updateOne);
router.delete('/:id', expense.deleteOne);

export default router;
