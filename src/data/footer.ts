import type { FooterLinkGroup } from '../types';

export const footerLinksData: FooterLinkGroup[] = [
  {
    title: 'Products Catalogue',
    links: [
      { label: 'Resin Glue Kettle', href: '/products/resin-glue-kettle' },
      { label: 'Storage Tank', href: '/products/storage-tank' },
      { label: 'Shuttering Plate', href: '/products/shuttering-plate' },
      { label: 'Hopper', href: '/products/hopper' },
      { label: 'Industrial Chimney', href: '/products/industrial-chimney' },
      { label: 'Hot Water Generator', href: '/products/hot-water-generator' },
      { label: 'Railway Height Gauge', href: '/products/railway-height-gauge' },
    ],
  },
  {
    title: 'Capabilities',
    links: [
      { label: 'About Our Facility', href: '/about' },
      { label: 'Custom MS Fabrication', href: '/custom-fabrication' },
      { label: 'Completed Projects', href: '/projects' },
      { label: 'Quality Assurance Process', href: '/quality-certifications' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Compliance & Legal',
    links: [
      { label: 'MSME Registered (Verified)', href: '/quality-certifications' },
      { label: 'GST Compliant (Verified)', href: '/quality-certifications' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
];
