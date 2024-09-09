import pool from '../db.js';

const createTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        date DATE,
        shiftNumber VARCHAR(10),
        entryTime TIME,
        exitTime TIME,
        issues TEXT,
        remarks TEXT,
        selectedEmployees JSONB
      );
    `);
  } finally {
    client.release();
  }
};

const saveLog = async (logData) => {
  const { date, shiftNumber, entryTime, exitTime, issues, remarks, selectedEmployees } = logData;
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO logs (date, shiftNumber, entryTime, exitTime, issues, remarks, selectedEmployees)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [date, shiftNumber, entryTime, exitTime, issues, remarks, JSON.stringify(selectedEmployees)]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

const getLatestLog = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM logs ORDER BY id DESC LIMIT 1');
    return result.rows[0];
  } finally {
    client.release();
  }
};

export { createTable, saveLog, getLatestLog };
