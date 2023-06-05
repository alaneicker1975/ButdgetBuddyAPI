import { Router } from 'express';
import * as auth from '../controllers/auth';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { validateToken } from '../middleware/validateToken';
import { authSchema } from '../schemas/auth';

const router = Router();

router.post('/', validateRequestBody(authSchema), auth.authenticateUser);

router.get('/verify-token', validateToken, (req, res) => {
  res.sendStatus(200);
});

export default router;
