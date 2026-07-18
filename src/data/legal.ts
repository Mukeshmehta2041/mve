import { contactData } from './contact';
import { companyData } from './company';

export const legalLastUpdated = 'July 2026';

/** Derived from contact.ts so the legal pages can never drift from the rest of the site. */
export const legalContactData = {
  companyName: companyData.legalName,
  email: contactData.emails[0],
  phone: contactData.phones[0],
  address: contactData.officeAddress,
};
