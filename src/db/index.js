import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const pool = new Pool({
  database: DB,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: +DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error('Erorr connecting to database', DB, err.stack);
  } else {
    console.log('Connected to database:', DB);
  }
});

export { pool };
