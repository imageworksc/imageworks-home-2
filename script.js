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
  { name: 'HERMES Creative Awards',            src: 'assets/logos/hermes.jpg',   h: 76 },
  { name: 'Davey Awards',                      src: 'assets/logos/davey.png',    h: 46 },
  { name: 'Best in Search',                    src: 'assets/logos/bis.png',      h: 76 },
  { name: 'Best Web Design Agencies',          src: 'assets/logos/bwda.png',     h: 54 },
  { name: 'Google Partner',                    src: 'assets/logos/google.jpg',   h: 46 },
  { name: 'Mailchimp',                         src: 'assets/logos/mailchimp.png', h: 68 },
  { name: 'IMA Interactive Media Awards',      src: 'assets/logos/ima.png',      h: 36 },
  { name: 'W3 Awards',                         src: 'assets/logos/w3.png',       h: 76 },
  { name: 'Expertise',                         src: 'assets/logos/expertise.jpg', h: 76 },
  { name: 'Summit International Awards',        src: 'assets/logos/sia.png',      h: 40 },
  { name: 'Vega Digital Awards',               src: 'assets/logos/winner.png',   h: 76 }
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
   HERO NEURAL MESH — drifting nodes wired to their neighbours;
   signals fire along the links, and the cursor recruits the
   nodes around it into the network
   ----------------------------------------------------------- */
function initMesh() {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;
  var canvas = hero.querySelector('[data-mesh]');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var DENSITY = 15000;    // one node per N square px — keeps density even at any size
  var MAX_NODES = 120;
  var LINK = 168;         // nodes closer than this get wired together
  var REACH = 220;        // how far the cursor recruits
  var DRIFT = 0.16;       // node speed in px/frame — slow enough to read as ambient
  var FIRE = 0.008;       // chance per frame that a new signal fires

  var W = 0, H = 0;
  var nodes = [];
  var signals = [];       // pulses travelling along a link
  var mx = -9999, my = -9999, tx = -9999, ty = -9999;
  var raf = null, visible = true;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function build() {
    var r = hero.getBoundingClientRect();
    W = Math.round(r.width);
    H = Math.round(r.height);
    if (!W || !H) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);   // draw in CSS px

    var want = Math.min(MAX_NODES, Math.round((W * H) / DENSITY));
    nodes.length = 0;
    signals.length = 0;
    for (var i = 0; i < want; i++) {
      var a = rand(0, Math.PI * 2);
      nodes.push({
        x: rand(0, W), y: rand(0, H),
        vx: Math.cos(a) * DRIFT, vy: Math.sin(a) * DRIFT,
        r: rand(1.1, 2.3),                    // varied node sizes read as organic
        ph: rand(0, Math.PI * 2)              // phase, so nodes breathe out of sync
      });
    }
  }

  // wrap a node back in from the opposite edge so the field never empties out
  function step(n) {
    n.x += n.vx; n.y += n.vy;
    if (n.x < -20) n.x = W + 20; else if (n.x > W + 20) n.x = -20;
    if (n.y < -20) n.y = H + 20; else if (n.y > H + 20) n.y = -20;
  }

  function fire() {
    if (nodes.length < 2) return;
    var a = nodes[(Math.random() * nodes.length) | 0];
    var near = [];
    for (var i = 0; i < nodes.length; i++) {
      var b = nodes[i];
      if (b === a) continue;
      var dx = b.x - a.x, dy = b.y - a.y;
      if (dx * dx + dy * dy < LINK * LINK) near.push(b);
    }
    if (!near.length) return;
    signals.push({ a: a, b: near[(Math.random() * near.length) | 0], t: 0, sp: rand(0.006, 0.014) });
  }

  function paint(now) {
    ctx.clearRect(0, 0, W, H);
    var i, j, a, b, dx, dy, d2, d, alpha;

    // links — the closer two nodes are, the more solidly they're wired
    ctx.lineWidth = 1;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j];
        dx = b.x - a.x; dy = b.y - a.y;
        d2 = dx * dx + dy * dy;
        if (d2 > LINK * LINK) continue;
        d = Math.sqrt(d2);
        alpha = (1 - d / LINK) * 0.26;
        // links near the cursor light up
        var mid = Math.sqrt(Math.pow((a.x + b.x) / 2 - mx, 2) + Math.pow((a.y + b.y) / 2 - my, 2));
        if (mid < REACH) alpha += (1 - mid / REACH) * 0.34;
        ctx.strokeStyle = 'rgba(124,192,247,' + alpha.toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // links from the cursor itself — it behaves like one more neuron
    if (mx > -9000) {
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        dx = a.x - mx; dy = a.y - my;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d > REACH) continue;
        ctx.strokeStyle = 'rgba(154,214,255,' + ((1 - d / REACH) * 0.4).toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(a.x, a.y);
        ctx.stroke();
      }
    }

    // nodes — slow breathing, brighter the closer the cursor is
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      var pulse = 0.75 + Math.sin(now * 0.0013 + a.ph) * 0.25;
      dx = a.x - mx; dy = a.y - my;
      d = Math.sqrt(dx * dx + dy * dy);
      var boost = d < REACH ? (1 - d / REACH) : 0;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r * (1 + boost * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(168,220,255,' + (0.30 * pulse + boost * 0.5).toFixed(3) + ')';
      ctx.fill();
    }

    // signals — a green spark running down a link, brand accent
    for (i = signals.length - 1; i >= 0; i--) {
      var s = signals[i];
      s.t += s.sp;
      if (s.t >= 1) { signals.splice(i, 1); continue; }
      var x = s.a.x + (s.b.x - s.a.x) * s.t;
      var y = s.a.y + (s.b.y - s.a.y) * s.t;
      var fade = Math.sin(s.t * Math.PI);        // in and out, never a hard pop
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(128,195,74,' + (0.85 * fade).toFixed(3) + ')';
      ctx.fill();
    }
  }

  function frame(now) {
    mx += (tx - mx) * 0.12;                      // the cursor's pull glides
    my += (ty - my) * 0.12;
    for (var i = 0; i < nodes.length; i++) step(nodes[i]);
    if (signals.length < 4 && Math.random() < FIRE) fire();
    paint(now);
    raf = visible ? requestAnimationFrame(frame) : null;
  }

  build();
  window.addEventListener('resize', function () {
    build();
    if (REDUCE) paint(0);
  }, { passive: true });

  if (REDUCE) { paint(0); return; }              // a still network, no drift, no cursor

  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
    if (mx < -9000) { mx = tx; my = ty; }        // first move: don't sweep in from the corner
  });
  hero.addEventListener('pointerleave', function () {
    tx = -9999; ty = -9999;
  });

  // stop drawing once the hero scrolls off screen
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }, { threshold: 0 }).observe(hero);
  }
  raf = requestAnimationFrame(frame);
}

