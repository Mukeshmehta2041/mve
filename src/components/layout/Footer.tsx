import React from 'react';
import { footerLinksData, contactData } from '../../data';
import { ASSETS } from '../../lib/assets';
import { Container } from '../ui/Container';

export const Footer: React.FC = () => {
  const verifiedPhones = contactData.phones.filter((p) => p !== 'pending verification');
  const verifiedEmails = contactData.emails.filter((e) => e !== 'pending verification');

  return (
    <footer className="bg-navy-950 text-slate-400 pt-16 pb-8 border-t border-slate-800 text-left">
      <Container>
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-slate-800">
          {/* Brand and Description */}
          <div className="space-y-4">
            <a href="/" className="inline-block focus-ring rounded-sm">
              <img
                src={ASSETS.branding.logoDarkHeader}
                alt="Maa Vindhawasini Enterprises Logo"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              Premium MS fabrication and custom industrial equipment manufacturing solutions. Delivering high-quality pressure vessels, storage tanks, and structural solutions nationwide since 2008.
            </p>
            {/* Minimalist Trust Seals strip */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-slate-800 text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-sm">
                MSME Registered
              </span>
              <span className="bg-slate-800 text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-sm">
                GST Compliant
              </span>
            </div>
          </div>

          {/* Links Column mapping */}
          {footerLinksData.slice(0, 2).map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-white text-sm font-bold uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition-colors hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details Column (hides unverified parameters) */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">
              Corporate Office
            </h3>
            <div className="space-y-3.5 text-sm">
              {/* Only show address if it is verified (doesn't contain pending) */}
              {!contactData.officeAddress.includes('pending verification') && (
                <div className="flex items-start">
                  <img src={ASSETS.icons.mapPin} alt="" aria-hidden="true" className="w-4 h-4 mr-2.5 mt-0.5 text-primary" />
                  <p>{contactData.officeAddress}</p>
                </div>
              )}

              {verifiedPhones.map((phone) => (
                <div key={phone} className="flex items-center">
                  <img src={ASSETS.icons.phone} alt="" aria-hidden="true" className="w-4 h-4 mr-2.5 text-primary" />
                  <a href={`tel:${phone}`} className="hover:text-primary hover:underline">
                    {phone}
                  </a>
                </div>
              ))}

              {verifiedEmails.map((email) => (
                <div key={email} className="flex items-center">
                  <img src={ASSETS.icons.email} alt="" aria-hidden="true" className="w-4 h-4 mr-2.5 text-primary" />
                  <a href={`mailto:${email}`} className="hover:text-primary hover:underline">
                    {email}
                  </a>
                </div>
              ))}

              <div className="flex items-center">
                <img src={ASSETS.icons.clock} alt="" aria-hidden="true" className="w-4 h-4 mr-2.5 text-primary" />
                <span>{contactData.businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Block */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} Maa Vindhawasini Enterprises. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="/quality" className="hover:text-primary">Certifications</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
