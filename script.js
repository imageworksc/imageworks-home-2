/* ===========================================================
   ImageWorks Creative — Home
   Plain vanilla JS. No framework, no build step.
   =========================================================== */

/* -----------------------------------------------------------
   DATA
   ----------------------------------------------------------- */
var SPRITE_1 = 'url(assets/work-sprite-1.png)';
var SPRITE_2 = 'url(assets/work-2.png)';

var WORKS = [
  { bg: SPRITE_1, pos: '50% 0%',  label: 'JRC',           tag: 'Defense' },
  { bg: SPRITE_2, pos: '50% 6%',  label: "St. Michael's", tag: 'Reports' },
  { bg: SPRITE_1, pos: '50% 27%', label: 'JRC — AI',      tag: 'Automation' },
  { bg: SPRITE_1, pos: '50% 42%', label: 'JRC',           tag: 'Web Design' },
  { bg: SPRITE_1, pos: '50% 58%', label: 'JRC',           tag: 'Case Study' },
  { bg: SPRITE_2, pos: '50% 94%', label: "St. Michael's", tag: 'Branding' },
  { bg: SPRITE_1, pos: '50% 74%', label: 'JRC',           tag: 'Culture' },
  { bg: SPRITE_1, pos: '50% 96%', label: 'Federal',       tag: 'Government' }
];

var PARTNERS = [
  { name: 'HERMES Creative Awards',            src: 'assets/logos/hermes.jpg',   h: 56 },
  { name: 'Davey Awards',                      src: 'assets/logos/davey.png',    h: 34 },
  { name: 'Best in Search',                    src: 'assets/logos/bis.png',      h: 56 },
  { name: 'Best Web Design Agencies',          src: 'assets/logos/bwda.png',     h: 40 },
  { name: 'Google Partner',                    src: 'assets/logos/google.jpg',   h: 34 },
  { name: 'Mailchimp',                         src: 'assets/logos/mailchimp.png', h: 50 },
  { name: 'MOZ',                               src: 'assets/logos/moz.jpg',      h: 28 },
  { name: 'Crazy Egg',                         src: 'assets/logos/crazyegg.png', h: 40 },
  { name: 'SEMRUSH Certified Agency Partner',  src: 'assets/logos/semrush.jpg',  h: 58 },
  { name: 'IMA Interactive Media Awards',      src: 'assets/logos/ima.png',      h: 26 },
  { name: 'W3 Awards',                         src: 'assets/logos/w3.png',       h: 56 },
  { name: 'Expertise',                         src: 'assets/logos/expertise.jpg', h: 56 },
  { name: 'Summit International Awards',        src: 'assets/logos/sia.png',      h: 30 },
  { name: 'Vega Digital Awards',               src: 'assets/logos/winner.png',   h: 56 }
];

var TESTIMONIALS = [
  { quote: '"ImageWorks\u2019 branding and marketing strategies have led to a tenfold increase in our organic website traffic."', author: 'Diakon' },
  { quote: '"We have already seen a lot more user engagement than we ever have had in the past. Scott never said no. As a result, I am a hero at work for creating this great new site."', author: 'MAG America' },
  { quote: '"Scott is the only person I\u2019ve talked to who really took the time to understand my marketing needs and helped me make the changes to my website and marketing plan."', author: 'SermonScribe' },
  { quote: '"ImageWorks knew exactly what I needed and provided it quickly and economically."', author: 'The People\u2019s Chemist' },
  { quote: '"Thanks to the IWC team for creating a brand for us which consistently receives rave reviews!"', author: 'BeanTree Learning' },
  { quote: '"We have been extremely happy with their creativeness and are very proud of what they have done for us on our web presence."', author: 'Rosoka' },
  { quote: '"This design is phenomenal! Your team has blown me and my expectations away at every phase! I can hardly wait to start marketing."', author: 'Launch Paw' },
  { quote: '"A big thank you for an amazing website! I absolutely love it! Fabulous work \u2014 I have been bragging about it to everyone!"', author: 'Lowes Island' }
];

/* -----------------------------------------------------------
   RENDER HELPERS
   ----------------------------------------------------------- */
