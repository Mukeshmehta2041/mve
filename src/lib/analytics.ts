/**
 * Centralized analytics preparation system.
 * Dispatches standard web events and logs to console in development.
 * Safe for integration with Google Analytics (gtag), Tag Manager, or custom scripts.
 */

export interface AnalyticsContext {
  productSlug?: string;
  [key: string]: unknown;
}

export function trackEvent(eventName: string, context?: AnalyticsContext) {
  // Console logging for verification and QA auditing
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] Name: ${eventName}`, context);
  }

  // Push to dataLayer for Google Tag Manager compatibility
  try {
    const windowWithDataLayer = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
    windowWithDataLayer.dataLayer.push({
      event: eventName,
      ...context,
    });
  } catch {
    // Fail silently in environments where window is not defined
  }
}
