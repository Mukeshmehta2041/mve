import { companyData, contactData } from '../data';
import type { Product } from '../data';

const SITE_URL = 'https://www.maavindhawasini.com';

/**
 * Generates JSON-LD schema for Local Business & Manufacturer compliant with Schema.org
 */
export function getLocalBusinessSchema() {
  const phone = contactData.phones.find((p) => p !== 'pending verification');
  const email = contactData.emails.find((e) => e !== 'pending verification');
  const cleanPhone = phone ? phone.replace(/\s+/g, '') : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': companyData.legalName,
    'description': companyData.tagline || 'Custom MS Fabrication & Industrial Equipment Manufacturing in Patna, Bihar',
    'image': `${SITE_URL}/logo.png`,
    'url': SITE_URL,
    'priceRange': '$$',
    ...(cleanPhone && { 'telephone': cleanPhone }),
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
      '@type': 'Country',
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
  const cleanPhone = phone ? phone.replace(/\s+/g, '') : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': companyData.legalName,
    'url': SITE_URL,
    'logo': `${SITE_URL}/logo.png`,
    ...(cleanPhone || email ? {
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer support',
        ...(cleanPhone && { 'telephone': cleanPhone }),
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
  const cleanImg = product.image.startsWith('/') ? product.image : `/${product.image}`;
  const imageUrl = product.image.startsWith('http') ? product.image : `${SITE_URL}${cleanImg}`;

  if (product.entryType === 'service') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': product.name,
      'image': imageUrl,
      'description': product.description,
      'serviceType': product.category,
      'provider': {
        '@type': 'Organization',
        'name': companyData.legalName,
      },
      'areaServed': 'IN',
      'url': `${SITE_URL}/products/${product.slug}`,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': imageUrl,
    'description': product.description,
    'category': product.category,
    'sku': product.id,
    'mpn': product.slug,
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
      'price': '50000',
      'priceValidUntil': `${new Date().getFullYear() + 1}-12-31`,
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
    'itemListElement': breadcrumbItems.map((item, idx) => {
      const url = item.href
        ? (item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href.startsWith('/') ? item.href : `/${item.href}`}`)
        : undefined;
      return {
        '@type': 'ListItem',
        'position': idx + 1,
        'name': item.label,
        ...(url && { 'item': url }),
      };
    }),
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
