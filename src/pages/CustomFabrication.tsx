import React from 'react';
import { MainLayout, SEO } from '../components/layout';
import { Container, Section, SectionHeader } from '../components/ui';

export const CustomFabrication: React.FC = () => {
  return (
    <MainLayout>
      <SEO
        title="Custom MS Fabrication Services"
        description="Learn about our custom mild steel (MS) fabrication capacities, process pathways, and welding processes."
        canonicalPath="/custom-fabrication"
      />
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Specialized Capabilities"
            title="Custom MS Fabrication"
            description="We manufacture custom steel components and structural frameworks to client engineering drawings and design specs."
          />
          <div className="bg-white border border-border p-8 rounded-card max-w-3xl mx-auto text-center text-slate-600">
            Custom fabrication processes and capacity sheets are pending client review of factory equipment.
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default CustomFabrication;
