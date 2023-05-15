import { Router } from 'express';
import * as expenseGroup from '../controllers/expenseGroup';
import { validateRequestBody } from '../middleware/validateRequestBody';
// import { expenseGroupSchema } from '../schemas/user';

const router = Router();

router.get('/:userAccountId', expenseGroup.getExpenseGroupsByUserAccountId);
router.get(
  '/:expenseGroupId/expenses',
  expenseGroup.getExpensesByExpenseGroupId,
);

export default router;
