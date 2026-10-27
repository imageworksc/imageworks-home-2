/* ===========================================================
   ImageWorks Creative — Home
   Plain vanilla JS. No framework, no build step.
   Every visual lives in styles.css: the script only toggles classes and
   data attributes, or hands a computed number to CSS as a custom property.

   1. Data
   2. Render helpers
   3. Hero wall + showcase tracks
   4. Scroll-driven marquees
   5. Scroll reveal
   6. Hero headline
   7. How We Do It steps
   8. Hero graphic modal
   9. Boot
   =========================================================== */

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOBILE_MQ = '(max-width: 767px)';

const scrollTop = () => window.scrollY || window.pageYOffset || 0;


/* -----------------------------------------------------------
   1. DATA
   ----------------------------------------------------------- */
const SPRITE_1 = 'url(assets/work-sprite-1.png)';
const SPRITE_2 = 'url(assets/work-2.png)';

const WORKS = [
  { bg: SPRITE_1, pos: '50% 0%',  label: 'JRC',           tag: 'Defense' },
  { bg: SPRITE_2, pos: '50% 6%',  label: "St. Michael's", tag: 'Reports' },
  { bg: SPRITE_1, pos: '50% 27%', label: 'JRC — AI',      tag: 'Automation' },
  { bg: SPRITE_1, pos: '50% 42%', label: 'JRC',           tag: 'Web Design' },
  { bg: SPRITE_1, pos: '50% 58%', label: 'JRC',           tag: 'Case Study' },
  { bg: SPRITE_2, pos: '50% 94%', label: "St. Michael's", tag: 'Branding' },
  { bg: SPRITE_1, pos: '50% 74%', label: 'JRC',           tag: 'Culture' },
  { bg: SPRITE_1, pos: '50% 96%', label: 'Federal',       tag: 'Government' }
];

/* Portfolio screenshots in assets/hero-shots — mixed in with the sprites above
   across both the hero wall and the Our Work rail. */
const PORTFOLIO = [
  { src: 'assets/hero-shots/casey-margenau-01.jpg', label: 'Casey Margenau', tag: 'Real Estate' },
  { src: 'assets/hero-shots/highbrown.jpg',         label: 'Highbrown',      tag: 'Web Design' },
  { src: 'assets/hero-shots/asc-01.jpg',            label: 'ASC',            tag: 'Web Design' },
  { src: 'assets/hero-shots/silkvision.jpg',        label: 'SilkVision',     tag: 'Web Design' },
  { src: 'assets/hero-shots/govdata-1.jpg',         label: 'GovData',        tag: 'Platform' },
  { src: 'assets/hero-shots/chrysalis-01.jpg',      label: 'Chrysalis',      tag: 'Web Design' },
  { src: 'assets/hero-shots/barr-group.jpg',        label: 'Barr Group',     tag: 'Web Design' },
  { src: 'assets/hero-shots/ridgley-walsh-01.jpg',  label: 'Ridgley Walsh',  tag: 'Branding' },
  { src: 'assets/hero-shots/asc-02.jpg',            label: 'ASC',            tag: 'Sections' },
  { src: 'assets/hero-shots/casey.jpg',             label: 'Casey Margenau', tag: 'Web Design' },
  { src: 'assets/hero-shots/silkvision-2.jpg',      label: 'SilkVision',     tag: 'Sections' },
  { src: 'assets/hero-shots/govdata-2.jpg',         label: 'GovData',        tag: 'Platform' },
  { src: 'assets/hero-shots/chrysalis-03.jpg',      label: 'Chrysalis',      tag: 'Sections' },
  { src: 'assets/hero-shots/asc-04.jpg',            label: 'ASC',            tag: 'Sections' },
  { src: 'assets/hero-shots/casey-2.jpg',           label: 'Casey Margenau', tag: 'Sections' },
  { src: 'assets/hero-shots/ridgley-walsh-02.jpg',  label: 'Ridgley Walsh',  tag: 'Sections' }
];

