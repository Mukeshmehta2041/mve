import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { contactData } from '../../../data/contact';
import { ASSETS } from '../../../lib/assets';

export const HomeFinalCTA: React.FC = () => {
  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';

  // Prefilled WhatsApp message
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(
    'Hello Maa Vindhawasini Enterprises, I would like to discuss an industrial fabrication requirement.'
  )}`;

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-50 border-t border-b border-border text-center relative overflow-hidden">
      {/* Structural background overlays */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>

      <Container className="relative z-10 max-w-4xl space-y-6">
        <span className="text-[12px] leading-[18px] tracking-[0.15em] uppercase font-bold text-primary block">
          Get an Itemized Estimate
        </span>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight font-heading">
          Have an Industrial Requirement?
        </h2>
        
        <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans">
          Send us your required dimensions, capacity specifications, structural drawings, or overall project details. Our technical team will review your files and draft a formal commercial proposal.
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
          <Button href="/request-a-quote" variant="primary" size="md" className="w-full sm:w-auto shadow-sm">
            Request a Quote
          </Button>

          {hasWhatsapp && (
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="md"
              className="w-full sm:w-auto"
            >
              <img 
                src={ASSETS.icons.whatsapp} 
                alt="" 
                aria-hidden="true"
                className="w-5 h-5 mr-2 brightness-0 invert" 
              />
              WhatsApp Us
            </Button>
          )}

          {verifiedPhone && (
            <Button href={`tel:${verifiedPhone}`} variant="secondary" size="md" className="w-full sm:w-auto">
              <img 
                src={ASSETS.icons.phone} 
                alt="" 
                aria-hidden="true"
                className="w-4 h-4 mr-2" 
              />
              Call: {verifiedPhone}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default HomeFinalCTA;
