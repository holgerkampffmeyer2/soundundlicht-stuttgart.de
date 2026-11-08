export interface SafeUrlOptions {
  protocols?: string[];
  hostnames?: string[];
  pathnamePrefix?: string;
}

export function sanitizeUrl(raw: string | null | undefined, options: SafeUrlOptions = {}): string | null {
  if (!raw) return null;
  const { protocols = ['https:'], hostnames, pathnamePrefix } = options;

  let parsed: URL;
  try {
    const base = typeof window !== 'undefined' ? window.location.href : 'https://soundundlicht-stuttgart.de/';
    parsed = new URL(raw, base);
  } catch {
    return null;
  }

  if (!protocols.includes(parsed.protocol)) return null;
  if (hostnames && !hostnames.includes(parsed.hostname)) return null;
  if (pathnamePrefix && !parsed.pathname.startsWith(pathnamePrefix)) return null;

  return parsed.href;
}
