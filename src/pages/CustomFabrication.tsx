import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteLayout, SEO } from '../components/layout';
import { Container, Section, SectionHeader, Button, Breadcrumb, ProjectCard } from '../components/ui';
import {
  contactData,
  projectsData,
  customCategoriesData,
  customizationParametersData,
  fabricationMaterialsData,
  customFabricationProcessSteps,
  fabricationQualityChecksData,
} from '../data';
import { getQuoteUrl } from '../lib/utils';
import { trackEvent } from '../lib/analytics';
import { ASSETS } from '../lib/assets';

export const CustomFabrication: React.FC = () => {
  // Track page view event
  useEffect(() => {
    trackEvent('custom_fabrication_view');
  }, []);

  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';
  
  const whatsappMsg = 'Hello Maa Vindhawasini Enterprises, I have a custom fabrication requirement and would like to discuss my project drawings.';
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  // Filter projects relating to custom work
  const customProjects = projectsData.slice(0, 3);

  return (
    <SiteLayout>
      <SEO
        title="Custom Mild Steel (MS) Fabrication & Equipment"
        description="We manufacture custom steel frameworks, storage vessels, hoppers, and chimneys matching client drawings and dimensions in Patna, Bihar."
        canonicalPath="/custom-fabrication"
      />

      {/* Hero Section */}
      <Section className="bg-navy-950 text-white pt-6 pb-14 md:pb-20 xl:pb-24 text-left relative overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <Container className="relative z-10">
          <Breadcrumb onDark 
            items={[{ label: 'Custom Fabrication' }]} 
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-heading">
                  Fabrication built around your requirement
                </h1>
              </div>

              <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl font-sans">
                From customer drawings and dimensions to fabrication and delivery, we build industrial solutions tailored to specific project needs. We work directly with your templates, sketches, or structural designs.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  href={getQuoteUrl({ service: 'custom-fabrication' })}
                  variant="primary"
                  className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                  onClick={() => trackEvent('custom_quote_click', { position: 'hero' })}
                >
                  Request Custom Quote
                </Button>
                <Button
                  href={getQuoteUrl({ service: 'custom-fabrication', type: 'drawing-upload' })}
                  variant="outline-light"
                  className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                  onClick={() => trackEvent('custom_drawing_click', { position: 'hero' })}
                >
                  Share Your Drawing
                </Button>
              </div>

            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-lg overflow-hidden border border-slate-800 shadow-card aspect-[4/3] bg-navy-900 relative">
                <img
                  src={ASSETS.hero.fabrication}
                  alt="A welder joining a large-diameter flanged cylindrical vessel inside a workshop, with sparks flying"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* What We Can Fabricate */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <SectionHeader
            title="Custom Equipment & Assemblies We Fabricate"
            description="We manufacture custom steel units and process containment parts matching client-provided drawings and dimensions."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-3 font-sans">
            {customCategoriesData.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-50 border border-border rounded-card p-6 flex flex-col justify-between hover:translate-y-[-3px] transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center mb-4">
                    <img src={cat.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 mb-2 leading-snug">{cat.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{cat.desc}</p>
                </div>

                {cat.productSlug && (
                  <Link
                    to={`/products/${cat.productSlug}`}
                    className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 mt-auto pt-2 border-t border-slate-200/60"
                  >
                    View Product Details
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Customization Capabilities */}
      <Section className="bg-surface border-b border-border text-left">
        <Container>
          <SectionHeader
            title="Built Around Your Drawings, Dimensions and Application"
            description="All fabrications are subject to technical drawings review and load feasibility alignment."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-3 font-sans">
            {customizationParametersData.map((param, idx) => (
              <div key={idx} className="bg-white border border-border p-6 rounded-card shadow-card flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-primary">
                  <img src={param.icon} alt="" aria-hidden="true" className="w-4 h-4 object-contain text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-navy-950">{param.label}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{param.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Requirement-to-Delivery Process */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <SectionHeader
            title="Our Custom Engineering & Delivery Process"
            description="We coordinate each phase—from drawing checks to site logistics—to deliver structural alignment."
            align="center"
          />

          {/* Connected timeline */}
          <div className="relative pt-6 font-sans">
            {/* Desktop timeline connector line */}
            <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-slate-100 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              {customFabricationProcessSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-slate-50 lg:bg-transparent border border-border lg:border-none p-5 lg:p-0 rounded-card flex flex-col items-start"
                >
                  <div className="relative flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-500">
                      <img src={step.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 bg-navy-950 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-navy-950 mb-1 leading-snug">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Materials & Fabrication Capabilities */}
      <Section className="bg-surface border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 leading-tight">
                Steel Material Grades & Workshop Capacities
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                We maintain inventories of certified steel plates and structural profiles. All fabrication jobs undergo visual weld audits, surface priming, and dimensional verification before dispatch.
              </p>

              <div className="space-y-4 font-sans">
                {fabricationMaterialsData.map((mat, idx) => (
                  <div key={idx} className="bg-white border border-border p-5 rounded-card shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy-950 text-base">{mat.name}</span>
                      <span className="text-[11px] font-bold text-primary bg-primary-soft px-2.5 py-0.5 rounded-sm uppercase tracking-wide">
                        {mat.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{mat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Workshop capabilities list */}
            <div className="lg:col-span-6 space-y-6 bg-white p-6 md:p-8 rounded-card border border-border shadow-card text-left font-sans">
              <h3 className="text-lg md:text-xl font-bold text-navy-950 mb-4 pb-2 border-b border-border flex items-center gap-2">
                <img src={ASSETS.icons.wrench} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                Workshop Capabilities
              </h3>
              
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-soft text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-navy-950 block">Profile & Plate Cutting</strong>
                    <span className="text-xs text-slate-500">Accurate sizing of structural steel plates and channel cross-sections.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-soft text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-navy-950 block">Steel Plate Rolling & Forming</strong>
                    <span className="text-xs text-slate-500">Shaping raw steel sheets into cylindrical shells for tanks and boiler chimneys.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-soft text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-navy-950 block">CO2 MIG & Shielded Arc Welding</strong>
                    <span className="text-xs text-slate-500">Executed by experienced shop operators to maintain robust joint structural life.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-soft text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-navy-950 block">Industrial Priming & Painting</strong>
                    <span className="text-xs text-slate-500">Applying protective red-oxide primer coats and finishing coats to extend outdoor operational life.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quality Checks */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950">Quality Checks at Every Relevant Stage</h2>
            </div>
            <Link
              to="/quality-certifications"
              className="text-primary hover:text-primary-hover font-bold text-sm flex items-center gap-1 group font-sans"
              onClick={() => trackEvent('custom_quality_click')}
            >
              View Quality & Certifications
              <svg className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {fabricationQualityChecksData.map((check, idx) => (
              <div key={idx} className="bg-slate-50 border border-border p-5 rounded-card shadow-sm flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-primary">
                  <img src={check.icon} alt="" aria-hidden="true" className="w-4 h-4 object-contain" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-navy-950">{check.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{check.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Selected Example Projects */}
      {customProjects.length > 0 && (
        <Section className="bg-surface border-b border-border text-left">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950">Example Custom Fabrication Projects</h2>
              </div>
              <Link
                to="/projects"
                className="text-primary hover:text-primary-hover font-bold text-sm flex items-center gap-1 group font-sans"
              >
                View Our Complete Portfolio
                <svg className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => trackEvent('custom_project_click', { projectSlug: project.productSlug })}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Drawing Upload & Bottom Quote CTA */}
      <Section background="dark" className="border-t border-slate-800 text-center py-14 md:py-20">
        <Container className="max-w-4xl space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white font-heading">
            Have a Drawing or Custom Requirement?
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-300 max-w-2xl mx-auto font-sans">
            Specify your dimensions, quantity targets, material choice, and drawings. Our engineering estimating team will review the parameters and compile a detailed price proposal.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-3">
            <Button
              href={getQuoteUrl({ service: 'custom-fabrication', type: 'drawing-upload' })}
              variant="primary"
              size="md"
              className="font-bold text-sm tracking-wider uppercase h-12"
              onClick={() => trackEvent('custom_quote_click', { position: 'footer_cta' })}
            >
              Upload Drawing & Request Quote
            </Button>

            {hasWhatsapp && (
              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="md"
                className="font-bold text-sm tracking-wider uppercase h-12 animate-none"
                onClick={() => trackEvent('custom_whatsapp_click', { position: 'footer_cta' })}
              >
                <img src={ASSETS.icons.whatsapp} alt="" aria-hidden="true" className="w-5 h-5 mr-2 brightness-0 invert" />
                WhatsApp Your Requirement
              </Button>
            )}

            {verifiedPhone && (
              <Button
                href={`tel:${verifiedPhone}`}
                variant="outline-light"
                size="md"
                className="font-bold text-sm tracking-wider uppercase h-12"
              >
                <img src={ASSETS.icons.phone} alt="" aria-hidden="true" className="w-4 h-4 mr-2 filter invert" />
                Call: {verifiedPhone}
              </Button>
            )}
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
};

export default CustomFabrication;
