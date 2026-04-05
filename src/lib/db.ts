import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : false,
});

export async function query(text: string, params?: unknown[]) {
  const res = await pool.query(text, params);
  return res;
}
