// src/lib/cartStore.js
// Simple cart store using localStorage

const STORAGE_KEY = 'sls_cart';

// Check if we're in a browser environment (evaluated at runtime)
function checkIsBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

// Get localStorage reference (for testability)
function getStorage() {
  if (!checkIsBrowser()) {
    return null;
  }
  return window.localStorage;
}

const ONE_DAY = 24 * 60 * 60 * 1000;

function emptyCart() {
  return { items: [], lastUpdated: Date.now() };
}

function isValidCart(cart) {
  if (!cart || typeof cart !== 'object') return false;
  if (!Array.isArray(cart.items)) return false;
  if (typeof cart.lastUpdated !== 'number') return false;
  for (const item of cart.items) {
    if (!item || typeof item.slug !== 'string' || typeof item.quantity !== 'number') return false;
  }
  return true;
}

// Initialize cart from localStorage or return empty structure
function loadCart() {
  // If we're not in a browser (e.g., during SSR), return empty cart
  const storage = getStorage();
  if (!storage) {
    return emptyCart();
  }

  try {
    const stored = storage.getItem(STORAGE_KEY);
    if (stored) {
      const cart = JSON.parse(stored);
      if (!isValidCart(cart)) {
        storage.removeItem(STORAGE_KEY);
        return emptyCart();
      }
      // Clear cart if older than 1 day
      if (Date.now() - cart.lastUpdated > ONE_DAY) {
        storage.removeItem(STORAGE_KEY);
        return emptyCart();
      }
      return cart;
    }
  } catch (e) {
    console.warn('Failed to parse cart from localStorage', e);
  }
  return emptyCart();
}

// Save cart to localStorage
function saveCart(cart) {
  // If we're not in a browser, don't try to save to localStorage
  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
}

// Get current cart (returns a copy to prevent direct mutation)
export function getCart() {
  const cart = loadCart();
  // Return a shallow copy of items array to prevent accidental mutation
  return {
    ...cart,
    items: [...cart.items]
  };
}

// Add item to cart or increase quantity
export function addItem(slug, quantity = 1) {
  const cart = loadCart();
  const existingItemIndex = cart.items.findIndex(item => item.slug === slug);
  
  if (existingItemIndex >= 0) {
    // Increase quantity
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      slug,
      quantity: Math.max(1, quantity), // Ensure at least 1
      addedAt: Date.now()
    });
  }
  
  cart.lastUpdated = Date.now();
  saveCart(cart);
}

// Remove item completely from cart
export function removeItem(slug) {
  const cart = loadCart();
  cart.items = cart.items.filter(item => item.slug !== slug);
  
  if (cart.items.length === 0) {
    // Optionally clear storage when empty
    const storage = getStorage();
    if (storage) {
      storage.removeItem(STORAGE_KEY);
    }
  } else {
    cart.lastUpdated = Date.now();
    saveCart(cart);
  }
}

// Update item quantity (set to 0 to remove)
export function updateItemQuantity(slug, quantity) {
  const cart = loadCart();
  const existingItemIndex = cart.items.findIndex(item => item.slug === slug);
  
  if (existingItemIndex >= 0) {
    if (quantity <= 0) {
      // Remove if quantity zero or less
      cart.items.splice(existingItemIndex, 1);
    } else {
      cart.items[existingItemIndex].quantity = quantity;
    }
    
    if (cart.items.length === 0) {
      const storage = getStorage();
      if (storage) {
        storage.removeItem(STORAGE_KEY);
      }
    } else {
      cart.lastUpdated = Date.now();
      saveCart(cart);
    }
  }
}

// Clear entire cart
export function clearCart() {
  const storage = getStorage();
  if (storage) {
    storage.removeItem(STORAGE_KEY);
  }
}

// Get total number of items in cart (sum of quantities)
export function getItemCount() {
  const cart = loadCart();
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

// Get total price of cart (requires product data lookup)
// This function expects a productsLookup function or array
export function getTotalPrice(productsLookupFn) {
  const cart = loadCart();
  let total = 0;
  
  for (const item of cart.items) {
    try {
      const product = productsLookupFn(item.slug);
      if (product && product.price) {
        // Extract numeric price from string like "ab 80€" -> 80
        const priceMatch = product.price.match(/\d+/);
        if (priceMatch) {
          total += parseInt(priceMatch[0], 10) * item.quantity;
        }
      }
    } catch (e) {
      console.warn(`Could not get price for product ${item.slug}`, e);
    }
  }
  
  return total;
}

// Get cart items with product details (requires product lookup)
export function getCartItemsWithDetails(productsLookupFn) {
  const cart = loadCart();
  const itemsWithDetails = [];
  
  for (const item of cart.items) {
    try {
      const product = productsLookupFn(item.slug);
      if (product) {
        itemsWithDetails.push({
          ...item,
          product
        });
      }
    } catch (e) {
      console.warn(`Could not get product details for ${item.slug}`, e);
    }
  }
  
  return itemsWithDetails;
}

// Check if cart is empty
export function isCartEmpty() {
  const cart = loadCart();
  return cart.items.length === 0;
}