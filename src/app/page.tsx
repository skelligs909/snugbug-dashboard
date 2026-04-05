import { manufacturers } from '@/lib/manufacturers';
import { VoteTable } from './vote-table';

export const dynamic = 'force-dynamic';

async function getVotes() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/vote`, { cache: 'no-store' });
    return res.json();
  } catch {
    return [];
  }
}

export default async function ManufacturersPage() {
  const votes = await getVotes();
  return <VoteTable manufacturers={manufacturers} initialVotes={votes} />;
}
