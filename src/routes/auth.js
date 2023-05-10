import { Router } from 'express';
import * as auth from '../controllers/auth';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { userSchema } from '../schemas/user';

const router = Router();

/**
 * @swagger
 *  components:
 *    schema:
 *      authRequestBody:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *          password:
 *            type: string
 *      authSuccessResponse:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *      authErrorResponse:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *              message:
 *                type: string
 *
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
 *             $ref: '#components/schema/authRequestBody'
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/authSuccessResponse'
 *      '401':
 *        description: Not authorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/authErrorResponse'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/authErrorResponse'
 */
router.post('/', validateRequestBody(userSchema), auth.authenticateUser);

export default router;