const PARTNERS = [
  { name: 'HERMES Creative Awards',       src: 'assets/logos/hermes.jpg',    h: 76 },
  { name: 'Davey Awards',                 src: 'assets/logos/davey.png',     h: 46 },
  { name: 'Best in Search',               src: 'assets/logos/bis.png',       h: 76 },
  { name: 'Best Web Design Agencies',     src: 'assets/logos/bwda.png',      h: 54 },
  { name: 'Google Partner',               src: 'assets/logos/google.jpg',    h: 46 },
  { name: 'Mailchimp',                    src: 'assets/logos/mailchimp.png', h: 68 },
  { name: 'IMA Interactive Media Awards', src: 'assets/logos/ima.png',       h: 36 },
  { name: 'W3 Awards',                    src: 'assets/logos/w3.png',        h: 76 },
  { name: 'Expertise',                    src: 'assets/logos/expertise.jpg', h: 76 },
  { name: 'Summit International Awards',  src: 'assets/logos/sia.png',       h: 40 },
  { name: 'Vega Digital Awards',          src: 'assets/logos/winner.png',    h: 76 }
];

const TESTIMONIALS = [
  { quote: '"ImageWorks’ branding and marketing strategies have led to a tenfold increase in our organic website traffic."', author: 'Diakon' },
  { quote: '"We have already seen a lot more user engagement than we ever have had in the past. Scott never said no. As a result, I am a hero at work for creating this great new site."', author: 'MAG America' },
  { quote: '"Scott is the only person I’ve talked to who really took the time to understand my marketing needs and helped me make the changes to my website and marketing plan."', author: 'SermonScribe' },
  { quote: '"ImageWorks knew exactly what I needed and provided it quickly and economically."', author: 'The People’s Chemist' },
  { quote: '"Thanks to the IWC team for creating a brand for us which consistently receives rave reviews!"', author: 'BeanTree Learning' },
  { quote: '"We have been extremely happy with their creativeness and are very proud of what they have done for us on our web presence."', author: 'Rosoka' },
  { quote: '"This design is phenomenal! Your team has blown me and my expectations away at every phase! I can hardly wait to start marketing."', author: 'Launch Paw' },
  { quote: '"A big thank you for an amazing website! I absolutely love it! Fabulous work — I have been bragging about it to everyone!"', author: 'Lowes Island' }
];


/* -----------------------------------------------------------
   2. RENDER HELPERS
   ----------------------------------------------------------- */
/* class helpers — every image is a CSS class, nothing inline */
const pfKey = (src) => 'pf-' + src.split('/').pop().replace(/\.\w+$/, '');      // portfolio image
const bpClass = (pos) => 'bp-' + pos.split(' ')[1].replace('%', '');             // sprite background-position
const sprClass = (bg) => (bg === SPRITE_1 ? 'spr-1' : 'spr-2');

function workCardHTML(w) {
  const media = w.src
    ? `iw-work__media iw-work__media--img ${pfKey(w.src)}`
    : `iw-work__media ${sprClass(w.bg)} ${bpClass(w.pos)}`;
  return `
    <div class="iw-work">
      <div class="iw-work__bar">
        <span class="iw-work__dot iw-work__dot--r"></span>
        <span class="iw-work__dot iw-work__dot--y"></span>
        <span class="iw-work__dot iw-work__dot--g"></span>
      </div>
      <div class="${media}"></div>
      <div class="iw-work__meta">
        <span class="iw-work__label">${w.label}</span>
        <span class="iw-work__tag">${w.tag}</span>
      </div>
    </div>`;
}

function testiCardHTML(t) {
  return `
    <div class="iw-testi">
      <div class="iw-testi__head">
        <span class="iw-testi__score">5.0</span>
        <span class="iw-testi__stars">★★★★★</span>
      </div>
      <p class="iw-testi__quote">${t.quote}</p>
      <div class="iw-testi__author">${t.author}</div>
    </div>`;
}

function partnerLogoHTML(p) {
  return `<img class="iw-partner" src="${p.src}" alt="${p.name}" height="${p.h}">`;
}

const joinHTML = (list, fn) => list.map(fn).join('');

/* fill a marquee track with two copies of the content for a seamless loop.
   `reps` repeats the content inside each copy, for short sets that would
   otherwise run out before the edge of a wide screen */
