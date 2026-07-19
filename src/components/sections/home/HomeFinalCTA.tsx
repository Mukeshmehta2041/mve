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
    <section className="py-16 md:py-20 lg:py-24 bg-slate-50 border-t border-b border-border text-center">
      <Container className="max-w-4xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-950 leading-tight font-heading text-balance">
          Tell us what you need built
        </h2>

        <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans">
          Send dimensions, capacities, or a drawing — whatever you have. We&rsquo;ll review it and come
          back with an itemised quotation.
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
          <Button href="/request-a-quote" variant="primary" size="md" className="w-full sm:w-auto">
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
              icon={
                <img 
                  src={ASSETS.icons.whatsapp} 
                  alt="" 
                  aria-hidden="true"
                  className="w-5 h-5 brightness-0 invert" 
                 width={20} height={20} decoding="async"/>
              }
              iconPosition="left"
            >
              WhatsApp Us
            </Button>
          )}

          {verifiedPhone && (
            <Button
              href={`tel:${verifiedPhone}`}
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
              icon={
                <img 
                  src={ASSETS.icons.phone} 
                  alt="" 
                  aria-hidden="true"
                  className="w-4 h-4" 
                 width={16} height={16} decoding="async"/>
              }
              iconPosition="left"
            >
              Call: {verifiedPhone}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default HomeFinalCTA;
