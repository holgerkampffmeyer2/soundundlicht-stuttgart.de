// src/lib/cartStore.js
// Simple cart store using localStorage

const STORAGE_KEY = 'sls_cart';

// Initialize cart from localStorage or return empty structure
function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to parse cart from localStorage', e);
  }
  // Return empty cart structure
  return {
    items: [],
    lastUpdated: Date.now()
  };
}

// Save cart to localStorage
function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
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
    localStorage.removeItem(STORAGE_KEY);
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
      localStorage.removeItem(STORAGE_KEY);
    } else {
      cart.lastUpdated = Date.now();
      saveCart(cart);
    }
  }
}

// Clear entire cart
export function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
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