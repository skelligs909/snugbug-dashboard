import { query } from './db';

export async function ensureVotesTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS manufacturer_votes (
      id SERIAL PRIMARY KEY,
      manufacturer_id INTEGER NOT NULL,
      voter_name VARCHAR(100) NOT NULL,
      vote SMALLINT NOT NULL CHECK (vote IN (-1, 1)),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(manufacturer_id, voter_name)
    )
  `);
}

export async function getVoteSummary() {
  try {
    await ensureVotesTable();
    const { rows } = await query(`
      SELECT manufacturer_id,
        COALESCE(SUM(CASE WHEN vote = 1 THEN 1 ELSE 0 END), 0) AS thumbs_up,
        COALESCE(SUM(CASE WHEN vote = -1 THEN 1 ELSE 0 END), 0) AS thumbs_down
      FROM manufacturer_votes
      GROUP BY manufacturer_id
    `);
    return rows;
  } catch {
    return [];
  }
}
