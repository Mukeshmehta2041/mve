import { companyData, contactData } from '../data';
import type { Product } from '../data';

const SITE_URL = 'https://www.maavindhawasini.com'; // Placeholder pending verification

/**
 * Generates JSON-LD schema for Local Business compliant with Schema.org
 */
export function getLocalBusinessSchema() {
  const phone = contactData.phones.find((p) => p !== 'pending verification');
  const email = contactData.emails.find((e) => e !== 'pending verification');

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': companyData.legalName,
    'image': `${SITE_URL}/logo-home.png`, // Placeholder
    'url': SITE_URL,
    ...(phone && { 'telephone': phone }),
    ...(email && { 'email': email }),
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': contactData.officeAddress.includes('pending verification')
        ? 'Patna (details pending verification)'
        : contactData.officeAddress,
      'addressLocality': 'Patna',
      'addressRegion': 'Bihar',
      'postalCode': '800001', // General Patna code placeholder
      'addressCountry': 'IN',
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '09:00',
      'closes': '18:00',
    },
  };
}

/**
 * Generates JSON-LD schema for a specific product
 */
export function getProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': product.image,
    'description': product.description,
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'price': 'Contact for pricing',
    },
  };
}

/**
 * Generates JSON-LD schema for page breadcrumbs
 */
export function getBreadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': item.label,
      'item': item.href ? `${SITE_URL}${item.href}` : SITE_URL,
    })),
  };
}
