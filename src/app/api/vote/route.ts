import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

async function ensureVotesTable() {
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

export async function GET() {
  try {
    await ensureVotesTable();
    const { rows } = await query(`
      SELECT manufacturer_id,
        COALESCE(SUM(CASE WHEN vote = 1 THEN 1 ELSE 0 END), 0) AS thumbs_up,
        COALESCE(SUM(CASE WHEN vote = -1 THEN 1 ELSE 0 END), 0) AS thumbs_down
      FROM manufacturer_votes
      GROUP BY manufacturer_id
    `);
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { manufacturerId, voterName, vote } = await req.json();
    if (!manufacturerId || !voterName || ![1, -1].includes(vote)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    await ensureVotesTable();
    await query(
      `INSERT INTO manufacturer_votes (manufacturer_id, voter_name, vote)
       VALUES ($1, $2, $3)
       ON CONFLICT (manufacturer_id, voter_name)
       DO UPDATE SET vote = $3, created_at = NOW()`,
      [manufacturerId, voterName, vote]
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 });
  }
}
