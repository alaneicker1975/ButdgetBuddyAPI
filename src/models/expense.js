import { pool } from '../db';

export const getAll = async () => {
  try {
    const { rows: data } = await pool.query(`SELECT * FROM expense`);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const getOne = async (id) => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * FROM expense WHERE expense_id = ${id}`,
    );
    return { data };
  } catch (error) {
    return { error };
  }
};
