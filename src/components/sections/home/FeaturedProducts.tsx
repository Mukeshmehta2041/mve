import React from 'react';
import { Container } from '../../ui/Container';
import { SectionHeader } from '../../ui/SectionHeader';
import { ProductCard } from '../../ui/ProductCard';
import { Button } from '../../ui/Button';
import { productsData } from '../../../data/products';

export const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-border">
      <Container>
        <SectionHeader
          eyebrow="Industrial Portfolio"
          title="Featured Products & Equipment"
          description="Precision-engineered reaction vessels, storage tanks, steel shuttering plates, and custom fabricated structures designed for demanding industrial operations."
          align="center"
        />

        {/* 7-Product Responsive Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {productsData.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Catalog CTA */}
        <div className="text-center pt-12">
          <Button href="/products" variant="secondary" className="w-full sm:w-auto">
            View Complete Catalog
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
