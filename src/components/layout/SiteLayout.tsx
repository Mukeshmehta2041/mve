import React from 'react';
import { SiteHeader } from './SiteHeader';
import { Footer } from './Footer';
import { MobileStickyActionBar } from './MobileStickyActionBar';
import { PageMain } from './PageLayoutElements';

interface SiteLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children, className }) => {
  return (
    <div className="flex flex-col min-h-screen bg-surface-muted text-foreground">
      {/* Skip to Content link for keyboard accessibility (WCAG Guidelines) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-ink focus:text-white focus:px-4 focus:py-2.5 focus:rounded-card focus:font-bold focus:shadow-floating focus:outline-none focus-ring"
      >
        Skip to main content
      </a>

      {/* Reusable Header */}
      <SiteHeader />

      {/* Main Content viewport */}
      <PageMain className={className}>
        {children}
      </PageMain>

      {/* Bottom Sticky Action Bar for Mobile Screens */}
      <MobileStickyActionBar />

      {/* Footer block */}
      <Footer />
    </div>
  );
};
export default SiteLayout;
