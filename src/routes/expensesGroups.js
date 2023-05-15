import { Router } from 'express';
import * as expenseGroup from '../controllers/expensesGroup';
import { validateRequestBody } from '../middleware/validateRequestBody';
// import { expenseGroupSchema } from '../schemas/user';

const router = Router();

router.get('/:userAccountId', expenseGroup.getExpenseGroupsByUserAccountId);
router.get(
  '/:userAccountId/expenses/:expenseGroupId',
  expenseGroup.getExpensesByExpenseGroupId,
);

export default router;