function fillTrack(id, html, reps = 1) {
  const el = document.getElementById(id);
  const half = html.repeat(reps);
  if (el) el.innerHTML = half + half;
}


/* -----------------------------------------------------------
   3. HERO WALL + SHOWCASE TRACKS
   ----------------------------------------------------------- */
/* Mix the originals (WORKS) with the portfolio shots so the rail draws from
   both — 2 new to 1 original, which also keeps like next to unlike. Every tile
   is a distinct image, so nothing repeats back to back. */
function mixWorks() {
  const out = [];
  let i = 0;
  let j = 0;
  while (i < WORKS.length || j < PORTFOLIO.length) {
    if (j < PORTFOLIO.length) out.push(PORTFOLIO[j++]);
    if (j < PORTFOLIO.length) out.push(PORTFOLIO[j++]);
    if (i < WORKS.length) out.push(WORKS[i++]);
  }
  return out;
}

/* The hero wall: columns of tiles drawn from the same mixed pool (sprite shots +
   portfolio shots), laid out so no tile repeats directly above/below itself,
   across the loop seam, or beside itself in the next column. */
let heroCols = 0;

function buildHeroShots(force) {
  const wrap = document.querySelector('.iwc-shots-in');
  if (!wrap) return;

  // enough columns to fill the viewport (they overflow and clip), so large and
  // ultrawide screens don't leave the sides of the wall empty
  const cols = Math.max(7, Math.ceil(window.innerWidth / 254) + 2);
  if (!force && cols <= heroCols) return;   // only rebuild when more are needed
  heroCols = cols;

  const sprites = ['50% 0%', '50% 27%', '50% 42%', '50% 58%', '50% 74%', '50% 96%']
    .map((p) => ({ c: 's1', p }))
    .concat([{ c: 's2', p: '50% 6%' }, { c: 's2', p: '50% 94%' }]);
  const pool = sprites.map((s) => ({ sprite: s }))
    .concat(PORTFOLIO.map((p) => ({ img: p.src })));

  const id = (t) => (t.img ? 'i' + t.img : 's' + t.sprite.c + t.sprite.p);
  const span = (t) => (t.img
    ? `<span class="iwc-shot iwc-shot--img ${pfKey(t.img)}"></span>`
    : `<span class="iwc-shot iwc-shot--${t.sprite.c} ${bpClass(t.sprite.p)}"></span>`);

  const ROWS = 6;
  const grid = [];
  for (let col = 0; col < cols; col++) {
    // ids used anywhere in the previous column — the new column shares none of
    // them, so no two identical tiles ever touch (vertically, horizontally or
    // diagonally); and each column's own tiles are all distinct
    const prev = new Set((grid[col - 1] || []).map(id));
    const used = new Set();
    const seq = [];
    for (let row = 0; row < ROWS; row++) {
      const choices = pool.filter((t) => !used.has(id(t)) && !prev.has(id(t)));
      const pick = choices[Math.floor(Math.random() * choices.length)];
      used.add(id(pick));
      seq.push(pick);
    }
    grid.push(seq);
  }

  wrap.innerHTML = grid.map((seq, col) =>
    `<div class="iwc-col-strip iwc-col-strip--${col % 4}">${seq.concat(seq).map(span).join('')}</div>`
  ).join('');
}

function buildShowcase() {
  const mixed = mixWorks();

  fillTrack('track-scroll-works-a', joinHTML(mixed, workCardHTML));
  fillTrack('track-scroll-works-b', joinHTML(mixed.slice().reverse(), workCardHTML));
  fillTrack('track-scroll-partners', joinHTML(PARTNERS, partnerLogoHTML));
  // four reviews per row is ~1100px — not enough to cover a 2560px-wide
  // layout once the reverse row starts shifted by a full loop
  fillTrack('track-scroll-testi-a', joinHTML(TESTIMONIALS.slice(0, 4), testiCardHTML), 3);
  fillTrack('track-scroll-testi-b', joinHTML(TESTIMONIALS.slice(4, 8), testiCardHTML), 3);
}


