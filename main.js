/* ===== HEADER: scrolled state ===== */
(function () {
  const header = document.querySelector('header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===== STRATEGY SECTION: vertical scroll → horizontal pan ===== */
(function () {
  const section = document.querySelector('.strategy-section');
  const track   = document.querySelector('.strategy-track');
  if (!section || !track) return;

  let maxTranslate = 0;

  function resize() {
    maxTranslate = track.scrollWidth - window.innerWidth;
    // Section height = viewport height + full horizontal travel distance
    section.style.height = (window.innerHeight + maxTranslate) + 'px';
  }

  function scroll() {
    if (maxTranslate <= 0) return;
    const scrolled  = window.scrollY - section.offsetTop;
    const progress  = Math.max(0, Math.min(1, scrolled / maxTranslate));
    track.style.transform = 'translateX(' + (-progress * maxTranslate) + 'px)';
  }

  resize();
  scroll();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', scroll, { passive: true });
})();

/* ===== ACCORDION ===== */
(function () {
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.accordion-item.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        el.querySelector('.accordion-icon').textContent = '＋';
      });
      if (!isOpen) {
        item.classList.add('is-open');
        header.querySelector('.accordion-icon').textContent = '－';
      }
    });
  });
})();
