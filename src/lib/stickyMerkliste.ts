import { getCart } from './merklisteStore';

export function initStickyMerkliste(): void {
  function updateBadge(): void {
    const badges = document.querySelectorAll<HTMLSpanElement>('.sticky-merkliste .merkliste-badge');
    const cart = getCart();
    const items = cart.items || [];
    const count = items.length;
    badges.forEach((badge) => {
      badge.textContent = String(count);
      if (count > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    });
  }

  const cta = document.querySelector<HTMLElement>('.sticky-merkliste');
  if (!cta) return;
  const c = cta;

  const threshold = parseInt(c.dataset.threshold || '15', 10);
  let ticking = false;

  function onScroll(): void {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    const scrollPercent = (scrollY / (docH - viewportH)) * 100;
    c.classList.toggle('visible', scrollPercent > threshold);
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  document.addEventListener('toggle-merkliste', updateBadge);
  document.addEventListener('merkliste-prefill', updateBadge);
  updateBadge();

  (function initAddToWishlist(): void {
    const addBtn = document.querySelector<HTMLButtonElement>('[data-action="add-to-wishlist"][data-product-slug]');
    if (addBtn) {
      const slug = addBtn.dataset.productSlug;
      if (slug) {
        const cart = getCart();
        const items = cart.items || [];
        const inCart = items.some((item) => item.slug === slug);
        if (inCart) {
          addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg><span>Gemerkt</span>';
          addBtn.setAttribute('aria-pressed', 'true');
        }
      }
    }
  })();

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    let btn = target.closest('[data-action="add-to-wishlist"]');
    if (btn) {
      const slug = (btn as HTMLElement).dataset.productSlug;
      if (slug) {
        document.dispatchEvent(new CustomEvent('add-to-wishlist', { detail: { slug } }));
      }
      return;
    }

    btn = target.closest('[data-action="toggle-wishlist"]');
    if (btn) {
      document.dispatchEvent(new CustomEvent('toggle-merkliste'));
      return;
    }

    btn = target.closest('[data-action="request-now"]');
    if (btn) {
      const panel = btn.closest('.sticky-panel');
      let slug: string | undefined;
      if (panel) {
        const addBtn = panel.querySelector<HTMLButtonElement>('[data-action="add-to-wishlist"]');
        if (addBtn) {
          slug = addBtn.dataset.productSlug;
        }
      }
      if (slug) {
        document.dispatchEvent(new CustomEvent('add-to-wishlist', { detail: { slug } }));
      } else {
        document.dispatchEvent(new CustomEvent('merkliste-prefill'));
      }
    }
  });
}