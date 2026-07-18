import { ASSETS } from '../lib/assets';

export interface ValueItem {
  title: string;
  desc: string;
  icon: string;
}

export interface CapabilityItem {
  name: string;
  desc: string;
  icon: string;
  details: string[];
}

export const aboutValuesData: ValueItem[] = [
  {
    title: 'Quality First',
    desc: 'We follow structured visual and mechanical checkpoints at each stage to ensure long service life.',
    icon: ASSETS.icons.shieldCheck,
  },
  {
    title: 'Structural Safety',
    desc: 'All welding seam execution and leg bracing configurations are engineered to withstand target load pressures.',
    icon: ASSETS.icons.hardHat,
  },
  {
    title: 'Customer Requirements',
    desc: 'Every custom chimney, bin, or kettle is fabricated to align with the client’s exact site footprint.',
    icon: ASSETS.icons.users,
  },
  {
    title: 'Practical Integrity',
    desc: 'We provide itemized steel weight estimations and use only verified grade plates.',
    icon: ASSETS.icons.ruler,
  },
];

export const aboutCapabilitiesData: CapabilityItem[] = [
  {
    name: 'Precision Profile Cutting',
    desc: 'Heavy gas and manual profile shears to prepare raw plates with clean joint bevels.',
    icon: ASSETS.icons.ruler,
    details: ['MS Plates up to 25mm', 'SS Plates up to 16mm', 'Flange and joint beveling'],
  },
  {
    name: 'Curvature Metal Rolling',
    desc: 'Heavy-duty plate rolls to shape cylindrical shell sections for storage tanks and kettles.',
    icon: ASSETS.icons.gear,
    details: ['Cylindrical shell rolling', 'Conical section assembly', 'Tolerances within ±2mm'],
  },
  {
    name: 'Structural Arc Welding',
    desc: 'Shielded Metal Arc Welding (SMAW) and CO2 welding executed by trained fabrication technicians.',
    icon: ASSETS.icons.wrench,
    details: ['Continuous seam welds', 'Root pass audits', 'Leak-proof containment seals'],
  },
  {
    name: 'Surface Treatment',
    desc: 'Industrial red-oxide primer coats and epoxy finishes to protect steel assemblies against corrosion.',
    icon: ASSETS.icons.check,
    details: ['Rust removal treatment', 'Dual coat primer application', 'DFT inspections'],
  },
];

export const aboutQualityHighlightsData = [
  {
    title: 'Raw Material Review',
    desc: 'Verifying plate thickness, grade certs, and checking raw steel surfaces for laminations or pitting.',
  },
  {
    title: 'Fit-Up Curvature Audits',
    desc: 'Comparing shell alignment coordinates against engineering blueprints before continuous welding.',
  },
  {
    title: 'Weld Seam Inspections',
    desc: 'Visual checks of core weld seam profiles, checking root run execution to ensure structural durability.',
  },
  {
    title: 'Hydrostatic Leak Tests',
    desc: 'Filling storage tanks and reactor vessels with water for a specified hold duration to audit joints for leaks.',
  },
];
