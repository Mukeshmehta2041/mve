import React from 'react';
import { Container } from '../../ui/Container';
import { SectionHeader } from '../../ui/SectionHeader';
import { industriesData } from '../../../data/industries';

export const IndustriesServed: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-border">
      <Container>
        <SectionHeader
          eyebrow="Sector Coverage"
          title="Industries We Serve"
          description="Providing custom steel fabrication solutions and process containment structures tailored to regulatory and operating standards across major industrial sectors."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {industriesData.map((industry) => (
            <div 
              key={industry.id}
              className="bg-slate-50 border border-border p-6 rounded-card hover:bg-white hover:shadow-card hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon indicator */}
                <div className="w-12 h-12 rounded-sm bg-primary-soft text-primary flex items-center justify-center">
                  <img 
                    src={industry.icon} 
                    alt="" 
                    aria-hidden="true"
                    className="w-6 h-6 object-contain" 
                  />
                </div>
                
                <h3 className="font-bold text-base text-navy-950 font-sans leading-snug">
                  {industry.name}
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default IndustriesServed;
