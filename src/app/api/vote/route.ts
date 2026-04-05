import { query } from '@/lib/db';
import { ensureVotesTable, getVoteSummary } from '@/lib/votes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const rows = await getVoteSummary();
  return NextResponse.json(rows);
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
