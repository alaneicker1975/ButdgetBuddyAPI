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
 *    summary: Authenticates a user
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Not authorized
 *      '500':
 *        description: Internal server error
 */
router.post('/', validateRequestBody(userSchema), auth.authenticateUser);

export default router;
