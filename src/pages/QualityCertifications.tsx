import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteLayout, SEO, PageCTA, PageHeroSplit } from '../components/layout';
import { Container, Section, SectionHeader, ProcessTimeline } from '../components/ui';
import { getBreadcrumbSchema } from '../lib/seo';
import {
  contactData,
  qualityCommitmentPointsData,
  qualityPageProcessStepsData,
  inspectionMethodsData,
} from '../data';
import { trackEvent } from '../lib/analytics';
import { ASSETS } from '../lib/assets';

export const QualityCertifications: React.FC = () => {
  // Track page view event
  useEffect(() => {
    trackEvent('quality_page_view');
  }, []);


  const whatsappMsg = 'Hello Maa Vindhawasini Enterprises, I am looking at your quality certifications and would like to discuss my project specifications.';
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  const qualitySchemas = getBreadcrumbSchema([{ label: 'Quality & Certifications', href: '/quality-certifications' }]);

  return (
    <SiteLayout>
      <SEO
        title="Quality Assurance & Industrial Fabrication Standards Patna"
        description="Learn about our manufacturing quality checks, raw material inspection guidelines, and testing methodologies in Patna, Bihar."
        canonicalPath="/quality-certifications"
        schemaJson={qualitySchemas}
      />

      <PageHeroSplit
        breadcrumb={[{ label: 'Quality & Certifications' }]}
        title="Quality & Certifications"
        description="A practical quality-focused approach across material review, fabrication, inspection, and final delivery. We maintain structural safety standards for every industrial build."
        primaryAction={{
          label: 'Request a Quote',
          href: '/request-a-quote?source=quality',
          onClick: () => trackEvent('quality_quote_click', { position: 'hero' }),
        }}
        secondaryAction={{ label: 'View Our Products', href: '/products' }}
        image={{
          src: ASSETS.hero.quality,
          alt: 'A welder laying a weld seam on a curved steel shell, with helmet down and sparks visible',
        }}
      />

      {/* Quality Commitment Section */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-sans">
            {/* Left Description Column */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 leading-tight">
                Quality Built Into Every Relevant Stage
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rather than relying on certificate badges alone, we follow operational workmanship checks to verify structural load limits, prevent fluid leakages, and guarantee dimensional accuracy.
              </p>
            </div>

            {/* Inline check marks, not another icon-tile card grid: the
                page's own process checklist two sections down already uses
                numbered circles, and these points are a summary of that, not
                a second sequence needing its own icon system. */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {qualityCommitmentPointsData.map((pt) => (
                <div key={pt.title} className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-success-ink flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-sm text-navy-950 mb-1 leading-snug">{pt.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Quality Process Section */}
      <Section className="bg-surface border-b border-border text-left">
        <Container>
          <SectionHeader
            title="Our Quality-Control Process Checklist"
            description="We apply standard checks at each fabrication milestone to ensure alignment with customer requirements."
            align="center"
          />

          <div className="pt-2 font-sans">
            <ProcessTimeline steps={qualityPageProcessStepsData} columns={4} showConnector={false} />
          </div>
        </Container>
      </Section>

      {/* Inspection & Verification Methods */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <SectionHeader
            title="Applied Inspections & Mechanical Checks"
            description="All tests and verification audits are applied selectively based on product type and agreed scope parameters."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-3 font-sans">
            {inspectionMethodsData.map((method) => (
              <div
                key={method.title}
                className="bg-slate-50 border border-border rounded-card p-6 flex flex-col justify-between hover:translate-y-[-3px] transition duration-300 shadow-card"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center mb-4">
                    <img src={method.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" width={20} height={20} decoding="async" />
                  </div>
                  <h3 className="text-base font-bold text-navy-950 mb-2 leading-snug">{method.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{method.desc}</p>
                </div>

                <span className="text-xs font-bold text-primary block pt-2 border-t border-slate-200 mt-auto">
                  {method.scopeLabel}
</span>
                
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quality Across Products and Custom Fabrication */}
      <Section className="bg-white border-b border-border text-left py-12 md:py-16">
        <Container>
          <div className="max-w-3xl font-sans">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-950 leading-tight">
                The same checks, whatever we&rsquo;re building
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Shuttering plates, storage tanks, exhaust stacks, or a one-off frame from your
                drawing — the same material and testing checks apply to all of it.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products"
                  className="text-primary hover:text-primary-hover font-bold text-sm flex items-center gap-1 group"
                  onClick={() => trackEvent('quality_products_click')}
                >
                  View Product Catalog
                  <svg className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>|
                <Link
                  to="/custom-fabrication"
                  className="text-primary hover:text-primary-hover font-bold text-sm flex items-center gap-1 group"
                  onClick={() => trackEvent('quality_custom_fabrication_click')}
                >
                  Explore Custom Fabrication
                  <svg className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>|
                <Link
                  to="/projects"
                  className="text-primary hover:text-primary-hover font-bold text-sm flex items-center gap-1 group"
                  onClick={() => trackEvent('quality_projects_click')}
                >
                  Browse Case Projects
                  <svg className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* Quality Final Quote CTA Section */}
      <PageCTA
        title="Need Quality-Focused Industrial Fabrication?"
        description="Provide your raw measurements, sketches, plate gauges, or target capacity limits. Our team will review the parameters to compile a detailed cost proposal."
        quote={{
          href: '/request-a-quote?source=quality',
          onClick: () => trackEvent('quality_quote_click', { position: 'footer_cta' }),
        }}
        whatsappUrl={whatsappUrl}
        onWhatsappClick={() => trackEvent('quality_whatsapp_click', { position: 'footer_cta' })}
        showCall
      />
    </SiteLayout>
  );
};

export default QualityCertifications;
