export interface Manufacturer {
  id: number;
  name: string;
  role: string;
  region: 'Canada' | 'Ireland' | 'Broader Europe';
  location: string;
  website: string;
  certifications: string[];
  contact: string;
  bestApproach: string;
  facilities?: string;
  highlight?: string;
}

export const manufacturers: Manufacturer[] = [
  {
    id: 1,
    name: 'Command Medical Products',
    role: 'Medical device contract manufacturer — assembly, sterile packaging, extrusion',
    region: 'Canada',
    location: 'Barrie, Ontario, Canada',
    website: 'https://commandmedical.com',
    certifications: ['ISO 13485', 'FDA Registered'],
    contact: 'Contact form at commandmedical.com',
    bestApproach: 'Use the contact form at commandmedical.com. They specialize in sterile single-use device assembly and packaging, product transfers, and sterilization management. Good fit for sterile pouch packaging of nasal inserts if you want a Canadian manufacturing base.',
  },
  {
    id: 2,
    name: 'Gentell',
    role: 'Wound care manufacturer — production facilities in Canada, UK, Brazil, China, NZ',
    region: 'Canada',
    location: 'Canada (plus Brazil, China, NZ, UK)',
    website: 'https://gentell.com',
    certifications: [],
    contact: 'Contact via gentell.com',
    bestApproach: 'Contact via gentell.com. They manufacture traditional and advanced wound care supplies, including cotton-based products. With production across multiple countries, they could be a sourcing partner for cotton insert manufacturing.',
  },
  {
    id: 3,
    name: 'RK Manufacturing',
    role: 'Medical device contract manufacturer — cleanroom, ISO 13485, prototype to production',
    region: 'Canada',
    location: 'Canada',
    website: 'https://rkmcorp.com',
    certifications: ['ISO 13485'],
    contact: 'Contact form at rkmcorp.com/contract-manufacturing',
    facilities: '15,000 sq ft cleanroom',
    bestApproach: 'Use the contact form at rkmcorp.com/contract-manufacturing. Good Canadian option for smaller batch prototype runs and can handle the full chain from design review through final packaging.',
  },
  {
    id: 4,
    name: 'Ensera (formerly SteriPack)',
    role: 'Global CDMO — contract packing, device design, cleanroom manufacturing',
    region: 'Ireland',
    location: 'Dublin, Ireland (HQ) / Limerick facility',
    website: 'https://ensera.com',
    certifications: ['ISO 13485', 'FDA Registered', 'GMP', 'Health Canada'],
    contact: 'firstname.lastname@steripackgroup.com / +353 61 358 190',
    facilities: 'Ireland, Poland, Florida, Malaysia',
    highlight: 'TOP PICK FOR IRELAND/EU',
    bestApproach: 'Use the contact form at ensera.com/contact/. 30+ year CDMO with GMP cleanrooms and full sterile packaging capability. Ideal EU-based packaging and assembly partner with global reach. Handles everything from design through commercial manufacturing.',
  },
  {
    id: 5,
    name: 'Arrotek Medical',
    role: 'Medical device design, development & contract manufacturing',
    region: 'Ireland',
    location: 'Sligo, Ireland / North Attleboro, MA, USA',
    website: 'https://arrotek.com',
    certifications: ['ISO 13485', 'FDA Registered'],
    contact: 'sales@arrotek.com / +353 (0) 71 9115111',
    facilities: '72,000 sqft Ireland (cleanrooms), 17,000 sqft USA',
    bestApproach: 'Email sales@arrotek.com. Design-to-manufacturing capability and cleanroom assembly could support SnugBug prototyping. Strong for concept-to-prototype (90-180 days).',
  },
  {
    id: 6,
    name: 'Harmac Medical Products',
    role: 'Full-service contract manufacturer — single-use devices, packaging, sterilization',
    region: 'Ireland',
    location: 'Castlerea, Co. Roscommon, Ireland / Buffalo, NY (HQ)',
    website: 'https://harmac.com',
    certifications: ['ISO 13485', 'FDA Registered'],
    contact: '+353 9496 21515 (Ireland) / (716) 897-4500 (US)',
    facilities: 'Ireland, Buffalo NY, two facilities in Tijuana',
    bestApproach: 'Use contact form at harmac.com/contact-us/ or call. Design, prototyping, manufacturing, packaging, and sterilization for single-use medical devices. 40+ years in business. Good for US and EU presence.',
  },
  {
    id: 7,
    name: 'AQF Medical',
    role: 'Custom engineered foam & thermoplastic components for medical devices',
    region: 'Ireland',
    location: 'Near Dublin, Ireland (also Singapore)',
    website: 'https://aqfmedical.com',
    certifications: ['ISO 13485', 'ISO 9001'],
    contact: 'Contact via aqfmedical.com',
    bestApproach: 'Contact via aqfmedical.com. Europe\'s leading manufacturer of custom foam components for medical devices. Potentially relevant if you explore a foam-based insert variant.',
  },
  {
    id: 8,
    name: 'SteriPack Ireland (Sterimed Group)',
    role: 'Healthcare packaging solutions — sterile barrier, cleanroom packing',
    region: 'Ireland',
    location: 'Co. Limerick, Ireland',
    website: 'https://steripackireland.ie',
    certifications: [],
    contact: 'Contact form at steripackireland.ie',
    bestApproach: 'Separate entity from Ensera. Now part of Sterimed Group, focuses on healthcare packaging with vertical integration into breathable materials and flexible films. Strong option for sterile packaging for EU markets.',
  },
  {
    id: 9,
    name: 'DCA Design International',
    role: 'World-leading product design consultancy — intranasal device expertise',
    region: 'Broader Europe',
    location: 'Warwick, Warwickshire, United Kingdom',
    website: 'https://dca-design.com',
    certifications: [],
    contact: '+44 1926 499461 / dca-design.com/contact',
    bestApproach: 'Contact form at dca-design.com/contact or call. Strongest European design partner option, with specific experience in nasal delivery devices.',
  },
  {
    id: 10,
    name: 'Urgo Medical',
    role: 'French wound care manufacturer — global manufacturing, cotton-based products',
    region: 'Broader Europe',
    location: 'Chenove, France (HQ)',
    website: 'https://urgomedical.us',
    certifications: [],
    contact: 'Contact via website',
    bestApproach: 'Major French family-owned wound care company with global manufacturing. Produces cotton-based dressings, potential partner for cotton product sourcing or co-manufacturing in Europe.',
  },
];
