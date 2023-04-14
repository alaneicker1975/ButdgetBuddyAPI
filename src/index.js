import express from 'express';
import cors from 'cors';
import './db';
import { expense } from './routes';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(`${process.env.BASE_URL}/expense`, expense);

app.listen(port, () => console.log('Server running on port', port));
