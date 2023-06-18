import { Router } from 'express';
import * as user from '../controllers/users';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { userSchema, updateUserSchema } from '../schemas/user';

const router = Router();

// Creates a user
router.post('/', validateRequestBody(userSchema), user.createUser);

// Updates a user
router.patch(
  '/:userAccountId',
  validateRequestBody(updateUserSchema),
  user.updateUser,
);

// Deletes a user
router.delete('/:userAccountId', user.deleteUser);

export default router;
