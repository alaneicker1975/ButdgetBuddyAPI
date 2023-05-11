import { Router } from 'express';
import * as auth from '../controllers/auth';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { userSchema } from '../schemas/user';

const router = Router();

router.post('/', validateRequestBody(userSchema), auth.authenticateUser);

export default router;