function workCardHTML(w) {
  return '' +
    '<div class="iw-work" style="flex:none;width:300px;border-radius:2px;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(20,40,80,.08),0 10px 26px rgba(20,40,80,.1);">' +
      '<div style="height:30px;display:flex;align-items:center;gap:6px;padding:0 14px;background:#f3f6fb;border-bottom:1px solid #eaeff6;">' +
        '<span style="width:9px;height:9px;border-radius:50%;background:#ff6058;"></span>' +
        '<span style="width:9px;height:9px;border-radius:50%;background:#ffbd2e;"></span>' +
        '<span style="width:9px;height:9px;border-radius:50%;background:#28c840;"></span>' +
      '</div>' +
      '<div style="height:192px;background-image:' + w.bg + ';background-size:100% auto;background-position:' + w.pos + ';background-repeat:no-repeat;"></div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;">' +
        '<span style="font-size:15px;font-weight:700;color:#143c66;">' + w.label + '</span>' +
        '<span style="font-size:11px;font-weight:700;letter-spacing:.5px;color:#80c34a;background:#eef7e4;padding:4px 9px;border-radius:2px;">' + w.tag + '</span>' +
      '</div>' +
    '</div>';
}

function testiCardHTML(t) {
  return '' +
    '<div style="flex:none;width:380px;padding:28px;border-radius:2px;background:#fff;box-shadow:0 1px 3px rgba(20,40,80,.1),0 12px 30px rgba(20,40,80,.12);display:flex;flex-direction:column;">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">' +
        '<span style="font-size:16px;font-weight:800;color:#1266b5;">5.0</span>' +
        '<span style="color:#ffa733;font-size:15px;letter-spacing:1px;">\u2605\u2605\u2605\u2605\u2605</span>' +
      '</div>' +
      '<p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#3d464d;flex:1;">' + t.quote + '</p>' +
      '<div style="font-size:16px;font-weight:700;color:#1266b5;">' + t.author + '</div>' +
    '</div>';
}

function partnerLogoHTML(p) {
  return '<img class="iw-partner" src="' + p.src + '" alt="' + p.name + '" height="' + p.h + '" style="flex:none;width:auto;display:block;object-fit:contain;"/>';
}

function joinHTML(list, fn) {
  return list.map(fn).join('');
}

/* fill a marquee track with two copies of the content for a seamless loop */
function fillTrack(id, html) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = html + html;
}

/* marquees move side-to-side driven by scroll position (no auto-play) */
function initScrollMarquee() {
  var tracks = [].slice.call(document.querySelectorAll('.iw-track[data-mq]'));
  if (!tracks.length) return;
  var SPEED = 0.35; // marquee px per px scrolled
  function update() {
    var y = window.scrollY || window.pageYOffset || 0;
    for (var i = 0; i < tracks.length; i++) {
      var t = tracks[i];
      var half = t.scrollWidth / 2;          // content is duplicated -> half = one loop
      if (!half) continue;                    // hidden/empty track
      var d = (y * SPEED) % half;             // 0..half, wraps seamlessly
      var x = t.getAttribute('data-mq') === 'rev' ? (d - half) : -d;
      t.style.transform = 'translate3d(' + x + 'px,0,0)';
    }
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('load', update);
}

function buildShowcase() {
  var worksFwd = joinHTML(WORKS, workCardHTML);
  var worksRev = joinHTML(WORKS.slice().reverse(), workCardHTML);
  var partners = joinHTML(PARTNERS, partnerLogoHTML);
  var testiA   = joinHTML(TESTIMONIALS.slice(0, 4), testiCardHTML);
  var testiB   = joinHTML(TESTIMONIALS.slice(4, 8), testiCardHTML);

  // scroll mode
  fillTrack('track-scroll-works-a', worksFwd);
  fillTrack('track-scroll-works-b', worksRev);
  fillTrack('track-scroll-partners', partners);
  fillTrack('track-scroll-testi-a', testiA);
  fillTrack('track-scroll-testi-b', testiB);
}

/* -----------------------------------------------------------
   SCROLL REVEAL + COUNT-UP (IntersectionObserver)
   ----------------------------------------------------------- */
var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el) {
  var raw = el.getAttribute('data-countup');
  var target = parseFloat(raw);
  var dec = raw.indexOf('.') >= 0 ? 1 : 0;
  var pre = el.getAttribute('data-prefix') || '';
  var suf = el.getAttribute('data-suffix') || '';
  var dur = 1500;
  var t0 = performance.now();
  function fmt(n) { return dec ? n.toFixed(1) : Math.round(n).toLocaleString('en-US'); }
  function tick(t) {
    var p = Math.min(1, (t - t0) / dur);
    var e = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + fmt(target * e) + suf;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = pre + fmt(target) + suf;
  }
  requestAnimationFrame(tick);
}

