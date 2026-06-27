/**
 * VillageWork — Organic Landing Page JavaScript
 * Scroll reveal, counters, navbar, mobile menu, smooth scroll.
 */

(function () {
  'use strict';

  var navbar = document.getElementById('navbar');
  var mobileToggle = document.getElementById('mobile-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileLinks = document.querySelectorAll('.mobile-link');

  /* ===== Navbar scroll ===== */
  var ticking = false;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ===== Mobile menu ===== */
  function openMenu() {
    mobileMenu.classList.add('open');
    mobileToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  mobileLinks.forEach(function (link) { link.addEventListener('click', closeMenu); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  /* ===== Scroll reveal ===== */
  var reveals = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function (el) { revealObserver.observe(el); });

  /* ===== Counter animation ===== */
  var counters = document.querySelectorAll('.count-up');
  var animated = new Set();

  function animateCount(el) {
    var target = parseInt(el.dataset.target, 10);
    var duration = 2200;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 5);
      el.textContent = Math.round(target * eased).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('en-IN');
    }

    requestAnimationFrame(tick);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !animated.has(entry.target)) {
        animated.add(entry.target);
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { counterObserver.observe(c); });

  /* ===== Smooth scroll ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        var offset = navbar.offsetHeight + 16;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });

  /* ===== Active nav link ===== */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) link.style.color = 'var(--forest)';
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ===== Subtle parallax on SVG botanical leaves ===== */
  var leftLeaves = document.querySelector('.hero-leaves-left');
  var rightLeaves = document.querySelector('.hero-leaves-right');

  if (leftLeaves && rightLeaves) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > window.innerHeight) return;
      var y = window.scrollY;
      leftLeaves.style.transform = 'translateY(calc(-50% + ' + (y * 0.04) + 'px))';
      rightLeaves.style.transform = 'translateY(calc(-50% + ' + (y * -0.03) + 'px))';
    }, { passive: true });
  }

  /* ===== Feature card hover glow ===== */
  document.querySelectorAll('.feature-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      card.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(34,197,94,0.06) 0%, #0f1a0f 70%)';
    });
    card.addEventListener('mouseleave', function () { card.style.background = ''; });
  });

  /* ===== Reduced motion ===== */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(function (el) { el.classList.add('revealed'); });
    document.querySelectorAll('.hero-entrance').forEach(function (el) {
      el.style.animation = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

})();
