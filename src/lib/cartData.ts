const STORAGE_KEY = 'sls_merkliste';
const MAX_AGE_MS = 86400000; // 24 hours

interface CartItem {
  slug: string;
  addedAt?: number;
}

interface Cart {
  items: CartItem[];
  lastUpdated?: number;
}

interface Product {
  slug: string;
  title: string;
  price: string;
}

/**
 * Read the raw cart from localStorage, validate it, and expire if older than 24h.
 * Returns null if invalid/empty/expired.
 */
export function readRawCart(storage: Storage = localStorage): Cart | null {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const cart = JSON.parse(raw);
    if (!cart || typeof cart !== 'object' || !Array.isArray(cart.items)) return null;
    if (Date.now() - (cart.lastUpdated || 0) > MAX_AGE_MS) {
      storage.removeItem(STORAGE_KEY);
      return null;
    }
    return cart as Cart;
  } catch {
    return null;
  }
}

/**
 * Build a product lookup map from the rental-catalog-data script element,
 * or from an explicit products array (for testing).
 */
export function buildProductMap(products: Product[]): Record<string, Product> {
  const map: Record<string, Product> = {};
  for (const p of products) {
    map[p.slug] = p;
  }
  return map;
}

/**
 * Format cart items into a newline-separated string for the form textarea.
 * Each line: "Title (Price)"
 */
export function formatCartItems(
  cart: Cart,
  productMap: Record<string, Product> = {}
): string {
  return cart.items
    .map((item) => {
      const prod = productMap[item.slug];
      const title = prod ? prod.title : item.slug;
      const price = prod ? prod.price : '';
      return `${title} (${price})`;
    })
    .join('\n');
}

/**
 * High-level: read cart from storage, resolve products, format for form.
 * Returns empty string if cart is invalid/empty.
 */
export function getCartData(
  storage: Storage = localStorage,
  productMap: Record<string, Product> = {}
): string {
  const cart = readRawCart(storage);
  if (!cart || cart.items.length === 0) return '';
  return formatCartItems(cart, productMap);
}
