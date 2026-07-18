import React from 'react';
import { Container } from '../ui/Container';
import { Breadcrumb } from '../ui/Breadcrumb';
import type { BreadcrumbItem } from '../ui/Breadcrumb';
import { cn } from '../../lib/utils';

interface PageHeroShellProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
}

/**
 * Compact page header for pages that don't need the full two-column hero.
 * Single column so it doesn't leave a large empty band on the right.
 */
export const PageHeroShell: React.FC<PageHeroShellProps> = ({
  title,
  description,
  backgroundImage,
  breadcrumb,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative bg-navy-950 text-white pt-6 pb-10 md:pb-12 overflow-hidden border-b border-slate-900 text-left',
        className
      )}
    >
      {/* Background Image with high-contrast dark overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>
      )}

      <Container className="relative z-10">
        {breadcrumb && <Breadcrumb onDark items={breadcrumb} className="mb-5" />}
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="text-base md:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};
export default PageHeroShell;
