import React from 'react';
import { MainLayout, SEO } from '../components/layout';
import { Container, Section, SectionHeader, ProductCard } from '../components/ui';
import { productsData } from '../data';

export const Products: React.FC = () => {
  return (
    <MainLayout>
      <SEO
        title="Industrial Products Catalogue"
        description="Browse our catalogue of custom-fabricated equipment, including resin glue kettles, storage tanks, and construction shuttering plates."
        canonicalPath="/products"
      />
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Our Offerings"
            title="Industrial Products & Equipment"
            description="Explore our seven core custom-fabricated product lines. Manufactured to exact standards."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default Products;
