document.addEventListener('DOMContentLoaded', () => {
  const progress = document.querySelector('.progress');
  const revealItems = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 120px 0px' });

  revealItems.forEach((item) => {
    if (!prefersReducedMotion) {
      revealObserver.observe(item);
    }
  });

  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollable) * 100;
    progress.style.width = `${scrolled}%`;
  }, { passive: true });
});
