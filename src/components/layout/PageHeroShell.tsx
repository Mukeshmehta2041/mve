import React from 'react';
import { Container } from '../ui/Container';
import { cn } from '../../lib/utils';

interface PageHeroShellProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  className?: string;
}

export const PageHeroShell: React.FC<PageHeroShellProps> = ({
  title,
  description,
  backgroundImage,
  className,
}) => {
  return (
    // Height optimized to prevent excessive vertical space (design.md Section 7)
    <div
      className={cn(
        'relative bg-navy-950 text-white py-12 md:py-16 lg:py-20 overflow-hidden border-b border-slate-800 text-left',
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
          {/* Dark scrim overlay (design.md Section 9) */}
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>
      )}

      <Container className="relative z-10">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white text-shadow-sm">
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
