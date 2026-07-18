import { ASSETS } from '../lib/assets';

export interface QualityCheckItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const qualityHighlightsData: QualityCheckItem[] = [
  {
    id: 'qual-1',
    title: 'Raw Material Inspection',
    description: 'Verifying plate thickness, grade certs, and checking raw steel surfaces for laminations or pitting before fabrication.',
    image: ASSETS.quality.materialInspection,
  },
  {
    id: 'qual-2',
    title: 'Certified Welding Audits',
    description: 'Ensuring structural welds are executed by certified technicians, checking root runs and seam profile integrity.',
    image: ASSETS.quality.weldingChecks,
  },
  {
    id: 'qual-3',
    title: 'Dimensional Verification',
    description: 'Comparing fabrication progress against approved client drawings to maintain exact tolerances for nozzle and axis alignments.',
    image: ASSETS.quality.dimensionalChecks,
  },
  {
    id: 'qual-4',
    title: 'Testing & Final Audit',
    description: 'Performing hydrostatic pressure testing for tanks/kettles and finishing with rust-preventive paint coatings.',
    image: ASSETS.quality.testing,
  },
];
