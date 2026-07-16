import React from 'react';
import { MainLayout, SEO } from '../components/layout';
import { Container, Section, SectionHeader } from '../components/ui';

export const Projects: React.FC = () => {
  return (
    <MainLayout>
      <SEO
        title="Completed Projects & Case Studies"
        description="Explore our portfolio of completed industrial fabrication and steel infrastructure projects."
        canonicalPath="/projects"
      />
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Portfolio"
            title="Completed Projects"
            description="Explore our track record of custom equipment delivery across diverse industrial sectors."
          />
          <div className="bg-white border border-border p-8 rounded-card max-w-3xl mx-auto text-center text-slate-600">
            Project case studies and details are pending client approval of project documentation and site photos.
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default Projects;
