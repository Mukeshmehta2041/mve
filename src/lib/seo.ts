import { companyData, contactData } from '../data';
import type { Product } from '../data';

const SITE_URL = 'https://www.maavindhawasini.com';

/**
 * Generates JSON-LD schema for Local Business & Manufacturer compliant with Schema.org
 */
export function getLocalBusinessSchema() {
  const phone = contactData.phones.find((p) => p !== 'pending verification');
  const email = contactData.emails.find((e) => e !== 'pending verification');

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Manufacturer'],
    'name': companyData.legalName,
    'description': companyData.tagline || 'Custom MS Fabrication & Industrial Equipment Manufacturing in Patna, Bihar',
    'image': `${SITE_URL}/favicon.svg`,
    'url': SITE_URL,
    'priceRange': '$$',
    ...(phone && { 'telephone': phone }),
    ...(email && { 'email': email }),
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': contactData.officeAddress.includes('pending verification')
        ? 'Industrial Estate, Patna'
        : contactData.officeAddress,
      'addressLocality': 'Patna',
      'addressRegion': 'Bihar',
      'postalCode': '800001',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 25.5941,
      'longitude': 85.1376,
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '09:00',
      'closes': '18:00',
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': 'India',
    },
  };
}

/**
 * Generates JSON-LD schema for Organization
 */
export function getOrganizationSchema() {
  const phone = contactData.phones.find((p) => p !== 'pending verification');
  const email = contactData.emails.find((e) => e !== 'pending verification');

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': companyData.legalName,
    'url': SITE_URL,
    'logo': `${SITE_URL}/favicon.svg`,
    ...(phone || email ? {
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer support',
        ...(phone && { 'telephone': phone }),
        ...(email && { 'email': email }),
        'areaServed': 'IN',
        'availableLanguage': ['en', 'hi'],
      },
    } : {}),
  };
}

/**
 * Generates JSON-LD schema for a specific product
 */
export function getProductSchema(product: Product) {
  const imageUrl = product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': imageUrl,
    'description': product.description,
    'category': product.category,
    'brand': {
      '@type': 'Brand',
      'name': companyData.legalName,
    },
    'manufacturer': {
      '@type': 'Organization',
      'name': companyData.legalName,
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': '0',
      'priceValidUntil': '2026-12-31',
      'availability': 'https://schema.org/InStock',
      'url': `${SITE_URL}/products/${product.slug}`,
      'seller': {
        '@type': 'Organization',
        'name': companyData.legalName,
      },
    },
  };
}

/**
 * Generates JSON-LD schema for page breadcrumbs
 */
export function getBreadcrumbSchema(items: { label: string; href?: string }[]) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': item.label,
      'item': item.href ? (item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`) : SITE_URL,
    })),
  };
}

/**
 * Generates JSON-LD schema for FAQ section
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

/**
 * Generates JSON-LD schema for Custom Fabrication Service
 */
export function getServiceSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': name,
    'description': description,
    'provider': {
      '@type': 'LocalBusiness',
      'name': companyData.legalName,
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'India',
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'MS & SS Fabrication Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Custom MS Steel Fabrication',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Industrial Tank & Pressure Vessel Manufacturing',
          },
        },
      ],
    },
  };
}

/**
 * Generates JSON-LD ItemList schema for product catalogs
 */
export function getItemListSchema(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': products.map((prod, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': prod.name,
      'url': `${SITE_URL}/products/${prod.slug}`,
    })),
  };
}

