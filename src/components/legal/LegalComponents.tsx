import React from 'react';
import { SiteLayout, SEO, PageHeroShell } from '../layout';
import { Container, Section } from '../ui';
import { legalLastUpdated, legalContactData } from '../../data';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  canonicalPath: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  description,
  canonicalPath,
  children,
}) => {
  return (
    <SiteLayout>
      <SEO title={title} description={description} canonicalPath={canonicalPath} />
      
      <PageHeroShell
        breadcrumb={[{ label: title }]}
        title={title}
        description={description}
      />

      {/* Main Body */}
      <Section className="bg-white pt-10 pb-16 text-left">
        <Container className="max-w-4xl font-sans">
          <div className="bg-slate-50 border border-border p-6 md:p-10 rounded-card shadow-sm space-y-6">
            <p className="text-sm text-slate-500 font-medium block border-b border-slate-200 pb-3">
              Last Updated: {legalLastUpdated}
            </p>
            <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">
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
          <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Company Entity</span>
          <span>{legalContactData.companyName}</span>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-sm">
          <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Telephone</span>
          <a href={`tel:${legalContactData.phone}`} className="hover:text-primary transition-colors">
            {legalContactData.phone}
          </a>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-sm">
          <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Email Channel</span>
          <a href={`mailto:${legalContactData.email}`} className="hover:text-primary transition-colors">
            {legalContactData.email}
          </a>
        </div>
      </div>
    </div>
  );
};
