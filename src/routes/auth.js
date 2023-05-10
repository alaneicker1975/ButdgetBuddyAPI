import { Router } from 'express';
import * as auth from '../controllers/auth';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { userSchema } from '../schemas/user';

const router = Router();

/**
 * @swagger
 * /auth:
 *  post:
 *    tags:
 *      - auth
 *    summary: Creates an new user
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', validateRequestBody(userSchema), auth.authenticateUser);

export default router;
