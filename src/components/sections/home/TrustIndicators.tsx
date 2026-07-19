import React from 'react';
import { Container } from '../../ui/Container';
import { trustIndicatorsData } from '../../../data/trust';

export const TrustIndicators: React.FC = () => {
  return (
    <section className="bg-slate-50 border-b border-border py-6 md:py-8 relative z-10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {trustIndicatorsData.map((indicator) => {
            return (
              <div 
                key={indicator.id}
                className="flex items-start md:items-center space-x-3.5 p-3 rounded-card hover:bg-white hover:shadow-card transition duration-200"
              >
                {/* Icon wrapper */}
                <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-primary-soft flex items-center justify-center text-primary">
                  <img 
                    src={indicator.icon} 
                    alt="" 
                    aria-hidden="true"
                    className="w-5.5 h-5.5 object-contain" 
                   width={22} height={22} decoding="async"/>
                </div>
                
                {/* Content */}
                <div className="text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    {indicator.label}
                  </span>
                  <span className="text-sm md:text-base font-bold text-navy-950 block mt-0.5">
                    {indicator.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TrustIndicators;
