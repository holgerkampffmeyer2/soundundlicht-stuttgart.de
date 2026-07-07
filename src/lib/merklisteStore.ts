const STORAGE_KEY = 'sls_merkliste';

interface MerklisteItem {
  slug: string;
  addedAt: number;
}

interface MerklisteData {
  items: MerklisteItem[];
  lastUpdated: number;
}

function checkIsBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getStorage(): Storage | null {
  if (!checkIsBrowser()) return null;
  return window.localStorage;
}

const ONE_DAY = 24 * 60 * 60 * 1000;

function emptyMerkliste(): MerklisteData {
  return { items: [], lastUpdated: Date.now() };
}

function isValidMerkliste(data: unknown): data is MerklisteData {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  if (!Array.isArray(d.items)) return false;
  if (typeof d.lastUpdated !== 'number') return false;
  for (const item of d.items) {
    if (!item || typeof item !== 'object' || typeof (item as MerklisteItem).slug !== 'string') return false;
  }
  return true;
}

function loadMerkliste(): MerklisteData {
  const storage = getStorage();
  if (!storage) return emptyMerkliste();

  try {
    const stored = storage.getItem(STORAGE_KEY);
    if (stored) {
      const data: unknown = JSON.parse(stored);
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

function saveMerkliste(data: MerklisteData): void {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save merkliste to localStorage', e);
  }
}

export function getCart(): MerklisteData {
  const data = loadMerkliste();
  return { ...data, items: [...data.items] };
}

export function addItem(slug: string): void {
  if (!slug || typeof slug !== 'string') return;
  const data = loadMerkliste();
  const exists = data.items.some(item => item.slug === slug);
  if (exists) return;

  data.items.push({ slug, addedAt: Date.now() });
  data.lastUpdated = Date.now();
  saveMerkliste(data);
}

export function removeItem(slug: string): void {
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

export function clearCart(): void {
  const storage = getStorage();
  if (storage) storage.removeItem(STORAGE_KEY);
}

export function getItemCount(): number {
  const data = loadMerkliste();
  return data.items.length;
}

export function isCartEmpty(): boolean {
  const data = loadMerkliste();
  return data.items.length === 0;
}
