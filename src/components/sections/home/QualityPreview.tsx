import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { ResponsiveImage } from '../../ui/ResponsiveImage';
import { ASSETS } from '../../../lib/assets';

export const QualityPreview: React.FC = () => {
  const audits = [
    {
      title: 'Material Thickness Verification',
      desc: 'Confirming raw sheet and plate schedules match structural loads.',
    },
    {
      title: 'Weld Profile Inspections',
      desc: 'Inspecting seams and joint prep under fabrication standards.',
    },
    {
      title: 'Dimensional Tolerance Audits',
      desc: 'Ensuring alignment tolerances match drawing clearances.',
    },
    {
      title: 'Hydrostatic Leak Tests',
      desc: 'Verifying fluid containment units before structural painting.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-border text-left">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Content details */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-[12px] leading-[18px] tracking-[0.1em] uppercase font-bold text-primary block mb-3">
              Standard Operations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 leading-tight font-heading">
              Our Quality Inspection Process
            </h2>
          </div>
          
          <p className="text-base text-slate-600 leading-relaxed font-sans">
            Maa Vindhawasini Enterprises enforces standard auditing protocols across all fabrication workflows. We confirm material grades and verify dimensions to ensure that final equipment assemblies meet specifications.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {audits.map((audit, index) => (
              <div key={index} className="space-y-1">
                <h3 className="font-bold text-sm text-navy-950 font-sans flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  {audit.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed pl-3.5">
                  {audit.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button href="/quality-certifications" variant="secondary" className="w-full sm:w-auto">
              View Quality & Certifications
            </Button>
          </div>
        </div>

        {/* Right Column - Cert Preview Image */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-lg overflow-hidden border border-border shadow-card aspect-[4/3] bg-slate-50 p-6 flex flex-col justify-center items-center relative group">
            <div className="w-full h-full max-w-[280px] aspect-[1/1.4] bg-white shadow-sm border border-slate-200 rounded-sm p-4 text-center flex flex-col justify-between overflow-hidden relative">
              <ResponsiveImage
                src={ASSETS.quality.certificatePreview}
                alt="Registration certifications and inspection logs concept overview."
                ratio="auto"
                className="w-full h-full object-contain filter grayscale contrast-125 group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-4 text-center italic">
              Inspection records and business registration documents (GST & MSME) on file.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QualityPreview;
