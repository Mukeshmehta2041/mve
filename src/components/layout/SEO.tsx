import React from 'react';
import { Helmet } from 'react-helmet-async';
import { companyData } from '../../data';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>>;
  ogImage?: string;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  schemaJson,
  ogImage,
  noindex = false,
}) => {
  const siteUrl = 'https://www.maavindhawasini.com';
  const fullTitle = title.includes(companyData.legalName) ? title : `${title} | ${companyData.legalName}`;
  const path = canonicalPath !== undefined 
    ? canonicalPath 
    : (typeof window !== 'undefined' ? window.location.pathname : '');
  const canonicalUrl = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/+$/, '') || siteUrl;
  const socialImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`) : `${siteUrl}/favicon.svg`;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={companyData.legalName} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Schema.org JSON-LD */}
      {schemaJson && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  );
};
export default SEO;

