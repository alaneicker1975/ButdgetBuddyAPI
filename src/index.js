import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import { validateToken } from './middleware/validateToken';
import swaggerDocument from './docs/swagger.json';

import './db';
import * as routes from './routes';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

// Swagger API documentation
app.use(
  `${process.env.BASE_URL}/api-docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument),
);

// Adds token authorization requirement to the routes below
app.use('/', validateToken);

// API Routes
app.use(`${process.env.BASE_URL}/auth`, routes.auth);
app.use(`${process.env.BASE_URL}/user`, routes.user);
app.use(`${process.env.BASE_URL}/expense`, routes.expense);
// app.use(`${process.env.BASE_URL}/expense-group`, routes.expenseGroup);

app.listen(port, () => console.log('Server running on port', port));
