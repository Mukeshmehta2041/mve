import type { TrustIndicator } from '../types';
import { ASSETS } from '../lib/assets';

/**
 * These describe how we work — not registrations or company history.
 * Registration and founding-year claims were removed pending verification;
 * see company.ts before reinstating any of them.
 */
export const trustIndicatorsData: TrustIndicator[] = [
  {
    id: 'trust-1',
    label: 'Built to order',
    value: 'Your drawings, your dimensions',
    icon: ASSETS.icons.ruler,
    description: 'Every unit is fabricated to customer-supplied drawings, capacities, and site constraints.',
  },
  {
    id: 'trust-2',
    label: 'Materials',
    value: 'MS (IS 2062), SS304, SS316',
    icon: ASSETS.icons.shieldCheck,
    description: 'Structural mild steel and stainless grades selected to suit the process and service conditions.',
  },
  {
    id: 'trust-3',
    label: 'In-house fabrication',
    value: 'Cutting, rolling, welding, finishing',
    icon: ASSETS.icons.wrench,
    description: 'Plate preparation through to primer and paint handled in our own Patna workshop.',
  },
  {
    id: 'trust-4',
    label: 'Delivery',
    value: 'Pan-India despatch',
    icon: ASSETS.icons.truck,
    description: 'Transport arranged to site, with assembly and installation support where the scope calls for it.',
  },
];
