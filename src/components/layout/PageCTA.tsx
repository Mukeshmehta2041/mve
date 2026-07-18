import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { contactData } from '../../data';
import { ASSETS } from '../../lib/assets';
import { cn } from '../../lib/utils';

interface PageCTAProps {
  className?: string;
  dark?: boolean;
}

export const PageCTA: React.FC<PageCTAProps> = ({
  className,
  dark = false,
}) => {
  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';

  return (
    <section
      className={cn(
        'py-14 md:py-18 lg:py-20 border-t border-b border-border text-center relative overflow-hidden',
        dark ? 'bg-navy-950 text-white border-slate-800' : 'bg-slate-50 text-navy-950',
        className
      )}
    >
      <Container className="relative z-10 max-w-4xl space-y-6">
        <h2
          className={cn(
            'text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight',
            dark ? 'text-white' : 'text-navy-950'
          )}
        >
          Have a Custom Fabrication Requirement?
        </h2>
        <p
          className={cn(
            'text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-sans',
            dark ? 'text-slate-400' : 'text-slate-600'
          )}
        >
          Send us your engineering drawings or dimensional requirements. Our technicians will review and draft a complete itemized pricing proposal.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center items-center pt-3">
          <Button href="/request-a-quote" variant="primary" size="md">
            Request a Quote
          </Button>

          {verifiedPhone && (
            <Button href={`tel:${verifiedPhone}`} variant="secondary" size="md">
              <img src={ASSETS.icons.phone} alt="" className="w-4 h-4 mr-2" />
              Call: {verifiedPhone}
            </Button>
          )}

          {hasWhatsapp && (
            <Button
              href={contactData.whatsappMessageUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="md"
            >
              <img src={ASSETS.icons.whatsapp} alt="" className="w-4 h-4 mr-2 brightness-0 invert" />
              Chat on WhatsApp
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};
export default PageCTA;
