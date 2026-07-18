import React, { useEffect } from 'react';
import { LegalPageLayout, LegalSection, LegalContactBlock } from '../components/legal/LegalComponents';
import { trackEvent } from '../lib/analytics';

export const Terms: React.FC = () => {
  useEffect(() => {
    trackEvent('terms_page_view');
  }, []);

  return (
    <LegalPageLayout
      title="Terms of Use"
      description="Review the rules and operational boundaries governing the exploration of our steel fabrication catalog."
      canonicalPath="/terms"
    >
      <p>
        These Terms of Use govern your access to the Maa Vindhawasini Enterprises corporate catalog website. By exploring our catalog or requesting quotations, you agree to these conditions.
      </p>

      <LegalSection title="1. Catalogue Scope & Informational Purpose">
        <p>
          This website serves as a digital showcase of our Mild Steel (MS) and Stainless Steel (SS) fabrication capabilities. All product dimensions, capacities, weight listings, and visual renderings are for general guidance and catalog references only. Final specifications are defined solely in signed commercial agreements.
        </p>
      </LegalSection>

      <LegalSection title="2. Inquiry & Quotation Requests">
        <p>
          Submitting a Request a Quote form, contacting our team, or sharing drawing specifications does not establish a binding commercial contract. All proposal documents and pricing figures generated during estimating are subject to:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li>Verification of material grade market rates (steel indices change frequently).</li>
          <li>Detailed review of structural clearances and nozzle positions by our shop team.</li>
          <li>Written approval of project timelines and delivery terms in a formal purchase contract.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. User Blueprint & Drawing Submissions">
        <p>
          When you upload engineering drawings, sketches, or layout sheets, you guarantee that you hold the legal authority to share these files for estimating purposes. Maa Vindhawasini Enterprises does not claim ownership of user-submitted blueprints. We use your files solely to compile commercial proposals.
        </p>
      </LegalSection>

      <LegalSection title="4. Prohibited System Usage">
        <p>
          You agree not to attempt to upload files containing executable code, scripts, or archives that may compromise website integrity. We reserve the right to discard any inquiries containing suspicious payloads without notice.
        </p>
      </LegalSection>

      <LegalSection title="5. Intellectual Property Rights">
        <p>
          All catalog layouts, custom logos, visual design elements, and descriptive texts are the property of Maa Vindhawasini Enterprises. Third-party symbols (such as technology icons or certified logistics badges) belong to their respective owners.
        </p>
      </LegalSection>

      <LegalSection title="6. Disclaimer of Warranties">
        <p>
          We endeavor to keep catalog specifications correct, but we make no warranties regarding accuracy or complete uptime. General equipment parameters are subject to design adjustments without prior notification.
        </p>
      </LegalSection>

      <LegalSection title="7. Governing Jurisdiction">
        <p>
          Any inquiries or claims regarding MVE catalog operations are subject to standard arbitration processes and will be governed by the laws applicable in Patna, Bihar, India.
        </p>
      </LegalSection>

      <LegalContactBlock />
    </LegalPageLayout>
  );
};

export default Terms;
