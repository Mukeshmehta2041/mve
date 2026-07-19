import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../../lib/assets';
import { Container } from '../ui/Container';
import { IconButton } from '../ui/Button';
import { DesktopNavigation } from '../navigation/DesktopNavigation';
import { MobileNavigation } from '../navigation/MobileNavigation';
import { contactData } from '../../data';
import { cn } from '../../lib/utils';

export const SiteHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Monitor scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const verifiedEmail = contactData.emails.find((e) => e !== 'pending verification');
  const isAddressPending = contactData.officeAddress.includes('pending verification');
  const displayAddress = isAddressPending ? 'Patna, Bihar, India' : contactData.officeAddress;

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      {/* Top Bar Strip */}
      <div className="hidden lg:block bg-slate-50 border-b border-slate-100 py-2 text-xs text-slate-600 font-sans">
        <Container className="flex justify-end items-center space-x-6">
          {verifiedEmail && (
            <a href={`mailto:${verifiedEmail}`} className="flex items-center hover:text-primary transition-colors">
              <img src={ASSETS.icons.email} alt="" aria-hidden="true" className="w-3.5 h-3.5 mr-2 opacity-70" />
              <span>{verifiedEmail}</span>
            </a>
          )}
          
          {verifiedPhone && (
            <a href={`tel:${verifiedPhone}`} className="flex items-center hover:text-primary transition-colors font-mono">
              <img src={ASSETS.icons.phone} alt="" aria-hidden="true" className="w-3.5 h-3.5 mr-2 opacity-70" />
              <span>{verifiedPhone}</span>
            </a>
          )}
          
          <div className="flex items-center text-slate-600">
            <img src={ASSETS.icons.mapPin} alt="" aria-hidden="true" className="w-3.5 h-3.5 mr-2 opacity-70" />
            <span>{displayAddress}</span>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <div
        className={cn(
          'w-full transition-all duration-200 h-16 md:h-[72px] lg:h-20 flex items-center border-b border-border/80',
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-card' : 'bg-white'
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Brand Logo Link */}
          <Link to="/" className="flex items-center focus-ring rounded-sm py-1 max-w-[200px] md:max-w-[250px]">
            <span className="font-heading font-extrabold text-navy-950 text-base md:text-lg leading-tight uppercase tracking-wider text-left block">
              Maa <span className="text-primary">Vindhawasini</span>
            </span>
          </Link>

          {/* Desktop Navigation Shell */}
          <DesktopNavigation />

          {/* Hamburger Mobile Toggle */}
          <IconButton
            ref={triggerRef}
            ariaLabel="Open main navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden hover:bg-slate-100"
          >
            <img
              src={ASSETS.icons.menu}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 object-contain"
            />
          </IconButton>

          {/* Mobile Navigation Shell */}
          <MobileNavigation
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            triggerRef={triggerRef}
          />
        </Container>
      </div>
    </header>
  );
};

export default SiteHeader;
