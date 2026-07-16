import React, { useState } from 'react';
import { MainLayout, SEO } from '../components/layout';
import {
  Container,
  Section,
  SectionHeader,
  Button,
  IconButton,
  TextLink,
  Badge,
  TrustBadge,
  Card,
  Input,
  Select,
  Textarea,
  Checkbox,
  FileUpload,
  FormSuccessMessage,
  Breadcrumb,
  LoadingState,
  EmptyGuard,
} from '../components/ui';
import { ASSETS } from '../lib/assets';

export const DesignSystemPreview: React.FC = () => {
  // Interactive state variables for testing controls
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    message: '',
    acceptTerms: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // File upload change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setUploadedFile(null);
  };

  // Form submission validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = 'Full Name is a required field.';
    if (!formData.industry) errors.industry = 'Please select a primary industry.';
    if (!formData.message) errors.message = 'Requirement details must be specified.';
    if (!formData.acceptTerms) errors.acceptTerms = 'You must accept the terms of inquiry.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormSuccess(false);
    } else {
      setFormErrors({});
      setFormSuccess(true);
    }
  };

  return (
    <MainLayout>
      <SEO
        title="Design System Preview"
        description="Internal development preview page demonstrating Maa Vindhawasini Enterprises color variables, typography, buttons, cards, forms, and layouts."
      />

      <Section className="bg-slate-50 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: 'Design System' }]} />
          <SectionHeader
            eyebrow="Internal Development Tool"
            title="Design System & UI Tokens"
            description="Use this page to preview, align, and validate component rules from design.md. This page is excluded from search engine sitemaps."
            align="left"
          />
        </Container>
      </Section>

      {/* 1. Color Palette Block */}
      <Section className="bg-white border-b border-border">
        <Container>
          <h3 className="text-xl md:text-2xl font-bold text-navy-950 mb-6 text-left border-b border-border pb-3">
            1. Brand & Semantic Colors
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-left">
            {[
              { name: 'Primary (Accent)', var: '--color-primary', hex: '#F26C21', usage: 'Main CTA & links' },
              { name: 'Primary Hover', var: '--color-primary-hover', hex: '#D95513', usage: 'CTA hover' },
              { name: 'Primary Soft', var: '--color-primary-soft', hex: '#FFF2EA', usage: 'Accent backdrops' },
              { name: 'Navy 950 (Dark)', var: '--color-foreground', hex: '#0F172A', usage: 'Headings & dark sections' },
              { name: 'Navy 900', var: '--color-navy-900', hex: '#111827', usage: 'Alt dark background' },
              { name: 'Slate 600 (Muted)', var: '--color-text-muted', hex: '#475569', usage: 'Body text description' },
              { name: 'Slate 400', var: '--color-text-inactive', hex: '#94A3B8', usage: 'Muted borders/labels' },
              { name: 'Border Gray', var: '--color-border', hex: '#E2E8F0', usage: 'Divider line borders' },
              { name: 'Surface Gray', var: '--color-surface-muted', hex: '#F8FAFC', usage: 'Alternating sections bg' },
              { name: 'White', var: '--color-surface', hex: '#FFFFFF', usage: 'Card panels & text blocks' },
              { name: 'Success Green', var: '--color-success', hex: '#22C55E', usage: 'WhatsApp CTAs' },
              { name: 'Error Red', var: '--color-error', hex: '#DC2626', usage: 'Validation alerts' },
            ].map((color) => (
              <div key={color.name} className="border border-border p-3 rounded-card bg-slate-50 flex flex-col h-full">
                <div
                  className="w-full aspect-square rounded-sm mb-3 border border-slate-200"
                  style={{ backgroundColor: `var(${color.var})` }}
                />
                <h4 className="font-bold text-navy-950 text-sm leading-tight truncate">{color.name}</h4>
                <code className="text-xs mt-1 bg-slate-200 px-1 py-0.5 rounded-sm self-start font-mono text-[10px] md:text-xs">
                  {color.hex}
                </code>
                <p className="text-[11px] text-slate-500 leading-tight mt-2 flex-grow">
                  {color.usage}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 2. Typography Block */}
      <Section className="bg-slate-50 border-b border-border">
        <Container className="text-left">
          <h3 className="text-xl md:text-2xl font-bold text-navy-950 mb-6 border-b border-border pb-3">
            2. Typography Scale
          </h3>
          <div className="space-y-6 bg-white border border-border p-6 rounded-card">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                Display / Hero (56px Desktop / 38px Mobile)
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-navy-950 leading-[1.1] tracking-tight">
                Industrial Engineering Precision
              </h1>
            </div>
            
            <div className="pt-4 border-t border-border/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                H1 (48px Desktop / 34px Mobile)
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight">
                Maa Vindhawasini Enterprises
              </h1>
            </div>

            <div className="pt-4 border-t border-border/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                H2 (36px Desktop / 28px Mobile)
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-950 leading-tight">
                Process Tanks & Reaction Vessels
              </h2>
            </div>

            <div className="pt-4 border-t border-border/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                H3 (24px Desktop / 21px Mobile)
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-navy-950">
                Heavy Steel Fabrication Services
              </h3>
            </div>

            <div className="pt-4 border-t border-border/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                Body Large (18px Desktop / 17px Mobile)
              </span>
              <p className="text-lg text-slate-600 leading-relaxed font-sans">
                Providing high-integrity process utility engineering for aggregate plants, chemical processing facilities, and railway crossings.
              </p>
            </div>

            <div className="pt-4 border-t border-border/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                Body Standard (16px Desktop & Mobile)
              </span>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                Our workshop utilizes specialized heavy machinery and certified welding inspectors. All steel fabrications undergo rigorous dimensional validation, pressure leak testing, and quality control audits before dispatch.
              </p>
            </div>

            <div className="pt-4 border-t border-border/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                Small (14px)
              </span>
              <p className="text-sm text-slate-500 leading-normal font-sans">
                Note: Standard fabrication tolerances are compliant with IS-code specifications unless custom tolerances are requested.
              </p>
            </div>

            <div className="pt-4 border-t border-border/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">
                Eyebrow (12px, Uppercase, Tracking)
              </span>
              <span className="text-[12px] font-semibold text-primary uppercase tracking-widest block">
                QUALITY ASSURANCE AUDITED
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Buttons & Interactive States Block */}
      <Section className="bg-white border-b border-border">
        <Container className="text-left">
          <h3 className="text-xl md:text-2xl font-bold text-navy-950 mb-6 border-b border-border pb-3">
            3. Buttons & Interactive States
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 border border-border p-6 rounded-card">
            {/* Button variants list */}
            <div className="space-y-4">
              <h4 className="font-bold text-navy-950 text-base mb-3">Variants</h4>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary CTA</Button>
                <Button variant="secondary">Secondary CTA</Button>
                <Button variant="whatsapp" icon={<img src={ASSETS.icons.whatsapp} alt="" className="w-4 h-4 brightness-0 invert" />}>
                  WhatsApp Chat
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                * Primary CTAs use solid brand orange. Secondary CTAs use outline borders with active orange hover borders. WhatsApp uses green color.
              </p>
            </div>

            {/* Button sizing list */}
            <div className="space-y-4">
              <h4 className="font-bold text-navy-950 text-base mb-3">Sizes</h4>
              <div className="flex flex-wrap gap-3 items-end">
                <Button variant="primary" size="sm">Small (h-10)</Button>
                <Button variant="primary" size="md">Medium / Default (h-12)</Button>
                <Button variant="primary" size="lg">Large (h-14)</Button>
              </div>
            </div>

            {/* Other controls (icon buttons, text links) */}
            <div className="space-y-4">
              <h4 className="font-bold text-navy-950 text-base mb-3">Icon Buttons & Text Links</h4>
              <div className="flex flex-wrap gap-6 items-center">
                <IconButton ariaLabel="General search" className="bg-white border border-border">
                  <img src={ASSETS.icons.search} alt="" className="w-5 h-5 object-contain" />
                </IconButton>
                <IconButton ariaLabel="Menu toggle" className="bg-navy-950 text-white hover:bg-navy-900">
                  <img src={ASSETS.icons.menu} alt="" className="w-5 h-5 object-contain brightness-0 invert" />
                </IconButton>
                <TextLink href="#">Explore Product Specifications</TextLink>
              </div>
            </div>

            {/* Keyboard Focus preview */}
            <div className="space-y-4">
              <h4 className="font-bold text-navy-950 text-base mb-3">Visible Keyboard Focus State</h4>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-slate-200 border border-slate-350 text-navy-950 font-semibold rounded-card focus-ring"
                >
                  Press TAB to Focus Me
                </button>
                <a
                  href="#"
                  className="px-4 py-2 bg-white border-2 border-primary text-primary font-semibold rounded-card focus-ring inline-block"
                >
                  Focused Style Preview
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Badges & Trust badges Block */}
      <Section className="bg-slate-50 border-b border-border">
        <Container className="text-left">
          <h3 className="text-xl md:text-2xl font-bold text-navy-950 mb-6 border-b border-border pb-3">
            4. Badges & Verification Seals
          </h3>
          
          <div className="space-y-6">
            {/* simple badges */}
            <div>
              <h4 className="font-bold text-navy-950 text-sm mb-3 font-mono text-slate-400 uppercase tracking-widest">
                Simple Status Badges
              </h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="neutral">Mild Steel</Badge>
                <Badge variant="primary">Reaction Vessel</Badge>
                <Badge variant="success">GST Registered</Badge>
                <Badge variant="warning">Action Required</Badge>
              </div>
            </div>

            {/* Corporate trust badges grid */}
            <div>
              <h4 className="font-bold text-navy-950 text-sm mb-3 font-mono text-slate-400 uppercase tracking-widest">
                Trust Indicators (design.md Section 7)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <TrustBadge
                  label="Verified Registration"
                  value="GST Registered"
                  icon={ASSETS.icons.shieldCheck}
                  description="Compliant corporate Tax identification code verified by regional directors."
                />
                <TrustBadge
                  label="MSME Registered"
                  value="Govt Certified"
                  icon={ASSETS.icons.certificate}
                  description="Officially recognized under MSME category with valid Udyam registration."
                />
                <TrustBadge
                  label="Factory Licensed"
                  value="Audit Approved"
                  icon={ASSETS.icons.factory}
                  description="Operating under strict industrial guidelines and local fire safety codes."
                />
                <TrustBadge
                  label="Est. 2008"
                  value="15+ Years Track Record"
                  icon={ASSETS.icons.experience}
                  description="Decades of custom fabrication delivery across chemical and civil crossings."
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Cards & Spacing Block */}
      <Section className="bg-white border-b border-border">
        <Container className="text-left">
          <h3 className="text-xl md:text-2xl font-bold text-navy-950 mb-6 border-b border-border pb-3">
            5. Content Cards & Layout Shells
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-1.5 block">
                Standard Card Layout
              </span>
              <h4 className="text-lg font-bold text-navy-950 mb-2">Hover Translate Transition</h4>
              <p className="text-sm text-slate-650 leading-relaxed mb-4">
                This panel has 12px card borders and translates upward on hover, increasing its drop shadow density. Hover over this block to test its transform.
              </p>
              <Button size="sm" variant="secondary">Test Interaction</Button>
            </Card>

            <Card hoverable={false}>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 block">
                Static Card
              </span>
              <h4 className="text-lg font-bold text-navy-950 mb-2">No Translation</h4>
              <p className="text-sm text-slate-650 leading-relaxed mb-4">
                This panel maintains a locked 0px offset regardless of cursor hovers. Useful for static list blocks and information dashboards.
              </p>
              <Button size="sm" variant="secondary" className="opacity-50">Static Button</Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 6. Form Controls & Validation States Block */}
      <Section className="bg-slate-50 border-b border-border">
        <Container className="text-left">
          <h3 className="text-xl md:text-2xl font-bold text-navy-950 mb-6 border-b border-border pb-3">
            6. Interactive Form Controls & States
          </h3>

          <div className="bg-white border border-border p-6 rounded-card max-w-2xl mx-auto">
            <h4 className="text-lg font-bold text-navy-950 mb-4 border-b border-border pb-2">
              RFQ Inquiry Form Verification
            </h4>

            {formSuccess && (
              <FormSuccessMessage
                message="Your custom drawing enquiry has been received. Our fabrication engineers will verify the dimensions and reply within 24 working hours."
                className="mb-5"
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Corporate Name"
                placeholder="Enter your full name or legal company name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={formErrors.name}
              />

              <Select
                label="Target Industry Sector"
                required
                placeholder="Select your industry group"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                error={formErrors.industry}
                options={[
                  { label: 'Chemical Processing', value: 'chemical' },
                  { label: 'Infrastructure & Construction', value: 'construction' },
                  { label: 'Cement & Aggregate Processing', value: 'cement' },
                  { label: 'Power & Thermal Generation', value: 'power' },
                  { label: 'Railways Infrastructure', value: 'railway' },
                ]}
              />

              <Textarea
                label="Fabrication Specifications"
                placeholder="List capacity requirements, material thickness (Mild Steel / Stainless Steel), and required delivery schedule..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                error={formErrors.message}
              />

              <FileUpload
                label="Upload Engineering Drawing"
                selectedFile={uploadedFile}
                onChange={handleFileChange}
                onClearFile={handleClearFile}
                formatsLabel="PDF, DWG, DXF, PNG, JPG"
                maxSizeLabel="20MB"
              />

              <Checkbox
                label={
                  <span>
                    I confirm that the uploaded engineering parameters are verified for manufacturing.
                  </span>
                }
                required
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                error={formErrors.acceptTerms}
              />

              <div className="pt-2">
                <Button type="submit" variant="primary" fullWidth>
                  Submit Inquiry to Engineers
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </Section>

      {/* 7. Feedback states Block */}
      <Section className="bg-white">
        <Container className="text-left">
          <h3 className="text-xl md:text-2xl font-bold text-navy-950 mb-6 border-b border-border pb-3">
            7. System Feedback Nodes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-border p-6 rounded-card">
            {/* Loading Indicator */}
            <div className="bg-white border border-border rounded-card p-4 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">
                Loading State component
              </span>
              <LoadingState message="Processing request..." />
            </div>

            {/* Empty guard Indicator */}
            <div className="bg-white border border-border rounded-card p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">
                Empty Guard component
              </span>
              <EmptyGuard
                title="Sitemap Pending Verification"
                message="We are verifying the factory coordinates and certificate licenses. Downloads will be enabled upon client approval."
                actionText="Verify Manually"
                onActionClick={() => alert('Verification flag logs logged to developer console.')}
                className="my-1 border-0 bg-transparent p-0 max-w-full"
              />
            </div>
          </div>
        </Container>
      </Section>
    </MainLayout>
  );
};
export default DesignSystemPreview;
