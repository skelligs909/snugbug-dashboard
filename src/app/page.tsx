import { manufacturers } from '@/lib/manufacturers';

export default function ManufacturersPage() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Region</th>
            <th className="px-3 py-2 font-medium">Location</th>
            <th className="px-3 py-2 font-medium">Role</th>
            <th className="px-3 py-2 font-medium">Certifications</th>
            <th className="px-3 py-2 font-medium">Contact</th>
            <th className="px-3 py-2 font-medium">Website</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map(m => (
            <tr key={m.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-3 py-2 font-medium whitespace-nowrap">{m.name}</td>
              <td className="px-3 py-2">{m.region}</td>
              <td className="px-3 py-2">{m.location}</td>
              <td className="px-3 py-2 text-gray-600">{m.role}</td>
              <td className="px-3 py-2">{m.certifications.join(', ') || '—'}</td>
              <td className="px-3 py-2 text-xs">{m.contact}</td>
              <td className="px-3 py-2">
                <a href={m.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {m.website.replace('https://', '')}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
