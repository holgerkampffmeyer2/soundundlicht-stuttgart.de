export interface CityCarouselConfig {
  trackId: string;
  prevBtnId: string;
  nextBtnId: string;
  dotSelector: string;
  carouselSelector: string;
  autoPlayInterval: number;
}

export function initCityCarousel(config: CityCarouselConfig): void {
  const track = document.getElementById(config.trackId) as HTMLDivElement | null;
  const prevBtn = document.getElementById(config.prevBtnId) as HTMLButtonElement | null;
  const nextBtn = document.getElementById(config.nextBtnId) as HTMLButtonElement | null;
  const dots = document.querySelectorAll<HTMLButtonElement>(config.dotSelector);
  const carousel = document.querySelector<HTMLElement>(config.carouselSelector);

  if (!track || !prevBtn || !nextBtn || !carousel) return;

  const slides = track.querySelectorAll<HTMLAnchorElement>('.carousel-slide');
  const total = slides.length - 2;
  let current = 1;
  let isAnimating = false;

  function loadSlide(index: number): void {
    const slide = slides[index];
    if (!slide) return;
    const bg = slide.querySelector<HTMLImageElement>('.city-card-bg');
    if (!bg) return;
    const url = bg.getAttribute('data-src');
    const srcset = bg.getAttribute('data-srcset');
    if (!url || bg.getAttribute('src') === url) return;
    bg.src = url;
    if (srcset && bg.getAttribute('srcset') !== srcset) {
      bg.srcset = srcset;
    }
  }

  function loadRange(start: number, end: number): void {
    for (let i = start; i <= end; i++) loadSlide(i);
  }

  function loadAllSlides(): void {
    loadRange(0, 3);
  }

  function update(): void {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === (current - 1 + total) % total);
    });
    slides.forEach((slide, i) => {
      const isVisible = i === current || i === current + 1 || i === current - 1;
      slide.setAttribute('tabindex', isVisible ? '0' : '-1');
    });
  }

  function jumpTo(index: number): void {
    current = index;
    track.style.transition = 'none';
    update();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        isAnimating = false;
      });
    });
  }

  function slide(dir: number): void {
    if (isAnimating) return;
    isAnimating = true;
    const next = current + dir;
    if (next > total) {
      current = total + 1;
      update();
      setTimeout(() => { jumpTo(1); }, 700);
    } else if (next < 1) {
      current = 0;
      update();
      setTimeout(() => { jumpTo(total); }, 700);
    } else {
      current = next;
      update();
    }
    loadSlide(current + dir);
    loadSlide(current - dir);
  }

  nextBtn.addEventListener('click', () => { slide(1); });
  prevBtn.addEventListener('click', () => { slide(-1); });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      if (isAnimating) return;
      const target = parseInt(dot.dataset.index || '0', 10) + 1;
      if (target === current) return;
      isAnimating = true;
      current = target;
      update();
    });
  });

  let autoPlay = setInterval(() => { slide(1); }, config.autoPlayInterval);

  carousel.addEventListener('mouseenter', () => { clearInterval(autoPlay); });
  carousel.addEventListener('mouseleave', () => { autoPlay = setInterval(() => { slide(1); }, config.autoPlayInterval); });
  carousel.addEventListener('touchstart', () => { clearInterval(autoPlay); }, { passive: true });
  carousel.addEventListener('touchend', () => { autoPlay = setInterval(() => { slide(1); }, config.autoPlayInterval); }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') slide(-1);
    if (e.key === 'ArrowRight') slide(1);
  });

  track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
  loadAllSlides();
  update();

  track.addEventListener('transitionend', () => {
    if (current === 0) jumpTo(total);
    if (current === total + 1) jumpTo(1);
    isAnimating = false;
  });
}