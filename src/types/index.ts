// Type declarations for Maa Vindhawasini Enterprises static website data

export interface NavigationItem {
  name: string;
  href: string;
  isCta?: boolean;
  children?: NavigationItem[];
}

export interface RegistrationDetails {
  gst: string;
  udyam: string;
  factoryLicense: string;
}

export interface CompanyInfo {
  legalName: string;
  publicBrandName: string;
  tagline: string;
}

export interface ContactInfo {
  phones: string[];
  emails: string[];
  whatsapp: string;
  whatsappMessageUrl: string;
  officeAddress: string;
  factoryAddress: string;
  mapEmbedUrl: string;
  businessHours: string;
  serviceArea: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  categoryIcon: string;
  category: string;
  specifications: Record<string, string>;
  features: string[];
  applications: string[];
  gallery: string[];
  relatedProducts: string[]; // references other product slugs
  overview?: string;
  imageAlt?: string;
  industriesServed?: string[];
  materialInfo?: string;
  customizationOptions?: string[];
  qualityProcess?: string[];
  deliveryNotes?: string;
  faqs?: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  publishState?: 'draft' | 'published';
  verificationState?: 'pending' | 'verified';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  productSlug: string;
  industry: string;
  location: string;
  scope: string[];
  isFeatured?: boolean;
  slug?: string;
  productType?: string;
  gallery?: string[];
  imageAlt?: string;
  publishState?: 'draft' | 'published';
  verificationState?: 'pending' | 'verified';
  seoTitle?: string;
  seoDescription?: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface TrustIndicator {
  id: string;
  label: string;
  value: string;
  icon: string;
  description: string;
}

export interface FooterLinkGroup {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}
