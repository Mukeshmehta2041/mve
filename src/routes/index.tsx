import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Products } from '../pages/Products';
import { ProductDetail } from '../pages/ProductDetail';
import { CustomFabrication } from '../pages/CustomFabrication';
import { Projects } from '../pages/Projects';
import { QualityCertifications } from '../pages/QualityCertifications';
import { Contact } from '../pages/Contact';
import { RequestAQuote } from '../pages/RequestAQuote';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { Terms } from '../pages/Terms';
import { Disclaimer } from '../pages/Disclaimer';
import { NotFound } from '../pages/NotFound';

export const AppRoutes: React.FC = () => {
  return (
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
  );
};
export default AppRoutes;
