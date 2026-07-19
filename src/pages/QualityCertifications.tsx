import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteLayout, SEO, PageCTA } from '../components/layout';
import { Container, Section, SectionHeader, Button, Breadcrumb } from '../components/ui';
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

      {/* Quality Hero Section */}
      <Section className="bg-navy-950 text-white pt-6 pb-12 md:pb-16 text-left relative overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <Container className="relative z-10">
          <Breadcrumb onDark 
            items={[{ label: 'Quality & Certifications' }]} 
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-heading">
                  Quality & Certifications
                </h1>
              </div>

              <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl font-sans">
                A practical quality-focused approach across material review, fabrication, inspection, and final delivery. We maintain structural safety standards for every industrial build.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  href="/request-a-quote?source=quality"
                  variant="primary"
                  className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                  onClick={() => trackEvent('quality_quote_click', { position: 'hero' })}
                >
                  Request a Quote
                </Button>
                <Button
                  href="/products"
                  variant="outline-light"
                  className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                >
                  View Our Products
                </Button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-lg overflow-hidden border border-slate-800 shadow-card aspect-[16/10] bg-navy-900 relative">
                <img
                  src={ASSETS.hero.quality}
                  alt="A welder laying a weld seam on a curved steel shell, with helmet down and sparks visible"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quality Commitment Section */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-sans">
            {/* Left Description Column */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 leading-tight">
                Quality Built Into Every Relevant Stage
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rather than relying on certificate badges alone, we follow operational workmanship checks to verify structural load limits, prevent fluid leakages, and guarantee dimensional accuracy.
              </p>
            </div>

            {/* Right Commitment Points Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {qualityCommitmentPointsData.map((pt, idx) => (
                <div key={idx} className="bg-slate-50 border border-border p-5 rounded-card shadow-sm space-y-3">
                  <div className="w-9 h-9 rounded-sm bg-primary-soft text-primary flex items-center justify-center">
                    <img src={pt.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-navy-950 mb-1 leading-snug">{pt.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{pt.desc}</p>
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

          {/* Process steps — 4 across on desktop so the text stays readable */}
          <div className="pt-2 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {qualityPageProcessStepsData.map((step) => (
                <div key={step.stepNumber} className="flex flex-col items-start">
                  <div className="relative flex items-center justify-center mb-4">
                    <div className="w-11 h-11 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-500">
                      <img src={step.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 bg-navy-950 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                      {step.stepNumber}
</span>
                    
                  </div>
                  <h3 className="font-bold text-sm text-navy-950 mb-1.5 leading-snug">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
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
            {inspectionMethodsData.map((method, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-border rounded-card p-6 flex flex-col justify-between hover:translate-y-[-3px] transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center mb-4">
                    <img src={method.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
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
