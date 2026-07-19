import React, { useState, useEffect } from 'react';
import { SiteLayout, SEO } from '../components/layout';
import { Container, Section, SectionHeader, Button, Breadcrumb, ProjectCard } from '../components/ui';
import { projectsData, contactData } from '../data';
import { getBreadcrumbSchema } from '../lib/seo';
import { trackEvent } from '../lib/analytics';
import { getQuoteUrl, cn } from '../lib/utils';
import { ASSETS } from '../lib/assets';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Work');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  // Track page view
  useEffect(() => {
    trackEvent('projects_page_view');
  }, []);

  // Handle client-side category filtering
  useEffect(() => {
    if (selectedCategory === 'All Work') {
      setFilteredProjects(projectsData);
    } else if (selectedCategory === 'Storage Tanks') {
      setFilteredProjects(projectsData.filter((p) => p.productSlug === 'storage-tank'));
    } else if (selectedCategory === 'Hoppers') {
      setFilteredProjects(projectsData.filter((p) => p.productSlug === 'hopper'));
    } else if (selectedCategory === 'Chimneys') {
      setFilteredProjects(projectsData.filter((p) => p.productSlug === 'industrial-chimney'));
    } else if (selectedCategory === 'Structural Fabrication') {
      setFilteredProjects(projectsData.filter((p) => p.productSlug === 'resin-glue-kettle' || p.productSlug === 'shuttering-plate' || p.productSlug === 'railway-height-gauge'));
    }
  }, [selectedCategory]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    trackEvent('projects_filter_select', { category: categoryName });
  };

  const categories = [
    'All Work',
    'Storage Tanks',
    'Hoppers',
    'Chimneys',
    'Structural Fabrication',
  ];

  // Resolve featured project (proj-1 is designated)
  const featuredProject = projectsData.find((p) => p.id === 'proj-1') || projectsData[0];

  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';
  
  const whatsappMsg = 'Hello Maa Vindhawasini Enterprises, I was looking at your completed fabrication projects and would like to discuss my requirements.';
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  const projectsSchemas = getBreadcrumbSchema([{ label: 'Projects', href: '/projects' }]);

  return (
    <SiteLayout>
      <SEO
        title="Industrial Fabrication Projects Portfolio Patna"
        description="Explore our portfolio of completed storage vessels, chimneys, hoppers, and custom structural steel projects in Patna, Bihar."
        canonicalPath="/projects"
        schemaJson={projectsSchemas}
      />

      {/* Projects Hero Section */}
      <Section className="bg-navy-950 text-white pt-6 pb-12 md:pb-16 text-left relative overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <Container className="relative z-10">
          <Breadcrumb onDark 
            items={[{ label: 'Projects' }]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-heading">
                  Selected projects
                </h1>
              </div>

              <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl font-sans">
                A selection of industrial fabrication and equipment work completed across different product and application requirements. We build structural reliability designed to client specifications.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  href="/request-a-quote?source=projects"
                  variant="primary"
                  className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                  onClick={() => trackEvent('projects_quote_click', { position: 'hero' })}
                >
                  Discuss Your Project
                </Button>
                <Button
                  href="/custom-fabrication"
                  variant="outline-light"
                  className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                  onClick={() => trackEvent('projects_custom_fabrication_click', { position: 'hero' })}
                >
                  Explore Custom Fabrication
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-lg overflow-hidden border border-slate-800 shadow-card aspect-[16/10] bg-navy-900 relative">
                <img
                  src={ASSETS.hero.projects}
                  alt="Multi-level structural steel process plant structure against a dusk sky"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Project Section */}
      {featuredProject && (
        <Section className="bg-white border-b border-border text-left">
          <Container>
            <SectionHeader
              title="Featured Project Showcase"
              description="A detailed look at a high-capacity custom storage containment system fabricated for process industry clients."
              align="center"
            />

            <div className="bg-slate-50 border border-border rounded-card overflow-hidden shadow-card grid grid-cols-1 lg:grid-cols-12 gap-0 font-sans">
              {/* Left Column Image */}
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto w-full relative min-h-[300px]">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Right Column Content */}
              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 text-xs text-primary font-bold tracking-wider uppercase">
                    <span>{featuredProject.industry}</span>
                    <span className="text-slate-300">•</span>
                    <span>{featuredProject.location}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-navy-950 mb-3 leading-tight">
                    {featuredProject.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {featuredProject.description}
                  </p>

                  {/* Scope of Work */}
                  {featuredProject.scope && featuredProject.scope.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Scope of Work
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {featuredProject.scope.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-border text-slate-700 text-xs px-2.5 py-1 rounded-sm font-medium shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                  <Button
                    href={`/request-a-quote?source=project&project=${featuredProject.id}`}
                    variant="primary"
                    size="sm"
                    className="font-bold text-xs uppercase tracking-wide flex-1 h-[42px]"
                    onClick={() => trackEvent('project_similar_quote_click', { projectKey: featuredProject.id, position: 'featured' })}
                  >
                    Discuss Similar Project
                  </Button>
                  
                  {featuredProject.productSlug && (
                    <Button
                      href={`/products/${featuredProject.productSlug}`}
                      variant="secondary"
                      size="sm"
                      className="font-bold text-xs uppercase tracking-wide flex-1 h-[42px]"
                      onClick={() => trackEvent('project_product_click', { projectKey: featuredProject.id, productSlug: featuredProject.productSlug, position: 'featured' })}
                    >
                      View Product Details
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Project Grid & Filters */}
      <Section className="bg-surface border-b border-border text-left">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 border-b border-border pb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950">Explore Completed Works</h2>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2.5 font-sans">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer focus-ring",
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white border border-border text-slate-600 hover:text-navy-950 hover:border-slate-300"
                    )}
                    aria-pressed={isActive}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid display */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => trackEvent('project_card_click', { projectKey: project.id })}
                >
                  <ProjectCard project={project} showActions={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-border p-12 text-center rounded-card text-slate-500 font-sans max-w-xl mx-auto">
              No verified projects currently cataloged in this specific category.
            </div>
          )}
        </Container>
      </Section>

      {/* Custom Fabrication Integration Connection */}
      <Section className="bg-white border-b border-border text-left py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center font-sans">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy-950 leading-tight">
                Need Something Similar or Custom?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Do you have engineering drawings, sketches, or specific dimensional restrictions? We adapt structural bracing, leg configurations, nozzle connections, and volumetric sizes to fit your site limits and fluid load conditions.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  href="/custom-fabrication"
                  variant="primary"
                  className="font-bold text-sm tracking-wider uppercase h-12"
                >
                  Explore Custom Fabrication
                </Button>
                <Button
                  href={getQuoteUrl({ service: 'custom-fabrication' })}
                  variant="secondary"
                  className="font-bold text-sm tracking-wider uppercase h-12"
                  onClick={() => trackEvent('projects_quote_click', { position: 'custom_connection' })}
                >
                  Request Custom Quote
                </Button>
              </div>
            </div>

            {/* Right Image Banner Column */}
            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-border shadow-card aspect-[16/9] bg-slate-50 relative">
                <img
                  src={ASSETS.fabrication.productsBanner}
                  alt="Welder performing arc welding at a workshop station"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Discuss Similar Project CTA */}
      <Section background="muted" className="border-b border-border text-left py-12 md:py-16">
        <Container className="max-w-4xl font-sans">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <h3 className="text-xl md:text-2xl font-extrabold text-navy-950">Have a Similar Project Requirement?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Share a reference project, basic hand sketch, or blueprint files. Our estimating engineers will examine your dimensions and supply a pricing proposal.
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <Button
                href="/request-a-quote?source=projects"
                variant="primary"
                className="font-bold text-xs uppercase tracking-wide h-11 w-full"
                onClick={() => trackEvent('projects_quote_click', { position: 'discuss_similar' })}
              >
                Discuss Your Project
              </Button>

              {hasWhatsapp && (
                <Button
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  className="font-bold text-xs uppercase tracking-wide h-11 w-full"
                  onClick={() => trackEvent('projects_whatsapp_click', { position: 'discuss_similar' })}
                >
                  <img src={ASSETS.icons.whatsapp} alt="" aria-hidden="true" className="w-4 h-4 mr-2 brightness-0 invert" />
                  WhatsApp Us
                </Button>
              )}

              {verifiedPhone && (
                <Button
                  href={`tel:${verifiedPhone}`}
                  variant="secondary"
                  className="font-bold text-xs uppercase tracking-wide h-11 w-full bg-white text-navy-950 border-navy-950"
                >
                  <img src={ASSETS.icons.phone} alt="" aria-hidden="true" className="w-4 h-4 mr-1" />
                  Call: {verifiedPhone}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Final Conversion CTA */}
      <Section background="dark" className="border-t border-slate-800 text-center py-14 md:py-20">
        <Container className="max-w-4xl space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white font-heading">
            Let’s Build the Right Solution for Your Project.
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-slate-400 max-w-2xl mx-auto font-sans">
            Submit your specifications or explore our catalog of reaction vessels, custom tanks, safety barriers, and material bins.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-3 font-sans">
            <Button
              href="/request-a-quote"
              variant="primary"
              size="md"
              className="font-bold text-sm tracking-wider uppercase h-12"
              onClick={() => trackEvent('projects_quote_click', { position: 'final_cta' })}
            >
              Request a Quote
            </Button>
            <Button
              href="/products"
              variant="outline-light"
              size="md"
              className="font-bold text-sm tracking-wider uppercase h-12"
            >
              View Products
            </Button>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
};

export default Projects;
