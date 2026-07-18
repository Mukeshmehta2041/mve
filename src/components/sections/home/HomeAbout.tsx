import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { ResponsiveImage } from '../../ui/ResponsiveImage';
import { ASSETS } from '../../../lib/assets';

export const HomeAbout: React.FC = () => {
  const benefits = [
    {
      title: 'Precision Engineering',
      description: 'Manufactured exactly to customer drawings, specifications, and design criteria.',
    },
    {
      title: 'Quality Materials',
      description: 'Using verified structural mild steel (IS 2062) and premium stainless steel grades.',
    },
    {
      title: 'Timely Delivery',
      description: 'Structured fabrication scheduling to match site installation and project deadlines.',
    },
    {
      title: 'Direct Manufacturer Support',
      description: 'Direct communication channels for engineering reviews, design modifications, and RFQs.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-border text-left">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column - Images/Visual */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-lg overflow-hidden border border-border shadow-card aspect-[4/3] bg-slate-100 relative group">
            <ResponsiveImage
              src={ASSETS.facilities.factoryHome}
              alt="Maa Vindhawasini Enterprises manufacturing facility in Patna, Bihar."
              ratio="auto"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Subtle caption */}
          <p className="text-xs text-slate-400 italic text-center md:text-left">
            Maa Vindhawasini Enterprises workshop location in Patna, Bihar (concept rendering).
          </p>
        </div>

        {/* Right column - Content details */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-[12px] leading-[18px] tracking-[0.1em] uppercase font-bold text-primary block mb-3">
              Company Introduction
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 leading-tight font-heading">
              Building Strength. <span className="text-primary">Delivering</span> Results.
            </h2>
          </div>

          <p className="text-base text-slate-600 leading-relaxed font-sans">
            Based in Patna, Bihar, Maa Vindhawasini Enterprises (MVE) specializes in custom MS steel fabrication and industrial process equipment manufacturing. Since 2008, we have partnered with contractors, chemical processing plants, utilities, and infrastructure developers to engineer and manufacture reliable storage, reaction, and transport units.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-soft text-primary flex items-center justify-center">
                    <img 
                      src={ASSETS.icons.check} 
                      alt="" 
                      aria-hidden="true"
                      className="w-3.5 h-3.5 object-contain" 
                    />
                  </span>
                  <h3 className="font-bold text-sm text-navy-950 font-sans">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pl-7">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button href="/about" variant="secondary" className="w-full sm:w-auto">
              Know More About Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeAbout;
