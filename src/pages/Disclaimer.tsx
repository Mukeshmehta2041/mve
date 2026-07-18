import React, { useEffect } from 'react';
import { LegalPageLayout, LegalSection, LegalContactBlock } from '../components/legal/LegalComponents';
import { trackEvent } from '../lib/analytics';

export const Disclaimer: React.FC = () => {
  useEffect(() => {
    trackEvent('disclaimer_page_view');
  }, []);

  return (
    <LegalPageLayout
      title="Disclaimer"
      description="Read our liability disclaimers, illustrative graphic notices, and technical review requirements."
      canonicalPath="/disclaimer"
    >
      <p>
        The content on the Maa Vindhawasini Enterprises website is compiled to represent our manufacturing capabilities. Please note the following parameters when exploring our pages:
      </p>

      <LegalSection title="1. General Informational Use Only">
        <p>
          All information, specifications, shell thicknesses, and product characteristics on this website are provided for general guidance. Sizing tables, fluid capacities, and equipment volumes are estimates and should not be used as sole references for structural engineering decisions.
        </p>
      </LegalSection>

      <LegalSection title="2. Illustrative Product Images & Mockups">
        <p>
          Many product images, factory layout banners, and project photos displayed across the pages are illustrative representations or 3D mockups. They demonstrate typical designs and should not be interpreted as exact blueprints of completed fabrications.
        </p>
      </LegalSection>

      <LegalSection title="3. Technical Review Requirement">
        <p>
          Every storage vessel, industrial chimney stack, conveyor hopper, or reactor kettle is subject to a technical design review before fabrication begins. Custom dimensional requests, structural leg load requirements, and nozzle flange layouts must be confirmed through verified CAD drafts.
        </p>
      </LegalSection>

      <LegalSection title="4. Bid and Quotation Precedence">
        <p>
          In the event of a conflict between specifications listed on this website and a formal pricing quote, commercial contract, or technical design draft signed by MVE estimating engineers, the formal signed documentation always takes precedence.
        </p>
      </LegalSection>

      <LegalSection title="5. Professional Engineering Advice">
        <p>
          Maa Vindhawasini Enterprises manufactures equipment according to client-supplied specifications or standard layouts. We do not provide licensed structural engineering or chemical flow consulting. Clients must verify that dimensions and material grades (e.g. MS or SS grades) align with local factory safety guidelines.
        </p>
      </LegalSection>

      <LegalContactBlock />
    </LegalPageLayout>
  );
};

export default Disclaimer;
