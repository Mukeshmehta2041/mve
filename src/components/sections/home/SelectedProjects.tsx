import React from 'react';
import { Container } from '../../ui/Container';
import { SectionHeader } from '../../ui/SectionHeader';
import { ProjectCard } from '../../ui/ProjectCard';
import { Button } from '../../ui/Button';
import { projectsData } from '../../../data/projects';

export const SelectedProjects: React.FC = () => {
  // Show featured projects
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-border">
      <Container>
        <SectionHeader
          eyebrow="Track Record"
          title="Selected Fabrication Work"
          description="A selection of storage containment structures, hoppers, venting systems, and custom process assemblies completed to client parameters."
          align="center"
        />

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {featuredProjects.map((project) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Project Actions */}
        <div className="flex flex-wrap gap-4 justify-center pt-12">
          <Button href="/projects" variant="primary">
            View Our Work
          </Button>
          <Button href="/request-a-quote" variant="secondary">
            Discuss a Similar Project
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default SelectedProjects;
