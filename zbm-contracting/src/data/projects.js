const imgs = (number) => [1, 2, 3, 4].map((i) => `/images/projects/project-${number}-${i}.webp`);

export const projects = [
  { id: 1, serviceNumber: '01', title: 'Modern Villa Transformation', descriptor: 'Residential Transformation', category: 'Full Villa Renovation', images: imgs('01') },
  { id: 2, serviceNumber: '02', title: 'Refined Living Interior', descriptor: 'Contemporary Interior', category: 'Interior Fit-Out', images: imgs('02') },
  { id: 3, serviceNumber: '03', title: 'Contemporary Kitchen', descriptor: 'Bespoke Kitchen', category: 'Kitchen Renovation', images: imgs('03') },
  { id: 4, serviceNumber: '04', title: 'Spa-Inspired Bathroom', descriptor: 'Luxury Wet Area', category: 'Bathroom Renovation', images: imgs('04') },
  { id: 5, serviceNumber: '05', title: 'Executive Office Interior', descriptor: 'Commercial Workspace', category: 'Commercial Office Fit-Out', images: imgs('05') },
  { id: 6, serviceNumber: '06', title: 'Resort-Style Pool', descriptor: 'Outdoor Living', category: 'Pool Construction', images: imgs('06') },
  { id: 7, serviceNumber: '07', title: 'Contemporary Garden', descriptor: 'Landscape Design', category: 'Landscaping & Gardens', images: imgs('07') },
  { id: 8, serviceNumber: '08', title: 'Modern Outdoor Pergola', descriptor: 'Shade & Outdoor Space', category: 'Pergola & Shade Structures', images: imgs('08') },
  { id: 9, serviceNumber: '09', title: 'Architectural Aluminium Facade', descriptor: 'Facade Detailing', category: 'Aluminum Work', images: imgs('09') },
  { id: 10, serviceNumber: '10', title: 'Frameless Glass Office', descriptor: 'Glass Interior', category: 'Glass Partition Work', images: imgs('10') },
  { id: 11, serviceNumber: '11', title: 'Refined Surface Finish', descriptor: 'Interior & Exterior Finish', category: 'Painting Internal & External', images: imgs('11') },
  { id: 12, serviceNumber: '12', title: 'Premium Stone Flooring', descriptor: 'Floor & Tile Finish', category: 'Flooring & Tiling', images: imgs('12') },
  { id: 13, serviceNumber: '13', title: 'Sculpted Ceiling & Marble Detail', descriptor: 'Decorative Finishing', category: 'Ceiling Gypsum & Marble Work', images: imgs('13') },
  { id: 14, serviceNumber: '14', title: 'Integrated Lighting & Electrical', descriptor: 'Smart Electrical', category: 'Electrical Works', images: imgs('14') },
  { id: 15, serviceNumber: '15', title: 'Climate-Controlled Interior', descriptor: 'Mechanical Integration', category: 'AC & Ducting (MEP)', images: imgs('15') },
  { id: 16, serviceNumber: '16', title: 'Wet-Area Protection System', descriptor: 'Technical Protection', category: 'Waterproofing', images: imgs('16') },
  { id: 17, serviceNumber: '17', title: 'Modern Entrance & Gate', descriptor: 'Boundary Design', category: 'Fencing & Gates', images: imgs('17') },
  { id: 18, serviceNumber: '18', title: 'Complete Turnkey Residence', descriptor: 'Design & Build', category: 'Turnkey Solutions', images: imgs('18') },
];

export const featuredProject = {
  title: 'Complete Villa Transformation',
  location: 'Dubai, UAE',
  categories: ['Turnkey Renovation', 'Interior', 'Exterior', 'Pool & Landscaping'],
  year: '',
  description: 'A complete villa transformation bringing interior detailing, exterior architecture, pool works and landscaping together as one coordinated design and construction experience.',
  image: '/images/hero/hero-01.webp',
};

export const processSteps = [
  { number: '01', title: 'Consultation & Planning', description: 'We meet to understand your vision, requirements and budget, then create a tailored project roadmap.', image: '/images/zbm_2.png' },
  { number: '02', title: 'Design & Approval', description: 'Our designers prepare detailed concepts and 3D visualizations for your review and approval before any work begins.', image: '/images/zbm_11.png' },
  { number: '03', title: 'Expert Execution', description: 'Our skilled team executes with precision using premium materials and strict quality standards throughout.', image: '/images/zbm_15.png' },
  { number: '04', title: 'Quality Check & Handover', description: 'Final inspection, walkthrough, and handover with full documentation and ongoing customer support.', image: '/images/zbm_16.png' },
];
