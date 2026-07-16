import React from 'react';
import { SiteHeader } from './SiteHeader';
import { Footer } from './Footer';
import { MobileStickyActionBar } from './MobileStickyActionBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-surface-muted text-foreground">
      {/* 
        Skip to content link (design.md Section 12 & Accessibility Baseline)
      */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2.5 focus:rounded-card focus:font-bold focus:shadow-floating focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Header element */}
      <SiteHeader />

      {/* 
        Main content viewport area. 
        Note: pb-20 prevents content from being covered by the mobile sticky actions.
      */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow pb-16 lg:pb-0 focus:outline-none"
      >
        {children}
      </main>

      {/* Sticky Bottom Actions for Mobile Screens */}
      <MobileStickyActionBar />

      {/* Footer element */}
      <Footer />
    </div>
  );
};
export default MainLayout;
