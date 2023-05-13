import dotenv from 'dotenv';
import { Pool, types } from 'pg';

dotenv.config();

// PostgreSQL DECIMAL/NUMERIC data types get returned as
// strings. This converts the returned value to a number.
types.setTypeParser(1700, (val) => {
  return parseFloat(val);
});

const pool = new Pool({
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.log('Could not connect to database');
  } else {
    console.log('Connected to database');
  }
});

export { pool };
