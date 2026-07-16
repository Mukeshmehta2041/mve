import React from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout, SEO } from '../components/layout';
import { Container, Section, Button, Breadcrumb, EmptyGuard, ResponsiveImage } from '../components/ui';
import { productsData } from '../data';
import { getProductSchema } from '../lib/seo';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return (
      <MainLayout>
        <SEO title="Product Not Found" description="The requested industrial product is unavailable." />
        <Section>
          <Container>
            <EmptyGuard
              title="Product Details Unavailable"
              message="The product you are trying to view does not exist in our catalog or is pending client verification."
              actionText="Return to Catalogue"
              onActionClick={() => {
                window.location.href = '/products';
              }}
            />
          </Container>
        </Section>
      </MainLayout>
    );
  }

  const breadcrumbs = [
    { label: 'Products', href: '/products' },
    { label: product.name },
  ];

  const productSchema = getProductSchema(product);

  return (
    <MainLayout>
      <SEO
        title={`${product.name} | Custom Fabrication`}
        description={product.description}
        canonicalPath={`/products/${product.slug}`}
        schemaJson={productSchema}
      />
      <Section className="bg-white">
        <Container>
          <Breadcrumb items={breadcrumbs} className="mb-6" />

          {/* Product Header & Gallery split grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left mb-12">
            {/* Product Image / Gallery (4:3 ratio) */}
            <div className="lg:col-span-7 space-y-4">
              <ResponsiveImage
                src={product.image}
                alt={product.name}
                ratio="4:3"
                className="rounded-card object-cover"
              />
              
              {/* Gallery Preview strip if product has a larger gallery (like Storage Tank) */}
              {product.gallery && product.gallery.length > 1 && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Product Gallery ({product.gallery.length} Images)
                  </span>
                  <div className="grid grid-cols-6 gap-2">
                    {product.gallery.slice(0, 6).map((img, idx) => (
                      <div key={idx} className="aspect-square bg-slate-100 rounded-sm overflow-hidden border border-border">
                        <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Metadata & Actions */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="text-xs uppercase tracking-wider font-bold text-primary block mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-navy-950 leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-base text-slate-650 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mt-auto pt-6 border-t border-border">
                <Button
                  href={`/quote?product=${product.slug}`}
                  variant="primary"
                  className="flex-grow md:flex-grow-0"
                >
                  Request a Quote
                </Button>
                {contactData.whatsapp !== 'pending verification' && (
                  <Button
                    href={`https://wa.me/${contactData.whatsapp}?text=I%20am%20interested%20in%20${encodeURIComponent(product.name)}`}
                    variant="whatsapp"
                    className="flex-grow md:flex-grow-0"
                  >
                    Inquire on WhatsApp
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Product Specifications & Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left pt-12 border-t border-border">
            {/* Tech Specs */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-navy-950 mb-4 pb-2 border-b border-border">
                Technical Specifications
              </h2>
              <div className="divide-y divide-border">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="py-3 flex justify-between text-sm">
                    <span className="font-semibold text-navy-950 pr-4">{key}</span>
                    <span className="text-slate-600 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features & Applications */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-navy-950 mb-4 pb-2 border-b border-border">
                  Key Features
                </h2>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-navy-950 mb-4 pb-2 border-b border-border">
                  Typical Applications
                </h2>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {product.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2.5 flex-shrink-0"></div>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default ProductDetail;
