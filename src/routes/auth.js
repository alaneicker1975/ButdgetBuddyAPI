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
 *      successResponse:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *      errorResponse:
 *        type: object
 *        properties:
 *          error:
 *            type: object
 *            properties:
 *              code:
 *                type: integer
 *              message:
 *                type: string
 */

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
 *             $ref: '#components/schema/authRequestBody'
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/successResponse'
 *      '401':
 *        description: Not authorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/errorResponse'
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/errorResponse'
 */
router.post('/', validateRequestBody(userSchema), auth.authenticateUser);

export default router;
