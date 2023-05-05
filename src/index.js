import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import './db';
import * as routes from './routes';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(
  `${process.env.BASE_URL}/api-docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument),
);
app.use(`${process.env.BASE_URL}/expense`, routes.expense);

app.listen(port, () => console.log('Server running on port', port));
