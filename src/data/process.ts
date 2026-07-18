import { ASSETS } from '../lib/assets';

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
}

export const processStepsData: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Requirement Discussion',
    description: 'We consult on your application requirements, capacities, and working conditions to align on technical expectations.',
    icon: ASSETS.icons.users,
  },
  {
    stepNumber: 2,
    title: 'Drawing & Spec Review',
    description: 'Our engineering team reviews client blueprints, engineering designs, or templates to ensure exact structural verification.',
    icon: ASSETS.icons.fileText,
  },
  {
    stepNumber: 3,
    title: 'Material Staging',
    description: 'Procurement of quality raw materials, including certified steel plates, structural channels, pipe schedules, and accessories.',
    icon: ASSETS.icons.construction,
  },
  {
    stepNumber: 4,
    title: 'Fabrication & Welding',
    description: 'Core manufacturing operations, utilizing rolling machines, press brakes, and certified welding procedures.',
    icon: ASSETS.icons.wrench,
  },
  {
    stepNumber: 5,
    title: 'Quality Verification',
    description: 'Stringent compliance audits, covering dimensional accuracy checks, weld quality inspection, and hydrostatic leak testing.',
    icon: ASSETS.icons.shieldCheck,
  },
  {
    stepNumber: 6,
    title: 'Delivery & Setup',
    description: 'Safe transport, dispatch, and final assembly or installation support at site locations, where applicable.',
    icon: ASSETS.icons.truck,
  },
];
