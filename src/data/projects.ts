import type { Project } from '../types';
import { ASSETS } from '../lib/assets';

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    title: 'Industrial Storage Tank',
    description: 'Heavy-duty cylindrical storage vessel fabricated to client-provided capacity specifications, featuring reinforced shell joints and testing ports.',
    image: ASSETS.projects.storageTank,
    productSlug: 'storage-tank',
    industry: 'Process Industries',
    location: 'Patna, Bihar',
    scope: ['Plate Rolling', 'CO2 Welding', 'Hydrostatic Testing'],
    isFeatured: true,
  },
  {
    id: 'proj-2',
    title: 'Custom Material Handling Hopper',
    description: 'Structural steel discharge bin engineered with a conical gravity outlet for handling bulk dry solids and cement aggregates.',
    image: ASSETS.projects.hopperConveyor,
    productSlug: 'hopper',
    industry: 'Infrastructure & Construction',
    location: 'Bihar, India',
    scope: ['Structural Bracing', 'Discharge Design', 'Corrosion Paint'],
    isFeatured: true,
  },
  {
    id: 'proj-3',
    title: 'Industrial Chimney Assembly',
    description: 'Self-supporting process exhaust stack, fabricated in flanged mild steel sections with spiral wind strakes and ladder access.',
    image: ASSETS.projects.featuredBitumen,
    productSlug: 'industrial-chimney',
    industry: 'Thermal Utilities',
    location: 'Nalanda, Bihar',
    scope: ['Vortex Strakes', 'Erection Alignment', 'Thermal Primer'],
    isFeatured: true,
  },
  {
    id: 'proj-4',
    title: 'Custom Structural Fabrication',
    description: 'Precision structural column frames and platform assemblies welded to support processing machinery and utility piping systems.',
    image: ASSETS.projects.reactorVessel,
    productSlug: 'resin-glue-kettle',
    industry: 'Chemical & Adhesive Plants',
    location: 'Patna, Bihar',
    scope: ['Section Cutting', 'Arc Welding', 'Dimension Inspection'],
    isFeatured: false,
  },
];
export default projectsData;
