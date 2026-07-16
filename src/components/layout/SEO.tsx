import React from 'react';
import { Helmet } from 'react-helmet-async';
import { companyData } from '../../data';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schemaJson?: Record<string, unknown>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  schemaJson,
}) => {
  const siteUrl = 'https://www.maavindhawasini.com'; // Placeholder pending verification
  const fullTitle = `${title} | ${companyData.legalName}`;
  const canonicalUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : undefined;

  return (
    <Helmet>
      {/* Search Engine tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Social tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={companyData.legalName} />

      {/* Schema.org Structured Data */}
      {schemaJson && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  );
};
export default SEO;
