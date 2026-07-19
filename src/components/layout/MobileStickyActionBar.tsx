import React from 'react';
import { useLocation } from 'react-router-dom';
import { contactData } from '../../data';
import { ASSETS } from '../../lib/assets';

// Configurations to hide the mobile sticky actions bar on pages that already have primary contact forms (design.md Section 7 & PRD)
const HIDDEN_ROUTES = ['/request-a-quote', '/contact'];

export const MobileStickyActionBar: React.FC = () => {
  const location = useLocation();
  
  // Hide sticky bar on matching routes
  if (HIDDEN_ROUTES.includes(location.pathname)) {
    return null;
  }

  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';

  // Pre-filled WhatsApp message intent (PRD and user requirements)
  const defaultMsg = "Hello Maa Vindhawasini Enterprises, I would like to discuss an industrial fabrication requirement.";
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    // pb reserves the iOS home-indicator strip on top of the bar's own padding
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border shadow-floating lg:hidden px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] flex items-center justify-between gap-3">
      {/* Call button - fallback to contact route if phone is unverified */}
      {verifiedPhone ? (
        <a
          href={`tel:${verifiedPhone}`}
          className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-navy-950 w-12 h-12 shrink-0 rounded-card focus-ring"
          aria-label="Call us"
        >
          <img src={ASSETS.icons.phone} alt="" className="w-5 h-5 object-contain" width={20} height={20} decoding="async" />
        </a>
      ) : (
        <a
          href="/contact"
          className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-navy-950 w-12 h-12 shrink-0 rounded-card focus-ring"
          aria-label="View office location"
        >
          <img src={ASSETS.icons.mapPin} alt="" className="w-5 h-5 object-contain" width={20} height={20} decoding="async" />
        </a>
      )}

      {/* WhatsApp button with prefilled text */}
      {hasWhatsapp ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-success-ink hover:bg-success-ink-hover text-white w-12 h-12 shrink-0 rounded-card focus-ring"
          aria-label="Message us on WhatsApp"
        >
          <img src={ASSETS.icons.whatsapp} alt="" className="w-5 h-5 object-contain brightness-0 invert" width={20} height={20} decoding="async" />
        </a>
      ) : (
        <div
          className="flex items-center justify-center bg-slate-100 text-slate-400 w-12 h-12 shrink-0 rounded-card opacity-50 cursor-not-allowed"
          aria-hidden="true"
        >
          <img src={ASSETS.icons.whatsapp} alt="" className="w-5 h-5 object-contain opacity-50" width={20} height={20} decoding="async" />
        </div>
      )}

      {/* Request Quote Button (has largest weight) */}
      <a
        href="/request-a-quote"
        className="flex-grow h-12 bg-primary-ink hover:bg-primary-ink-hover text-white text-sm font-bold uppercase tracking-wider rounded-card flex items-center justify-center gap-2 focus-ring shadow-card whitespace-nowrap"
      >
        <span>Request a Quote</span>
        <svg
          className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </a>
    </div>
  );
};
export default MobileStickyActionBar;
