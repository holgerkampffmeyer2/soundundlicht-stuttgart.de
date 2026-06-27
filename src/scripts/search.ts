const DEBOUNCE_MS = 300;
const MAX_RESULTS = 10;
let pagefindPromise: Promise<any> | null = null;
const overlay = document.getElementById('pagefind-search-overlay');
const input = document.getElementById('pagefind-search-input') as HTMLInputElement | null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let selectedIndex = -1;

if (!input || !overlay) {
  throw new Error('Search elements not found');
}

const wrapper = input.parentElement!;
wrapper.style.position = 'relative';

function escapeHtml(str: string): string {
  if (!str) return '';
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function dynamicImport(url: string): Promise<any> {
  return new Function('url', 'return import(url)')(url);
}

function loadPagefind(): Promise<any> {
  if (!pagefindPromise) {
    pagefindPromise = dynamicImport('/pagefind/pagefind.js').catch(() => {
      pagefindPromise = null;
      return null;
    });
  }
  return pagefindPromise;
}

function normalizeUrl(url: string): string {
  return url ? url.replace(/\/$/, '') : url;
}

async function doSearch(query: string): Promise<any[]> {
  const pf = await loadPagefind();
  if (!pf) return [];
  const search = await pf.search(query);
  if (!search || !search.results) return [];
  const results = await Promise.all(
    search.results.slice(0, MAX_RESULTS).map((r: any) => r.data())
  );
  results.forEach((r: any) => { r.url = normalizeUrl(r.url); });
  results.sort((a: any, b: any) => {
    const aP = (a.meta && a.meta.type === 'produkt') ? 0 : 1;
    const bP = (b.meta && b.meta.type === 'produkt') ? 0 : 1;
    return aP - bP;
  });
  return results;
}

function cleanPageTitle(t: string): string {
  return (t || '').replace(/\s*[|–—-]\s*Sound\s*(?:und|&)\s*Licht\s*Stuttgart.*$/i, '').trim();
}

let rentalCatalog: any[] | null = null;
try {
  const catScript = document.getElementById('rental-catalog-data');
  if (catScript) rentalCatalog = JSON.parse(catScript.textContent || '[]');
} catch (e) {}

interface CatalogProduct {
  slug: string;
  title: string;
  image: string;
  description: string;
  category: string;
  price: string;
  features: string[];
  detailPage?: string;
}

function matchCatalogProducts(query: string): CatalogProduct[] {
  if (!query || !rentalCatalog) return [];
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/).filter(w => w.length > 1);
  const scored: { item: CatalogProduct; score: number }[] = [];
  rentalCatalog.forEach((p: CatalogProduct) => {
    const haystack = (p.title + ' ' + p.description + ' ' + (p.features || []).join(' ')).toLowerCase();
    let score = 0;
    words.forEach(w => { if (haystack.indexOf(w) !== -1) score++; });
    if (score > 0) scored.push({ item: p, score });
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.item);
}

function renderProductCard(product: CatalogProduct, list: HTMLElement, query: string): void {
  const el = document.createElement('a');
  el.className = 'rental-search-item';
  el.href = product.detailPage || '/vermietung';
  el.setAttribute('data-index', String(list.children.length));
  const catClass = 'rental-search-badge badge-' + (product.category || '').toLowerCase();
  const imgHtml = product.image
    ? '<img src="' + escapeHtml(product.image) + '" alt="" loading="lazy" width="48" height="48">'
    : '';
  el.innerHTML = imgHtml +
    '<div class="rental-search-item-text">' +
      '<div class="rental-search-item-title">' + escapeHtml(product.title) + '</div>' +
      '<div class="rental-search-meta">' +
        '<span class="' + catClass + '">' + escapeHtml(product.category || '') + '</span>' +
        '<span class="rental-search-price">' + escapeHtml(product.price || '') + '</span>' +
      '</div>' +
    '</div>';
  el.addEventListener('mousedown', (e) => {
    e.preventDefault();
    window.location.href = el.href;
  });
  list.appendChild(el);
}

function renderResults(results: any[], query: string): void {
  if (!overlay) return;
  overlay.innerHTML = '';
  if (results.length === 0) {
    overlay.innerHTML = '<div class="rental-search-empty">Keine Ergebnisse f&uuml;r &quot;' + escapeHtml(query) + '&quot;</div>';
    overlay.style.display = 'block';
    return;
  }
  const list = document.createElement('div');
  const catalogMatchedUrls: Record<string, boolean> = {};
  const hasVermietungHit = results.some(r =>
    r.url === '/vermietung' || r.url === '/vermietung/'
  );
  if (hasVermietungHit && rentalCatalog) {
    const matched = matchCatalogProducts(query);
    matched.forEach(p => {
      renderProductCard(p, list, query);
      if (p.detailPage && p.detailPage.indexOf('#') === -1) {
        catalogMatchedUrls[p.detailPage] = true;
      }
    });
  }
  results.forEach((item: any) => {
    if (item.url === '/vermietung' || item.url === '/vermietung/') return;
    if (catalogMatchedUrls[item.url]) return;
    const el = document.createElement('a');
    el.className = 'rental-search-item';
    el.href = item.url;
    el.setAttribute('data-index', String(list.children.length));
    const meta = item.meta || {};
    const isProduct = meta.type === 'produkt';

    if (isProduct) {
      const image = meta.image || '';
      const price = meta.price || '';
      const category = meta.category || '';
      const catClass = 'rental-search-badge badge-' + category.toLowerCase();
      const imgHtml = image ? '<img src="' + escapeHtml(image) + '" alt="" loading="lazy" width="48" height="48">' : '';
      const displayTitle = meta.label || cleanPageTitle(meta.title);
      el.innerHTML = imgHtml +
        '<div class="rental-search-item-text">' +
          '<div class="rental-search-item-title">' + escapeHtml(displayTitle) + '</div>' +
          '<div class="rental-search-meta">' +
            (category ? '<span class="' + catClass + '">' + escapeHtml(category) + '</span>' : '') +
            (price ? '<span class="rental-search-price">' + escapeHtml(price) + '</span>' : '') +
          '</div>' +
        '</div>';
    } else {
      const excerpt = item.excerpt || '';
      el.innerHTML =
        '<div class="rental-search-item-text">' +
          '<div class="rental-search-item-title">' + escapeHtml(cleanPageTitle(meta.title)) + '</div>' +
          (excerpt ? '<div class="rental-search-snippet">' + escapeHtml(excerpt) + '</div>' : '') +
        '</div>';
    }

    el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      window.location.href = item.url;
    });
    list.appendChild(el);
  });
  if (list.children.length === 0) {
    overlay.innerHTML = '<div class="rental-search-empty">Keine Ergebnisse f&uuml;r &quot;' + escapeHtml(query) + '&quot;</div>';
    overlay.style.display = 'block';
    return;
  }
  overlay.appendChild(list);
  overlay.style.display = 'block';
  selectedIndex = -1;
}

