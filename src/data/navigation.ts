import type { NavigationItem } from '../types';

export const navigationData: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  {
    name: 'Products',
    href: '/products',
    children: [
      { name: 'Plywood Glue Kettle', href: '/products/resin-glue-kettle' },
      { name: 'Industrial Chimney', href: '/products/industrial-chimney' },
      { name: 'MS Shuttering Plate', href: '/products/shuttering-plate' },
      { name: 'MS Hopper', href: '/products/hopper' },
      { name: 'MS Storage Tank', href: '/products/storage-tank' },
      { name: 'Borewell / Casing Pipe', href: '/products/borewell-casing-pipe' },
      { name: 'Height Gauge', href: '/products/height-gauge' },
      { name: 'Fabrication as per Design', href: '/products/fabrication-as-per-design' },
      { name: 'Bentonite Tank', href: '/products/bentonite-tank' },
    ],
  },
  { name: 'Industries', href: '/#industries' },
  { name: 'Capabilities', href: '/custom-fabrication' },
  { name: 'Projects', href: '/projects' },
  { name: 'Quality', href: '/quality-certifications' },
  { name: 'Contact', href: '/contact' },
  { name: 'Request a Quote', href: '/request-a-quote', isCta: true },
];
