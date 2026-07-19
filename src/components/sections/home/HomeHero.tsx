import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { ResponsiveImage } from '../../ui/ResponsiveImage';
import { ASSETS } from '../../../lib/assets';

export const HomeHero: React.FC = () => {
  return (
    <section className="bg-white border-b border-border py-12 md:py-20 lg:py-24">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left column - Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-[11px] md:text-[12px] leading-[18px] tracking-[0.12em] uppercase font-semibold text-slate-500 block">
            MS fabrication &amp; industrial equipment &middot; Patna, Bihar
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy-950 leading-[1.15] tracking-tight font-heading">
            Modern Fabrication Solutions, <span className="text-primary">Engineered</span> for Industry.
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-sans max-w-2xl">
            High-precision MS fabrication, reaction vessels, storage tanks, and construction infrastructure components. Custom manufactured in Patna, Bihar to client drawings and technical criteria.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Button 
              href="/request-a-quote" 
              variant="primary"
              className="w-full sm:w-auto shadow-card"
            >
              Request a Quote
            </Button>
            <Button 
              href="/products" 
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Explore Products
            </Button>
          </div>
        </div>

        {/* Right column - Image crop */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-lg overflow-hidden shadow-card border border-border aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-slate-100 group">
            {/* LCP image: eager + fetchPriority so it isn't queued behind
                lower-priority requests; SEO component preloads the same URL */}
            <ResponsiveImage
              src={ASSETS.hero.home}
              alt="Wide view of a fabrication yard with large steel storage tanks and structural steel"
              ratio="auto"
              loading="eager"
              fetchPriority="high"
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/15 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;
