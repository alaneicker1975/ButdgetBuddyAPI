import { Router } from 'express';
import * as expenseGroup from '../controllers/expenseGroups';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { expenseGroupSchema } from '../schemas/expenseGroups';

const router = Router();

// Gets all expense groups
router.get('/:userAccountId', expenseGroup.getExpenseGroupsByUserAccountId);

// Creates a new expense group associated with user id
router.post(
  '/:userAccountId',
  validateRequestBody(expenseGroupSchema),
  expenseGroup.createExpenseGroup,
);

// Gets one expense group associated with user id
router.get(
  '/:userAccountId/group/:expenseGroupId',
  expenseGroup.getExpenseGroupById,
);

// Updates one expense group associated with user id
router.patch(
  '/:userAccountId/group/:expenseGroupId',
  validateRequestBody(expenseGroupSchema),
  expenseGroup.updateExpenseGroupById,
);

// Deletes one expense group associated with user id
router.delete(
  '/:userAccountId/group/:expenseGroupId',
  expenseGroup.deleteExpenseGroupById,
);

// Gets all expenses associated with an expense group id
router.get(
  '/:userAccountId/group/:expenseGroupId/expenses',
  expenseGroup.getExpensesByExpenseGroupId,
);

export default router;
