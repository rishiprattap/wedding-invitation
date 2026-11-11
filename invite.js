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

const music = document.querySelector('#wedding-music');
const musicToggle = document.querySelector('#music-toggle');
music.volume = 0.12;
musicToggle.hidden = false;
let musicStarting = false;

try {
  music.muted = sessionStorage.getItem('wedding-music-muted') === 'true';
} catch {
  // Playback also works when the browser disables session storage.
}

function updateMusicButton() {
  musicToggle.textContent = music.muted
    ? '♫ Unmute music'
    : musicStarting ? '♫ Starting music…'
    : music.paused ? '♫ Play music' : '♫ Mute music';
}

async function playMusic() {
  musicStarting = true;
  updateMusicButton();
  try {
    await music.play();
  } catch {
    // Browsers may require another guest interaction to allow sound.
  }
  musicStarting = false;
  updateMusicButton();
}

musicToggle.addEventListener('click', () => {
  if (music.muted || music.paused) {
    music.muted = false;
    void playMusic();
  } else {
    music.muted = true;
  }
  try {
    sessionStorage.setItem('wedding-music-muted', String(music.muted));
  } catch {
    // A disabled storage setting does not prevent the mute control working.
  }
  updateMusicButton();
});

function startMusicOnInteraction(event) {
  if (!musicToggle.contains(event.target) && !music.muted && music.paused) {
    void playMusic();
  }
}

document.addEventListener('pointerup', startMusicOnInteraction, { capture: true });
document.addEventListener('click', startMusicOnInteraction, { capture: true });

document.querySelector('.hero-link').addEventListener('click', () => {
  music.muted = false;
  void playMusic();
  try {
    sessionStorage.setItem('wedding-music-muted', 'false');
  } catch {
    // Guests can enable sound even when session storage is unavailable.
  }
});

music.addEventListener('playing', () => {
  musicStarting = false;
  document.removeEventListener('pointerup', startMusicOnInteraction, { capture: true });
  document.removeEventListener('click', startMusicOnInteraction, { capture: true });
  updateMusicButton();
});

music.addEventListener('play', updateMusicButton);
music.addEventListener('pause', updateMusicButton);
music.addEventListener('volumechange', updateMusicButton);
music.addEventListener('error', () => {
  musicStarting = false;
  musicToggle.textContent = '♫ Retry music';
});
updateMusicButton();
if (!music.muted) void playMusic();

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