/* -----------------------------------------------------------
   4. SCROLL-DRIVEN MARQUEES
   The review rows slide side to side with the scroll position (no auto-play).
   The offset goes to CSS as --mq-x; styles.css owns the transform.
   ----------------------------------------------------------- */
function initScrollMarquee() {
  const tracks = Array.from(document.querySelectorAll('.iw-track[data-mq]'));
  if (!tracks.length) return;

  const SPEED = 0.35;   // marquee px per px scrolled
  const mobile = window.matchMedia(MOBILE_MQ);

  function update() {
    const y = scrollTop();
    tracks.forEach((t) => {
      // on phones the review row auto-plays via a CSS marquee (like Our Work),
      // so hand control back to CSS
      if (mobile.matches) { t.style.removeProperty('--mq-x'); return; }
      const half = t.scrollWidth / 2;          // content is duplicated → half = one loop
      if (!half) return;                       // hidden/empty track
      const d = (y * SPEED) % half;            // 0..half, wraps seamlessly
      const x = t.dataset.mq === 'rev' ? d - half : -d;
      t.style.setProperty('--mq-x', `${x}px`);
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('load', update);
}


/* -----------------------------------------------------------
   5. SCROLL REVEAL
   ----------------------------------------------------------- */
function initReveal() {
  const reveals = document.querySelectorAll('.iw-reveal');

  if (REDUCE || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      obs.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  reveals.forEach((el) => obs.observe(el));
}


/* -----------------------------------------------------------
   6. HERO HEADLINE — the green accent arrives a letter at a time.
   Each letter gets its delay as --d; the animation is in styles.css.
   ----------------------------------------------------------- */
function initHeroType() {
  const el = document.querySelector('[data-type]');
  if (!el) return;
  const text = el.textContent;

  /* Some screen readers spell out text that's been split into per-character
     elements, so the accessible name goes back on the parent and the letters
     are hidden from the tree. */
  el.setAttribute('aria-label', text);
  el.textContent = '';

  const START = 0.48;
  const STEP = 0.038;
  // letters are grouped per word, so a line can only break between words —
  // otherwise a narrow phone can strand a single letter or the full stop
  let i = 0;
  text.split(' ').forEach((word, w) => {
    if (w > 0) {
      el.appendChild(document.createTextNode(' '));
      i++;
    }
    const wordEl = document.createElement('span');
    wordEl.className = 'iwh-word';
    wordEl.setAttribute('aria-hidden', 'true');
    Array.from(word).forEach((c) => {
      const ch = document.createElement('span');
      ch.className = 'iwh-ch';
      ch.textContent = c;
      ch.style.setProperty('--d', `${(START + i * STEP).toFixed(3)}s`);
      wordEl.appendChild(ch);
      i++;
    });
    el.appendChild(wordEl);
  });
}


/* -----------------------------------------------------------
   7. HOW WE DO IT — four steps as tabs on a process rail
   ----------------------------------------------------------- */
function initSteps() {
  const root = document.querySelector('[data-steps]');
  if (!root) return;
  const tabList = root.querySelector('.iw-steps-tabs');
  const tabs = Array.from(root.querySelectorAll('.iw-steps-tab'));
  const panels = Array.from(root.querySelectorAll('.iw-steps-panel'));
  const fill = root.querySelector('[data-steps-fill]');
  if (!tabs.length || tabs.length !== panels.length) return;

  const mobile = window.matchMedia(MOBILE_MQ);
  let current = 0;

  function select(i, focus) {
    if (i < 0 || i >= tabs.length) return;
    current = i;
    tabs.forEach((t, k) => {
      const on = k === i;
      t.classList.toggle('is-active', on);
      t.classList.toggle('is-done', k <= i);   // the rail fills up to where you are
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;                // one tab stop for the whole set
      // no [hidden] here: it would pull the panel out of the grid and let the
      // box resize per step. CSS visibility:hidden keeps the cell — and still
      // takes the panel out of the tab order and the accessibility tree.
      panels[k].classList.toggle('is-active', on);
    });
    // the line lands on the active station — widths per step live in styles.css
    if (fill) fill.dataset.step = String(i);
    if (focus) tabs[i].focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      // phones: the panels are stacked, so jump to the one for this tab; wider
      // screens keep the one-panel-at-a-time behaviour
      if (!mobile.matches) { select(i); return; }
      const top = panels[i].getBoundingClientRect().top + scrollTop() - tabList.offsetHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  tabList.addEventListener('keydown', (e) => {
    const n = tabs.length;
    const next = {
      ArrowRight: (current + 1) % n,
      ArrowDown: (current + 1) % n,
      ArrowLeft: (current - 1 + n) % n,
      ArrowUp: (current - 1 + n) % n,
      Home: 0,
      End: n - 1
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  });

  // phones: the tabs are pinned and scrolling through the stacked panels picks
  // the active tab — the panel crossing ~42% of the viewport is the one you're on
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (!mobile.matches) return;
      const line = scrollTop() + window.innerHeight * 0.42;
      let idx = 0;
      panels.forEach((p, k) => {
        if (p.getBoundingClientRect().top + scrollTop() <= line) idx = k;
      });
      if (idx !== current) select(idx);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  function syncMode() {
    if (mobile.matches) onScroll();   // derive the active tab from where we are
    else select(current);             // back to the single-panel tablist
  }
  mobile.addEventListener('change', syncMode);

  select(0);
  syncMode();
}


/* -----------------------------------------------------------
   8. HERO GRAPHIC MODAL — the CTA opens the interactive graphic in an
   overlay. The iframe stays src-less until first open, so its payload
   never blocks the home page's first paint.
   ----------------------------------------------------------- */
function initHeroModal() {
  const modal = document.querySelector('[data-graphic-modal]');
  const openers = document.querySelectorAll('[data-hero-graphic]');
  if (!modal || !openers.length) return;
  const frame = modal.querySelector('[data-graphic-src]');
  let lastFocus = null;

  /* The graphic is a fixed horizontal composition (1280px wide, with its
     content in a 712px band). Rather than let it sit at one size in a huge
     modal, scale it as a unit to fit the viewport — a laptop and a 4K/5K
     display alike. The factor goes to CSS as --k; styles.css sizes the panel
     and the frame from it, and leaves phones fluid. */
  const DESIGN_W = 1280;
  const BAND_H = 712;
  function layoutFrame() {
    if (modal.hidden) return;
    const k = Math.min(window.innerWidth * 0.70 / DESIGN_W, window.innerHeight * 0.90 / BAND_H);
    modal.style.setProperty('--k', k.toFixed(4));
  }
  window.addEventListener('resize', layoutFrame, { passive: true });

  function open(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    // load the graphic on demand, once
    if (frame && !frame.getAttribute('src')) frame.setAttribute('src', frame.dataset.graphicSrc);
    modal.hidden = false;
    layoutFrame();
    document.body.classList.add('iw-modal-open');
    // next frame: flip .in so the backdrop/panel transition runs
    requestAnimationFrame(() => modal.classList.add('in'));
    modal.querySelector('.iw-modal__close')?.focus();
  }

  function close() {
    if (modal.hidden) return;
    modal.classList.remove('in');
    document.body.classList.remove('iw-modal-open');
    // wait out the fade before hiding so it doesn't snap shut
    const done = () => {
      modal.hidden = true;
      modal.removeEventListener('transitionend', done);
    };
    modal.addEventListener('transitionend', done);
    setTimeout(done, 360);   // fallback if transitionend doesn't fire
    lastFocus?.focus?.();
  }

  openers.forEach((btn) => btn.addEventListener('click', open));
  modal.querySelectorAll('[data-graphic-close]').forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}


/* -----------------------------------------------------------
   9. BOOT
   ----------------------------------------------------------- */
function boot() {
  buildHeroShots();
  // grow the wall to fill wider screens (e.g. maximising or a 4K/5K monitor)
  let heroShotsTimer;
  window.addEventListener('resize', () => {
    clearTimeout(heroShotsTimer);
    heroShotsTimer = setTimeout(buildHeroShots, 200);
  }, { passive: true });

  buildShowcase();
  initScrollMarquee();
  initReveal();
  initHeroType();
  initSteps();
  initHeroModal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
