const { migrate } = require('postgres-migrations');
require('dotenv').config();

const { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

(async () => {
  try {
    await migrate(
      {
        database: DB,
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: +DB_PORT,
        ensureDatabaseExists: true,
      },
      './migrations',
    );
    console.log('Migration completed');
  } catch (e) {
    console.log('Could not run migration: ', e.message);
  }
})();
