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
    if (!item || typeof item.slug !== 'string') return false;
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

export function addItem(slug) {
  if (!slug || typeof slug !== 'string') return;
  const data = loadMerkliste();
  const exists = data.items.some(item => item.slug === slug);
  if (exists) return;

  data.items.push({ slug, addedAt: Date.now() });
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

export function clearCart() {
  const storage = getStorage();
  if (storage) storage.removeItem(STORAGE_KEY);
}

export function getItemCount() {
  const data = loadMerkliste();
  return data.items.length;
}

export function isCartEmpty() {
  const data = loadMerkliste();
  return data.items.length === 0;
}
