// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { sanitizeUrl } from './urlUtils';

describe('sanitizeUrl', () => {
  it('resolves relative paths against the site origin', () => {
    expect(sanitizeUrl('/img/cities/stuttgart.webp', { protocols: ['https:'] })).toBe(
      'https://soundundlicht-stuttgart.de/img/cities/stuttgart.webp',
    );
  });

  it('returns absolute http(s) URLs unchanged in shape', () => {
    expect(sanitizeUrl('https://example.com/a.webp')).toBe('https://example.com/a.webp');
    expect(sanitizeUrl('http://example.com/a.webp', { protocols: ['http:', 'https:'] })).toBe(
      'http://example.com/a.webp',
    );
  });

  it('rejects javascript: URLs', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBeNull();
  });

  it('rejects data: URLs by default', () => {
    expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
  });

  it('returns null for empty or invalid input', () => {
    expect(sanitizeUrl('')).toBeNull();
    expect(sanitizeUrl(null)).toBeNull();
    expect(sanitizeUrl(undefined)).toBeNull();
    expect(sanitizeUrl('http://[invalid')).toBeNull();
  });

  it('enforces hostname allowlist', () => {
    expect(
      sanitizeUrl('https://www.google.com/maps/embed?pb=x', {
        hostnames: ['www.google.com'],
        pathnamePrefix: '/maps/embed',
      }),
    ).toBe('https://www.google.com/maps/embed?pb=x');
    expect(
      sanitizeUrl('https://evil.example/maps/embed', {
        hostnames: ['www.google.com'],
        pathnamePrefix: '/maps/embed',
      }),
    ).toBeNull();
  });

  it('enforces pathname prefix', () => {
    expect(
      sanitizeUrl('https://www.google.com/other', {
        hostnames: ['www.google.com'],
        pathnamePrefix: '/maps/embed',
      }),
    ).toBeNull();
  });

  it('enforces protocol allowlist', () => {
    expect(sanitizeUrl('https://example.com', { protocols: ['http:'] })).toBeNull();
  });
});
