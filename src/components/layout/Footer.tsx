import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinksData, contactData } from '../../data';
import { ASSETS } from '../../lib/assets';
import { Container } from '../ui/Container';

export const Footer: React.FC = () => {
  const verifiedPhones = contactData.phones.filter((p) => p !== 'pending verification');
  const verifiedEmails = contactData.emails.filter((e) => e !== 'pending verification');

  return (
    <footer className="bg-navy-950 text-slate-400 pt-16 pb-24 lg:pb-8 border-t border-slate-800 text-left">
      <Container>
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-slate-800">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block focus-ring rounded-sm">
              <span className="font-heading font-extrabold text-white text-base md:text-lg leading-tight uppercase tracking-wider text-left block">
                Maa <span className="text-primary">Vindhawasini</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              Custom MS and stainless steel fabrication from our workshop in Patna, Bihar — storage
              tanks, reaction vessels, hoppers, chimneys, and structural assemblies built to your
              drawings.
            </p>
          </div>

          {/* Links Column mapping */}
          {footerLinksData.slice(0, 2).map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-white text-sm font-bold uppercase tracking-wider font-heading">
                {group.title}
              </h3>
              <ul className="space-y-2.5 text-sm font-sans">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="hover:text-primary transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Corporate Details Column */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider font-heading">
              Corporate Office
            </h3>
            <div className="space-y-3.5 text-sm font-sans">
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
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0 font-sans">
          <div>
            © {new Date().getFullYear()} Maa Vindhawasini Enterprises. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Use</Link>
            <Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link>
            <Link to="/quality-certifications" className="hover:text-primary">Quality</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
