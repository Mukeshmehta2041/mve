import React from 'react';
import { Container } from '../../ui/Container';
import { SectionHeader } from '../../ui/SectionHeader';
import { processStepsData } from '../../../data/process';

export const ManufacturingProcess: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-border">
      <Container>
        <SectionHeader
          eyebrow="Workflow Path"
          title="Our Manufacturing & Delivery Process"
          description="From initial drawing review to site-level delivery or setup, we coordinate every fabrication stage to maintain structural integrity."
          align="center"
        />

        {/* Timeline Container */}
        <div className="relative pt-6">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-0.5 bg-slate-200 z-0"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {processStepsData.map((step) => (
              <div 
                key={step.stepNumber}
                className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group"
              >
                {/* Step Circle & Number Badge */}
                <div className="relative flex items-center justify-center">
                  {/* Outer circle */}
                  <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-500 group-hover:border-primary group-hover:bg-primary-soft group-hover:text-primary transition-all duration-300">
                    <img 
                      src={step.icon} 
                      alt="" 
                      aria-hidden="true"
                      className="w-6 h-6 object-contain" 
                    />
                  </div>
                  
                  {/* Step Number Tag */}
                  <span className="absolute -top-1.5 -right-1.5 bg-navy-950 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-navy-950 font-sans leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-[200px] mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ManufacturingProcess;
