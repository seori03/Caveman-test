// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Case study filter tabs (portfolio page)
  const filterTabs = document.querySelectorAll('.filter-tabs button');
  const caseCards = document.querySelectorAll('[data-category]');
  if (filterTabs.length && caseCards.length) {
    filterTabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterTabs.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        caseCards.forEach((card) => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  // Contact form validation (client-side only, no backend)
  const form = document.querySelector('#contact-form');
  if (form) {
    const successBox = document.querySelector('.success-box');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach((field) => {
        const wrap = field.closest('.field');
        const value = field.value.trim();
        let fieldValid = value.length > 0;

        if (field.type === 'tel' && value) {
          fieldValid = /^[0-9\-+\s]{9,14}$/.test(value);
        }
        if (field.type === 'email' && value) {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        if (wrap) wrap.classList.toggle('invalid', !fieldValid);
        if (!fieldValid) valid = false;
      });

      if (valid) {
        form.reset();
        if (successBox) {
          successBox.classList.add('show');
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    form.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('input', () => {
        const wrap = field.closest('.field');
        if (wrap) wrap.classList.remove('invalid');
      });
    });
  }

  // Footer year
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
