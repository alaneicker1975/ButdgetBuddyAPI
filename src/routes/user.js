import { Router } from 'express';
import * as user from '../controllers/user';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { userSchema } from '../schemas/user';

const router = Router();

// router.get('/:userId', user.getOne);
// router.post('/', validateRequestBody(userSchema), user.insertOne);
// router.patch('/:userId', validateRequestBody(userSchema), user.updateOne);
// router.delete('/:userId', user.deleteOne);

export default router;
