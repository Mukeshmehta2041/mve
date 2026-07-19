import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { contactData } from '../../data';
import { ASSETS } from '../../lib/assets';
import { cn } from '../../lib/utils';

interface CTAAction {
  label: string;
  href: string;
  onClick?: () => void;
}

interface PageCTAProps {
  title: string;
  description: string;
  /** Primary action. Defaults to the plain quote route. */
  quote?: Partial<CTAAction>;
  /** Optional third action, e.g. "View Products" or a tel: link. */
  secondary?: CTAAction;
  /** WhatsApp is shown whenever a number is verified; opt out per page. */
  showWhatsapp?: boolean;
  whatsappLabel?: string;
  /**
   * Page-specific prefilled WhatsApp message URL. Pages that set this get a
   * message naming what the visitor was looking at; without it the generic
   * site-wide message is used.
   */
  whatsappUrl?: string;
  onWhatsappClick?: () => void;
  /** Renders a tel: button when a verified number exists. */
  showCall?: boolean;
  onCallClick?: () => void;
  className?: string;
}

const actionClasses = 'font-bold text-sm tracking-wider uppercase h-12';

/**
 * The closing call-to-action band shared by every content page.
 *
 * Each page previously hand-rolled ~35 lines of this, so the six copies had
 * already drifted (two different muted-text tokens, inconsistent button sets).
 * Copy and analytics stay per-page; the structure does not.
 */
export const PageCTA: React.FC<PageCTAProps> = ({
  title,
  description,
  quote,
  secondary,
  showWhatsapp = true,
  whatsappLabel = 'WhatsApp Us',
  whatsappUrl,
  onWhatsappClick,
  showCall = false,
  onCallClick,
  className,
}) => {
  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';

  return (
    <Section
      background="dark"
      className={cn('border-t border-slate-800 text-center py-14 md:py-20', className)}
    >
      <Container className="max-w-4xl space-y-6 font-sans">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white font-heading text-balance">
          {title}
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-slate-300 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center pt-3">
          <Button
            href={quote?.href ?? '/request-a-quote'}
            variant="primary"
            size="md"
            className={actionClasses}
            onClick={quote?.onClick}
          >
            {quote?.label ?? 'Request a Quote'}
          </Button>

          {showWhatsapp && hasWhatsapp && (
            <Button
              href={whatsappUrl ?? contactData.whatsappMessageUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="md"
              className={actionClasses}
              onClick={onWhatsappClick}
              icon={
                <img
                  src={ASSETS.icons.whatsapp}
                  alt=""
                  aria-hidden="true"
                  className="w-5 h-5 brightness-0 invert"
                />
              }
              iconPosition="left"
            >
              {whatsappLabel}
            </Button>
          )}

          {showCall && verifiedPhone && (
            <Button
              href={`tel:${verifiedPhone}`}
              variant="outline-light"
              size="md"
              className={actionClasses}
              onClick={onCallClick}
              icon={<img src={ASSETS.icons.phone} alt="" aria-hidden="true" className="w-4 h-4" />}
              iconPosition="left"
            >
              Call: {verifiedPhone}
            </Button>
          )}

          {secondary && (
            <Button
              href={secondary.href}
              variant="outline-light"
              size="md"
              className={actionClasses}
              onClick={secondary.onClick}
            >
              {secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
};
export default PageCTA;
