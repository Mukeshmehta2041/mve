import React from 'react';
import { contactData } from '../../data';
import { ASSETS } from '../../lib/assets';

export const MobileStickyActionBar: React.FC = () => {
  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border shadow-floating lg:hidden px-4 py-2.5 flex items-center justify-between gap-3">
      {/* Call button - only if phone is verified */}
      {verifiedPhone ? (
        <a
          href={`tel:${verifiedPhone}`}
          className="flex flex-col items-center justify-center bg-slate-100 hover:bg-slate-200 text-navy-950 w-12 h-12 rounded-card focus-ring"
          aria-label="Call Us"
        >
          <img src={ASSETS.icons.phone} alt="" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-bold mt-0.5">Call</span>
        </a>
      ) : (
        <a
          href="/contact"
          className="flex flex-col items-center justify-center bg-slate-100 hover:bg-slate-200 text-navy-950 w-12 h-12 rounded-card focus-ring"
          aria-label="Contact information"
        >
          <img src={ASSETS.icons.mapPin} alt="" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-bold mt-0.5">Contact</span>
        </a>
      )}

      {/* WhatsApp button - only if whatsapp is verified */}
      {hasWhatsapp ? (
        <a
          href={contactData.whatsappMessageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-success hover:bg-green-600 text-white w-12 h-12 rounded-card focus-ring"
          aria-label="Message us on WhatsApp"
        >
          <img src={ASSETS.icons.whatsapp} alt="" className="w-5 h-5 object-contain brightness-0 invert" />
          <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
        </a>
      ) : (
        <a
          href="https://wa.me/pending_verification"
          className="flex flex-col items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-400 w-12 h-12 rounded-card focus-ring pointer-events-none opacity-50"
          aria-label="WhatsApp (unverified)"
          aria-disabled="true"
        >
          <img src={ASSETS.icons.whatsapp} alt="" className="w-5 h-5 object-contain opacity-50" />
          <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
        </a>
      )}

      {/* Request Quote Button (receives largest weight) */}
      <a
        href="/quote"
        className="flex-grow h-12 bg-primary hover:bg-primary-hover text-white text-sm font-bold uppercase tracking-wider rounded-card flex items-center justify-center gap-2 focus-ring shadow-sm"
      >
        <span>Request a Quote</span>
        <svg
          className="w-4 h-4"
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
