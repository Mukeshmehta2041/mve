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
          title="What we build"
          description="Seven standard product lines, each made to order. Capacities, dimensions, and materials are set by your specification."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {productsData.slice(0, 3).map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Catalog CTA */}
        <div className="text-center pt-12">
          <Button href="/products" variant="secondary" className="w-full sm:w-auto">
            View all products
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
