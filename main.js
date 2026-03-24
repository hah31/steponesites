/* ============================================
   Step One Sites — main.js
   ============================================ */

(function () {
  'use strict';

  /* --- Mobile Hamburger Menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Portfolio Category Filter --- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterButtons.length && portfolioCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Show/hide cards
        portfolioCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter || category === 'all') {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* --- Contact Form — Progressive Enhancement --- */
  var contactForm = document.getElementById('contact-form');
  var successOverlay = document.getElementById('success-overlay');
  var successClose = document.getElementById('success-close');

  if (contactForm && successOverlay) {
    contactForm.addEventListener('submit', function (e) {
      if (typeof fetch === 'undefined') return; // fallback: normal submit
      e.preventDefault();

      var formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (data.success === 'true' || data.success === true) {
          contactForm.style.display = 'none';
          successOverlay.classList.add('show');
          if (successClose) successClose.focus();
        }
      })
      .catch(function () {
        // On network failure, fall back to native form submit
        contactForm.submit();
      });
    });

    // Dismiss modal via "Got it" button
    if (successClose) {
      successClose.addEventListener('click', function () {
        successOverlay.classList.remove('show');
      });
    }

    // Dismiss modal by tapping the dark backdrop
    successOverlay.addEventListener('click', function (e) {
      if (e.target === successOverlay) {
        successOverlay.classList.remove('show');
      }
    });
  }

  /* --- Active Nav Link --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a:not(.btn-nav-cta)').forEach(function (link) {
    var href = link.getAttribute('href').split('#')[0];
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

})();
