import { pool } from '../db';
import { setColumnPlaceholders } from '../helpers/query';

export const getAll = async () => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * 
       FROM expense`,
    );
    return { data, status: 200 };
  } catch (error) {
    return { error, status: 500 };
  }
};

export const getOne = async (id) => {
  try {
    const { rows: data } = await pool.query(
      `SELECT * 
       FROM expense 
       WHERE expense_id = ${id}`,
    );
    return { data, status: 200 };
  } catch (error) {
    return { error, status: 500 };
  }
};

export const insertOne = async (body) => {
  try {
    const { rowCount } = await pool.query(
      `INSERT INTO expense (name)
       VALUES ($1)`,
      Object.values(body),
    );
    return { data: { rowCount }, status: 201 };
  } catch (error) {
    return { error, status: 500 };
  }
};

export const updateOne = async (id, body) => {
  try {
    const { rowCount } = await pool.query(
      `UPDATE expense
       SET ${setColumnPlaceholders(body)}
       WHERE expense_id = ${id}`,
      Object.values(body),
    );

    return { data: { rowCount }, status: 200 };
  } catch (error) {
    return { error, status: 500 };
  }
};

export const deleteOne = async (id) => {
  try {
    const { rowCount } = await pool.query(
      `DELETE FROM expense
       WHERE expense_id = ${id}`,
    );
    return { data: { rowCount }, status: 200 };
  } catch (error) {
    return { error, status: 500 };
  }
};
