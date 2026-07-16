import type { Industry } from '../types';
import { ASSETS } from '../lib/assets';

export const industriesData: Industry[] = [
  {
    id: 'ind-1',
    name: 'Chemical & Process Industries',
    description: 'Custom reactors, limpet jacketed vessels, and corrosion-resistant tanks engineered for volatile process fluids and synthetic resins.',
    icon: ASSETS.icons.flask,
  },
  {
    id: 'ind-2',
    name: 'Infrastructure & Building Construction',
    description: 'Heavy-duty steel shuttering plates, column formwork, and concrete casing molds built to withstand site casting wear-and-tear.',
    icon: ASSETS.icons.construction,
  },
  {
    id: 'ind-3',
    name: 'Aggregates & Cement Plants',
    description: 'Discharge hoppers, conveyor structures, sand bins, and storage silos designed to load, store, and discharge high-abrasion bulk goods.',
    icon: ASSETS.icons.truck,
  },
  {
    id: 'ind-4',
    name: 'Thermal Utilities & Power Generation',
    description: 'Boiler chimneys, hot water generators, heat exchangers, and venting piping stacks engineered for high-temperature exhaust and heat recovery.',
    icon: ASSETS.icons.factory,
  },
  {
    id: 'ind-5',
    name: 'Railways & Transportation Infrastructure',
    description: 'Precision-welded level crossing portal height gauges, overhead wire protective gates, and structural gantries.',
    icon: ASSETS.icons.rail,
  },
];
