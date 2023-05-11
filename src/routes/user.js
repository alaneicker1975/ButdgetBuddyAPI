import { Router } from 'express';
import * as user from '../controllers/user';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { userSchema } from '../schemas/user';

const router = Router();

/**
 * @swagger
 *  components:
 *    schema:
 *      requestBody:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *          password:
 *            type: string
 *          email:
 *            type: string
 *      postSuccessResponse:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              created_id:
 *                type: integer
 *      patchSuccessResponse:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              updated_id:
 *                type: integer
 *      deleteSuccessResponse:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              deleted_id:
 *                type: integer
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
 *
 * @swagger
 * /user:
 *  post:
 *    tags:
 *      - user
 *    summary: Creates a new user
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/requestBody'
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/postSuccessResponse'
 *      '401':
 *        description: Not Authorized
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
router.post('/', validateRequestBody(userSchema), user.insertOne);

/**
 * @swagger
 * /user/{userId}:
 *  patch:
 *    tags:
 *      - user
 *    summary: Updates a user
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/requestBody'
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/patchSuccessResponse'
 *      '401':
 *        description: Not Authorized
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
router.patch('/:userId', validateRequestBody(userSchema), user.updateOne);

/**
 * @swagger
 * /user/{userId}:
 *  delete:
 *    tags:
 *      - user
 *    summary: Deletes a user
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/deleteSuccessResponse'
 *      '401':
 *        description: Not Authorized
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
router.delete('/:userId', user.deleteOne);

export default router;
