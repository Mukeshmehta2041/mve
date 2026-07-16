import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Products } from '../pages/Products';
import { ProductDetail } from '../pages/ProductDetail';
import { CustomFabrication } from '../pages/CustomFabrication';
import { Projects } from '../pages/Projects';
import { Quality } from '../pages/Quality';
import { Contact } from '../pages/Contact';
import { Quote } from '../pages/Quote';
import { DesignSystemPreview } from '../pages/DesignSystemPreview';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/custom-fabrication" element={<CustomFabrication />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/quality" element={<Quality />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quote" element={<Quote />} />
      
      {/* 
        Development-only Design System Preview page. 
        It is excluded from public navigation lists.
      */}
      <Route path="/design-system" element={<DesignSystemPreview />} />
      
      {/* 404 Route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};
export default AppRoutes;