function initObservers() {
  var reveals = document.querySelectorAll('.iw-reveal');
  var counts  = document.querySelectorAll('[data-countup]');

  if (REDUCE || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
    counts.forEach(function (el) {
      var pre = el.getAttribute('data-prefix') || '';
      var suf = el.getAttribute('data-suffix') || '';
      var raw = el.getAttribute('data-countup');
      var dec = raw.indexOf('.') >= 0 ? 1 : 0;
      el.textContent = pre + (dec ? parseFloat(raw).toFixed(1) : Math.round(parseFloat(raw)).toLocaleString('en-US')) + suf;
    });
    return;
  }

  // prime count-up displays to zero
  counts.forEach(function (el) {
    el.textContent = (el.getAttribute('data-prefix') || '') + '0' + (el.getAttribute('data-suffix') || '');
  });

  var revealObs = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  reveals.forEach(function (el) { revealObs.observe(el); });

  var countObs = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { countUp(en.target); obs.unobserve(en.target); }
    });
  }, { threshold: 0.4 });
  counts.forEach(function (el) { countObs.observe(el); });
}

/* -----------------------------------------------------------
   NAV SHADOW ON SCROLL
   ----------------------------------------------------------- */
function initNav() {
  var nav = document.querySelector('[data-nav]');
  if (!nav) return;
  function onScroll() {
    var y = window.scrollY || 0;
    nav.style.boxShadow = y > 12 ? '0 6px 24px rgba(15,36,64,.10)' : '0 0 0 rgba(0,0,0,0)';
    nav.style.background = y > 12 ? 'rgba(255,255,255,.94)' : 'rgba(255,255,255,.86)';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* -----------------------------------------------------------
   HERO STAGE SCALER (fixed 1920x1061 Figma stage -> viewport)
   ----------------------------------------------------------- */
function initHeroStage() {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;
  var stage = hero.querySelector('[data-hero-stage]');
  if (!stage) return;
  var wrap = stage.parentElement;

  function fit() {
    var w = wrap.clientWidth;
    if (!w) return;
    stage.style.setProperty('--iwh-s', w / 1920);
  }
  fit();
  window.addEventListener('resize', fit, { passive: true });
}

/* -----------------------------------------------------------
   HERO CARDS — staggered load-in entrance
   ----------------------------------------------------------- */
function initCardEntrance() {
  var stage = document.querySelector('[data-hero-stage]');
  if (!stage) return;
  var cards = [].slice.call(stage.querySelectorAll('.iwh-card'));
  if (REDUCE) {
    cards.forEach(function (c) { c.style.transition = 'none'; });
    stage.classList.add('is-loaded');
    return;
  }
  // stagger only opacity + transform (the entrance); leave hover scale instant
  cards.forEach(function (c, i) {
    var d = (0.07 * i).toFixed(2) + 's';
    c.style.transitionDelay = d + ', ' + d + ', 0s, 0s, 0s';
  });
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { stage.classList.add('is-loaded'); });
  });
}

/* -----------------------------------------------------------
   HERO CONNECTORS — one at a time per orientation, random order/speed/gaps
   ----------------------------------------------------------- */
function initConnectors() {
  var stage = document.querySelector('[data-hero-stage]');
  if (!stage) return;
  var verticals = [].slice.call(stage.querySelectorAll('.iwh-pin:not(.iwh-pin--h)'));
  var horizontals = [].slice.call(stage.querySelectorAll('.iwh-pin--h'));
  if (REDUCE) {
    verticals.concat(horizontals).forEach(function (p) { p.style.opacity = '1'; });
    return;
  }
  var rand = function (min, max) { return min + Math.random() * (max - min); };

  // Plays exactly one pin from `pins` at a time. When it finishes, waits a
  // random gap, then plays another random one (never the same twice in a row,
  // cycles through all before repeating). Guarantees no two of this group overlap.
  function runGroup(pins, durMin, durMax, gapMin, gapMax) {
    if (!pins.length) return;
    var pool = [], last = null;
    function step() {
      if (!pool.length) pool = pins.slice();
      var choices = pool.filter(function (p) { return p !== last; });
      if (!choices.length) choices = pool;
      var pin = choices[(Math.random() * choices.length) | 0];
      pool = pool.filter(function (p) { return p !== pin; });
      last = pin;

      var dur = rand(durMin, durMax);
      pin.style.animationDuration = dur.toFixed(2) + 's';
      pin.classList.remove('is-moving');
      void pin.offsetWidth;               // reflow so the animation restarts
      pin.classList.add('is-moving');

      var gap = rand(gapMin, gapMax);
      setTimeout(function () {
        pin.classList.remove('is-moving'); // back to hidden, ready for next turn
        step();
      }, (dur + gap) * 1000);
    }
    step(); // start immediately; subsequent turns are gapped by setTimeout
  }

  runGroup(verticals, 11, 17, 1.4, 5.5);    // vertical group
  runGroup(horizontals, 12, 18, 2.0, 6.5);  // horizontal group (independent)
}

