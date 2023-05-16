import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import './db';
import { swaggerOptions } from './configs/swagger';
import { validateToken } from './middleware/validateToken';
import { setErrorResponse } from './helpers/response';
import { toKebabCase } from './helpers/string';
import { ERRORS } from './constants/errors';
import { nonSecureRoutes, secureRoutes } from './routes';

const app = express();
const port = process.env.PORT || 9000;
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

console.log(process.env.NODE_ENV);

// API documentation
if (process.env.NODE_ENV === 'development') {
  app.use(
    `${process.env.BASE_URL}/api-docs`,
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs),
  );
}

// Creates non-secure API routes
Object.keys(nonSecureRoutes).forEach((route) => {
  app.use(
    `${process.env.BASE_URL}/${toKebabCase(route)}`,
    nonSecureRoutes[route],
  );
});

// Creates Secure API routes
Object.keys(secureRoutes).forEach((route) => {
  app.use(
    `${process.env.BASE_URL}/${toKebabCase(route)}`,
    validateToken,
    secureRoutes[route],
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
