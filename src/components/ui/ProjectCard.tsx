import React from 'react';
import type { Project } from '../../types';
import { Card } from './Card';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className,
}) => {
  return (
    <Card className={cn('flex flex-col h-full', className)}>
      {/* 
        Project Card Image Ratio: 16:9 (design.md Section 7)
      */}
      <div className="aspect-[16/9] w-full rounded-sm overflow-hidden bg-slate-100 mb-4 relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {project.isFeatured && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm">
            Featured
          </span>
        )}
      </div>

      <div className="flex-grow flex flex-col">
        {/* Project Meta Row */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2 text-xs text-slate-400 font-semibold tracking-wider uppercase">
          <span>{project.industry}</span>
          <span className="text-slate-300">•</span>
          <span>{project.location}</span>
        </div>

        <h3 className="text-lg font-bold text-navy-950 leading-tight mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {project.description}
        </p>

        {project.scope && project.scope.length > 0 && (
          <div className="mt-auto pt-3 border-t border-border">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Scope of Work
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.scope.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
export default ProjectCard;
