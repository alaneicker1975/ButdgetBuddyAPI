import { Router } from 'express';
import * as auth from '../controllers/auth';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { authSchema } from '../schemas/auth';

const router = Router();

router.post('/', validateRequestBody(authSchema), auth.authenticateUser);

export default router;
