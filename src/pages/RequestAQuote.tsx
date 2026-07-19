import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SiteLayout, SEO } from '../components/layout';
import { getBreadcrumbSchema } from '../lib/seo';
import { Container, Section, Button, Breadcrumb } from '../components/ui';
import {
  Input,
  Select,
  Textarea,
  Checkbox,
  FileUpload,
  FormErrorMessage
} from '../components/ui/FormControls';
import {
  productsData,
  contactData,
  projectsData,
  quoteRequirementTypesData,
  quoteMaterialOptionsData,
  quoteNextStepsData,
  quoteUploadRules,
  quoteConsentText,
} from '../data';
import { trackEvent } from '../lib/analytics';
import { cn } from '../lib/utils';
import { ASSETS } from '../lib/assets';

export const RequestAQuote: React.FC = () => {
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);

  // Form Fields State
  const [reqType, setReqType] = useState<'standard' | 'custom' | 'general'>('standard');
  const [productSlug, setProductSlug] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [requirementDescription, setRequirementDescription] = useState('');
  
  // Technical Specifications (Optional)
  const [quantity, setQuantity] = useState('');
  const [capacity, setCapacity] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [material, setMaterial] = useState('other');
  const [application, setApplication] = useState('');
  const [location, setLocation] = useState('');
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState('');
  const [additionalSpecs, setAdditionalSpecs] = useState('');

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Contact Info State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [preferredContact, setPreferredContact] = useState('phone');
  const [consentChecked, setConsentChecked] = useState(false);

  // System UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rfqReference, setRfqReference] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Focus target for the post-submit confirmation screen
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isSuccess) successRef.current?.focus();
  }, [isSuccess]);

  // Prefill metadata labels
  const [relatedProjectTitle, setRelatedProjectTitle] = useState('');
  const [highlightUpload, setHighlightUpload] = useState(false);

  // Load and validate query parameters
  useEffect(() => {
    trackEvent('quote_page_view');

    const paramProduct = searchParams.get('product');
    const paramService = searchParams.get('service');
    const paramIntent = searchParams.get('intent');
    const paramProject = searchParams.get('project');
    const paramType = searchParams.get('type');

    // 1. Validate and preselect product slug
    if (paramProduct) {
      const foundProduct = productsData.find((p) => p.slug === paramProduct);
      if (foundProduct) {
        setProductSlug(foundProduct.slug);
        
        // If type=custom is passed, set custom fabrication; otherwise, standard catalog product
        if (paramType === 'custom') {
          setReqType('custom');
          setCustomTitle(`Custom Alignment - ${foundProduct.name}`);
        } else {
          setReqType('standard');
        }
        trackEvent('quote_product_select', { productSlug: foundProduct.slug });
      }
    }

    // 2. Validate and configure custom fabrication service
    if (paramService === 'custom-fabrication') {
      setReqType('custom');
    }

    // 3. Highlight drawing upload intent
    if (paramIntent === 'drawing-upload') {
      setHighlightUpload(true);
      if (uploadAreaRef.current) {
        uploadAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // 4. Validate and attach project reference
    if (paramProject) {
      const foundProject = projectsData.find((p) => p.id === paramProject || p.productSlug === paramProject);
      if (foundProject) {
        setRelatedProjectTitle(foundProject.title);
      }
    }
  }, [searchParams]);

  // Track requirement selector change
  const handleReqTypeChange = (type: 'standard' | 'custom' | 'general') => {
    setReqType(type);
    setErrors({});
    trackEvent('quote_requirement_type_select', { requirementType: type });
  };

  // Handle file picker selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileError(null);

    if (files && files.length > 0) {
      const file = files[0];
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();

      // Validate file extension
      if (!quoteUploadRules.allowedExtensions.includes(extension)) {
        const err = `Unsupported file format. Please upload files in ${quoteUploadRules.formatsLabel} formats.`;
        setFileError(err);
        trackEvent('quote_file_error', { errorType: 'invalid_extension', extension });
        return;
      }

      // Validate file size limit
      if (file.size > quoteUploadRules.maxSizeBytes) {
        const err = `File size exceeds the ${quoteUploadRules.maxSizeLabel} limit. Please compress your drawings.`;
        setFileError(err);
        trackEvent('quote_file_error', { errorType: 'oversized_file', size: file.size });
        return;
      }

      setSelectedFile(file);
      trackEvent('quote_file_select', { fileName: file.name, fileSize: file.size });
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Basic Field validations
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Trim inputs
    const nameTrimmed = fullName.trim();
    const phoneTrimmed = phone.trim();
    const emailTrimmed = email.trim();

    // Check requirement validations
    if (reqType === 'standard' && !productSlug) {
      newErrors.productSlug = 'Please select a catalog product from the list.';
    }
    if (reqType === 'custom' && !customTitle.trim()) {
      newErrors.customTitle = 'Please provide a title or name for your fabrication requirement.';
    }
    if (reqType === 'general' && !requirementDescription.trim()) {
      newErrors.requirementDescription = 'Please specify details of your inquiry.';
    }

    // Personal details validation
    if (!nameTrimmed) {
      newErrors.fullName = 'Full Name is required.';
    }
    
    if (!phoneTrimmed) {
      newErrors.phone = 'Phone Number is required.';
    } else {
      // Basic check for Indian mobile number formatting (e.g. 10 digits, optional country prefix)
      const cleanedPhone = phoneTrimmed.replace(/\s+/g, '').replace(/[-+]/g, '');
      if (cleanedPhone.length < 10 || cleanedPhone.length > 13) {
        newErrors.phone = 'Please enter a valid phone number (10-12 digits).';
      }
    }

    if (emailTrimmed) {
      // Validate email syntax
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!consentChecked) {
      newErrors.consent = 'You must accept the privacy and consent notice to submit.';
    }

    // Check preferred delivery date is not in the past
    if (preferredDeliveryDate) {
      const selectedDate = new Date(preferredDeliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.preferredDeliveryDate = 'Preferred delivery date cannot be in the past.';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      trackEvent('quote_form_validation_error', { errorsCount: Object.keys(newErrors).length });
      // Focus first invalid element
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorEl = document.getElementById(`input-${firstErrorKey}`) || 
                      document.getElementById(`select-${firstErrorKey}`) || 
                      document.getElementById(`textarea-${firstErrorKey}`) ||
                      document.getElementById(`checkbox-${firstErrorKey}`);
      if (errorEl) {
        errorEl.focus();
      }
      return false;
    }

    return true;
  };

  // Form submission handler (Webhook Submission Adapter)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    trackEvent('quote_form_submit', { requirementType: reqType });

    try {
      // Mock API call to represent Serverless Submission
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Generate a mock proposal reference
      const referenceId = `RFQ-MVE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      setRfqReference(referenceId);
      setIsSuccess(true);
      trackEvent('quote_form_success', { 
        requirementType: reqType, 
        referenceId, 
        hasAttachment: !!selectedFile 
      });
    } catch {
      setSubmitError('There was a problem dispatching your quote request. Please try again or inquire via WhatsApp.');
      trackEvent('quote_form_error', { error: 'mock_network_failure' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // central verified contact details
  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';
  const verifiedEmail = contactData.emails.find((e) => e !== 'pending verification');

  const whatsappMsg = 'Hello Maa Vindhawasini Enterprises, I am inquiring from the request quote page and would like to discuss my requirements.';
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  // Page Product selection options mapped dynamically from productsData
  const productSelectOptions = productsData.map((p) => ({
    label: p.name,
    value: p.slug,
  }));
  productSelectOptions.push({ label: 'Other / Not Listed', value: 'other' });

  // Render Success confirmation screen
  if (isSuccess) {
    return (
      <SiteLayout>
        <SEO title="Quote Request Submitted | Maa Vindhawasini Enterprises" description="Thank you for submitting your quote request details." noindex={true} />
        <Section className="bg-white py-16 md:py-24 text-center">
          {/* The whole page swaps to this on submit, so it announces itself and
              takes focus rather than leaving the user on a detached button */}
          <Container className="max-w-2xl font-sans">
            <div ref={successRef} role="status" tabIndex={-1} className="outline-none">
            <div className="w-16 h-16 bg-success-ink/5 border border-success-ink/20 rounded-full flex items-center justify-center text-success-ink mx-auto mb-6">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>

            <h1 className="text-3xl font-extrabold text-navy-950 mb-3">Quote Request Received</h1>
            <p className="text-sm text-slate-500 mb-6 uppercase tracking-wider font-semibold">
              Reference Code: <span className="font-mono text-navy-950 bg-slate-100 px-2 py-0.5 rounded-sm">{rfqReference}</span>
            </p>

            <div className="bg-slate-50 border border-border p-6 rounded-card text-left space-y-4 mb-8">
              <h4 className="font-bold text-navy-950 text-sm pb-2 border-b border-border">Submitted Summary</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <span className="text-slate-500 font-semibold">Requirement:</span>
                <span className="text-navy-950 font-bold capitalize">{reqType}</span>
                {reqType === 'standard' && productSlug && (
                  <>
                    <span className="text-slate-500 font-semibold">Product Catalog:</span>
                    <span className="text-navy-950 font-bold">
                      {productsData.find((p) => p.slug === productSlug)?.name || 'Other'}
                    </span>
                  </>
                )}
                <span className="text-slate-500 font-semibold">Contact Name:</span>
                <span className="text-navy-950 font-bold">{fullName}</span>
                <span className="text-slate-500 font-semibold">Preferred Channel:</span>
                <span className="text-navy-950 font-bold capitalize">{preferredContact}</span>
              </div>

              {/* Secure Attachment upload pending notification (Option 3) */}
              {selectedFile && (
                <div className="bg-warning-soft border border-warning/30 p-3.5 rounded-card text-navy-950 text-xs flex gap-2.5 mt-2.5">
                  <svg className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-bold block">Document Attachment Pending Upload</span>
                    <span className="text-[11px] leading-relaxed block mt-0.5">
                      While your quotation parameters were logged, your drawing file <strong>{selectedFile.name}</strong> was not uploaded because secure cloud file storage is pending configuration. Please email your drawings directly once contacted.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              Thank you. Your request is registered. Our technical estimating technicians will review the parameters and compile a detailed cost proposal within 1-2 business days.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/products" variant="primary" className="font-bold text-xs uppercase tracking-wide">
                Return to Products
              </Button>
              <Button href="/" variant="secondary" className="font-bold text-xs uppercase tracking-wide">
                Go to Homepage
              </Button>
            </div>
            </div>
          </Container>
        </Section>
      </SiteLayout>
    );
  }

  const quoteSchemas = getBreadcrumbSchema([{ label: 'Request a Quote', href: '/request-a-quote' }]);

  return (
    <SiteLayout>
      <SEO
        title="Request a Custom Fabrication Quote Patna"
        description="Submit your technical drawings and fabrication requirements for an itemized commercial proposal from Maa Vindhawasini Enterprises."
        canonicalPath="/request-a-quote"
        schemaJson={quoteSchemas}
      />

      {/* Quote Hero Banner */}
      <Section className="bg-navy-950 text-white pt-6 pb-10 text-left border-b border-slate-900 overflow-hidden relative">
        <Container className="relative z-10">
          <Breadcrumb onDark items={[{ label: 'Request a Quote' }]} className="mb-4" />
          
          <div className="max-w-3xl space-y-2.5">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight font-heading">
              {productSlug && reqType === 'standard'
                ? `Request a Quote for ${productsData.find((p) => p.slug === productSlug)?.name}`
                : 'Request a Commercial Quote'}
            </h1>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl font-sans">
              Share your product details, dimensions, quantity, drawing, or custom project requirement and our estimating team will review the parameters to draft a price proposal.
            </p>
          </div>
        </Container>
      </Section>

      {/* Trust & Reassurance Strip */}
      <div className="bg-slate-50 border-b border-border py-4 font-sans text-xs text-slate-500">
        <Container className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="font-semibold text-navy-950">Itemised written quotation</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="font-semibold text-navy-950">Drawings reviewed by our team</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="font-semibold text-navy-950">You deal with the workshop directly</span>
          </div>
        </Container>
      </div>

      {/* Form and Alternates Panel Split Grid */}
      <Section className="bg-white pt-10 pb-16 text-left">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-slate-50 border border-border p-6 md:p-8 rounded-card shadow-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Proposal Project Meta Pre-fill alerts */}
                {relatedProjectTitle && (
                  <div className="bg-primary-soft text-primary border border-primary/20 p-3.5 rounded-card text-xs font-semibold font-sans flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.083.796L10.5 13.5h3v1.5H9v-1.5h1.5l1.086-1.5H9v-1.5h2.25z" />
                    </svg>
                    <span>Related project reference active: {relatedProjectTitle}</span>
                  </div>
                )}

                {/* Section A: Requirement type */}
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-3">
                    Select Requirement Type <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
                    {quoteRequirementTypesData.map((type) => {
                      const isSelected = reqType === type.value;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleReqTypeChange(type.value as 'standard' | 'custom' | 'general')}
                          className={cn(
                            "p-4 rounded-card border-2 text-left cursor-pointer transition focus:outline-none focus-ring",
                            isSelected
                              ? "bg-white border-primary border-2 text-navy-950 shadow-card"
                              : "bg-white border-border text-slate-600 hover:border-slate-400"
                          )}
                          id={`input-reqType-${type.value}`}
                        >
                          <span className="block font-bold text-sm text-navy-950 mb-1">{type.label}</span>
                          <span className="block text-[11px] text-slate-500 leading-normal">{type.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section B/C: Fields based on requirement type */}
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  {reqType === 'standard' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Select Product"
                        options={productSelectOptions}
                        placeholder="Choose a product..."
                        value={productSlug}
                        id="select-productSlug"
                        error={errors.productSlug}
                        required
                        onChange={(e) => {
                          setProductSlug(e.target.value);
                          trackEvent('quote_product_select', { productSlug: e.target.value });
                        }}
                      />
                      <Input
                        label="Quantity Required"
                        type="text"
                        placeholder="e.g. 5 units or 2 pieces"
                        value={quantity}
                        id="input-quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <Input
                        label="Target Capacity / Volume"
                        type="text"
                        placeholder="e.g. 10,000 Litres or 5 Tons"
                        value={capacity}
                        id="input-capacity"
                        onChange={(e) => setCapacity(e.target.value)}
                      />
                      <Input
                        label="Shell Dimensions"
                        type="text"
                        placeholder="e.g. 2m diameter x 3m height"
                        value={dimensions}
                        id="input-dimensions"
                        onChange={(e) => setDimensions(e.target.value)}
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Workflow Application / Material Load"
                          type="text"
                          placeholder="e.g. Acid containment or general water reservoir"
                          value={application}
                          id="input-application"
                          onChange={(e) => setApplication(e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Textarea
                          label="Additional Specifications or Notes"
                          placeholder="Enter details regarding fittings, nozzles, target thickness, or site constraints..."
                          value={additionalSpecs}
                          id="textarea-additionalSpecs"
                          onChange={(e) => setAdditionalSpecs(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {reqType === 'custom' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Input
                          label="Requirement Title / Equipment Name"
                          type="text"
                          placeholder="e.g. Custom Chemical storage skid or framing"
                          value={customTitle}
                          id="input-customTitle"
                          error={errors.customTitle}
                          required
                          onChange={(e) => setCustomTitle(e.target.value)}
                        />
                      </div>
                      <Input
                        label="Quantity Required"
                        type="text"
                        placeholder="e.g. 1 assembly or 3 pieces"
                        value={quantity}
                        id="input-quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <Select
                        label="Preferred Material Grade"
                        options={quoteMaterialOptionsData}
                        value={material}
                        id="select-material"
                        onChange={(e) => setMaterial(e.target.value)}
                      />
                      <Input
                        label="Target Dimensions"
                        type="text"
                        placeholder="e.g. 3000mm x 1500mm x 12mm plate"
                        value={dimensions}
                        id="input-dimensions"
                        onChange={(e) => setDimensions(e.target.value)}
                      />
                      <Input
                        label="Volume / Capacity Requirements"
                        type="text"
                        placeholder="e.g. 5,000L or 3 metric tons load"
                        value={capacity}
                        id="input-capacity"
                        onChange={(e) => setCapacity(e.target.value)}
                      />
                      <Input
                        label="Application / Industry Segment"
                        type="text"
                        placeholder="e.g. Sugar mills processing or safety frame"
                        value={application}
                        id="input-application"
                        onChange={(e) => setApplication(e.target.value)}
                      />
                      <Input
                        label="Delivery Site / Location"
                        type="text"
                        placeholder="e.g. Patna, Bihar or Nalanda"
                        value={location}
                        id="input-location"
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <div className="md:col-span-2">
                        <Textarea
                          label="Detailed Specifications"
                          placeholder="Describe shapes, nozzle configurations, anti-rust coatings (primer/epoxy), or drawing specifications..."
                          value={additionalSpecs}
                          id="textarea-additionalSpecs"
                          onChange={(e) => setAdditionalSpecs(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {reqType === 'general' && (
                    <div className="space-y-4">
                      <Textarea
                        label="Inquiry / Requirement Details"
                        placeholder="Describe what you are looking to build, capacities needed, or operational query details..."
                        value={requirementDescription}
                        id="textarea-requirementDescription"
                        error={errors.requirementDescription}
                        required
                        onChange={(e) => setRequirementDescription(e.target.value)}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          label="Related Product (Optional)"
                          options={productSelectOptions}
                          placeholder="Choose product context if applicable..."
                          value={productSlug}
                          id="select-productSlug"
                          onChange={(e) => {
                            setProductSlug(e.target.value);
                            trackEvent('quote_product_select', { productSlug: e.target.value });
                          }}
                        />
                        <Input
                          label="Target Quantity"
                          type="text"
                          placeholder="e.g. 10 pieces"
                          value={quantity}
                          id="input-quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Section D: File uploads (Option 3 metadata handler) */}
                {/* The highlight state used to add a third card surface around
                    an already-carded dropzone inside an already-carded form.
                    A left-side emphasis rule would be worse; a plain marker
                    line plus the dropzone's own highlight carries it. */}
                <div
                  ref={uploadAreaRef}
                  className="pt-6 border-t border-border transition-colors duration-300"
                >
                  <FileUpload
                    label="Attach Engineering Drawing or Specifications"
                    formatsLabel={quoteUploadRules.formatsLabel}
                    maxSizeLabel={quoteUploadRules.maxSizeLabel}
                    selectedFile={selectedFile}
                    onClearFile={handleClearFile}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    error={fileError || undefined}
                    id="input-file"
                    highlighted={highlightUpload}
                  />
                  {highlightUpload && (
                    <span className="text-xs font-bold text-primary-ink uppercase block mt-1 font-sans">
                      Recommended upload area for blueprint files.
                    </span>
                  )}
                </div>

                {/* Section E: Contact details */}
                <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-navy-950 mb-1">Contact & Dispatch Parameters</label>
                    <span className="text-[11px] text-slate-500 font-medium">Please supply accurate details so our technicians can reach you.</span>
                  </div>

                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your name"
                    value={fullName}
                    id="input-fullName"
                    error={errors.fullName}
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="e.g. +91-XXXXX-XXXXX"
                    value={phone}
                    id="input-phone"
                    error={errors.phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. name@company.com (Optional)"
                    value={email}
                    id="input-email"
                    error={errors.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Company Name"
                    type="text"
                    placeholder="e.g. Industrial Ltd. (Optional)"
                    value={company}
                    id="input-company"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <Input
                    label="Preferred Delivery Location"
                    type="text"
                    placeholder="e.g. Patna, Bihar (Optional)"
                    value={city}
                    id="input-city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    label="Preferred Delivery Date (Preferred)"
                    type="date"
                    value={preferredDeliveryDate}
                    id="input-preferredDeliveryDate"
                    error={errors.preferredDeliveryDate}
                    onChange={(e) => setPreferredDeliveryDate(e.target.value)}
                  />
                  <div className="md:col-span-2">
                    <Select
                      label="Preferred Contact Channel"
                      options={[
                        { label: 'Direct Phone Call', value: 'phone' },
                        { label: 'WhatsApp Messenger', value: 'whatsapp' },
                        { label: 'Email Correspondence', value: 'email' },
                      ]}
                      value={preferredContact}
                      id="select-preferredContact"
                      required
                      onChange={(e) => setPreferredContact(e.target.value)}
                    />
                  </div>
                </div>

                {/* Section F: Consent and submission */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <Checkbox
                    label={
                      <span>
                        {quoteConsentText}{' '}
                        <Link to="/privacy-policy" className="text-primary underline font-bold">
                          Privacy Policy
                        </Link>
                      </span>
                    }
                    checked={consentChecked}
                    id="checkbox-consent"
                    error={errors.consent}
                    required
                    onChange={(e) => setConsentChecked(e.target.checked)}
                  />

                  {/* Submit-level failure is announced; field-level errors are not,
                      to avoid firing an alert per keystroke during validation */}
                  <div role="alert">
                    {submitError && <FormErrorMessage message={submitError} />}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                    className="font-bold text-sm tracking-wider uppercase h-12"
                  >
                    {isSubmitting ? 'Processing Proposal Request...' : 'Submit Quotation Request'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Alternates & Timeline Sidebar Column */}
            <div className="lg:col-span-4 space-y-8 text-left font-sans">
              
              {/* Alternative contacts */}
              <div className="bg-slate-50 border border-border p-6 rounded-card shadow-card space-y-4">
                <h3 className="text-base font-bold text-navy-950 pb-2 border-b border-border">Discuss Directly</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Prefer to consult on your custom dimensions or raw plate weights with a shop technician directly?
                </p>

                <div className="space-y-2.5">
                  {hasWhatsapp && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center min-h-11 gap-2 text-xs font-bold text-white bg-success-ink hover:bg-success-ink-hover px-4 py-2.5 rounded-card w-full text-center shadow-card"
                      onClick={() => trackEvent('quote_alternative_contact_click', { channel: 'whatsapp' })}
                    >
                      <img src={ASSETS.icons.whatsapp} alt="" aria-hidden="true" className="w-4 h-4 brightness-0 invert" width={16} height={16} decoding="async" />
                      Chat on WhatsApp
                    </a>
                  )}

                  {verifiedPhone && (
                    <a
                      href={`tel:${verifiedPhone}`}
                      className="flex items-center justify-center gap-2 text-xs font-bold text-navy-950 bg-white border border-navy-950 hover:bg-slate-50 px-4 py-2.5 rounded-card w-full text-center"
                      onClick={() => trackEvent('quote_alternative_contact_click', { channel: 'call' })}
                    >
                      <img src={ASSETS.icons.phone} alt="" aria-hidden="true" className="w-4 h-4" width={16} height={16} decoding="async" />
                      Call: {verifiedPhone}
                    </a>
                  )}

                  {verifiedEmail && (
                    <a
                      href={`mailto:${verifiedEmail}`}
                      className="flex items-center justify-center gap-2 text-xs font-bold text-navy-950 bg-white border border-navy-950 hover:bg-slate-50 px-4 py-2.5 rounded-card w-full text-center"
                      onClick={() => trackEvent('quote_alternative_contact_click', { channel: 'email' })}
                    >
                      <img src={ASSETS.icons.email} alt="" aria-hidden="true" className="w-4 h-4" width={16} height={16} decoding="async" />
                      Email Requirements
                    </a>
                  )}
                </div>
              </div>

              {/* What happens next */}
              <div className="bg-slate-50 border border-border p-6 rounded-card shadow-card space-y-4">
                <h3 className="text-base font-bold text-navy-950 pb-2 border-b border-border">What Happens Next?</h3>
                <div className="space-y-4">
                  {quoteNextStepsData.map((step) => (
                    <div key={step.stepNumber} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-navy-950 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step.stepNumber}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-navy-950 leading-snug">{step.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
};

export default RequestAQuote;
