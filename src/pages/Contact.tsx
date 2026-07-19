import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteLayout, SEO, PageCTA } from '../components/layout';
import { Container, Section, Button, Breadcrumb } from '../components/ui';
import { Input, Select, Textarea, Checkbox, FormErrorMessage } from '../components/ui/FormControls';
import { contactData } from '../data';
import { getBreadcrumbSchema, getLocalBusinessSchema } from '../lib/seo';
import { trackEvent } from '../lib/analytics';
import { ASSETS } from '../lib/assets';

export const Contact: React.FC = () => {
  // Form Field States
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('general');
  const [message, setMessage] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // System UI States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Track page view
  useEffect(() => {
    trackEvent('contact_page_view');
  }, []);

  const verifiedPhone = contactData.phones.find((p) => p !== 'pending verification');
  const hasWhatsapp = contactData.whatsapp !== 'pending verification';
  const verifiedEmail = contactData.emails.find((e) => e !== 'pending verification');
  const verifiedHours = contactData.businessHours && contactData.businessHours !== 'pending verification';
  const verifiedMapUrl = contactData.mapEmbedUrl && contactData.mapEmbedUrl !== 'pending verification';

  // Wording checks for safety of physical address
  const isAddressPending = contactData.officeAddress.includes('pending verification');
  const displayAddress = isAddressPending ? 'Patna, Bihar, India' : contactData.officeAddress;

  const whatsappMsg = 'Hello Maa Vindhawasini Enterprises, I would like to inquire about your industrial products or fabrication requirements.';
  const whatsappUrl = `https://wa.me/${contactData.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  // Form Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const nameTrimmed = fullName.trim();
    const phoneTrimmed = phone.trim();
    const emailTrimmed = email.trim();
    const messageTrimmed = message.trim();

    if (!nameTrimmed) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!phoneTrimmed) {
      newErrors.phone = 'Phone Number is required.';
    } else {
      const cleanedPhone = phoneTrimmed.replace(/\s+/g, '').replace(/[-+]/g, '');
      if (cleanedPhone.length < 10 || cleanedPhone.length > 13) {
        newErrors.phone = 'Please enter a valid phone number (10-12 digits).';
      }
    }

    if (emailTrimmed) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!messageTrimmed) {
      newErrors.message = 'Please enter details of your enquiry.';
    } else if (messageTrimmed.length < 10) {
      newErrors.message = 'Please describe your query in at least 10 characters.';
    }

    if (!consentChecked) {
      newErrors.consent = 'You must accept the privacy and consent notice to submit.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      trackEvent('contact_form_validation_error', { errorsCount: Object.keys(newErrors).length });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    trackEvent('contact_form_submit', { enquiryType });

    try {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      trackEvent('contact_form_success', { enquiryType });
    } catch {
      setSubmitError('There was an issue sending your message. Please try calling our number directly.');
      trackEvent('contact_form_error', { error: 'mock_submit_failure' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactSchemas = [
    getBreadcrumbSchema([{ label: 'Contact Us', href: '/contact' }]),
    getLocalBusinessSchema(),
  ];

  return (
    <SiteLayout>
      <SEO
        title="Contact Industrial Equipment Fabricators Patna"
        description="Contact our workshop in Patna, Bihar for custom fabrication queries, steel storage tank quotes, factory visits, or engineering consultations."
        canonicalPath="/contact"
        schemaJson={contactSchemas}
      />

      {/* Hero Section */}
      <Section className="bg-navy-950 text-white pt-6 pb-12 md:pb-16 text-left relative overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <Container className="relative z-10">
          <Breadcrumb onDark 
            items={[{ label: 'Contact Us' }]} 
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-heading">
                  Contact Us
                </h1>
              </div>

              <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl font-sans">
                Speak with our team about industrial products, custom fabrication, drawings, dimensions, or project requirements.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                {verifiedPhone && (
                  <Button
                    href={`tel:${verifiedPhone}`}
                    variant="primary"
                    className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                    onClick={() => trackEvent('contact_phone_click', { position: 'hero' })}
                  >
                    Call Us Now
                  </Button>
                )}
                {hasWhatsapp && (
                  <Button
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline-light"
                    className="font-bold text-sm tracking-wider uppercase h-12 flex-grow sm:flex-grow-0"
                    onClick={() => trackEvent('contact_whatsapp_click', { position: 'hero' })}
                  >
                    Chat on WhatsApp
                  </Button>
                )}
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* Contact Method Cards Grid */}
      <Section className="bg-white border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            {/* Phone Card */}
            {verifiedPhone && (
              <div className="bg-slate-50 border border-border p-6 rounded-card shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center">
                    <img src={ASSETS.icons.phone} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 text-sm mb-1 uppercase tracking-wide">Call Directly</h3>
                    <p className="text-xs text-slate-500 leading-normal">
                      Speak with our estimators to ask questions regarding lead times or capacities.
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-200">
                  {contactData.phones.map((phoneNo, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phoneNo}`}
                      className="block font-bold text-navy-950 hover:text-primary transition-colors text-xs font-mono mb-1"
                      onClick={() => trackEvent('contact_phone_click', { position: 'card', numberIndex: idx })}
                    >
                      {phoneNo}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp Card */}
            {hasWhatsapp && (
              <div className="bg-slate-50 border border-border p-6 rounded-card shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center">
                    <img src={ASSETS.icons.whatsapp} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 text-sm mb-1 uppercase tracking-wide">WhatsApp Support</h3>
                    <p className="text-xs text-slate-500 leading-normal">
                      Send reference photos, drawings files, or drop site location pins.
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-200">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-bold text-success hover:text-green-600 transition-colors text-xs font-mono"
                    onClick={() => trackEvent('contact_whatsapp_click', { position: 'card' })}
                  >
                    +91-{contactData.whatsapp}
                  </a>
                </div>
              </div>
            )}

            {/* Email Card */}
            {verifiedEmail && (
              <div className="bg-slate-50 border border-border p-6 rounded-card shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center">
                    <img src={ASSETS.icons.email} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 text-sm mb-1 uppercase tracking-wide">Email Inquiries</h3>
                    <p className="text-xs text-slate-500 leading-normal">
                      Email official procurement requests, purchase orders, or contract documents.
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-200">
                  {contactData.emails.map((mail, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${mail}?subject=Website%20Enquiry%20-%20Maa%20Vindhawasini%20Enterprises`}
                      className="block font-bold text-navy-950 hover:text-primary transition-colors text-xs truncate font-mono"
                      onClick={() => trackEvent('contact_email_click', { position: 'card', emailIndex: idx })}
                    >
                      {mail}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Quote Card */}
            <div className="bg-slate-50 border border-border p-6 rounded-card shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center">
                  <img src={ASSETS.icons.fileText} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-950 text-sm mb-1 uppercase tracking-wide">Request Quote</h3>
                  <p className="text-xs text-slate-500 leading-normal">
                    Submit sizing calculations or specifications drafts for pricing quotes.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-200">
                <Link
                  to="/request-a-quote"
                  className="font-bold text-primary hover:text-primary-hover transition-colors text-xs flex items-center gap-1 group"
                  onClick={() => trackEvent('contact_quote_click', { position: 'card' })}
                >
                  Go to Quote Form
                  <svg className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Split Form & Map Section */}
      <Section className="bg-surface border-b border-border text-left">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left General Inquiry Form */}
            <div className="lg:col-span-6 bg-white border border-border p-6 md:p-8 rounded-card shadow-sm">
              <h2 className="text-xl md:text-2xl font-extrabold text-navy-950 mb-1 leading-tight font-heading">
                Submit an Enquiry
              </h2>
              <p className="text-xs text-slate-500 mb-6 font-sans">
                Have a general question regarding our fabrication services or order terms? Drop us a line.
              </p>

              {isSuccess ? (
                // role=status so the outcome is announced; tabIndex lets the
                // confirmation be reached directly after submit
                <div
                  role="status"
                  tabIndex={-1}
                  className="p-6 bg-success-ink/5 border border-success-ink/20 rounded-card text-center space-y-4 font-sans"
                >
                  <div className="w-12 h-12 bg-success-ink/10 text-success-ink rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-navy-950 text-base">Message Sent Successfully</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thank you. We have received your query. Our administrators will review the details and get back to you soon.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="font-bold text-xs uppercase tracking-wide"
                    onClick={() => {
                      setIsSuccess(false);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                      setConsentChecked(false);
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your name"
                    value={fullName}
                    id="input-fullName"
                    error={errors.fullName}
                    required
                    onChange={(e) => {
                      setFullName(e.target.value);
                      trackEvent('contact_form_start');
                    }}
                  />
                  <Input
                    label="Company Name"
                    type="text"
                    placeholder="e.g. Steel Works Ltd. (Optional)"
                    value={company}
                    id="input-company"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="e.g. name@email.com (Optional)"
                      value={email}
                      id="input-email"
                      error={errors.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <Select
                    label="Enquiry Type"
                    options={[
                      { label: 'General Business Consultation', value: 'general' },
                      { label: 'Product Sizing or Quotation Inquiry', value: 'product' },
                      { label: 'Custom CAD Drawing Fabrication', value: 'custom' },
                      { label: 'Existing Order Updates', value: 'order' },
                      { label: 'Other', value: 'other' },
                    ]}
                    value={enquiryType}
                    id="select-enquiryType"
                    required
                    onChange={(e) => setEnquiryType(e.target.value)}
                  />

                  {/* Redirect notice if quote request is more appropriate */}
                  {(enquiryType === 'product' || enquiryType === 'custom') && (
                    <div className="bg-primary-soft text-primary border border-primary/20 p-4 rounded-card text-xs font-sans space-y-2">
                      <span className="font-bold block">Looking for a Detailed Sizing Quote?</span>
                      <span className="leading-relaxed block text-slate-700">
                        If you have CAD drawings, raw capacity limits, or custom material requirements, using our Request a Quote form will ensure faster technical engineering reviews.
                      </span>
                      <Link
                        to="/request-a-quote"
                        className="inline-block bg-primary-ink text-white font-bold px-3 py-1.5 rounded-sm hover:bg-primary-ink-hover shadow-sm uppercase tracking-wide text-xs"
                        onClick={() => trackEvent('contact_quote_click', { position: 'form_redirect' })}
                      >
                        Request Detailed Proposal
                      </Link>
                    </div>
                  )}

                  <Textarea
                    label="Your Message"
                    placeholder="Describe your enquiry details..."
                    value={message}
                    id="textarea-message"
                    error={errors.message}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <Checkbox
                    label={
                      <span>
                        I agree that Maa Vindhawasini Enterprises may use my contact details to reply to my query. Read our{' '}
                        <Link to="/privacy-policy" className="text-primary underline font-bold">
                          Privacy Policy
                        </Link>
                        .
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
                    className="font-bold text-sm tracking-wider uppercase h-12 pt-0.5"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Submit Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Right Map & Hours Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Map embed Card */}
              {verifiedMapUrl && (
                <div className="bg-white border border-border p-6 rounded-card shadow-sm space-y-4">
                  <h3 className="text-base font-extrabold text-navy-950 font-heading">Workshop Location Map</h3>
                  <div className="rounded-lg overflow-hidden border border-border aspect-[16/10] bg-slate-50 relative">
                    <iframe
                      src={contactData.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Maa Vindhawasini Enterprises workshop location map"
                    ></iframe>
                  </div>

                  <div className="space-y-3 font-sans pt-2">
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider block font-bold">Physical Address</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {displayAddress}
                      </p>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Junction Guide:</span>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(displayAddress)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-hover group"
                        onClick={() => trackEvent('contact_directions_click')}
                      >
                        Get Directions
                        <svg className="w-3.5 h-3.5 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Hours Card */}
              {verifiedHours && (
                <div className="bg-white border border-border p-6 rounded-card shadow-sm flex items-start gap-4 font-sans">
                  <div className="w-10 h-10 rounded-sm bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                    <img src={ASSETS.icons.clock} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 text-sm mb-1 uppercase tracking-wide">Business Hours</h3>
                    <p className="text-xs text-slate-600 leading-normal mb-1">{contactData.businessHours}</p>
                    <span className="text-xs text-slate-500 leading-relaxed block">
                      Visiting client meetings must be scheduled in advance with shop foremen.
                    </span>
                  </div>
                </div>
              )}

            </div>

          </div>
        </Container>
      </Section>

      {/* Quotation Enquiry CTA section */}
      <PageCTA
        title="Have a Product or Custom Fabrication Requirement?"
        description="If you have dimensions, quantity ranges, material preferences, or CAD drawings, please request a quote directly to get an itemized commercial proposal."
        quote={{
          label: 'Request a Detailed Quote',
          onClick: () => trackEvent('contact_quote_click', { position: 'footer_cta' }),
        }}
        secondary={{ label: 'Explore Products', href: '/products' }}
        showWhatsapp={false}
      />

    </SiteLayout>
  );
};

export default Contact;
