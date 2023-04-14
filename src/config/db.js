import dotenv from 'dotenv';

dotenv.config();

const { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

export const dbConfig = {
  database: DB,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: +DB_PORT,
  ensureDatabaseExists: true,
};
