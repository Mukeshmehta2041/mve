export interface QuoteRequirementType {
  value: 'standard' | 'custom' | 'general';
  label: string;
  desc: string;
}

export interface QuoteMaterialOption {
  value: string;
  label: string;
}

export interface QuoteUnitOption {
  value: string;
  label: string;
}

export interface NextStepItem {
  stepNumber: number;
  title: string;
  description: string;
}

export const quoteRequirementTypesData: QuoteRequirementType[] = [
  {
    value: 'standard',
    label: 'Standard Catalog Product',
    desc: 'Select from our standard structures (e.g. Storage Tank, Hopper, Chimney, Shuttering Plate).',
  },
  {
    value: 'custom',
    label: 'Custom Fabrication Service',
    desc: 'Provide custom dimensions or upload CAD drawings/blueprints for bespoke manufacturing.',
  },
  {
    value: 'general',
    label: 'General Industrial Inquiry',
    desc: 'General fabrication consults, bulk order queries, or pricing questions.',
  },
];

export const quoteMaterialOptionsData: QuoteMaterialOption[] = [
  { value: 'ms', label: 'Mild Steel (MS IS 2062)' },
  { value: 'ss304', label: 'Stainless Steel SS304 (Food Grade)' },
  { value: 'ss316', label: 'Stainless Steel SS316 (Chemical Grade)' },
  { value: 'other', label: 'Other Grade / Not Specified' },
];

export const quoteUnitOptionsData: QuoteUnitOption[] = [
  { value: 'pcs', label: 'Units / Pieces' },
  { value: 'metric-tons', label: 'Weight (Tons)' },
  { value: 'meters', label: 'Dimensions (Meters)' },
];

export const quoteNextStepsData: NextStepItem[] = [
  {
    stepNumber: 1,
    title: 'Requirement Review',
    description: 'Our technical estimating team reviews your product capacity, dimensions, and drawing attachments.',
  },
  {
    stepNumber: 2,
    title: 'Technical Clarifications',
    description: 'We will contact you via your preferred method to verify layout limits, connection nozzles, or loads.',
  },
  {
    stepNumber: 3,
    title: 'Commercial Proposal',
    description: 'We issue an itemized quotation outlining steel weights, process steps, transport schedule, and terms.',
  },
];

export const quoteUploadRules = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  maxSizeLabel: '10MB',
  allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.xls', '.xlsx'],
  allowedMimes: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  formatsLabel: 'PDF, Word (DOC/DOCX), Excel (XLS/XLSX), Images (JPG/PNG)',
};

export const quoteConsentText = 'By submitting this quote request, you agree that Maa Vindhawasini Enterprises may collect, store, and process the contact data and files provided to draft and deliver our commercial proposal.';
