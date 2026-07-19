import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Breadcrumb } from '../ui/Breadcrumb';
import type { BreadcrumbItem } from '../ui/Breadcrumb';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface HeroAction {
  label: string;
  href: string;
  onClick?: () => void;
}

interface HeroImage {
  src: string;
  alt: string;
  aspect?: '16/10' | '4/3';
  width?: number;
  height?: number;
}

interface PageHeroSplitProps {
  breadcrumb: BreadcrumbItem[];
  title: string;
  description: string;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
  image: HeroImage;
  className?: string;
}

/**
 * The two-column navy hero: breadcrumb + h1 + description + action pair on
 * the left, a framed photo on the right. Four pages (About, Projects,
 * CustomFabrication, QualityCertifications) hand-rolled ~45 lines of this
 * each with small drift (max-w-xl vs max-w-2xl, 16/10 vs 4/3 images). One
 * implementation now; copy, hrefs, and analytics stay per-page.
 *
 * Not used by Contact (no image - see PageHeroShell) or RequestAQuote
 * (no action buttons, tighter spacing) - those are genuinely a different
 * shape, not the same pattern with different words.
 */
export const PageHeroSplit: React.FC<PageHeroSplitProps> = ({
  breadcrumb,
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  className,
}) => {
  const aspectClass = image.aspect === '4/3' ? 'aspect-[4/3]' : 'aspect-[16/10]';

  return (
    <Section
      className={cn(
        'bg-navy-950 text-white pt-6 pb-12 md:pb-16 text-left overflow-hidden border-b border-slate-900',
        className
      )}
    >
      <Container className="font-sans">
        <Breadcrumb onDark items={breadcrumb} className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-heading">
              {title}
            </h1>

            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                href={primaryAction.href}
                variant="primary"
                className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
              <Button
                href={secondaryAction.href}
                variant="outline-light"
                className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div
              className={cn(
                'rounded-lg overflow-hidden border border-slate-800 shadow-card bg-navy-900 relative',
                aspectClass
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                width={image.width ?? 800}
                height={image.height ?? (image.aspect === '4/3' ? 600 : 500)}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
export default PageHeroSplit;