function showResults(query: string): void {
  doSearch(query).then(results => renderResults(results, query));
}

function onInput(): void {
  if (debounceTimer) clearTimeout(debounceTimer);
  const val = input!.value.trim();
  if (val.length < 2) { overlay!.style.display = 'none'; return; }
  debounceTimer = setTimeout(() => showResults(val), DEBOUNCE_MS);
}

function onKeydown(e: KeyboardEvent): void {
  const items = overlay!.querySelectorAll('.rental-search-item');
  if (e.key === 'Escape') { overlay!.style.display = 'none'; input!.blur(); return; }
  if (e.key === 'ArrowDown') { e.preventDefault(); selectedIndex = Math.min(selectedIndex + 1, items.length - 1); updateSelection(items); return; }
  if (e.key === 'ArrowUp') { e.preventDefault(); selectedIndex = Math.max(selectedIndex - 1, 0); updateSelection(items); return; }
  if (e.key === 'Enter' && selectedIndex >= 0 && items[selectedIndex]) { e.preventDefault(); window.location.href = (items[selectedIndex] as HTMLAnchorElement).href; return; }
}

function updateSelection(items: NodeListOf<Element>): void {
  items.forEach((el, i) => el.classList.toggle('rental-search-item-active', i === selectedIndex));
  if (items[selectedIndex]) items[selectedIndex].scrollIntoView({ block: 'nearest' });
}

function onDocumentClick(e: MouseEvent): void {
  if (overlay!.style.display !== 'none') {
    if (!input!.contains(e.target as Node) && !overlay!.contains(e.target as Node)) {
      overlay!.style.display = 'none';
    }
  }
}

function onFocus(): void {
  const val = input!.value.trim();
  if (val.length >= 2) showResults(val);
}

input.addEventListener('input', onInput);
input.addEventListener('keydown', onKeydown);
input.addEventListener('focus', onFocus);
document.addEventListener('click', onDocumentClick);

