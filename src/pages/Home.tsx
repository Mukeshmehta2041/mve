import React from 'react';
import { MainLayout, SEO } from '../components/layout';
import { Container, Section, Button } from '../components/ui';

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <SEO
        title="Custom Industrial Equipment & MS Fabrication"
        description="Maa Vindhawasini Enterprises specializes in custom MS fabrication, reaction vessels, storage tanks, and industrial equipment manufacturing in Patna, Bihar."
        canonicalPath="/"
      />
      <Section className="bg-slate-50 border-b border-border">
        <Container className="pt-8 pb-12 text-center md:text-left md:flex md:items-center md:justify-between md:gap-12">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-primary block">
              Maa Vindhawasini Enterprises
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy-950 leading-tight">
              Modern Industrial <span className="text-primary">Fabrication</span> & Process Equipment
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Precision-engineered reaction vessels, storage tanks, steel shuttering plates, and railway infrastructure height barriers. Custom manufactured to client drawings.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
              <Button href="/quote" variant="primary">
                Request a Quote
              </Button>
              <Button href="/products" variant="secondary">
                View Catalogue
              </Button>
            </div>
          </div>
          <div className="mt-8 md:mt-0 max-w-md w-full aspect-[4/3] rounded-card overflow-hidden bg-slate-200 shadow-card">
            {/* Visual concept board background */}
            <div className="w-full h-full bg-navy-900 flex items-center justify-center text-slate-550 text-sm font-semibold p-6 text-center">
              [Homepage Hero Image crop - home-industrial-hero.jpg]
            </div>
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default Home;
