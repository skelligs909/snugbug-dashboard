'use client';

import { useState } from 'react';
import type { Manufacturer } from '@/lib/manufacturers';

interface VoteData {
  manufacturer_id: number;
  thumbs_up: number;
  thumbs_down: number;
}

const regionTint: Record<string, string> = {
  Canada: 'bg-blue-50/60',
  Ireland: 'bg-green-50/60',
  UK: 'bg-amber-50/60',
  Europe: 'bg-purple-50/60',
  USA: 'bg-red-50/40',
  China: 'bg-yellow-50/60',
};

export function VoteTable({
  manufacturers,
  initialVotes,
}: {
  manufacturers: Manufacturer[];
  initialVotes: VoteData[];
}) {
  const [votes, setVotes] = useState<VoteData[]>(initialVotes);
  const [voterName, setVoterName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(true);

  function getVotes(id: number) {
    const v = votes.find(v => v.manufacturer_id === id);
    return { up: Number(v?.thumbs_up ?? 0), down: Number(v?.thumbs_down ?? 0) };
  }

  async function castVote(manufacturerId: number, vote: 1 | -1) {
    if (!voterName.trim()) {
      setShowNamePrompt(true);
      return;
    }
    await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manufacturerId, voterName: voterName.trim(), vote }),
    });
    const res = await fetch('/api/vote');
    const updated = await res.json();
    setVotes(updated);
  }

  return (
    <div>
      {/* Name input */}
      {showNamePrompt && (
        <div className="mb-4 flex items-center gap-2">
          <label className="text-xs text-gray-500">Your name:</label>
          <input
            type="text"
            value={voterName}
            onChange={e => setVoterName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && voterName.trim() && setShowNamePrompt(false)}
            placeholder="e.g. Stephen"
            className="border border-gray-300 rounded px-2 py-1 text-sm w-48"
          />
          {voterName.trim() && (
            <button
              onClick={() => setShowNamePrompt(false)}
              className="text-xs bg-gray-100 border border-gray-300 rounded px-2 py-1 hover:bg-gray-200"
            >
              OK
            </button>
          )}
        </div>
      )}
      {!showNamePrompt && voterName && (
        <div className="mb-4 text-xs text-gray-500">
          Voting as <strong>{voterName}</strong>{' '}
          <button onClick={() => setShowNamePrompt(true)} className="underline">change</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-left">
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Region</th>
              <th className="px-3 py-2 font-medium">Location</th>
              <th className="px-3 py-2 font-medium">Role</th>
              <th className="px-3 py-2 font-medium">Certifications</th>
              <th className="px-3 py-2 font-medium">Cotton Relevance</th>
              <th className="px-3 py-2 font-medium">Website</th>
              <th className="px-3 py-2 font-medium text-center">Vote</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map(m => {
              const v = getVotes(m.id);
              return (
                <tr key={m.id} className={`border-b border-gray-200 ${regionTint[m.region] ?? ''}`}>
                  <td className="px-3 py-2 font-medium whitespace-nowrap">
                    {m.name}
                    {m.highlight && (
                      <span className="ml-1 text-[10px] text-red-600 font-bold">
                        ({m.highlight})
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2">{m.region}</td>
                  <td className="px-3 py-2">{m.location}</td>
                  <td className="px-3 py-2 text-gray-600">{m.role}</td>
                  <td className="px-3 py-2 text-xs">{m.certifications.join(', ') || '—'}</td>
                  <td className="px-3 py-2 text-xs text-gray-600 max-w-xs">{m.cottonRelevance}</td>
                  <td className="px-3 py-2">
                    <a href={m.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                      {m.website.replace('https://', '')}
                    </a>
                  </td>
                  <td className="px-3 py-2 text-center whitespace-nowrap">
                    <button
                      onClick={() => castVote(m.id, 1)}
                      className="hover:scale-125 transition-transform inline-block"
                      title="I like this manufacturer"
                    >
                      👍
                    </button>
                    <span className="text-xs text-green-700 mx-1">{v.up}</span>
                    <button
                      onClick={() => castVote(m.id, -1)}
                      className="hover:scale-125 transition-transform inline-block"
                      title="Not a good fit"
                    >
                      👎
                    </button>
                    <span className="text-xs text-red-600 mx-1">{v.down}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
