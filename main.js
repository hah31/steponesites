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
  var thankYou = document.getElementById('form-thankyou');

  if (contactForm && thankYou) {
    contactForm.addEventListener('submit', function (e) {
      var formData = new FormData(contactForm);

      // Only intercept if we can do fetch
      if (typeof fetch === 'undefined') return;

      e.preventDefault();

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          contactForm.style.display = 'none';
          thankYou.classList.add('show');
        }
      }).catch(function () {
        // On failure, let the form submit normally
        contactForm.submit();
      });
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
