// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import {
  readRawCart,
  buildProductMap,
  formatCartItems,
  getCartData,
} from './cartData';

const STORAGE_KEY = 'sls_merkliste';

function createStorageMock(): Storage {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { for (const key of Object.keys(store)) delete store[key]; },
    get length() { return Object.keys(store).length; },
    key: (index: number) => Object.keys(store)[index] ?? null,
  } as Storage;
}

let storage: Storage;

const sampleProducts = [
  { slug: 'jbl-partybox-300-320', title: 'JBL Partyboxen (Paar)', price: 'ab 80€ / Tag' },
  { slug: 'ld-maui-28g3', title: 'Säulensystem 2x LD Maui 28 G3 (Paar)', price: 'ab 120€ / Tag' },
  { slug: 'partylicht-moving-head', title: '18 Prisma 10 Gobo LED Moving Head', price: 'ab 50€ / Tag' },
];

function setCart(items: Array<{ slug: string; addedAt?: number }>, lastUpdated?: number) {
  storage.setItem(STORAGE_KEY, JSON.stringify({
    items,
    lastUpdated: lastUpdated ?? Date.now(),
  }));
}

beforeEach(() => {
  storage = createStorageMock();
});

describe('readRawCart', () => {
  it('returns null when no cart exists', () => {
    expect(readRawCart(storage)).toBeNull();
  });

  it('returns valid cart with items', () => {
    setCart([{ slug: 'jbl-partybox-300-320' }]);
    const cart = readRawCart(storage);
    expect(cart).not.toBeNull();
    expect(cart!.items).toHaveLength(1);
    expect(cart!.items[0].slug).toBe('jbl-partybox-300-320');
  });

  it('returns null for expired cart (>24h)', () => {
    const old = Date.now() - 25 * 60 * 60 * 1000;
    setCart([{ slug: 'jbl-partybox-300-320' }], old);
    expect(readRawCart(storage)).toBeNull();
    expect(storage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('returns valid cart within 24h', () => {
    const recent = Date.now() - 23 * 60 * 60 * 1000;
    setCart([{ slug: 'jbl-partybox-300-320' }], recent);
    expect(readRawCart(storage)).not.toBeNull();
  });

  it('returns null for invalid JSON', () => {
    storage.setItem(STORAGE_KEY, 'not-json');
    expect(readRawCart(storage)).toBeNull();
  });

  it('returns null for missing items array', () => {
    storage.setItem(STORAGE_KEY, JSON.stringify({ lastUpdated: Date.now() }));
    expect(readRawCart(storage)).toBeNull();
  });

  it('returns null for non-object structure', () => {
    storage.setItem(STORAGE_KEY, JSON.stringify('just a string'));
    expect(readRawCart(storage)).toBeNull();
  });
});

describe('buildProductMap', () => {
  it('creates a lookup map from product array', () => {
    const map = buildProductMap(sampleProducts);
    expect(map['jbl-partybox-300-320'].title).toBe('JBL Partyboxen (Paar)');
    expect(map['ld-maui-28g3'].price).toBe('ab 120€ / Tag');
  });

  it('returns empty map for empty array', () => {
    expect(buildProductMap([])).toEqual({});
  });
});

describe('formatCartItems', () => {
  it('formats single item with product data', () => {
    const cart = { items: [{ slug: 'jbl-partybox-300-320' }] };
    const map = buildProductMap(sampleProducts);
    expect(formatCartItems(cart, map)).toBe('JBL Partyboxen (Paar) (ab 80€ / Tag)');
  });

  it('formats multiple items separated by newlines', () => {
    const cart = {
      items: [
        { slug: 'jbl-partybox-300-320' },
        { slug: 'ld-maui-28g3' },
      ],
    };
    const map = buildProductMap(sampleProducts);
    const result = formatCartItems(cart, map);
    expect(result).toBe(
      'JBL Partyboxen (Paar) (ab 80€ / Tag)\nSäulensystem 2x LD Maui 28 G3 (Paar) (ab 120€ / Tag)'
    );
  });

  it('falls back to slug when product not found', () => {
    const cart = { items: [{ slug: 'unknown-product' }] };
    expect(formatCartItems(cart, {})).toBe('unknown-product ()');
  });

  it('handles empty items array', () => {
    expect(formatCartItems({ items: [] }, {})).toBe('');
  });

  it('formats three items correctly', () => {
    const cart = {
      items: [
        { slug: 'jbl-partybox-300-320' },
        { slug: 'partylicht-moving-head' },
        { slug: 'ld-maui-28g3' },
      ],
    };
    const map = buildProductMap(sampleProducts);
    const lines = formatCartItems(cart, map).split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[0]).toContain('JBL Partyboxen');
    expect(lines[1]).toContain('Moving Head');
    expect(lines[2]).toContain('Säulensystem');
  });
});

describe('getCartData (integration)', () => {
  it('returns empty string when no cart exists', () => {
    expect(getCartData(storage, {})).toBe('');
  });

  it('returns formatted items with product data', () => {
    setCart([
      { slug: 'jbl-partybox-300-320' },
      { slug: 'partylicht-moving-head' },
    ]);
    const map = buildProductMap(sampleProducts);
    const result = getCartData(storage, map);
    const lines = result.split('\n');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toBe('JBL Partyboxen (Paar) (ab 80€ / Tag)');
    expect(lines[1]).toBe('18 Prisma 10 Gobo LED Moving Head (ab 50€ / Tag)');
  });

  it('returns empty string for expired cart', () => {
    const old = Date.now() - 25 * 60 * 60 * 1000;
    setCart([{ slug: 'jbl-partybox-300-320' }], old);
    expect(getCartData(storage, sampleProducts)).toBe('');
  });

  it('returns empty string for invalid JSON', () => {
    storage.setItem(STORAGE_KEY, 'broken');
    expect(getCartData(storage, sampleProducts)).toBe('');
  });

  it('returns empty string for cart with no items', () => {
    storage.setItem(STORAGE_KEY, JSON.stringify({ items: [], lastUpdated: Date.now() }));
    expect(getCartData(storage, sampleProducts)).toBe('');
  });

  it('returns all items when 2+ items on merkliste', () => {
    setCart([
      { slug: 'jbl-partybox-300-320' },
      { slug: 'ld-maui-28g3' },
      { slug: 'partylicht-moving-head' },
    ]);
    const map = buildProductMap(sampleProducts);
    const result = getCartData(storage, map);
    const lines = result.split('\n');
    expect(lines).toHaveLength(3);
    expect(result).toContain('JBL Partyboxen');
    expect(result).toContain('Säulensystem');
    expect(result).toContain('Moving Head');
  });

  it('falls back to slug for unknown products', () => {
    setCart([{ slug: 'some-new-device' }]);
    expect(getCartData(storage, sampleProducts)).toBe('some-new-device ()');
  });

  it('cleans up expired cart from storage', () => {
    const old = Date.now() - 25 * 60 * 60 * 1000;
    setCart([{ slug: 'jbl-partybox-300-320' }], old);
    getCartData(storage, sampleProducts);
    expect(storage.getItem(STORAGE_KEY)).toBeNull();
  });
});

describe('form textarea prefill logic', () => {
  const merklisteHeader = 'Gewünschte Geräte aus der Merkliste:';

  it('prefill produces header + items text', () => {
    setCart([
      { slug: 'jbl-partybox-300-320' },
      { slug: 'ld-maui-28g3' },
    ]);
    const cartText = getCartData(storage, buildProductMap(sampleProducts));
    const textareaValue = merklisteHeader + '\n' + cartText;
    const lines = textareaValue.split('\n');
    expect(lines[0]).toBe(merklisteHeader);
    expect(lines).toHaveLength(3);
  });

  it('prefill updates when cart changes (bug fix: was not updating before)', () => {
    // First: one item
    setCart([{ slug: 'jbl-partybox-300-320' }]);
    const map = buildProductMap(sampleProducts);
    let cartText = getCartData(storage, map);
    let textareaValue = merklisteHeader + '\n' + cartText;
    expect(textareaValue.split('\n')).toHaveLength(2);

    // Then: add second item
    setCart([
      { slug: 'jbl-partybox-300-320' },
      { slug: 'ld-maui-28g3' },
    ]);
    cartText = getCartData(storage, map);
    textareaValue = merklisteHeader + '\n' + cartText;
    const lines = textareaValue.split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[2]).toContain('Säulensystem');
  });

  it('empty cart clears textarea content', () => {
    setCart([{ slug: 'jbl-partybox-300-320' }]);
    const cartText = getCartData(storage, buildProductMap(sampleProducts));
    expect(cartText).not.toBe('');

    // Cart cleared
    storage.removeItem(STORAGE_KEY);
    const emptyCartText = getCartData(storage, buildProductMap(sampleProducts));
    expect(emptyCartText).toBe('');
  });
});
