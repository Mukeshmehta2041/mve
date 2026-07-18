import React from 'react';
import { SiteLayout, SEO } from '../layout';
import { Container, Section, Breadcrumb } from '../ui';
import { legalLastUpdated, legalContactData } from '../../data';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  eyebrow?: string;
  canonicalPath: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  description,
  eyebrow = 'Legal Information',
  canonicalPath,
  children,
}) => {
  return (
    <SiteLayout>
      <SEO title={title} description={description} canonicalPath={canonicalPath} />
      
      {/* Page Hero */}
      <Section className="bg-navy-950 text-white pt-6 pb-10 text-left border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <Container className="relative z-10 font-sans">
          <Breadcrumb 
            items={[{ label: title }]} 
            className="text-slate-400 mb-4" 
          />
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] leading-[18px] tracking-[0.1em] uppercase font-bold text-primary block">
              {eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight font-heading">
              {title}
            </h1>
            <p className="text-sm md:text-base text-slate-350 leading-relaxed max-w-2xl font-sans">
              {description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Body */}
      <Section className="bg-white pt-10 pb-16 text-left">
        <Container className="max-w-4xl font-sans">
          <div className="bg-slate-50 border border-border p-6 md:p-10 rounded-card shadow-sm space-y-6">
            <p className="text-xs text-slate-400 font-semibold tracking-wide block border-b border-slate-200 pb-3">
              Last Updated: {legalLastUpdated}
            </p>
            <div className="space-y-8 text-slate-650 leading-relaxed text-sm md:text-base">
              {children}
            </div>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
};

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export const LegalSection: React.FC<LegalSectionProps> = ({ title, children }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg md:text-xl font-bold text-navy-950 leading-snug">
        {title}
      </h2>
      <div className="text-xs md:text-sm text-slate-600 space-y-3 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export const LegalContactBlock: React.FC = () => {
  return (
    <div className="bg-white border border-border p-6 rounded-card mt-8 space-y-4">
      <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
        Contact & Compliance Queries
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed">
        If you have comments or inquiries regarding our data practices, cookie configuration, or manufacturing disclaimers, please contact our administrative team:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-navy-950 font-mono">
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-sm">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Company Entity</span>
          <span>{legalContactData.companyName}</span>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-sm">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Telephone</span>
          <a href={`tel:${legalContactData.phone}`} className="hover:text-primary transition-colors">
            {legalContactData.phone}
          </a>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-sm">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Email Channel</span>
          <a href={`mailto:${legalContactData.email}`} className="hover:text-primary transition-colors">
            {legalContactData.email}
          </a>
        </div>
      </div>
    </div>
  );
};
