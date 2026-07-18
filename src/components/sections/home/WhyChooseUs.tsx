import React from 'react';
import { Container } from '../../ui/Container';
import { SectionHeader } from '../../ui/SectionHeader';
import { whyChooseUsData } from '../../../data/whyChooseUs';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-border">
      <Container>
        <SectionHeader
          eyebrow="Key Advantages"
          title="Why Choose Maa Vindhawasini Enterprises"
          description="A track record of precise material standards, direct business support, and engineering integrity."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsData.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-border p-6 rounded-card shadow-sm hover:shadow-card transition-all duration-300 text-left space-y-4"
            >
              <div className="w-12 h-12 rounded-sm bg-primary-soft text-primary flex items-center justify-center">
                <img 
                  src={item.icon} 
                  alt="" 
                  aria-hidden="true"
                  className="w-6 h-6 object-contain" 
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-navy-950 font-sans leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
