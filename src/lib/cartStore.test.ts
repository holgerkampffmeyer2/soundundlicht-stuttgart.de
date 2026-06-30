import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { getCart, addItem, removeItem, updateItemQuantity, clearCart, getItemCount, getTotalPrice, getCartItemsWithDetails, isCartEmpty } from './cartStore.js';

const STORAGE_KEY = 'sls_cart';

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

describe('cartStore', () => {
  const mockProductLookup = (slug: string) => {
    const products: Record<string, { slug: string; price: string }> = {
      'jbl-partybox-300-320': { slug: 'jbl-partybox-300-320', price: 'ab 80€' },
      'behringer-x32': { slug: 'behringer-x32', price: 'ab 150€' },
      'led-par-64': { slug: 'led-par-64', price: 'ab 40€' }
    };
    return products[slug] || null;
  };

  it('should initialize with empty cart', () => {
    const cart = getCart();
    expect(cart).toEqual({
      items: [],
      lastUpdated: expect.any(Number)
    });
  });

  it('should add item to cart', () => {
    addItem('jbl-partybox-300-320', 2);
    const cart = getCart();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toMatchObject({
      slug: 'jbl-partybox-300-320',
      quantity: 2,
      addedAt: expect.any(Number)
    });
    expect(getItemCount()).toBe(2);
  });

  it('should increase quantity when adding existing item', () => {
    addItem('jbl-partybox-300-320', 1);
    addItem('jbl-partybox-300-320', 3);
    const cart = getCart();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(4);
  });

  it('should remove item completely', () => {
    addItem('jbl-partybox-300-320', 2);
    addItem('behringer-x32', 1);
    removeItem('jbl-partybox-300-320');
    const cart = getCart();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].slug).toBe('behringer-x32');
    expect(getItemCount()).toBe(1);
  });

  it('should update item quantity', () => {
    addItem('jbl-partybox-300-320', 1);
    updateItemQuantity('jbl-partybox-300-320', 5);
    const cart = getCart();
    expect(cart.items[0].quantity).toBe(5);
    expect(getItemCount()).toBe(5);
  });

  it('should remove item when quantity set to 0 or less', () => {
    addItem('jbl-partybox-300-320', 2);
    updateItemQuantity('jbl-partybox-300-320', 0);
    const cart = getCart();
    expect(cart.items).toHaveLength(0);
    expect(isCartEmpty()).toBe(true);
  });

  it('should clear cart', () => {
    addItem('jbl-partybox-300-320', 2);
    addItem('behringer-x32', 1);
    clearCart();
    expect(getItemCount()).toBe(0);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('should calculate total price correctly', () => {
    addItem('jbl-partybox-300-320', 2);
    addItem('led-par-64', 3);
    const total = getTotalPrice(mockProductLookup);
    expect(total).toBe(2 * 80 + 3 * 40);
  });

  it('should return cart items with product details', () => {
    addItem('jbl-partybox-300-320', 1);
    const itemsWithDetails = getCartItemsWithDetails(mockProductLookup);
    expect(itemsWithDetails).toHaveLength(1);
    expect(itemsWithDetails[0]).toHaveProperty('product');
    expect(itemsWithDetails[0].product.slug).toBe('jbl-partybox-300-320');
  });

  it('should persist cart to localStorage', () => {
    addItem('jbl-partybox-300-320', 1);
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

  it('should reject invalid cart items (missing quantity)', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [{ slug: 'test' }], lastUpdated: Date.now() }));
    const cart = getCart();
    expect(cart.items).toEqual([]);
  });

  it('should clear expired cart (>24h old)', () => {
    const old = Date.now() - 25 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [{ slug: 'jbl-partybox-300-320', quantity: 1, addedAt: old }], lastUpdated: old }));
    const cart = getCart();
    expect(cart.items).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('should keep valid cart within 24h', () => {
    const recent = Date.now() - 60 * 60 * 1000; // 1h old
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [{ slug: 'jbl-partybox-300-320', quantity: 2, addedAt: recent }], lastUpdated: recent }));
    const cart = getCart();
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].slug).toBe('jbl-partybox-300-320');
    expect(cart.items[0].quantity).toBe(2);
  });
});
