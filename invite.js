const seal = document.querySelector('.seal:not(.seal-static)');
const envelope = document.querySelector('#envelope');
const card = document.querySelector('#envelope-card');
const caption = document.querySelector('#seal-caption');

document.querySelector('.seal-static').hidden = true;
seal.hidden = false;
caption.hidden = false;
seal.addEventListener('click', () => {
  const open = envelope.classList.toggle('is-open');
  seal.setAttribute('aria-expanded', String(open));
  seal.setAttribute('aria-label', open ? 'Close the envelope' : 'Open the envelope');
  card.setAttribute('aria-hidden', String(!open));
  caption.textContent = open ? '24–26 November 2026' : 'Tap the seal to open';
});

const countdown = document.querySelector('#countdown');
const countdownTitle = document.querySelector('#countdown-title');
const countdownDate = document.querySelector('#countdown-date');
const start = Date.parse('2026-11-24T16:00:00+05:30');
const end = Date.parse('2026-11-27T00:00:00+05:30');
const units = [
  ['days', 86400, Infinity],
  ['hours', 3600, 24],
  ['minutes', 60, 60],
  ['seconds', 1, 60],
].map(([name, divisor, base]) => [countdown.querySelector('[data-clock="' + name + '"]'), divisor, base]);

function tick() {
  const now = Date.now();
  if (now >= start) {
    countdown.hidden = true;
    countdownTitle.textContent = now < end ? 'The celebrations are here' : 'With love and gratitude';
    countdownDate.textContent = now < end ? '24–26 November 2026 · Kanpur' : '24–26 November 2026';
    return;
  }
  const seconds = Math.ceil((start - now) / 1000);
  for (const [element, divisor, base] of units) {
    element.textContent = String(Math.floor(seconds / divisor) % base).padStart(2, '0');
  }
  countdown.hidden = false;
  window.setTimeout(tick, 1000 - now % 1000);
}
tick();

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -18px', threshold: 0.08 });
  for (const element of document.querySelectorAll('.reveal')) {
    element.classList.add('will-reveal');
    observer.observe(element);
  }
}
