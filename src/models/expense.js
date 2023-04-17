import { pool } from '../db';

export const getAll = async () => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * 
       FROM expense`,
    );
    return { data };
  } catch (error) {
    return { error };
  }
};

export const getOne = async (id) => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * 
       FROM expense 
       WHERE expense_id = ${id}`,
    );
    return { data };
  } catch (error) {
    return { error };
  }
};

export const insertOne = async (body) => {
  try {
    const { rowCount } = await pool.query(
      `INSERT INTO expense (name)
       VALUES ($1)`,
      Object.values(body),
    );
    return { data: { rowCount } };
  } catch (error) {
    return { error };
  }
};

export const deleteOne = async (id) => {
  try {
    const { rowCount } = await pool.query(
      `DELETE FROM expense
       WHERE expense_id = ${id}`,
    );
    return { data: { rowCount } };
  } catch (error) {
    return { error };
  }
};
