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

  // Video Modal Functionality
  const videoModal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalClose = document.querySelector('.video-modal-close');
  const modalBackdrop = document.querySelector('.video-modal-backdrop');
  const demoButtons = document.querySelectorAll('.video-demo-btn');

  function openModal(videoSrc) {
    modalVideo.src = videoSrc;
    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalVideo.play().catch(() => {});
  }

  function closeModal() {
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.src = '';
  }

  demoButtons.forEach(button => {
    button.addEventListener('click', () => {
      const videoSrc = button.getAttribute('data-video');
      openModal(videoSrc);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeModal();
    }
  });
});
