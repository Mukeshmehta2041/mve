import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { ResponsiveImage } from '../../ui/ResponsiveImage';
import { ASSETS } from '../../../lib/assets';

export const CustomFabricationHighlight: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-navy-950 text-white border-b border-slate-800 text-left">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column - Content */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight font-heading">
            Nothing standard about it
          </h2>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
            Send us a blueprint, a sketch, or just the dimensions and working conditions. We fabricate
            to the drawing — adjusting capacities, nozzle positions, jackets, and support structures
            to fit the site, in mild steel or SS304/SS316.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              href="/custom-fabrication"
              variant="primary"
              className="w-full sm:w-auto shadow-sm"
            >
              See what we can make
            </Button>
          </div>
        </div>

        {/* Right Column - Industrial Image */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-lg overflow-hidden border border-slate-800 shadow-card aspect-[4/3] bg-navy-900 relative group">
            <ResponsiveImage
              src={ASSETS.hero.quality}
              alt="Welding work in progress at our Patna workshop."
              ratio="auto"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CustomFabricationHighlight;
