import { manufacturers } from '@/lib/manufacturers';

const regionColors: Record<string, string> = {
  Canada: 'bg-blue-100 text-blue-800',
  Ireland: 'bg-green-100 text-green-800',
  'Broader Europe': 'bg-purple-100 text-purple-800',
};

const certColors: Record<string, string> = {
  'ISO 13485': 'bg-blue-50 text-blue-700 border-blue-200',
  'FDA Registered': 'bg-red-50 text-red-700 border-red-200',
  GMP: 'bg-green-50 text-green-700 border-green-200',
  'ISO 9001': 'bg-gray-50 text-gray-700 border-gray-200',
  'Health Canada': 'bg-orange-50 text-orange-700 border-orange-200',
};

export default function ManufacturersPage() {
  const regions = ['Canada', 'Ireland', 'Broader Europe'] as const;
  const totalCertified = manufacturers.filter(m => m.certifications.length > 0).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manufacturer Directory</h1>
        <p className="text-snugbug-gray mt-1">
          Contract manufacturers for SnugBug nasal inserts — {manufacturers.length} companies across {regions.length} regions
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard label="Total Manufacturers" value={manufacturers.length} />
        <SummaryCard label="Canada" value={manufacturers.filter(m => m.region === 'Canada').length} color="text-blue-600" />
        <SummaryCard label="Ireland" value={manufacturers.filter(m => m.region === 'Ireland').length} color="text-green-600" />
        <SummaryCard label="Certified (ISO/FDA/GMP)" value={totalCertified} color="text-orange-600" />
      </div>

      {/* Region sections */}
      {regions.map(region => {
        const regionMfrs = manufacturers.filter(m => m.region === region);
        return (
          <section key={region} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">{region}</h2>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${regionColors[region]}`}>
                {regionMfrs.length} {regionMfrs.length === 1 ? 'company' : 'companies'}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regionMfrs.map(mfr => (
                <ManufacturerCard key={mfr.id} manufacturer={mfr} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Key takeaways */}
      <section className="bg-card-bg border border-card-border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Key Takeaways</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-snugbug-gray">
          <div>
            <h3 className="font-medium text-foreground mb-1">Canadian Manufacturing</h3>
            <p>Command Medical (Barrie, ON) and RK Manufacturing are the best bets for sterile device packaging on Canadian soil. No quality system certificate required for Class I devices.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Irish/EU Manufacturing</h3>
            <p>Ensera (formerly SteriPack) is the strongest all-around option with cleanroom infrastructure, sterile packing, ISO 13485, and both EU and US regulatory compliance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-4">
      <p className="text-sm text-snugbug-gray">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${color ?? 'text-foreground'}`}>{value}</p>
    </div>
  );
}

function ManufacturerCard({ manufacturer: m }: { manufacturer: typeof manufacturers[number] }) {
  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-5 space-y-3 hover:shadow-md transition-shadow relative">
      {m.highlight && (
        <span className="absolute top-3 right-3 text-[10px] font-bold bg-snugbug-red text-white px-2 py-0.5 rounded-full">
          {m.highlight}
        </span>
      )}
      <div>
        <h3 className="font-semibold text-lg leading-tight">{m.name}</h3>
        <p className="text-xs text-snugbug-gray mt-0.5">{m.role}</p>
      </div>

      <div className="text-sm space-y-1">
        <div className="flex items-start gap-2">
          <span className="text-snugbug-gray shrink-0">Location:</span>
          <span>{m.location}</span>
        </div>
        {m.facilities && (
          <div className="flex items-start gap-2">
            <span className="text-snugbug-gray shrink-0">Facilities:</span>
            <span>{m.facilities}</span>
          </div>
        )}
        <div className="flex items-start gap-2">
          <span className="text-snugbug-gray shrink-0">Contact:</span>
          <span className="break-all">{m.contact}</span>
        </div>
      </div>

      {m.certifications.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {m.certifications.map(cert => (
            <span
              key={cert}
              className={`text-[10px] font-medium px-2 py-0.5 rounded border ${certColors[cert] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}
            >
              {cert}
            </span>
          ))}
        </div>
      )}

      <details className="text-sm">
        <summary className="cursor-pointer text-snugbug-green font-medium hover:underline">
          Best approach
        </summary>
        <p className="mt-2 text-snugbug-gray leading-relaxed">{m.bestApproach}</p>
      </details>

      <a
        href={m.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-snugbug-green hover:underline"
      >
        Visit website &rarr;
      </a>
    </div>
  );
}
