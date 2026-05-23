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
}

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

copyBtn?.addEventListener('click', copyAddress);

initTheme();
