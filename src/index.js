import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import { validateToken } from './middleware/validateToken';
import swaggerJson from './docs/swagger.json';

import './db';
import * as routes from './routes';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

// API documentation
app.use(
  `${process.env.BASE_URL}/api-docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerJson),
);

// Adds token authorization requirement to the routes below
app.use('/', validateToken);

// Creates API Routes
['auth', 'user', 'expense'].forEach((endpoint) => {
  app.use(`${process.env.BASE_URL}/${endpoint}`, routes[endpoint]);
});

app.listen(port, () => console.log('Server running on port', port));
