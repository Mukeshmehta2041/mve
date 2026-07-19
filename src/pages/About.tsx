import React, { useEffect } from 'react';
import { SiteLayout, SEO, PageCTA, PageHeroSplit } from '../components/layout';
import { getBreadcrumbSchema, getOrganizationSchema } from '../lib/seo';
import { Container, Section, Button, SectionHeader } from '../components/ui';
import {
  companyData,
  contactData,
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


  const whatsappMsg = 'Hello Maa Vindhawasini Enterprises, I am looking at your company details and would like to discuss my fabrication requirement.';
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  const aboutSchemas = [
    getBreadcrumbSchema([{ label: 'About Us', href: '/about' }]),
    getOrganizationSchema(),
  ];

  return (
    <SiteLayout>
      <SEO
        title="About Us | Industrial Steel Fabrication Experts Patna"
        description="Learn about Maa Vindhawasini Enterprises, leading manufacturers of custom MS & stainless steel industrial equipment, reaction vessels, and heavy structures in Patna, Bihar."
        canonicalPath="/about"
        schemaJson={aboutSchemas}
      />

      <PageHeroSplit
        breadcrumb={[{ label: 'About Us' }]}
        title="About Maa Vindhawasini Enterprises"
        description="A steel fabrication workshop in Patna building process vessels, tanks, hoppers, and structural assemblies to customer drawings."
        primaryAction={{
          label: 'Request a Quote',
          href: '/request-a-quote',
          onClick: () => trackEvent('about_quote_click', { position: 'hero' }),
        }}
        secondaryAction={{
          label: 'View Our Products',
          href: '/products',
          onClick: () => trackEvent('about_products_click', { position: 'hero' }),
        }}
        image={{
          src: ASSETS.projects.featuredBitumen,
          alt: 'Black insulated storage tanks staged outdoors',
        }}
      />

      {/* Company Overview Section */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-center font-sans">
            {/* Left Image Column */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-lg overflow-hidden border border-border shadow-card aspect-[4/3] bg-slate-50 relative">
                <img
                  src={ASSETS.products.resinGlueKettle}
                  alt="Stainless steel jacketed reaction vessel with top motor"
                  className="w-full h-full object-cover" width={800} height={600} decoding="async"
                />
              </div>
            </div>

            {/* Right Details Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy-950 leading-tight">
                  What we do
                </h2>
              </div>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  <strong>{companyData.legalName}</strong> is a mild steel and stainless steel fabrication workshop in Patna, Bihar. We build heavy-duty structural assemblies and process equipment to our customers&rsquo; own specifications.
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
                  className="font-bold text-xs uppercase tracking-wide h-11 px-5"
                >
                  Explore Catalog Products
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission & Values Section */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-sans">
            {/* Left Column - Mission */}
            <div className="lg:col-span-5 bg-navy-950 text-white p-6 md:p-8 rounded-card shadow-card space-y-4">
              <h3 className="text-xl md:text-2xl font-extrabold leading-snug">Our Mission</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our mission is to fabricate high-integrity MS/SS industrial vessels, hoppers, stacks, and structural supports that precisely match customer capacity and layout parameters. We commit to using verified steel plate parameters and applying rigorous inspection standards to deliver structural safety for Patna and regional projects.
              </p>
            </div>

            {/* Right Column - Values Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 leading-tight">
                  Values That Guide Our Manufacturing
                </h2>
              </div>

              {/* Plain typography, not another icon tile: this is the third
                  icon-square section on this page in a row, and values are
                  stated principles rather than a physical tool or capability
                  an icon can represent - confident type carries them better. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                {aboutValuesData.map((val) => (
                  <div key={val.title}>
                    <h4 className="font-bold text-base text-navy-950 mb-1.5 leading-snug">{val.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-center font-sans">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
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
                  src={ASSETS.products.storageTank}
                  alt="A large cylindrical steel storage tank with access ladder"
                  className="w-full h-full object-cover" width={800} height={500} decoding="async"
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
            title="Workshop Capability Metrics"
            description="We perform primary metal fabrication operations in-house to guarantee quality checks."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-3 font-sans">
            {aboutCapabilitiesData.map((cap) => (
              <div key={cap.name} className="bg-slate-50 border border-border p-6 rounded-card shadow-card flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center mb-4">
                    <img src={cap.icon} alt="" aria-hidden="true" className="w-5 h-5 object-contain" width={20} height={20} decoding="async" />
                  </div>
                  <h3 className="text-base font-bold text-navy-950 mb-2 leading-snug">{cap.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{cap.desc}</p>
                </div>
                
                <div className="pt-3 border-t border-slate-200 mt-auto">
                  <ul className="space-y-1">
                    {cap.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-xs font-medium text-slate-600 flex items-center">
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
            title="Industrial Sectors We Support"
            description="We construct custom MS and SS equipment matching the regulatory codes of various processing units."
            align="center"
          />

          {/* A rule-separated list, not another icon-square grid: this is the
              third icon-tile pattern on this page and the fourth site-wide
              card treatment for "industries" content specifically. */}
          <div className="max-w-3xl mx-auto divide-y divide-border border-t border-border font-sans">
            {industriesData.map((ind) => (
              <div key={ind.id} className="py-5 sm:flex sm:gap-8">
                <h4 className="font-bold text-sm text-navy-950 leading-snug sm:w-1/3 sm:shrink-0">{ind.name}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mt-1 sm:mt-0">{ind.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quality Preview Panel */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-center font-sans">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-950 leading-tight">
                How we check the work
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                We would rather show you inspection sheets than badges. These are the checks that
                happen on every job.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {aboutQualityHighlightsData.map((item) => (
                  <div key={item.title} className="flex gap-2.5">
                    <span className="text-primary font-bold text-sm mt-0.5">✓</span>
                    <div>
                      <h3 className="font-semibold text-sm text-navy-950 mb-1 leading-snug">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  href="/quality-certifications"
                  variant="primary"
                  className="font-bold text-xs uppercase tracking-wide h-11 px-5"
                  onClick={() => trackEvent('about_quality_click')}
                >
                  View our quality process
                </Button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-border shadow-card aspect-[4/3] bg-slate-50 relative">
                <img
                  src={ASSETS.hero.quality}
                  alt="A welder laying a clean weld seam on a curved steel shell"
                  className="w-full h-full object-cover" width={800} height={600} decoding="async"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final Action CTA Block */}
      <PageCTA
        title="Let’s Discuss Your Industrial Requirement."
        description="Submit your engineering sketches, target capacity limits, plate thickness specifications, or call our estimating team directly."
        quote={{ onClick: () => trackEvent('about_quote_click', { position: 'footer_cta' }) }}
        secondary={{ label: 'View Products', href: '/products' }}
        whatsappUrl={whatsappUrl}
        onWhatsappClick={() => trackEvent('about_whatsapp_click')}
      />
    </SiteLayout>
  );
};

export default About;
