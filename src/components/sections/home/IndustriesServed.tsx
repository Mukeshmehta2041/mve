import React from 'react';
import { Container } from '../../ui/Container';
import { industriesData } from '../../../data/industries';

export const IndustriesServed: React.FC = () => {
  return (
    <section
      id="industries"
      className="scroll-mt-24 py-16 md:py-24 bg-white border-b border-border"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-navy-950 leading-tight">
              Industries we work with
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Most of our work falls into five sectors, each with its own tolerances,
              material grades, and site constraints.
            </p>
          </div>

          <dl className="lg:col-span-8 divide-y divide-border border-t border-border">
            {industriesData.map((industry) => (
              <div key={industry.id} className="py-5 sm:flex sm:gap-8">
                <dt className="font-semibold text-navy-950 leading-snug sm:w-2/5 sm:shrink-0">
                  {industry.name}
                </dt>
                <dd className="mt-1 text-sm text-slate-600 leading-relaxed sm:mt-0">
                  {industry.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
};

export default IndustriesServed;
