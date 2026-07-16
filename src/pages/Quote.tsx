import React from 'react';
import { MainLayout, SEO } from '../components/layout';
import { Container, Section, SectionHeader } from '../components/ui';

export const Quote: React.FC = () => {
  return (
    <MainLayout>
      <SEO
        title="Request a Quote | Custom Industrial Fabrication"
        description="Submit your technical drawings and fabrication requirements for an itemized commercial proposal."
        canonicalPath="/quote"
      />
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Proposal Request"
            title="Request a Commercial Quote"
            description="Provide details of your custom fabrication needs or select one of our catalog products."
          />
          <div className="bg-white border border-border p-8 rounded-card max-w-3xl mx-auto text-center text-slate-600">
            RFQ workflows and document upload handles will be initialized upon setting up backend form webhooks.
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default Quote;
