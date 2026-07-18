import React, { useEffect } from 'react';
import { SiteLayout, SEO } from '../components/layout';
import { Container, Section, Button } from '../components/ui';
import { trackEvent } from '../lib/analytics';

export const NotFound: React.FC = () => {
  useEffect(() => {
    trackEvent('not_found_view', { path: window.location.pathname });
  }, []);

  return (
    <SiteLayout>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist on our servers."
        noindex={true}
      />
      <Section className="bg-white py-16 md:py-24 text-center">
        <Container className="max-w-2xl font-sans space-y-6">
          <div className="text-6xl md:text-8xl font-black text-slate-200 select-none tracking-tight font-heading">
            404
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy-950 leading-tight">
              Page Not Found
            </h1>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-md mx-auto">
              The page you are looking for may have moved, been renamed, or no longer exists. Use our links below to return to the catalog pages.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button
              href="/"
              variant="primary"
              className="font-bold text-xs uppercase tracking-wide h-11 px-6"
              onClick={() => trackEvent('not_found_navigation_click', { destination: 'home' })}
            >
              Return Home
            </Button>
            <Button
              href="/products"
              variant="secondary"
              className="font-bold text-xs uppercase tracking-wide h-11 px-6 bg-transparent border-navy-950 text-navy-950 hover:bg-slate-55"
              onClick={() => trackEvent('not_found_navigation_click', { destination: 'products' })}
            >
              View Products
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="font-bold text-xs uppercase tracking-wide h-11 px-6 bg-transparent border-slate-300 text-slate-600 hover:border-slate-400"
              onClick={() => trackEvent('not_found_navigation_click', { destination: 'contact' })}
            >
              Contact Us
            </Button>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
};

export default NotFound;
