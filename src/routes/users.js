import { Router } from 'express';
import * as user from '../controllers/user';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { userSchema } from '../schemas/user';

const router = Router();

router.post('/', validateRequestBody(userSchema), user.createUser);
router.patch(
  '/:userAccountId',
  validateRequestBody(userSchema),
  user.updateUser,
);
router.delete('/:userAccountId', user.deleteUser);

export default router;
