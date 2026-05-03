/*
 * Load Studio PWA application logic
 *
 * This script adds interactivity to the Load Studio front‑end. It binds
 * click events to the menu button (reserved for future side navigation),
 * implements a dark mode toggle by toggling a data attribute on the body,
 * and handles simple smooth scrolling for internal anchors.
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const darkToggle = document.querySelector('[aria-label="Toggle dark mode"]');

  // Placeholder menu interaction: toggles a class on body for side nav
  menuBtn.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  // Dark mode toggle flips a data attribute on the body
  darkToggle.addEventListener('click', () => {
    const isDark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = isDark ? 'light' : 'dark';
  });

  // Smooth scrolling for internal links on toolbar shortcuts
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});