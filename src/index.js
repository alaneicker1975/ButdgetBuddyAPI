import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { validateToken } from './middleware/validateToken';
import { setErrorResponse } from './helpers/response';
import { ERRORS } from './constants/errors';

import './db';
import * as routes from './routes';

const app = express();
const port = process.env.PORT || 9000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'BudgetBuddy API',
      description: 'Budget Buddy API powered by Node.js and PosgreSQL.',
      contact: {
        name: 'Alan Eicker',
      },
      servers: ['http://localhost:9000'],
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

// API documentation
app.use(
  `${process.env.BASE_URL}/api-docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs),
);

// Auth route
app.use(`${process.env.BASE_URL}/auth`, routes.auth);

// Creates API routes
['user', 'expense'].forEach((endpoint) => {
  app.use(
    `${process.env.BASE_URL}/${endpoint}`,
    validateToken,
    routes[endpoint],
  );
});

// Catches arrors and returns response with error
app.use((err, req, res, next) => {
  if (!err) {
    return next();
  }

  const status = err.status;

  res
    .status(status)
    .send(setErrorResponse(err.message || ERRORS[status], status));
});

app.listen(port, () => console.log('Server running on port', port));
