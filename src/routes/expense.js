import { Router } from 'express';
import * as expense from '../controllers/expense';
import { validateRequestBody } from '../middleware/validateRequestBody';
import { expenseSchema } from '../schemas/expenses';

const router = Router();

/**
 * @swagger
 * /expense:
 *  get:
 *    tags:
 *      - expense
 *    summary: Gets a list of expenses
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Not Authorized
 *      '500':
 *        description: Internal server error
 */
router.get('/', expense.getAll);

/**
 * @swagger
 * /expense:
 *  post:
 *    tags:
 *      - expense
 *    summary: Creates an new expense
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', validateRequestBody(expenseSchema), expense.insertOne);

/**
 * @swagger
 * /expense/{expenseId}:
 *  get:
 *    tags:
 *      - expense
 *    summary: gets an expense by ID
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:expenseId', expense.getOne);

/**
 * @swagger
 * /expense/{expenseId}:
 *  patch:
 *    tags:
 *      - expense
 *    summary: Updates an expense
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.patch(
  '/:expenseId',
  validateRequestBody(expenseSchema),
  expense.updateOne,
);

/**
 * @swagger
 * /expense/{expenseId}:
 *  delete:
 *    tags:
 *      - expense
 *    summary: Deletes an expense
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:expenseId', expense.deleteOne);

export default router;
