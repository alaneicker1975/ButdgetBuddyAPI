import dotenv from 'dotenv';
import { Client } from 'pg';
import { migrate } from 'postgres-migrations';

dotenv.config();

const { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const dbConfig = {
  database: DB,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: +DB_PORT,
};

export const client = new Client(dbConfig);

client.connect((err) => {
  if (err) {
    console.error('Erorr connecting to database', DB, err.stack);
  } else {
    console.log('Connected to database:', DB);
  }
});

(async () => {
  try {
    await migrate(
      { ...dbConfig, ensureDatabaseExists: true },
      './src/migrations',
    );
    console.log('Migration completed');
  } catch (e) {
    console.log('Could not run migration: ', e.message);
  }
})();
