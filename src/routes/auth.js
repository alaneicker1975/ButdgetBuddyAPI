import { Router } from 'express';
import * as auth from '../controllers/auth';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { verifyToken } from '../middleware/verifyToken';
import { authSchema } from '../schemas/auth';

const router = Router();

// Authenticate user
router.post('/', validateRequestBody(authSchema), auth.authenticateUser);

// Verify user token
router.get('/verify-token', verifyToken, (req, res) => {
  res.sendStatus(200);
});

// Logout user
router.get('/logout', (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

export default router;
