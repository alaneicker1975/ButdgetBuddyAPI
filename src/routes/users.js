import { Router } from 'express';
import * as user from '../controllers/users';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { userSchema, updateUserSchema } from '../schemas/user';

const router = Router();

router.post('/', validateRequestBody(userSchema), user.createUser);
router.patch(
  '/:userAccountId',
  validateRequestBody(updateUserSchema),
  user.updateUser,
);
router.delete('/:userAccountId', user.deleteUser);

export default router;
