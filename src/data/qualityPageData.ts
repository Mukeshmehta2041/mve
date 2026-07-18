import { ASSETS } from '../lib/assets';

export interface QualityCommitmentPoint {
  title: string;
  desc: string;
  icon: string;
}

export interface QualityProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
}

export interface InspectionMethod {
  title: string;
  desc: string;
  scopeLabel: string;
  icon: string;
}

export const qualityCommitmentPointsData: QualityCommitmentPoint[] = [
  {
    title: 'Customer Requirement Review',
    desc: 'We consult on your target capacity, dimensions, and operational conditions before starting fabrication.',
    icon: ASSETS.icons.users,
  },
  {
    title: 'Drawing & Layout Alignment',
    desc: 'All processes follow client-approved mechanical sketches, CAD files, or template layouts.',
    icon: ASSETS.icons.fileText,
  },
  {
    title: 'Material Audit checks',
    desc: 'We check incoming steel plates, nozzle joints, and pipes for correct structural grades.',
    icon: ASSETS.icons.shieldCheck,
  },
  {
    title: 'Seam Weld Integrity Audits',
    desc: 'Technicians inspect weld profiles, root passes, and joints to ensure high load-bearing capacity.',
    icon: ASSETS.icons.wrench,
  },
  {
    title: 'Tolerance Verification',
    desc: 'Critical checking of outlet nozzle angles, support locations, and shell heights.',
    icon: ASSETS.icons.ruler,
  },
  {
    title: 'Pre-Dispatch Inspection',
    desc: 'Containment vessels (tanks and hoppers) are check-filled and paint DFTs are measured before release.',
    icon: ASSETS.icons.check,
  },
];

export const qualityPageProcessStepsData: QualityProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Requirement Review',
    description: 'Discuss client capacity targets, layout limits, and working constraints.',
    icon: ASSETS.icons.users,
  },
  {
    stepNumber: 2,
    title: 'Drawing Confirmation',
    description: 'Verify dimensions and nozzle positions against engineering blueprints.',
    icon: ASSETS.icons.fileText,
  },
  {
    stepNumber: 3,
    title: 'Material Verification',
    description: 'Verify thickness, raw surfaces, and grades before rolling or cutting.',
    icon: ASSETS.icons.shieldCheck,
  },
  {
    stepNumber: 4,
    title: 'Fabrication Monitoring',
    description: 'Audit fit-up, plate alignment, and rolling curvatures at the shop floor.',
    icon: ASSETS.icons.gear,
  },
  {
    stepNumber: 5,
    title: 'Weld Inspection',
    description: 'Perform visual audits of joint seam profiles and weld profiles.',
    icon: ASSETS.icons.wrench,
  },
  {
    stepNumber: 6,
    title: 'Surface Coating Audit',
    description: 'Verify red-oxide primer coats and paint dry film thickness (DFT).',
    icon: ASSETS.icons.check,
  },
  {
    stepNumber: 7,
    title: 'Final Leak Verification',
    description: 'Perform hydrostatic fill checks on storage tanks to confirm seal integrity.',
    icon: ASSETS.icons.droplet,
  },
  {
    stepNumber: 8,
    title: 'Delivery Readiness',
    description: 'Secure structural components on flatbeds and issue quality check sheets.',
    icon: ASSETS.icons.truck,
  },
];

export const inspectionMethodsData: InspectionMethod[] = [
  {
    title: 'Visual Weld Audits',
    desc: 'Visual checks of core weld seam profiles, checking root run execution to ensure structural durability.',
    scopeLabel: 'Applied where relevant',
    icon: ASSETS.icons.wrench,
  },
  {
    title: 'Dimensional Verification',
    desc: 'Verify clearances, nozzle locations, baseplate holes, and shell heights using calibrated calipers.',
    scopeLabel: 'Verified on all fabrications',
    icon: ASSETS.icons.ruler,
  },
  {
    title: 'Hydrostatic Leak Checks',
    desc: 'Filling storage tanks and reactor vessels with water for a specified hold duration to audit joints for leaks.',
    scopeLabel: 'Based on containment requirements',
    icon: ASSETS.icons.droplet,
  },
  {
    title: 'Coating Thickness (DFT) Audit',
    desc: 'Measuring dry paint layer thickness with electromagnetic gauges to verify anti-corrosion barrier life.',
    scopeLabel: 'Applied on all painted jobs',
    icon: ASSETS.icons.check,
  },
];