/* -----------------------------------------------------------
   HOW WE DO IT — seamless infinite horizontal rail
   ----------------------------------------------------------- */
function initHowRail() {
  var rail = document.querySelector('.iw-hwrail');
  if (!rail) return;
  var track = rail.querySelector('.iw-hwrail-track');
  if (!track) return;
  var originals = [].slice.call(track.children);
  if (!originals.length) return;

  // clone one full set before and after the originals so scrolling can wrap
  var before = document.createDocumentFragment();
  var after = document.createDocumentFragment();
  originals.forEach(function (node) {
    var a = node.cloneNode(true); a.setAttribute('aria-hidden', 'true'); before.appendChild(a);
    var b = node.cloneNode(true); b.setAttribute('aria-hidden', 'true'); after.appendChild(b);
  });
  track.insertBefore(before, track.firstChild);
  track.appendChild(after);

  function gapPx() {
    var s = getComputedStyle(track);
    return parseFloat(s.columnGap || s.gap) || 24;
  }
  function step() { return originals[0].getBoundingClientRect().width + gapPx(); }
  // width of one set = exactly N card-steps, so positions land on card boundaries
  function setWidth() { return originals.length * step(); }
  function recenter() { rail.scrollLeft = setWidth(); }        // start on the middle (real) set
  recenter();
  window.addEventListener('resize', recenter, { passive: true });

  // after scrolling settles, if we've drifted into a clone set, jump back one set (invisible: clones match)
  var t;
  rail.addEventListener('scroll', function () {
    clearTimeout(t);
    t = setTimeout(function () {
      var w = setWidth();
      if (rail.scrollLeft >= 2 * w - 2)      rail.scrollLeft -= w;
      else if (rail.scrollLeft <= 2)         rail.scrollLeft += w;
      syncDots();
    }, 80);
  }, { passive: true });

  function go(dir) { rail.scrollBy({ left: dir * step(), behavior: 'smooth' }); }
  var section = rail.closest('section');
  var arrows = section.querySelectorAll('[data-hw]');
  [].slice.call(arrows).forEach(function (btn) {
    btn.addEventListener('click', function () { go(btn.getAttribute('data-hw') === 'prev' ? -1 : 1); restart(); });
  });

  // auto-advance every few seconds, pause on hover / touch / when tab hidden
  var AUTO = 4500, timer = null;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function start() { if (reduce || timer) return; timer = setInterval(function () { go(1); }, AUTO); }
  function stop()  { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }
  section.addEventListener('mouseenter', stop);
  section.addEventListener('mouseleave', start);
  section.addEventListener('focusin', stop);
  section.addEventListener('focusout', start);
  rail.addEventListener('touchstart', stop, { passive: true });
  rail.addEventListener('pointerdown', stop);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

  // step indicator dots — reflect the active card and jump on click
  var dots = [].slice.call(section.querySelectorAll('.iw-hw-dot'));
  function activeIndex() {
    var i = Math.round((rail.scrollLeft - setWidth()) / step());
    return ((i % originals.length) + originals.length) % originals.length;
  }
  function syncDots() {
    if (!dots.length) return;
    var a = activeIndex();
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === a); });
  }
  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      rail.scrollTo({ left: setWidth() + (+d.getAttribute('data-i')) * step(), behavior: 'smooth' });
      restart();
    });
  });
  syncDots();

  start();
}

/* -----------------------------------------------------------
   BOOT
   ----------------------------------------------------------- */
function boot() {
  buildShowcase();
  initScrollMarquee();
  initObservers();
  initNav();
  initMesh();
  initHowRail();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
