import { Router } from 'express';
import * as expenseGroup from '../controllers/expenseGroups';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { expenseGroupSchema } from '../schemas/expenseGroups';

const router = Router();

// Gets all expense groups
router.get('/', expenseGroup.getExpenseGroupsByUserAccountId);

// Creates a new expense group associated with user id
router.post(
  '/',
  validateRequestBody(expenseGroupSchema),
  expenseGroup.createExpenseGroup,
);

// Gets one expense group associated with user id
router.get('/:expenseGroupId', expenseGroup.getExpenseGroupById);

// Updates one expense group associated with user id
router.patch(
  '/:expenseGroupId',
  validateRequestBody(expenseGroupSchema),
  expenseGroup.updateExpenseGroupById,
);

// Deletes one expense group associated with user id
router.delete('/:expenseGroupId', expenseGroup.deleteExpenseGroupById);

// Gets all expenses associated with an expense group id
router.get(
  '/:expenseGroupId/expenses',
  expenseGroup.getExpensesByExpenseGroupId,
);

export default router;
