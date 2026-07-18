import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { ResponsiveImage } from '../../ui/ResponsiveImage';
import { ASSETS } from '../../../lib/assets';

export const HomeAbout: React.FC = () => {
  const benefits = [
    {
      title: 'Built to your drawings',
      description:
        'We work from your blueprints, sketches, or dimensions — not a fixed catalogue of sizes.',
    },
    {
      title: 'Checked at every stage',
      description:
        'Plate grades verified on arrival, welds and dimensions inspected before anything ships.',
    },
    {
      title: 'You talk to the workshop',
      description:
        'No sales layer in between. Technical questions go straight to the people fabricating the unit.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-border text-left">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left column - Images/Visual */}
        <div className="lg:col-span-6">
          <div className="rounded-lg overflow-hidden border border-border shadow-card aspect-[4/3] bg-slate-100 relative group">
            <ResponsiveImage
              src={ASSETS.projects.featuredBitumen}
              alt="Storage tanks fabricated by Maa Vindhawasini Enterprises."
              ratio="auto"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right column - Content details */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-950 leading-tight font-heading">
            A workshop, not a middleman
          </h2>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed font-sans">
            We fabricate storage tanks, reaction vessels, hoppers, chimneys, and structural
            assemblies from our own shop in Patna — for contractors, chemical and adhesive plants,
            cement and aggregate operations, and thermal utilities.
          </p>

          {/* Benefits list */}
          <ul className="space-y-4 pt-1">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-primary-soft text-primary flex items-center justify-center">
                  <img
                    src={ASSETS.icons.check}
                    alt=""
                    aria-hidden="true"
                    className="w-3 h-3 object-contain"
                  />
                </span>
                <div>
                  <h3 className="font-semibold text-navy-950 font-sans">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-0.5">
                    {benefit.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Button href="/about" variant="secondary" className="w-full sm:w-auto">
              More about us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeAbout;
