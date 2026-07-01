import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { getCart, addItem, removeItem, clearCart, getItemCount, isCartEmpty } from './merklisteStore.js';

const STORAGE_KEY = 'sls_merkliste';

beforeEach(() => {
  const store: Record<string, string> = {};
  const mock: Storage = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };
  vi.spyOn(window, 'localStorage', 'get').mockReturnValue(mock);
});

describe('merklisteStore', () => {

  it('should initialize with empty merkliste', () => {
    const cart = getCart();
    expect(cart).toEqual({
      items: [],
      lastUpdated: expect.any(Number)
    });
  });

  it('should add item to merkliste', () => {
    addItem('jbl-partybox-300-320');
    const cart = getCart();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toMatchObject({
      slug: 'jbl-partybox-300-320',
      addedAt: expect.any(Number)
    });
    expect(getItemCount()).toBe(1);
  });

  it('should not add duplicate item', () => {
    addItem('jbl-partybox-300-320');
    addItem('jbl-partybox-300-320');
    const cart = getCart();
    expect(cart.items).toHaveLength(1);
  });

  it('should remove item completely', () => {
    addItem('jbl-partybox-300-320');
    addItem('behringer-x32');
    removeItem('jbl-partybox-300-320');
    const cart = getCart();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].slug).toBe('behringer-x32');
    expect(getItemCount()).toBe(1);
  });

  it('should clear merkliste', () => {
    addItem('jbl-partybox-300-320');
    addItem('behringer-x32');
    clearCart();
    expect(getItemCount()).toBe(0);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('should persist merkliste to localStorage', () => {
    addItem('jbl-partybox-300-320');
    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.items).toHaveLength(1);
    expect(parsed.items[0].slug).toBe('jbl-partybox-300-320');
  });

  it('should reject invalid cart structure (not an object)', () => {
    localStorage.setItem(STORAGE_KEY, '"just a string"');
    const cart = getCart();
    expect(cart.items).toEqual([]);
  });

  it('should reject invalid cart with missing items array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lastUpdated: Date.now() }));
    const cart = getCart();
    expect(cart.items).toEqual([]);
  });

  it('should reject invalid cart items (missing slug)', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [{ quantity: 1 }], lastUpdated: Date.now() }));
    const cart = getCart();
    expect(cart.items).toEqual([]);
  });

  it('should accept cart items without quantity field', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [{ slug: 'test' }], lastUpdated: Date.now() }));
    const cart = getCart();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].slug).toBe('test');
  });

  it('should clear expired merkliste (>24h old)', () => {
    const old = Date.now() - 25 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [{ slug: 'jbl-partybox-300-320', addedAt: old }], lastUpdated: old }));
    const cart = getCart();
    expect(cart.items).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('should keep valid merkliste within 24h', () => {
    const recent = Date.now() - 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [{ slug: 'jbl-partybox-300-320', addedAt: recent }], lastUpdated: recent }));
    const cart = getCart();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].slug).toBe('jbl-partybox-300-320');
  });
});
