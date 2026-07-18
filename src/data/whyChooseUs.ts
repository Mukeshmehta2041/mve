import { ASSETS } from '../lib/assets';

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: 'wcu-1',
    title: 'Custom Manufacturing',
    description: 'Every product is custom-built based on detailed client specifications, structural engineering drawings, and custom applications.',
    icon: ASSETS.icons.gear,
  },
  {
    id: 'wcu-2',
    title: 'Quality-Focused Fabrication',
    description: 'Strict quality control checks at every stage, including raw material inspection, precise welding verification, and dimensional checks.',
    icon: ASSETS.icons.shieldCheck,
  },
  {
    id: 'wcu-3',
    title: 'Experienced Engineering Team',
    description: 'Driven by skilled fabrication professionals and technicians experienced in industrial vessel manufacturing and assembly.',
    icon: ASSETS.icons.users,
  },
  {
    id: 'wcu-4',
    title: 'Direct Business Support',
    description: 'Direct sales channel support, offering end-to-end transparency, itemized quote proposals, and site-level technical engineering coordination.',
    icon: ASSETS.icons.wrench,
  },
  {
    id: 'wcu-5',
    title: 'Timely Execution',
    description: 'Streamlined material staging and manufacturing workflows to ensure delivery and installation commitments are met on schedule.',
    icon: ASSETS.icons.clock,
  },
  {
    id: 'wcu-6',
    title: 'Made-to-Requirement Solutions',
    description: 'Flexible sizing, capacities (up to 1,00,000L for storage), and choice of raw materials (MS, SS304, SS316) tailored for projects.',
    icon: ASSETS.icons.ruler,
  },
];
