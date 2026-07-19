import React from 'react';
import { SiteLayout, SEO } from '../components/layout';
import { getLocalBusinessSchema, getOrganizationSchema } from '../lib/seo';
import {
  HomeHero,
  TrustIndicators,
  HomeAbout,
  FeaturedProducts,
  CustomFabricationHighlight,
  IndustriesServed,
  SelectedProjects,
  HomeFinalCTA,
} from '../components/sections/home';

export const Home: React.FC = () => {
  const homeSchemas = [getLocalBusinessSchema(), getOrganizationSchema()];

  return (
    <SiteLayout>
      <SEO
        title="Custom Industrial Equipment & MS Fabrication Patna"
        description="Maa Vindhawasini Enterprises specializes in custom MS steel fabrication, reaction vessels, storage tanks, chimneys, and industrial equipment manufacturing in Patna, Bihar."
        canonicalPath="/"
        schemaJson={homeSchemas}
      />
      
      {/* Homepage Sections */}
      <HomeHero />
      <TrustIndicators />
      <HomeAbout />
      <FeaturedProducts />
      <CustomFabricationHighlight />
      <IndustriesServed />
      <SelectedProjects />
      <HomeFinalCTA />
    </SiteLayout>
  );
};

export default Home;
