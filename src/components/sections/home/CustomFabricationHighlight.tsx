import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { ResponsiveImage } from '../../ui/ResponsiveImage';
import { ASSETS } from '../../../lib/assets';

export const CustomFabricationHighlight: React.FC = () => {
  const highlights = [
    {
      title: 'Custom Engineering Drawings',
      desc: 'We fabricate components exactly as specified in customer blueprints or engineering drawings.',
    },
    {
      title: 'Variable Sizes & Capacities',
      desc: 'No standard limits. We adjust dimensions, capacities, and fittings to match site restrictions.',
    },
    {
      title: 'Material Specifications',
      desc: 'Available in diverse grades of Mild Steel (MS IS 2062) and Stainless Steel (SS304/SS316).',
    },
    {
      title: 'Industry Applications',
      desc: 'Customized nozzle alignments, support columns, jackets, and insulation for specific workflows.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-navy-950 text-white border-b border-slate-800 relative overflow-hidden text-left">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-[12px] leading-[18px] tracking-[0.1em] uppercase font-bold text-primary block mb-3">
              Tailored Manufacturing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight font-heading">
              Custom Solutions. <span className="text-primary">Built Around</span> You.
            </h2>
          </div>
          
          <p className="text-base text-slate-300 leading-relaxed font-sans max-w-xl">
            Do you have unique drawings or custom capacity requirements? Maa Vindhawasini Enterprises manufactures process equipment and steel assemblies matching your exact engineering parameters. From specialized reaction vessels to custom discharge hoppers, we deliver structural reliability built to specification.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {highlights.map((h, index) => (
              <div key={index} className="space-y-1.5">
                <h3 className="font-bold text-base text-white font-sans flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2.5"></span>
                  {h.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed pl-4">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              href="/custom-fabrication" 
              variant="primary"
              className="w-full sm:w-auto shadow-sm"
            >
              Explore Custom Fabrication
            </Button>
            <Button 
              href="/request-a-quote?service=custom-fabrication" 
              variant="secondary"
              className="w-full sm:w-auto bg-transparent border-white text-white hover:border-primary hover:text-primary"
            >
              Request Custom Quote
            </Button>
          </div>
        </div>

        {/* Right Column - Industrial Image */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-lg overflow-hidden border border-slate-800 shadow-card aspect-[4/3] bg-navy-900 relative group">
            <ResponsiveImage
              src={ASSETS.fabrication.welding}
              alt="Arc welding process at the Maa Vindhawasini Enterprises fabrication shop."
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
