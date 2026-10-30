(function () {
  'use strict';

  // Год в подвале
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Тень/бордер у шапки при скролле
  var hdr = document.querySelector('.hdr');
  var onScroll = function () {
    if (!hdr) return;
    hdr.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Мобильное меню
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Появление блоков при скролле
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Плавный скролл с учётом высоты шапки
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var top = t.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // Заглушки для ещё не подключённых магазинов
  document.querySelectorAll('.btn--store').forEach(function (b) {
    b.addEventListener('click', function (e) {
      if (b.getAttribute('href') === '#') {
        e.preventDefault();
        b.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' },
           { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }],
          { duration: 260 }
        );
      }
    });
  });
})();
