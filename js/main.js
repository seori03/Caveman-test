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

  // Two-axis case filter (cases.html): track (병원/승마장) x domain (영역)
  const trackTabs = document.querySelectorAll('.filter-tabs.track button');
  const domainTabs = document.querySelectorAll('.filter-tabs.domain button');
  const caseCards = document.querySelectorAll('[data-track]');

  if (caseCards.length) {
    let activeTrack = 'all';
    let activeDomain = 'all';

    const applyFilter = () => {
      caseCards.forEach((card) => {
        const trackMatch = activeTrack === 'all' || card.dataset.track === activeTrack;
        const domainMatch = activeDomain === 'all' || card.dataset.domain === activeDomain;
        card.style.display = trackMatch && domainMatch ? '' : 'none';
      });
    };

    trackTabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        trackTabs.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeTrack = btn.dataset.filter;
        applyFilter();
      });
    });

    domainTabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        domainTabs.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeDomain = btn.dataset.filter;
        applyFilter();
      });
    });
  }

  // Footer year
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
