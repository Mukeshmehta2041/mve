import type { NavigationItem } from '../types';

export const navigationData: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  {
    name: 'Products',
    href: '/products',
    children: [
      { name: 'Resin Glue Kettle', href: '/products/resin-glue-kettle' },
      { name: 'Storage Tank', href: '/products/storage-tank' },
      { name: 'Shuttering Plate', href: '/products/shuttering-plate' },
      { name: 'Hopper', href: '/products/hopper' },
      { name: 'Industrial Chimney', href: '/products/industrial-chimney' },
      { name: 'Hot Water Generator', href: '/products/hot-water-generator' },
      { name: 'Railway Height Gauge', href: '/products/railway-height-gauge' },
    ],
  },
  { name: 'Industries', href: '/#industries' },
  { name: 'Capabilities', href: '/custom-fabrication' },
  { name: 'Projects', href: '/projects' },
  { name: 'Quality', href: '/quality-certifications' },
  { name: 'Contact', href: '/contact' },
  { name: 'Request a Quote', href: '/request-a-quote', isCta: true },
];
