import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SiteLayout, SEO, PageCTA } from '../components/layout';
import { Container, Section, Button, Breadcrumb, EmptyGuard } from '../components/ui';
import { productsData, contactData, processStepsData } from '../data';
import { getProductSchema, getBreadcrumbSchema, getFAQSchema } from '../lib/seo';
import { getQuoteUrl, cn } from '../lib/utils';
import { trackEvent } from '../lib/analytics';
import { ASSETS } from '../lib/assets';
import { useFocusTrap } from '../lib/useFocusTrap';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData.find((p) => p.slug === slug);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  // The zoom trigger, so focus returns to it when the lightbox closes
  const lightboxTriggerRef = useRef<HTMLButtonElement>(null);

  const closeLightbox = useCallback(() => setIsLightboxOpen(false), []);

  // Track product detail page view
  useEffect(() => {
    if (product) {
      trackEvent('product_detail_view', { productSlug: product.slug });
      // Reset state for new product slug
      setActiveImgIndex(0);
      setExpandedFaqIndex(null);
    }
  }, [product, slug]);

  const galleryImages = product?.gallery && product.gallery.length > 0 
    ? product.gallery 
    : (product ? [product.image] : []);

  // Scroll lock, focus trap, Escape, and focus restore to the zoom trigger
  useFocusTrap({
    isOpen: isLightboxOpen,
    containerRef: lightboxRef,
    onClose: closeLightbox,
    restoreFocusTo: lightboxTriggerRef,
  });

  // Arrow-key navigation between gallery images while the lightbox is open
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === 'ArrowLeft' && galleryImages.length > 1) {
        setActiveImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      } else if (e.key === 'ArrowRight' && galleryImages.length > 1) {
        setActiveImgIndex((prev) => (prev + 1) % galleryImages.length);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isLightboxOpen, galleryImages.length]);

  if (!product) {
    return (
      <SiteLayout>
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
      </SiteLayout>
    );
  }

  // Resolve related products
  const relatedProducts = productsData.filter(
    (p) => product.relatedProducts?.includes(p.slug) && p.slug !== product.slug
  );

  // Fallback related products if none resolved
  const fallbackRelatedProducts = relatedProducts.length > 0 
    ? relatedProducts 
    : productsData.filter((p) => p.slug !== product.slug).slice(0, 3);

  // Keyboard navigation for image gallery
  const handleGalleryKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (galleryImages.length <= 1) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (activeImgIndex - 1 + galleryImages.length) % galleryImages.length;
      setActiveImgIndex(prevIdx);
      trackEvent('product_gallery_change', { productSlug: product.slug, index: prevIdx, trigger: 'keyboard' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (activeImgIndex + 1) % galleryImages.length;
      setActiveImgIndex(nextIdx);
      trackEvent('product_gallery_change', { productSlug: product.slug, index: nextIdx, trigger: 'keyboard' });
    }
  };

  const handlePrevImage = () => {
    const prevIdx = (activeImgIndex - 1 + galleryImages.length) % galleryImages.length;
    setActiveImgIndex(prevIdx);
    trackEvent('product_gallery_change', { productSlug: product.slug, index: prevIdx, trigger: 'click_prev' });
  };

  const handleNextImage = () => {
    const nextIdx = (activeImgIndex + 1) % galleryImages.length;
    setActiveImgIndex(nextIdx);
    trackEvent('product_gallery_change', { productSlug: product.slug, index: nextIdx, trigger: 'click_next' });
  };

  // Clean specifications
  const validSpecs = Object.entries(product.specifications || {}).filter(
    ([, val]) => val && val.trim() !== '' && val.toLowerCase() !== 'n/a' && val.toLowerCase() !== 'coming soon'
  );

  // Setup Contact Actions
  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';

  // WhatsApp link generator
  const whatsappMsg = `Hello Maa Vindhawasini Enterprises, I am interested in the ${product.name} shown on your website and would like to discuss my requirement.`;
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  // Default general FAQs that are factually safe
  const defaultFaqs = [
    {
      question: `Can the ${product.name} be customized?`,
      answer: `Yes, we specialize in custom metal fabrication. The ${product.name} can be tailored to meet your target capacity, dimensions, layout footprint, and material grades (e.g. Stainless Steel or Mild Steel) based on your custom specifications.`,
    },
    {
      question: 'What details are required for a product quote?',
      answer: `To compile an itemized quotation, we typically need your required capacity, dimensional preferences, material specifications (MS or SS grade), basic sketches or drawing files if available, and the delivery site location.`,
    },
    {
      question: 'Can I share my own engineering drawings?',
      answer: 'Absolutely. We regularly work with customer-supplied structural drafts or mechanical layout blueprints. You can upload these drawings directly through our online quote form or share them with our team via email.',
    },
    {
      question: 'Do you provide delivery and logistics outside Patna?',
      answer: 'Yes, we provide pan-India logistics coordination. All products are securely dispatched from our Patna facility with transit safety protocols, delivering to industrial sites and plants nationwide.',
    },
    {
      question: 'Is structural installation and site setup support available?',
      answer: 'Yes, depending on the product type (such as heavy storage tanks, industrial chimneys, or material hoppers) and project location, our experienced field technicians can be scheduled to support structural installation and site alignment.',
    },
  ];

  const productFaqs = product.faqs && product.faqs.length > 0 ? product.faqs : defaultFaqs;

  const productSchemas = [
    getProductSchema(product),
    getBreadcrumbSchema([
      { label: 'Products', href: '/products' },
      { label: product.name, href: `/products/${product.slug}` },
    ]),
    getFAQSchema(productFaqs),
  ];

  return (
    <SiteLayout>
      <SEO
        title={product.seoTitle || `${product.name} Manufacturer Patna | Custom Steel Fabrication`}
        description={product.seoDescription || product.description}
        canonicalPath={`/products/${product.slug}`}
        ogImage={product.image}
        schemaJson={productSchemas}
      />

      <Section className="bg-white pt-6 pb-12 md:pb-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: 'Products', href: '/products' }, { label: product.name }]} className="mb-4" />

          {/* Hero Section Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-4">
              <div 
                ref={galleryRef}
                onKeyDown={handleGalleryKeyDown}
                tabIndex={0}
                className="relative aspect-[4/3] w-full rounded-card overflow-hidden bg-slate-50 border border-border group focus:ring focus:outline-none"
                aria-label="Product Image Gallery. Use Left and Right arrow keys to change images."
              >
                {/* Active image. A real button, not an img with onClick: the
                    zoom affordance was previously unreachable by keyboard. */}
                <button
                  ref={lightboxTriggerRef}
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="block w-full h-full cursor-zoom-in focus-ring"
                  aria-label={`View ${product.name} image ${activeImgIndex + 1} fullscreen`}
                >
                  <img
                    src={galleryImages[activeImgIndex]}
                    alt={`${product.name} - View ${activeImgIndex + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Left/Right Navigation Arrows if multiple images */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-navy-950/70 hover:bg-navy-950 text-white w-11 h-11 rounded-full flex items-center justify-center transition-colors focus-ring z-10"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-navy-950/70 hover:bg-navy-950 text-white w-11 h-11 rounded-full flex items-center justify-center transition-colors focus-ring z-10"
                      aria-label="Next image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image count — only meaningful when there is more than one image */}
                {galleryImages.length > 1 && (
                  <span className="absolute bottom-3 right-3 bg-navy-950/80 text-white text-xs font-medium px-2.5 py-1 rounded-sm">
                    {activeImgIndex + 1} / {galleryImages.length}
                  </span>
                )}
              </div>

              {/* Thumbnails strip */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto overflow-y-hidden pb-2 -mb-1 snap-x scroll-px-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImgIndex(idx);
                        trackEvent('product_gallery_change', { productSlug: product.slug, index: idx, trigger: 'thumbnail_click' });
                      }}
                      className={cn(
                        "w-20 h-16 snap-start rounded-sm overflow-hidden border-2 bg-slate-50 transition-all flex-shrink-0 cursor-pointer focus-ring",
                        activeImgIndex === idx ? "border-primary opacity-100" : "border-border opacity-70 hover:opacity-100"
                      )}
                      aria-label={`View Image ${idx + 1}`}
                      aria-current={activeImgIndex === idx ? "true" : "false"}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Overview & Action Panel */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider bg-primary-soft text-primary mb-3">
                  <img src={product.categoryIcon} alt="" className="w-3.5 h-3.5 object-contain" />
                  {product.category}
                </span>

                <h1 className="text-3xl md:text-4xl font-extrabold text-navy-950 leading-tight mb-4">
                  {product.name}
                </h1>

                <p className="text-base text-slate-600 leading-relaxed font-sans mb-6">
                  {product.description}
                </p>

                {/* Key Benefits Bullet Indicators */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-navy-950 font-semibold font-sans">
                    <div className="w-5 h-5 bg-primary-soft text-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span>Heavy-duty Structural MS/SS Build</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-navy-950 font-semibold font-sans">
                    <div className="w-5 h-5 bg-primary-soft text-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span>Custom Engineered to Project Specs</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-navy-950 font-semibold font-sans">
                    <div className="w-5 h-5 bg-primary-soft text-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span>Pan-India Logistics & Delivery Support</span>
                  </div>
                </div>
              </div>

              {/* CTAs Row */}
              <div className="pt-6 border-t border-border space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    href={getQuoteUrl({ product: product.slug })}
                    variant="primary"
                    className="flex-1 font-bold text-sm tracking-wider uppercase h-12"
                    onClick={() => trackEvent('product_quote_click', { productSlug: product.slug, position: 'hero' })}
                  >
                    Request a Quote
                  </Button>

                  {hasWhatsapp && (
                    <Button
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="whatsapp"
                      className="flex-1 font-bold text-sm tracking-wider uppercase h-12"
                      onClick={() => trackEvent('product_whatsapp_click', { productSlug: product.slug, position: 'hero' })}
                      icon={
                        <img src={ASSETS.icons.whatsapp} alt="" className="w-5 h-5 brightness-0 invert" />
                      }
                      iconPosition="left"
                    >
                      WhatsApp Inquiry
                    </Button>
                  )}
                </div>

                {verifiedPhone && (
                  <Button
                    href={`tel:${verifiedPhone}`}
                    variant="secondary"
                    className="w-full font-bold text-sm tracking-wider uppercase h-12"
                    onClick={() => trackEvent('product_call_click', { productSlug: product.slug, position: 'hero' })}
                    icon={
                      <img src={ASSETS.icons.phone} alt="" className="w-4 h-4" />
                    }
                    iconPosition="left"
                  >
                    Call: {verifiedPhone}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Details Section */}
      <Section className="bg-surface pt-12 pb-16 md:py-20 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Technical Specifications (Semantic and Responsive Table) */}
            <div className="lg:col-span-7 space-y-10 text-left">
              {validSpecs.length >= 2 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-navy-950 mb-5 pb-2 border-b border-border flex items-center gap-2">
                    <img src={ASSETS.icons.fileText} alt="" className="w-5 h-5 object-contain" />
                    Technical Specifications
                  </h2>
                  
                  {/* Desktop view: Semantic Table markup */}
                  <table className="hidden md:table w-full text-sm text-left border-collapse bg-white rounded-card overflow-hidden shadow-card border border-border" aria-label={`Technical specifications for ${product.name}`}>
                    <thead>
                      <tr className="bg-slate-50 border-b border-border">
                        <th scope="col" className="px-6 py-4 font-bold text-navy-950 w-2/5">Specification Parameter</th>
                        <th scope="col" className="px-6 py-4 font-bold text-navy-950 w-3/5">Details / Capacity Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border font-sans">
                      {validSpecs.map(([key, val]) => (
                        <tr key={key} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-3.5 font-bold text-navy-950">{key}</td>
                          <td className="px-6 py-3.5 text-slate-600">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile view: Stacked layout card-like representation */}
                  <div className="md:hidden space-y-3">
                    {validSpecs.map(([key, val]) => (
                      <div key={key} className="bg-white border border-border p-4 rounded-card shadow-sm flex flex-col gap-1 font-sans">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{key}</span>
                        <span className="text-sm font-semibold text-navy-950">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Manufacturing & Customization Capabilities */}
              <div className="bg-white border border-border p-6 md:p-8 rounded-card shadow-card">
                <h3 className="text-lg md:text-xl font-bold text-navy-950 mb-3 flex items-center gap-2">
                  <img src={ASSETS.icons.gear} alt="" className="w-5 h-5 object-contain" />
                  Engineering & Customization Options
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
                  Every industrial setup demands precise dimensional limits and design characteristics. We support custom alignments, layout alterations, fitting revisions, and material options.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans mb-6">
                  <div className="flex items-start gap-2.5">
                    <img src={ASSETS.icons.check} alt="" className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
                    <span className="text-slate-700">Dimensions built according to site coordinates</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <img src={ASSETS.icons.check} alt="" className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
                    <span className="text-slate-700">High-grade raw materials (SS304, SS316, IS2062 MS)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <img src={ASSETS.icons.check} alt="" className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
                    <span className="text-slate-700">Custom connection nozzles and fitting mounts</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <img src={ASSETS.icons.check} alt="" className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
                    <span className="text-slate-700">Optional internal structural linings or surface coats</span>
                  </div>
                </div>
                <Button
                  href={getQuoteUrl({ product: product.slug, type: 'custom' })}
                  variant="secondary"
                  size="sm"
                  className="font-bold text-xs"
                  onClick={() => trackEvent('product_custom_quote_click', { productSlug: product.slug })}
                >
                  Discuss Your Custom Requirement
                </Button>
              </div>
            </div>

            {/* Side Column: Features & Applications */}
            <div className="lg:col-span-5 space-y-10 text-left">
              {/* Product Key Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-navy-950 mb-5 pb-2 border-b border-border flex items-center gap-2">
                    <img src={ASSETS.icons.shieldCheck} alt="" className="w-5 h-5 object-contain" />
                    Product Features
                  </h2>
                  <ul className="space-y-4 font-sans text-sm text-slate-600">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start bg-white p-4 rounded-card border border-border shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-primary-soft text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Typical Applications */}
              {product.applications && product.applications.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-navy-950 mb-5 pb-2 border-b border-border flex items-center gap-2">
                    <img src={ASSETS.icons.factory} alt="" className="w-5 h-5 object-contain" />
                    Typical Applications
                  </h2>
                  <div className="bg-white rounded-card border border-border p-4 md:p-6 shadow-sm">
                    <ul className="space-y-3 font-sans text-sm text-slate-600">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </Container>
      </Section>

      {/* Manufacturing & Quality Verification Workflow Section */}
      <Section className="bg-white border-b border-border py-12 md:py-16 text-left">
        <Container>
          <div className="max-w-3xl mb-8 md:mb-12">
            <span className="text-[11px] leading-[18px] tracking-[0.1em] uppercase font-bold text-primary block mb-2">Workflow Standards</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-navy-950">Manufacturing & Quality Controls</h2>
            <p className="mt-3 text-base text-slate-600 font-sans">
              We apply standardized engineering reviews, dimensional alignment checklists, and material validation steps to safeguard every fabrication batch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 pt-3 relative">
            {/* Horizontal timeline connector for large devices */}
            <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-slate-100 z-0"></div>
            
            {processStepsData.map((step) => (
              <div key={step.stepNumber} className="relative z-10 flex flex-col bg-slate-50 lg:bg-transparent border border-border lg:border-none p-5 lg:p-0 rounded-card items-start font-sans">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-500">
                    <img src={step.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 bg-navy-950 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-navy-950 mb-1">{step.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px]">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Accessible FAQ Section */}
      <Section className="bg-surface border-b border-border py-12 md:py-16 text-left">
        <Container className="max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Inquiries</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3 font-sans">
            {productFaqs.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div key={idx} className="bg-white border border-border rounded-card overflow-hidden shadow-sm transition-all duration-200">
                  <button
                    onClick={() => {
                      const nextState = isExpanded ? null : idx;
                      setExpandedFaqIndex(nextState);
                      if (nextState !== null) {
                        trackEvent('product_faq_expand', { productSlug: product.slug, question: faq.question });
                      }
                    }}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-navy-950 hover:bg-slate-50 transition-colors focus-ring"
                    aria-expanded={isExpanded}
                    aria-controls={`faq-panel-${idx}`}
                    id={`faq-btn-${idx}`}
                  >
                    <span className="text-sm md:text-base pr-4">{faq.question}</span>
                    <svg
                      className={cn("w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-200", isExpanded && "rotate-180")}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  
                  {isExpanded && (
                    <div
                      id={`faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      className="px-6 pb-5 pt-1 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-slate-50/50"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Related Products Showcase */}
      <Section className="bg-white border-b border-border py-12 md:py-16 text-left">
        <Container>
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">Catalog Links</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950">Related Industrial Products</h2>
            </div>
            <Link to="/products" className="text-primary hover:text-primary-hover font-bold text-sm flex items-center gap-1 group font-sans">
              View Entire Catalogue 
              <svg className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackRelatedProducts.map((p) => {
              // Renders using the existing ProductCard
              return (
                <div 
                  key={p.id} 
                  onClick={() => trackEvent('product_related_click', { productSlug: product.slug, clickedSlug: p.slug })}
                >
                  <Link to={`/products/${p.slug}`} className="block h-full cursor-pointer">
                    <div className="bg-white border border-border rounded-card overflow-hidden shadow-card flex flex-col h-full hover:translate-y-[-3px] transition-all duration-300">
                      {/* Product Card Image */}
                      <div className="aspect-[4/3] w-full rounded-sm overflow-hidden bg-slate-100 mb-4 relative">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {p.category && (
                          <span className="absolute top-3 left-3 bg-navy-950/85 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">
                            {p.category}
                          </span>
                        )}
                      </div>

                      <div className="flex-grow flex flex-col p-5 pt-0">
                        <h3 className="text-lg font-bold text-navy-950 leading-tight mb-2">
                          {p.name}
                        </h3>
                        
                        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2 font-sans">
                          {p.description}
                        </p>

                        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between text-xs text-primary font-bold font-sans">
                          <span>View Details</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Product-Specific Final Quote CTA */}
      <PageCTA
        title={`Need a Custom ${product.name}?`}
        description="Specify your dimensions, volume limits, plate gauge (thickness), application details, and installation needs. Our fabrication team will examine the drawings and supply a full pricing proposal."
        quote={{
          href: getQuoteUrl({ product: product.slug }),
          onClick: () =>
            trackEvent('product_quote_click', { productSlug: product.slug, position: 'footer_cta' }),
        }}
        whatsappUrl={whatsappUrl}
        whatsappLabel="WhatsApp Inquiry"
        onWhatsappClick={() =>
          trackEvent('product_whatsapp_click', { productSlug: product.slug, position: 'footer_cta' })
        }
        showCall
        onCallClick={() =>
          trackEvent('product_call_click', { productSlug: product.slug, position: 'footer_cta' })
        }
      />

      {/* Accessible Full-Screen Lightbox Portal Mock */}
      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery fullscreen preview"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 select-none"
        >
          {/* Close lightbox button */}
          <button
            ref={lightboxCloseRef}
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-navy-950/80 hover:bg-navy-950 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-ring cursor-pointer z-50"
            aria-label="Close fullscreen preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Lightbox view wrapper */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
            {galleryImages.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-navy-950/70 hover:bg-navy-950 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-ring z-10"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}

            <img
              src={galleryImages[activeImgIndex]}
              alt={`${product.name} - Fullscreen View ${activeImgIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
            />

            {galleryImages.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-navy-950/70 hover:bg-navy-950 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-ring z-10"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}
          </div>

          {/* Lightbox index indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-sans text-sm">
            {activeImgIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </SiteLayout>
  );
};

export default ProductDetail;
