import React from 'react';
import { MainLayout, SEO } from '../components/layout';
import { Container, Section, SectionHeader } from '../components/ui';

export const Quality: React.FC = () => {
  return (
    <MainLayout>
      <SEO
        title="Quality Standards & Certifications"
        description="Learn about our manufacturing quality checks, material inspection guidelines, and testing methodologies."
        canonicalPath="/quality"
      />
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Compliance"
            title="Quality & Certifications"
            description="We adhere to standard quality processes to deliver high-integrity steel products."
          />
          <div className="bg-white border border-border p-8 rounded-card max-w-3xl mx-auto text-center text-slate-600">
            Quality checking timelines and certificate downloads will be enabled once client verification is completed.
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default Quality;
