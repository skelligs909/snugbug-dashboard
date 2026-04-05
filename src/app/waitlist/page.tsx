import { query } from '@/lib/db';

interface WaitlistEntry {
  id: number;
  email: string;
  created_at: string;
}

async function getWaitlistEntries(): Promise<WaitlistEntry[]> {
  try {
    const { rows } = await query(
      'SELECT * FROM waitlist ORDER BY created_at DESC'
    );
    return rows;
  } catch {
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function WaitlistPage() {
  const entries = await getWaitlistEntries();
  const hasDb = entries.length > 0 || !!process.env.DATABASE_URL;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Waitlist Signups</h1>
        <p className="text-snugbug-gray mt-1">
          Email signups from getsnugbug.com
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card-bg border border-card-border rounded-xl p-4">
          <p className="text-sm text-snugbug-gray">Total Signups</p>
          <p className="text-3xl font-bold mt-1">{entries.length}</p>
        </div>
        <div className="bg-card-bg border border-card-border rounded-xl p-4">
          <p className="text-sm text-snugbug-gray">Last 7 Days</p>
          <p className="text-3xl font-bold mt-1 text-snugbug-green">
            {entries.filter(e => {
              const d = new Date(e.created_at);
              const week = new Date();
              week.setDate(week.getDate() - 7);
              return d >= week;
            }).length}
          </p>
        </div>
        <div className="bg-card-bg border border-card-border rounded-xl p-4">
          <p className="text-sm text-snugbug-gray">Database</p>
          <p className={`text-lg font-bold mt-1 ${hasDb ? 'text-snugbug-green' : 'text-snugbug-red'}`}>
            {hasDb ? 'Connected' : 'Not Connected'}
          </p>
        </div>
      </div>

      {/* Table */}
      {!hasDb ? (
        <div className="bg-card-bg border border-card-border rounded-xl p-8 text-center">
          <p className="text-snugbug-gray">
            Set the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">DATABASE_URL</code> environment variable to connect to your PostgreSQL database.
          </p>
        </div>
      ) : entries.length === 0 ? (
        <div className="bg-card-bg border border-card-border rounded-xl p-8 text-center">
          <p className="text-snugbug-gray">No signups yet.</p>
        </div>
      ) : (
        <div className="bg-card-bg border border-card-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-snugbug-gray">#</th>
                <th className="text-left px-4 py-3 font-medium text-snugbug-gray">Email</th>
                <th className="text-left px-4 py-3 font-medium text-snugbug-gray">Signed Up</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={entry.id} className="border-b border-card-border last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-snugbug-gray">{i + 1}</td>
                  <td className="px-4 py-3 font-mono">{entry.email}</td>
                  <td className="px-4 py-3 text-snugbug-gray">
                    {new Date(entry.created_at).toLocaleDateString('en-IE', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
