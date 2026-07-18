import React from 'react';
import { SiteLayout, SEO } from '../components/layout';
import {
  HomeHero,
  TrustIndicators,
  HomeAbout,
  FeaturedProducts,
  CustomFabricationHighlight,
  IndustriesServed,
  WhyChooseUs,
  ManufacturingProcess,
  SelectedProjects,
  QualityPreview,
  HomeFinalCTA,
} from '../components/sections/home';

export const Home: React.FC = () => {
  // Safe, verified LocalBusiness structured data schema (omitting unverified registration details)
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Maa Vindhawasini Enterprises',
    'description': 'Maa Vindhawasini Enterprises specializes in custom MS fabrication, reaction vessels, storage tanks, and industrial equipment manufacturing in Patna, Bihar.',
    'url': 'https://www.maavindhawasini.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Patna',
      'addressRegion': 'Bihar',
      'addressCountry': 'IN'
    },
    'areaServed': 'Pan-India Delivery & Site Installation',
  };

  return (
    <SiteLayout>
      <SEO
        title="Custom Industrial Equipment & MS Fabrication"
        description="Maa Vindhawasini Enterprises specializes in custom MS fabrication, reaction vessels, storage tanks, and industrial equipment manufacturing in Patna, Bihar."
        canonicalPath="/"
        schemaJson={homeSchema}
      />
      
      {/* Homepage Sections */}
      <HomeHero />
      <TrustIndicators />
      <HomeAbout />
      <FeaturedProducts />
      <CustomFabricationHighlight />
      <IndustriesServed />
      <WhyChooseUs />
      <ManufacturingProcess />
      <SelectedProjects />
      <QualityPreview />
      <HomeFinalCTA />
    </SiteLayout>
  );
};

export default Home;
