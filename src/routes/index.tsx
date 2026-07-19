import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { ScrollToTop } from './ScrollToTop';

// Home and Products stay in the main bundle: they are the two most common entry
// points, so splitting them would only add a round trip. Everything else is
// lazy — the quote form, product detail, and legal pages were all being shipped
// to every first-time visitor.
const About = lazy(() => import('../pages/About').then((m) => ({ default: m.About })));
const ProductDetail = lazy(() =>
  import('../pages/ProductDetail').then((m) => ({ default: m.ProductDetail }))
);
const CustomFabrication = lazy(() =>
  import('../pages/CustomFabrication').then((m) => ({ default: m.CustomFabrication }))
);
const Projects = lazy(() => import('../pages/Projects').then((m) => ({ default: m.Projects })));
const QualityCertifications = lazy(() =>
  import('../pages/QualityCertifications').then((m) => ({ default: m.QualityCertifications }))
);
const Contact = lazy(() => import('../pages/Contact').then((m) => ({ default: m.Contact })));
const RequestAQuote = lazy(() =>
  import('../pages/RequestAQuote').then((m) => ({ default: m.RequestAQuote }))
);
const PrivacyPolicy = lazy(() =>
  import('../pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy }))
);
const Terms = lazy(() => import('../pages/Terms').then((m) => ({ default: m.Terms })));
const Disclaimer = lazy(() =>
  import('../pages/Disclaimer').then((m) => ({ default: m.Disclaimer }))
);
const NotFound = lazy(() => import('../pages/NotFound').then((m) => ({ default: m.NotFound })));

// Holds the viewport steady during a chunk fetch instead of collapsing the page.
const RouteFallback: React.FC = () => (
  <div className="min-h-[60vh]" role="status" aria-label="Loading page" />
);

export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/custom-fabrication" element={<CustomFabrication />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/quality-certifications" element={<QualityCertifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-a-quote" element={<RequestAQuote />} />

          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default AppRoutes;
