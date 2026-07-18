import type { ContactInfo } from '../types';

/**
 * ⚠️ VERIFY BEFORE LAUNCH — single source of truth for all contact details.
 *
 * This file previously carried `+91 9876543210` / `info@maavindhawasini.com`
 * while legal.ts independently carried `+91-9576226156` / `mvepatna@gmail.com`.
 * `9876543210` is the standard Indian placeholder number, so the legal.ts pair
 * has been kept as the more plausible of the two — but neither was confirmed.
 *
 * Confirm the phone, WhatsApp, email, and full street address below before the
 * site goes live. legal.ts now re-exports from here, so this is the only place
 * these values need to change.
 */
export const contactData: ContactInfo = {
  phones: ['+91 95762 26156'],
  emails: ['mvepatna@gmail.com'],
  whatsapp: '919576226156',
  whatsappMessageUrl: 'https://wa.me/919576226156',
  officeAddress: 'Patna, Bihar, India',
  factoryAddress: 'Patna, Bihar, India',
  mapEmbedUrl: '', // Add the Google Maps embed URL once the address is confirmed
  businessHours: 'Monday to Saturday, 9:00 AM – 6:00 PM',
  serviceArea: 'Pan-India delivery and site installation',
};
export default contactData;
