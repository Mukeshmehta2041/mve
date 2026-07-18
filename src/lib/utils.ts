/**
 * Merges class names into a single string.
 * Simple, dependency-free alternative for static website variant control.
 */
export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  return classes.filter(Boolean).join(' ');
}

/**
 * Generates a quote link with optional product or service query parameters.
 */
export function getQuoteUrl(params: { product?: string; service?: string; type?: string } = {}) {
  const queryParts: string[] = [];
  if (params.product) {
    queryParts.push(`product=${encodeURIComponent(params.product)}`);
  }
  if (params.service) {
    queryParts.push(`service=${encodeURIComponent(params.service)}`);
  }
  if (params.type) {
    queryParts.push(`type=${encodeURIComponent(params.type)}`);
  }
  return `/request-a-quote${queryParts.length > 0 ? `?${queryParts.join('&')}` : ''}`;
}

