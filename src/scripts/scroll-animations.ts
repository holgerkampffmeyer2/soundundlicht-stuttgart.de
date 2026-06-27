document.querySelectorAll('.animate-on-scroll').forEach(el => {
  new IntersectionObserver(
    (entries) => {
      entries.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); });
    },
    { threshold: 0.1 }
  ).observe(el);
});
