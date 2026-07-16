import React from 'react';
import { MainLayout, SEO } from '../components/layout';
import { Container, Section, SectionHeader } from '../components/ui';

export const About: React.FC = () => {
  return (
    <MainLayout>
      <SEO
        title="About Us | Industrial Fabrication Experts"
        description="Learn about Maa Vindhawasini Enterprises, our manufacturing facilities, and our history in serving industrial projects since 2008."
        canonicalPath="/about"
      />
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Company Overview"
            title="About Maa Vindhawasini Enterprises"
            description="Established with a commitment to quality and engineering precision, we are a leading fabricator in Patna, Bihar."
          />
          <div className="bg-white border border-border p-8 rounded-card max-w-3xl mx-auto text-center text-slate-600">
            About page details and company timeline are pending client verification of milestones.
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default About;
