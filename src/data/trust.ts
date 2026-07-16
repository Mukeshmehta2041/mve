import type { TrustIndicator } from '../types';
import { ASSETS } from '../lib/assets';

export const trustIndicatorsData: TrustIndicator[] = [
  {
    id: 'trust-1',
    label: 'GST Registered',
    value: 'Tax Compliant',
    icon: ASSETS.icons.shieldCheck,
    description: 'Registered business under Indian GST, facilitating formal corporate invoicing and input tax credit claims.',
  },
  {
    id: 'trust-2',
    label: 'Udyam / MSME Registered',
    value: 'Government Recognized',
    icon: ASSETS.icons.certificate,
    description: 'Certified Micro, Small & Medium Enterprise (MSME) under the Ministry of MSME, Govt of India.',
  },
  {
    id: 'trust-3',
    label: 'Factory Licensed',
    value: 'Regulated Factory Unit',
    icon: ASSETS.icons.factory,
    description: 'Operational under regulatory local factory licenses, complying with safety codes and fabrication norms.',
  },
  {
    id: 'trust-4',
    label: 'Years of Operation',
    value: 'Established 2008',
    icon: ASSETS.icons.experience,
    description: 'Over a decade of successful execution in custom steel fabrication and process vessel engineering.',
  },
];
