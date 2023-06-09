import { Router } from 'express';
import * as auth from '../controllers/auth';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { verifyToken } from '../middleware/verifyToken';
import { authSchema } from '../schemas/auth';

const router = Router();

router.post('/', validateRequestBody(authSchema), auth.authenticateUser);

router.get('/verify-token', verifyToken, (req, res) => {
  res.status(200).sendStatus(200);
});

router.get('/logout', (req, res) => {
  res.clearCookie('token').status(200).sendStatus(200);
});

export default router;