/* -----------------------------------------------------------
   HERO DOT FIELD — canvas grid; dots sink inward toward the cursor
   ----------------------------------------------------------- */
function initDotField() {
  var stage = document.querySelector('[data-hero-stage]');
  if (!stage) return;
  var canvas = stage.querySelector('[data-dotfield]');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var W = 1920, H = 1061;           // stage coordinate space
  canvas.width = W;
  canvas.height = H;

  var GAP = 32;                     // dot spacing (matches .iwh-dots patches)
  var R_DOT = 1.7;                  // base dot radius
  var INFLUENCE = 160;              // cursor reach in px
  var PULL = 14;                    // how far dots slide toward the cursor
  var COLOR = 'rgba(120,140,170,';  // blue-grey; alpha appended per dot
  var BASE_A = 0.30;

  // draw the plain grid once (used as the static / reduced-motion state)
  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    for (var y = GAP / 2; y < H; y += GAP) {
      for (var x = GAP / 2; x < W; x += GAP) {
        ctx.beginPath();
        ctx.arc(x, y, R_DOT, 0, Math.PI * 2);
        ctx.fillStyle = COLOR + BASE_A + ')';
        ctx.fill();
      }
    }
  }
  drawStatic();

  if (REDUCE) return;               // no cursor interaction under reduced motion

  var px = -9999, py = -9999;       // raw pointer (stage coords)
  var cx = -9999, cy = -9999;       // eased pointer used for drawing
  var active = false;
  var raf = null;

  function draw() {
    cx += (px - cx) * 0.18;         // ease so the depression glides
    cy += (py - cy) * 0.18;
    ctx.clearRect(0, 0, W, H);
    for (var y = GAP / 2; y < H; y += GAP) {
      for (var x = GAP / 2; x < W; x += GAP) {
        var dx = x - cx, dy = y - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var r = R_DOT, a = BASE_A, ox = 0, oy = 0;
        if (dist < INFLUENCE) {
          var t = 1 - dist / INFLUENCE;         // 0..1, strongest at cursor
          var e = t * t;
          var inv = 1 / (dist || 1);
          ox = -dx * inv * e * PULL;            // slide toward cursor...
          oy = -dy * inv * e * PULL;
          r = R_DOT * (1 - e * 0.8);            // ...shrink...
          a = BASE_A * (1 - e * 0.6);           // ...and dim => sinks inward
        }
        if (r <= 0.05) continue;
        ctx.beginPath();
        ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
        ctx.fillStyle = COLOR + a.toFixed(3) + ')';
        ctx.fill();
      }
    }
    var settling = Math.abs(px - cx) > 0.5 || Math.abs(py - cy) > 0.5;
    if (active || settling) { raf = requestAnimationFrame(draw); }
    else { raf = null; drawStatic(); }
  }
  function kick() { if (!raf) raf = requestAnimationFrame(draw); }

  stage.addEventListener('pointermove', function (e) {
    var rect = canvas.getBoundingClientRect();
    if (!rect.width) return;                    // hidden (mobile) — ignore
    px = (e.clientX - rect.left) / rect.width * W;
    py = (e.clientY - rect.top) / rect.height * H;
    if (cx < -9000) { cx = px; cy = py; }        // first move: no glide from origin
    active = true;
    kick();
  });
  stage.addEventListener('pointerleave', function () {
    active = false;                              // depression eases back out
    px = -9999; py = -9999;
    kick();
  });
}

/* -----------------------------------------------------------
   BOOT
   ----------------------------------------------------------- */
function boot() {
  buildShowcase();
  initScrollMarquee();
  initObservers();
  initNav();
  initHeroStage();
  initDotField();
  initCardEntrance();
  initConnectors();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
