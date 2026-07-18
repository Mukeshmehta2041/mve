import React, { useEffect } from 'react';
import { SiteLayout, SEO } from '../components/layout';
import { Container, Section, Button, Breadcrumb, SectionHeader } from '../components/ui';
import {
  companyData,
  contactData,
  aboutTimelineData,
  aboutValuesData,
  aboutCapabilitiesData,
  aboutQualityHighlightsData,
  industriesData,
} from '../data';
import { trackEvent } from '../lib/analytics';
import { ASSETS } from '../lib/assets';

export const About: React.FC = () => {
  // Track page view event
  useEffect(() => {
    trackEvent('about_page_view');
  }, []);

  const hasWhatsapp = contactData.whatsapp !== 'pending verification';

  const whatsappMsg = 'Hello Maa Vindhawasini Enterprises, I am looking at your company details and would like to discuss my fabrication requirement.';
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <SiteLayout>
      <SEO
        title="About Us | Steel Fabrication Experts Patna"
        description="Learn about Maa Vindhawasini Enterprises (MVE), our Patna workshop facilities, and our 15+ years track record in custom industrial fabrication."
        canonicalPath="/about"
      />

      {/* About Page Hero */}
      <Section className="bg-navy-950 text-white pt-6 pb-12 md:pb-16 text-left relative overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <Container className="relative z-10 font-sans">
          <Breadcrumb 
            items={[{ label: 'About Us' }]} 
            className="text-slate-400 mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[12px] leading-[18px] tracking-[0.1em] uppercase font-bold text-primary block mb-3">
                  Our Identity
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-heading">
                  About Maa Vindhawasini Enterprises
                </h1>
              </div>

              <p className="text-base md:text-lg text-slate-350 leading-relaxed max-w-xl">
                Built on practical fabrication experience, quality-focused workmanship, and solutions tailored to industrial requirements.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  href="/request-a-quote"
                  variant="primary"
                  className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                  onClick={() => trackEvent('about_quote_click', { position: 'hero' })}
                >
                  Request a Quote
                </Button>
                <Button
                  href="/products"
                  variant="secondary"
                  className="font-bold text-sm tracking-wider uppercase h-12 bg-transparent text-white border-white hover:border-primary hover:text-primary flex-grow sm:flex-grow-0"
                  onClick={() => trackEvent('about_products_click', { position: 'hero' })}
                >
                  View Our Products
                </Button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-lg overflow-hidden border border-slate-800 shadow-card aspect-[16/10] bg-navy-900 relative">
                <img
                  src={ASSETS.hero.about}
                  alt="Industrial manufacturing workshop overview showing steel plates and structural frames."
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Company Overview Section */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center font-sans">
            {/* Left Image Column */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-lg overflow-hidden border border-border shadow-card aspect-[4/3] bg-slate-50 relative">
                <img
                  src={ASSETS.facilities.companyBuilding}
                  alt="Maa Vindhawasini Enterprises operational workshop exterior setup."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Details Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">Company Overview</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 leading-tight">
                  Building Strength. Delivering Reliable Solutions.
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-650 leading-relaxed">
                <p>
                  Established in {companyData.establishmentYear} in Patna, Bihar, <strong>{companyData.legalName}</strong> is a dedicated manufacturer specializing in Mild Steel (MS) and Stainless Steel (SS) fabrication. Over our {companyData.yearsOfExperienceClaim}+ years of operations, we have focused on providing heavy-duty structural solutions and process equipment tailored to our customers specifications.
                </p>
                <p>
                  We fabricate a wide range of industrial equipment, including chemical reaction vessels, resin kettles, custom process bins, silos, storage tanks, and concrete shuttering plates. Our workshop handles cutting, metal rolling, continuous seam welding, and surface treatment (anti-rust primers and coatings).
                </p>
                <p>
                  Operating directly from our facility in Didarganj, Patna, we work with infrastructure contractors, plywood/adhesive manufacturers, and chemical units. Our approach centers on providing realistic steel weight proposals, verifying raw plate gauges, and structural checks.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  href="/products"
                  variant="primary"
                  className="font-bold text-xs uppercase tracking-wide h-10 px-5"
                >
                  Explore Catalog Products
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Narrative Journey Section */}
      <Section className="bg-surface border-b border-border text-left">
        <Container className="max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">Our Journey</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 font-heading">Our Timeline & Milestones</h2>
            <p className="text-xs text-slate-500 font-sans mt-2">
              A historical look at the gradual growth in our production capacity and fabrication machinery limits in Bihar.
            </p>
          </div>

          <div className="space-y-6 relative font-sans before:absolute before:inset-y-0 before:left-4 before:w-[2px] before:bg-slate-200 z-10 pl-8">
            {aboutTimelineData.map((milestone, idx) => (
              <div key={idx} className="relative flex flex-col items-start bg-white border border-border p-5 rounded-card shadow-sm">
                <div className="absolute -left-6 top-6 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm flex items-center justify-center"></div>
                {milestone.year && (
                  <span className="text-xs font-mono font-bold text-primary block mb-1">
                    {milestone.year}
                  </span>
                )}
                <h4 className="font-bold text-sm text-navy-950 mb-1 leading-snug">{milestone.title}</h4>
                <p className="text-xs text-slate-550 leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission & Values Section */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-sans">
            {/* Left Column - Mission */}
            <div className="lg:col-span-5 bg-navy-950 text-white p-6 md:p-8 rounded-card shadow-card space-y-4">
              <span className="text-[10px] tracking-widest uppercase font-bold text-primary block">Strategic Mission</span>
              <h3 className="text-xl md:text-2xl font-extrabold leading-snug">Our Mission</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our mission is to fabricate high-integrity MS/SS industrial vessels, hoppers, stacks, and structural supports that precisely match customer capacity and layout parameters. We commit to using verified steel plate parameters and applying rigorous inspection standards to deliver structural safety for Patna and regional projects.
              </p>
            </div>

            {/* Right Column - Values Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">Core Integrity</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 leading-tight">
                  Values That Guide Our Manufacturing
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {aboutValuesData.map((val, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                      <img src={val.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-navy-950 mb-1 leading-snug">{val.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Manufacturing Facility Section */}
      <Section className="bg-surface border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center font-sans">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">Infrastructure</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 leading-tight">
                Our Patna Workshop Environment
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Located in Didarganj, Patna, Bihar, our manufacturing shop floor is structured to execute structural steel works and equipment fabrication. The yard is equipped with dedicated rolling beds, metal forming zones, welding bays, paint finishing zones, and final hydrostatic test pits. This configuration allows our floor managers to monitor each milestone without layout interference.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  href="/request-a-quote"
                  variant="primary"
                  className="font-bold text-sm tracking-wider uppercase h-12"
                >
                  Discuss Your Requirement
                </Button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-border shadow-card aspect-[16/10] bg-slate-50 relative">
                <img
                  src={ASSETS.facilities.manufacturing}
                  alt="Industrial manufacturing shop floor area with steel plates and equipment frames."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Workshop Capabilities Cards Grid */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <SectionHeader
            eyebrow="Capabilities"
            title="Workshop Capability Metrics"
            description="We perform primary metal fabrication operations in-house to guarantee quality checks."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-3 font-sans">
            {aboutCapabilitiesData.map((cap, idx) => (
              <div key={idx} className="bg-slate-50 border border-border p-6 rounded-card shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center mb-4">
                    <img src={cap.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                  </div>
                  <h3 className="text-base font-bold text-navy-950 mb-2 leading-snug">{cap.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{cap.desc}</p>
                </div>
                
                <div className="pt-3 border-t border-slate-200 mt-auto">
                  <ul className="space-y-1">
                    {cap.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-[10px] font-semibold text-slate-500 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Industries Served Section */}
      <Section className="bg-surface border-b border-border text-left">
        <Container>
          <SectionHeader
            eyebrow="Markets"
            title="Industrial Sectors We Support"
            description="We construct custom MS and SS equipment matching the regulatory codes of various processing units."
            align="center"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-sans">
            {industriesData.map((ind) => (
              <div key={ind.id} className="bg-white border border-border p-5 rounded-card shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                  <img src={ind.icon} alt="" aria-hidden="true" className="w-4 h-4 object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-navy-950 leading-snug mb-1">{ind.name}</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">{ind.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quality Preview Panel */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center font-sans">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">Compliance Overview</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 leading-tight">
                Practical Quality Compliance & Registrations
              </h2>
              <p className="text-sm text-slate-655 leading-relaxed">
                Maa Vindhawasini Enterprises maintains operational filings compliance. We are fully GST Registered, MSME / Udyam Registered, and hold standard Factory Licenses. Rather than showcasing unverified rating badges, we invite customers to verify our material inspections sheets and welding audits.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutQualityHighlightsData.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-primary font-bold text-xs">✓</span>
                    <div>
                      <h4 className="font-bold text-xs text-navy-950 mb-0.5 leading-snug">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  href="/quality-certifications"
                  variant="primary"
                  className="font-bold text-xs uppercase tracking-wide h-10 px-5"
                  onClick={() => trackEvent('about_quality_click')}
                >
                  View Quality & Certifications
                </Button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-border shadow-card aspect-[4/3] bg-slate-50 relative">
                <img
                  src={ASSETS.facilities.factoryHome}
                  alt="Industrial supervisor inspecting raw steel plate curvatures."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final Action CTA Block */}
      <Section background="dark" className="border-t border-slate-800 text-center py-14 md:py-20">
        <Container className="max-w-4xl space-y-6 font-sans">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white font-heading">
            Let’s Discuss Your Industrial Requirement.
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-300 max-w-2xl mx-auto">
            Submit your engineering sketches, target capacity limits, plate thickness specifications, or call our estimating team directly.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-3">
            <Button
              href="/request-a-quote"
              variant="primary"
              size="md"
              className="font-bold text-sm tracking-wider uppercase h-12"
              onClick={() => trackEvent('about_quote_click', { position: 'footer_cta' })}
            >
              Request a Quote
            </Button>
            <Button
              href="/products"
              variant="secondary"
              size="md"
              className="font-bold text-sm tracking-wider uppercase h-12 bg-transparent text-white border-white hover:border-primary hover:text-primary"
            >
              View Products
            </Button>

            {hasWhatsapp && (
              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="md"
                className="font-bold text-sm tracking-wider uppercase h-12"
                onClick={() => trackEvent('about_whatsapp_click')}
              >
                <img src={ASSETS.icons.whatsapp} alt="" aria-hidden="true" className="w-5 h-5 mr-2 brightness-0 invert" />
                WhatsApp Us
              </Button>
            )}
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
};

export default About;
