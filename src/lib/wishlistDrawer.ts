import { getCart, removeItem } from './merklisteStore';

export interface CatalogProduct {
  slug: string;
  title: string;
  image: string;
  price: string;
}

function getCatalog(): Record<string, CatalogProduct> {
  const script = document.getElementById('rental-catalog-data');
  if (!script) return {};
  try {
    const products: CatalogProduct[] = JSON.parse(script.textContent || '[]');
    const map: Record<string, CatalogProduct> = {};
    for (let i = 0; i < products.length; i++) {
      map[products[i].slug] = products[i];
    }
    return map;
  } catch {
    return {};
  }
}

function escapeHtml(s: string): string {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updateBadge(count: number): void {
  const badges = document.querySelectorAll<HTMLSpanElement>('.merkliste-badge');
  badges.forEach((badge) => {
    badge.textContent = String(count);
    if (count > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

function renderMerkliste(): void {
  const container = document.getElementById('merkliste-contents');
  const footer = document.getElementById('merkliste-footer');
  if (!container) return;

  try {
    const data = getCart();
    const items = data.items || [];

    if (items.length === 0) {
      container.innerHTML = '<p class="text-[var(--color-text-muted)] text-center">Ihre Merkliste ist leer.</p>';
      if (footer) footer.classList.add('hidden');
      updateBadge(0);
      return;
    }

    const catalog = getCatalog();
    let html = '<div class="space-y-4">';

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const product = catalog[item.slug];
      const title = escapeHtml(product ? product.title : item.slug);
      const image = product ? product.image : '';
      const priceStr = product ? product.price : '';

      let imgHtml = '';
      if (image) {
        const thumbWebp = image.replace(/\.(jpe?g|png)$/i, '-thumb.webp');
        imgHtml = '<picture class="shrink-0">' +
          '<source srcset="' + escapeHtml(thumbWebp) + '" type="image/webp" />' +
          '<img src="' + escapeHtml(image) + '" alt="' + title + '" width="60" height="60" class="rounded-xl object-cover" />' +
          '</picture>';
      }

      html += '<div class="merkliste-item flex items-start space-x-4">' +
        imgHtml +
        '<div class="flex-1 space-y-2">' +
        '<h3 class="font-play font-lg font-bold">' + title + '</h3>' +
        '<p class="text-[var(--color-text-muted)] text-sm">Preis: <span class="font-semibold">' + escapeHtml(priceStr) + '</span></p>' +
        '<div>' +
        '<button data-action="remove" data-slug="' + escapeHtml(item.slug) + '" class="text-[var(--color-accent)] hover:underline">Entfernen</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    }

    html += '</div>';
    container.innerHTML = html;

    if (footer) {
      footer.classList.remove('hidden');
    }

    updateBadge(items.length);

    const cartInput = document.getElementById('merkliste-data') as HTMLTextAreaElement | null;
    if (cartInput) {
      const vals = items.map((it) => {
        const prod = catalog[it.slug];
        const t = prod ? prod.title : it.slug;
        const p = prod ? prod.price : '';
        return t + ' (' + p + ')';
      });
      cartInput.value = vals.join(', ');
    }
  } catch {
    container.innerHTML = '<p class="text-[var(--color-text-muted)] text-center">Fehler beim Laden der Merkliste.</p>';
  }
}

function closeDrawer(): void {
  document.getElementById('merkliste-drawer')?.classList.remove('open');
}

function openDrawer(): void {
  const drawer = document.getElementById('merkliste-drawer');
  if (!drawer) return;
  drawer.classList.add('open');
  renderMerkliste();
  const closeBtn = document.getElementById('merkliste-close') as HTMLButtonElement | null;
  if (closeBtn) setTimeout(() => { closeBtn!.focus(); }, 50);
}

function toggleDrawer(): void {
  const drawer = document.getElementById('merkliste-drawer');
  if (!drawer) return;
  if (drawer.classList.contains('open')) {
    closeDrawer();
  } else {
    openDrawer();
  }
}

function prefillAndNavigate(): void {
  const cartInput = document.getElementById('merkliste-data') as HTMLTextAreaElement | null;
  if (cartInput) {
    const data = getCart();
    const items = data.items || [];
    if (items.length > 0) {
      const catalog = getCatalog();
      const vals = items.map((item) => {
        const prod = catalog[item.slug];
        const title = prod ? prod.title : item.slug;
        const price = prod ? prod.price : '';
        return title + ' (' + price + ')';
      }).join(', ');
      cartInput.value = vals;
    }
  }
  document.dispatchEvent(new CustomEvent('merkliste-prefill'));
  closeDrawer();
  window.location.href = '/vermietung#kontakt';
}

export function initWishlistDrawer(): void {
  document.addEventListener('toggle-merkliste', () => {
    toggleDrawer();
    const toggleBtn = document.querySelector<HTMLButtonElement>('[data-action="toggle-wishlist"]');
    if (toggleBtn) {
      const isOpen = document.getElementById('merkliste-drawer')?.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  document.getElementById('merkliste-close')?.addEventListener('click', closeDrawer);

  document.getElementById('merkliste-drawer')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDrawer();
  });

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-action]') as HTMLElement | null;
    if (!target) return;
    const action = target.dataset.action;
    const slug = target.dataset.slug;
    if (!action || !slug) return;

    if (action === 'remove') {
      removeItem(slug);
      renderMerkliste();
    }
  });

  document.getElementById('request-btn')?.addEventListener('click', prefillAndNavigate);
}