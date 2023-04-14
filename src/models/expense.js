import { pool } from '../db';

export const expense = {
  getAll: async () => {
    return await pool.query('SELECT * FROM expense');
  },
  getOne: (id) => {
    return pool.query(`SELECT * FROM expense WHERE expense_id = ${id}`);
  },
};
