import React from 'react';
import { SiteLayout, SEO, PageHeroShell } from '../components/layout';
import { Container, Section, ProductCard } from '../components/ui';
import { productsData } from '../data';
import { getBreadcrumbSchema, getItemListSchema } from '../lib/seo';

export const Products: React.FC = () => {
  const productsSchemas = [
    getBreadcrumbSchema([{ label: 'Products', href: '/products' }]),
    getItemListSchema(productsData),
  ];

  return (
    <SiteLayout>
      <SEO
        title="Industrial Equipment & Steel Fabrication Products"
        description="Browse our catalogue of custom MS & SS industrial equipment: resin glue kettles, storage tanks, shuttering plates, hoppers, chimneys, and hot water generators."
        canonicalPath="/products"
        schemaJson={productsSchemas}
      />

      <PageHeroShell
        breadcrumb={[{ label: 'Products' }]}
        title="Products"
        description="Seven product lines, all made to order. Every capacity, dimension, and material grade below can be changed to suit your drawing."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
};
export default Products;
