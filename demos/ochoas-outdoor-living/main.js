/* ============================================
   Ochoa's Outdoor Services — Demo JS
   ============================================ */

(function () {
  'use strict';

  /* --- Mobile Hamburger Menu --- */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Smooth Scroll for Nav Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.site-nav').offsetHeight;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* --- Contact Form Demo Handler --- */
  var contactForm = document.getElementById('contact-form');
  var successOverlay = document.getElementById('success-overlay');
  var successClose = document.getElementById('success-close');

  if (contactForm && successOverlay) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Demo mode: just show success
      contactForm.style.display = 'none';
      successOverlay.classList.add('show');
      if (successClose) successClose.focus();
    });

    if (successClose) {
      successClose.addEventListener('click', function () {
        successOverlay.classList.remove('show');
        contactForm.style.display = 'flex';
        contactForm.reset();
      });
    }

    successOverlay.addEventListener('click', function (e) {
      if (e.target === successOverlay) {
        successOverlay.classList.remove('show');
        contactForm.style.display = 'flex';
        contactForm.reset();
      }
    });
  }

  /* --- Scroll-triggered Nav Background --- */
  var nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 26, 15, 0.97)';
      } else {
        nav.style.background = 'rgba(15, 26, 15, 0.92)';
      }
    });
  }

})();
