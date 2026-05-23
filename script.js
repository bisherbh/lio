const WALLET_ADDRESS = 'TUBY2CjocoSJw4NSYyUyYVw98nXMvg5Rgu';

const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('lio-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
    );
  }
}

function initTheme() {
  const saved = localStorage.getItem('lio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
}

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(WALLET_ADDRESS);
    showToast('Address copied to clipboard');
  } catch (_) {
    const textarea = document.createElement('textarea');
    textarea.value = WALLET_ADDRESS;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Address copied to clipboard');
  }

  if (copyBtn) {
    copyBtn.classList.add('copied');
    window.setTimeout(() => copyBtn.classList.remove('copied'), 450);
  }
}

function initScrollReveal() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');

  if (reducedMotion) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  items.forEach((el) => observer.observe(el));
}

function initSmoothNavHighlight() {
  const links = document.querySelectorAll('.nav a[href^="#"]');
  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const highlightObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35 },
  );

  sections.forEach((section) => highlightObserver.observe(section));
}

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

copyBtn?.addEventListener('click', copyAddress);

initTheme();
initScrollReveal();
initSmoothNavHighlight();
