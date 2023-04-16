import { pool } from '../db';

class Base {
  constructor(table) {
    this.pool = pool;
    this.table = table;
  }

  setColumns(cols) {
    return !cols ? '*' : cols.join(', ');
  }

  async getAll(cols) {
    try {
      const { rows: data } = await this.pool.query(
        `SELECT ${this.setColumns(cols)} 
         FROM ${this.table}`,
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  async getOne(id, cols) {
    try {
      const { rows: data } = await this.pool.query(
        `SELECT ${this.setColumns(cols)} 
         FROM ${this.table} 
         WHERE expense_id = ${id}`,
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }
}

export default Base;
