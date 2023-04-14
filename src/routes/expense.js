import { Router } from 'express';
import * as expense from '../controllers/expense';

const router = Router();

router.get('/', expense.getAll);
router.get('/:id', expense.getOne);

export default router;
