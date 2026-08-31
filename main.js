(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -- Marquee: stack tecnico em loop ------------------------- */
  const STACK = ['C#', '.NET 8', 'Blazor', 'ASP.NET Core', 'SQL Server', 'EF Core',
                 'Azure', 'Git', 'REST APIs', 'T-SQL', 'JavaScript', 'Docker'];
  const track = document.getElementById('marqueeTrack');
  if (track) {
    const half = STACK.map(t => '<span class="marquee-item">' + t + '</span>').join('');
    track.innerHTML = half + half;
  }

  /* -- Nav: fundo ao scroll + progresso + seccao ativa -------- */
  const nav      = document.getElementById('navbar');
  const progress = document.getElementById('progress');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    let current = '';
    sections.forEach(s => {
      if (y >= s.offsetTop - window.innerHeight * 0.35) current = s.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* -- Menu mobile ------------------------------------------- */
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* -- Contadores -------------------------------------------- */
  function countUp(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }
    const dur = 1200;
    let start = null;
    function step(ts) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* -- Barras de skill --------------------------------------- */
  function fillSkills(scope) {
    scope.querySelectorAll('.skill-bar').forEach(bar => { bar.style.width = bar.dataset.w + '%'; });
    scope.querySelectorAll('.skill-pct').forEach(pct => {
      const target = parseInt(pct.dataset.pct, 10);
      if (reduced) { pct.textContent = target + '%'; return; }
      let start = null;
      function step(ts) {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / 1100, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        pct.textContent = Math.round(target * eased) + '%';
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* -- Reveal ao scroll -------------------------------------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      if (e.target.querySelector('.skill-bar')) fillSkills(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* -- Formulario -------------------------------------------- */
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  form.addEventListener('submit', e => {
    e.preventDefault();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
    form.reset();
  });
})();
