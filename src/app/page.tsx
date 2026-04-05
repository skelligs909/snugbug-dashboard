import { manufacturers } from '@/lib/manufacturers';
import { getVoteSummary } from '@/lib/votes';
import { VoteTable } from './vote-table';

export const dynamic = 'force-dynamic';

export default async function ManufacturersPage() {
  const votes = await getVoteSummary();
  return <VoteTable manufacturers={manufacturers} initialVotes={votes} />;
}
