import React, { useEffect } from 'react';
import { LegalPageLayout, LegalSection, LegalContactBlock } from '../components/legal/LegalComponents';
import { trackEvent } from '../lib/analytics';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    trackEvent('privacy_page_view');
  }, []);

  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="Learn how we collect, process, and protect your information when requesting fabrication quotations."
      canonicalPath="/privacy-policy"
    >
      <p>
        This Privacy Policy explains how Maa Vindhawasini Enterprises (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) processes information collected when visitors explore our catalog website at `/privacy-policy` or submit technical requests.
      </p>

      <LegalSection title="1. Information You Voluntarily Provide">
        <p>
          We collect personal and technical information that you explicitly submit through our online forms, such as our Request a Quote and Contact Us portals. This includes:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong>Contact Parameters:</strong> Full name, telephone/mobile number, email address, company name, and preferred delivery location.</li>
          <li><strong>Technical Specifications:</strong> Target capacities, shell dimensions, materials, and equipment applications.</li>
          <li><strong>Engineering Attachments:</strong> Blueprint drawings, sketches, sizing sheets, or PDFs submitted to support your inquiry.</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Information Collected Automatically">
        <p>
          When you explore our catalog, we automatically collect basic browser parameters using static server logs and analytics trackers. This includes device configuration types, approximate geographic regions (at the state or city level), referring websites, and page interaction events.
        </p>
      </LegalSection>

      <LegalSection title="3. Cookies & Local Storage Policies">
        <p>
          Our static catalogue website does not drop non-essential tracking cookies or utilize localStorage configurations to save personal information. Basic browser sessionStorage may be monitored temporarily to manage active form submissions, which are discarded upon closing your session.
        </p>
      </LegalSection>

      <LegalSection title="4. How Your Information Is Used">
        <p>
          Maa Vindhawasini Enterprises uses your submitted details exclusively to:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li>Evaluate technical requirements and compile itemized commercial quotations.</li>
          <li>Establish contact to clarify connection nozzles, load bracing, or delivery dates.</li>
          <li>Secure shipping approvals and coordinate freight schedules to Patna, Bihar, and nearby project sites.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Data Sharing & Third-Party Processors">
        <p>
          We do not sell, rent, or lease client contact listings to external advertising networks. Your information is shared only with verified service processors supporting website operations:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong>Hosting & Backend Infrastructure:</strong> Static hosting networks and serverless form handlers processing lead submissions.</li>
          <li><strong>Communication Channels:</strong> WhatsApp Business API and standard telephone networks if you choose to chat or call.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Sizing Files & Blueprint Drawings Handling">
        <p>
          Any drawing attachments selected in our quote form are evaluated strictly by estimating engineers. If file storage is pending configuration (using mock metadata submission), you are prompted to transmit files directly via email or WhatsApp once initial contact is confirmed.
        </p>
      </LegalSection>

      <LegalSection title="7. Security Standards">
        <p>
          We transmit all form details securely over HTTPS. However, since the final storage infrastructure is pending full deployment configuration, we recommend avoiding the attachment of highly proprietary patent files or sensitive financial records.
        </p>
      </LegalSection>

      <LegalSection title="8. Policy Updates">
        <p>
          We may update this Privacy Policy from time to time to reflect modifications in our data operations. We encourage visitors to review this page periodically.
        </p>
      </LegalSection>

      <LegalContactBlock />
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;
