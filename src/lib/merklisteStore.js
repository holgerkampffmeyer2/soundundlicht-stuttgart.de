const STORAGE_KEY = 'sls_merkliste';

function checkIsBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getStorage() {
  if (!checkIsBrowser()) return null;
  return window.localStorage;
}

const ONE_DAY = 24 * 60 * 60 * 1000;

function emptyMerkliste() {
  return { items: [], lastUpdated: Date.now() };
}

function isValidMerkliste(data) {
  if (!data || typeof data !== 'object') return false;
  if (!Array.isArray(data.items)) return false;
  if (typeof data.lastUpdated !== 'number') return false;
  for (const item of data.items) {
    if (!item || typeof item.slug !== 'string' || typeof item.quantity !== 'number') return false;
  }
  return true;
}

function loadMerkliste() {
  const storage = getStorage();
  if (!storage) return emptyMerkliste();

  try {
    const stored = storage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (!isValidMerkliste(data)) {
        storage.removeItem(STORAGE_KEY);
        return emptyMerkliste();
      }
      if (Date.now() - data.lastUpdated > ONE_DAY) {
        storage.removeItem(STORAGE_KEY);
        return emptyMerkliste();
      }
      return data;
    }
  } catch (e) {
    console.warn('Failed to parse merkliste from localStorage', e);
  }
  return emptyMerkliste();
}

function saveMerkliste(data) {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save merkliste to localStorage', e);
  }
}

export function getCart() {
  const data = loadMerkliste();
  return { ...data, items: [...data.items] };
}

export function addItem(slug, quantity = 1) {
  const data = loadMerkliste();
  const existingIndex = data.items.findIndex(item => item.slug === slug);

  if (existingIndex >= 0) {
    data.items[existingIndex].quantity += quantity;
  } else {
    data.items.push({ slug, quantity: Math.max(1, quantity), addedAt: Date.now() });
  }

  data.lastUpdated = Date.now();
  saveMerkliste(data);
}

export function removeItem(slug) {
  const data = loadMerkliste();
  data.items = data.items.filter(item => item.slug !== slug);

  if (data.items.length === 0) {
    const storage = getStorage();
    if (storage) storage.removeItem(STORAGE_KEY);
  } else {
    data.lastUpdated = Date.now();
    saveMerkliste(data);
  }
}

export function updateItemQuantity(slug, quantity) {
  const data = loadMerkliste();
  const existingIndex = data.items.findIndex(item => item.slug === slug);

  if (existingIndex >= 0) {
    if (quantity <= 0) {
      data.items.splice(existingIndex, 1);
    } else {
      data.items[existingIndex].quantity = quantity;
    }

    if (data.items.length === 0) {
      const storage = getStorage();
      if (storage) storage.removeItem(STORAGE_KEY);
    } else {
      data.lastUpdated = Date.now();
      saveMerkliste(data);
    }
  }
}

export function clearCart() {
  const storage = getStorage();
  if (storage) storage.removeItem(STORAGE_KEY);
}

export function getItemCount() {
  const data = loadMerkliste();
  return data.items.reduce((total, item) => total + item.quantity, 0);
}

export function getTotalPrice(productsLookupFn) {
  const data = loadMerkliste();
  let total = 0;

  for (const item of data.items) {
    try {
      const product = productsLookupFn(item.slug);
      if (product && product.price) {
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

export function getCartItemsWithDetails(productsLookupFn) {
  const data = loadMerkliste();
  const itemsWithDetails = [];

  for (const item of data.items) {
    try {
      const product = productsLookupFn(item.slug);
      if (product) {
        itemsWithDetails.push({ ...item, product });
      }
    } catch (e) {
      console.warn(`Could not get product details for ${item.slug}`, e);
    }
  }

  return itemsWithDetails;
}

export function isCartEmpty() {
  const data = loadMerkliste();
  return data.items.length === 0;
}
