import React from 'react';
import { MainLayout, SEO } from '../components/layout';
import { Container, Section, SectionHeader } from '../components/ui';

export const Contact: React.FC = () => {
  return (
    <MainLayout>
      <SEO
        title="Contact Us | Maa Vindhawasini Enterprises"
        description="Get in touch with us for custom fabrication queries, factory visits, or sales assistance."
        canonicalPath="/contact"
      />
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Get In Touch"
            title="Contact Maa Vindhawasini Enterprises"
            description="We welcome queries regarding custom fabrications, order placements, and general services."
          />
          <div className="bg-white border border-border p-8 rounded-card max-w-3xl mx-auto text-center text-slate-600">
            Contact forms and maps will be fully enabled upon phone and office address verification.
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default Contact;
