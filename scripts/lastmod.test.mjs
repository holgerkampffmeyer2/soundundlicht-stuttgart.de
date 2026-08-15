// @vitest-environment node
import { describe, expect, it } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { buildCache, getLastModifiedCache, lastModifiedFor, resolveSourceFiles } from './lastmod.mjs';

function tempCachePath() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lastmod-test-'));
  return path.join(dir, '.lastmod-cache.json');
}

describe('scripts/lastmod.mjs', () => {
  describe('resolveSourceFiles', () => {
    it('maps the root page to index.astro', () => {
      expect(resolveSourceFiles('/')).toEqual(['src/pages/index.astro']);
    });

    it('maps a city page to its astro file plus shared data', () => {
      expect(resolveSourceFiles('/stuttgart/')).toEqual([
        'src/pages/stuttgart.astro',
        'src/data/cities.json',
        'src/data/faqs.json',
      ]);
    });

    it('maps the vermietung overview', () => {
      expect(resolveSourceFiles('/vermietung/')).toEqual([
        'src/pages/vermietung.astro',
        'src/data/faqs.json',
      ]);
    });

    it('maps a product page to its astro file plus product yml', () => {
      expect(resolveSourceFiles('/vermietung/jbl-partybox-300-320/')).toEqual([
        'src/pages/vermietung/jbl-partybox-300-320.astro',
        'src/content/products/jbl-partybox-300-320.yml',
      ]);
    });

    it('maps special pages', () => {
      expect(resolveSourceFiles('/thankyou/')).toEqual(['src/pages/thankyou.astro']);
      expect(resolveSourceFiles('/impressum/')).toEqual(['src/pages/impressum.astro']);
    });

    it('handles sitemap paths without trailing slash', () => {
      expect(resolveSourceFiles('/stuttgart')).toEqual(resolveSourceFiles('/stuttgart/'));
    });
  });

  describe('lastModifiedFor', () => {
    it('returns the newest date across all source files', () => {
      const map = { a: '2026-01-01', b: '2026-05-05', c: '2026-03-03' };
      expect(lastModifiedFor(['a', 'b', 'c'], map)).toBe('2026-05-05');
    });

    it('ignores files without an entry', () => {
      expect(lastModifiedFor(['a', 'x'], { a: '2026-02-02' })).toBe('2026-02-02');
    });

    it('returns null when no source file has a date', () => {
      expect(lastModifiedFor(['missing'], {})).toBeNull();
      expect(lastModifiedFor([], { a: '2026-01-01' })).toBeNull();
    });
  });

  describe('getLastModifiedCache', () => {
    it('reads a valid cache file', () => {
      const cachePath = tempCachePath();
      fs.writeFileSync(cachePath, JSON.stringify({ 'src/pages/index.astro': '2026-01-01' }));
      expect(getLastModifiedCache(cachePath)).toEqual({ 'src/pages/index.astro': '2026-01-01' });
    });

    it('returns null when the cache file is missing', () => {
      expect(getLastModifiedCache(path.join(tempCachePath(), 'missing.json'))).toBeNull();
    });

    it('returns null when the cache file is corrupt', () => {
      const cachePath = tempCachePath();
      fs.writeFileSync(cachePath, '{ not valid json');
      expect(getLastModifiedCache(cachePath)).toBeNull();
    });
  });

  describe('buildCache', () => {
    it('produces last-modified dates for known source files', async () => {
      const data = await buildCache();
      expect(Object.keys(data).length).toBeGreaterThan(0);
      expect(data['src/pages/index.astro']).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(data['src/data/cities.json']).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }, 20000);
  });
});
