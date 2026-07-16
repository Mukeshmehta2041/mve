import React, { useState } from 'react';
import { ASSETS } from '../../lib/assets';
import { Container } from '../ui/Container';
import { IconButton } from '../ui/Button';
import { DesktopNavigation } from '../navigation/DesktopNavigation';
import { MobileNavigation } from '../navigation/MobileNavigation';

export const SiteHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border shadow-xs h-16 md:h-[72px] lg:h-20 flex items-center">
      <Container className="flex items-center justify-between">
        {/* Brand Logo Link */}
        <a href="/" className="flex items-center focus-ring rounded-sm">
          <img
            src={ASSETS.branding.logoHome}
            alt="Maa Vindhawasini Enterprises Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop Navbar */}
        <DesktopNavigation />

        {/* Hamburger Mobile Toggle (design.md Section 7) */}
        <IconButton
          ariaLabel="Toggle mobile menu"
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

        {/* Mobile Navbar Drawer */}
        <MobileNavigation
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </Container>
    </header>
  );
};
export default SiteHeader;
