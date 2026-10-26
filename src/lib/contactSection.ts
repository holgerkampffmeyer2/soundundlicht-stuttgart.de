function loadMap(placeholder: HTMLElement): void {
  // Safe: data-map-src is a static Google Maps embed URL from Astro template, assigned to iframe.src (not innerHTML)
  const src = placeholder.getAttribute('data-map-src');
  if (!src) return;

  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.style.border = '0';
  iframe.className = 'w-full h-full';
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  iframe.title = 'Google Maps - Sound & Licht Stuttgart';
  placeholder.replaceWith(iframe);
}

export function initContactSection(): void {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest('.map-load-btn');
    if (!button) return;
    const placeholder = button.closest('.map-placeholder');
    if (!placeholder) return;
    loadMap(placeholder as HTMLElement);
  });
}