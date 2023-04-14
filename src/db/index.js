import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

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

const runQuery = async (query) => {
  try {
    const { rows: data } = await pool.query(query);
    return { data };
  } catch (error) {
    return { error };
  }
};

export { runQuery, pool };
