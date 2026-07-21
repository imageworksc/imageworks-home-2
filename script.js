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
   HERO WEAVE — the web, woven. Warp threads stand across the
   hero; a shuttle crosses and lays a weft thread that passes
   over one standing thread and under the next — real interlacing,
   row by row. Rows settle into the cloth and ease to a resting
   weight. The shuttle reverses each pass, the way a loom does.
   It runs on its own — the cursor is deliberately ignored, so the
   cloth stays a backdrop and never competes with the copy.
   ----------------------------------------------------------- */
function initMesh() {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;
  var canvas = hero.querySelector('[data-mesh]');
  if (!canvas) return;
  var ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;

  var WARP_GAP = 54;        // spacing of the standing threads
  var PASS_MS = 6200;       // one crossing of the shuttle
  var REST_MIN = 900, REST_MAX = 1800;
  var SEGS = 8;             // samples per warp — weft crossings reuse them

  var BLUE = '168,206,242';
  var GREEN = '128,195,74';

  var W = 0, H = 0, dpr = 1;
  var warps = [], slots = [], rows = [];
  var shuttle = null, nextPass = 0, rowN = 0;
  var raf = null, visible = true, t0 = 0, well = null;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function build() {
    var r = hero.getBoundingClientRect();
    W = Math.round(r.width); H = Math.round(r.height);
    if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // a well of depth under the copy, so the cloth stays a backdrop
    var cx = W / 2, cy = H * 0.46;
    well = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.62);
    well.addColorStop(0, 'rgba(4,14,28,0.5)');
    well.addColorStop(0.42, 'rgba(7,22,42,0.24)');
    well.addColorStop(1, 'rgba(10,30,55,0)');

    // the loom: standing threads at uneven weights, so the cloth has depth
    warps.length = 0;
    var n = Math.ceil(W / WARP_GAP) + 1;
    var off = (W - (n - 1) * WARP_GAP) / 2;
    for (var i = 0; i < n; i++) {
      warps.push({ x: off + i * WARP_GAP, a: rand(0.032, 0.072), w: rand(0.8, 1.3) });
    }

    // rows run nearly the full height and let the canvas mask fade them out at
    // the top and bottom. Stopping short of the mask instead leaves bare warp
    // below the copy, which reads as unfinished cloth rather than a soft edge.
    slots.length = 0;
    var top = H * 0.075, bot = H * 0.945, k = 14;
    for (var j = 0; j < k; j++) slots.push(top + (bot - top) * (j / (k - 1)));

    // the loom opens with cloth already on it — the hero should never show an
    // empty frame and make you wait out a crossing for the first thread
    rows.length = 0;
    for (var q = 0; q < slots.length; q++) {
      rows.push({ y: slots[q], a: 0.05, floor: 0.05, col: (q % 4 === 2) ? GREEN : BLUE, parity: q % 2 });
    }
    shuttle = null; nextPass = 0; rowN = 0;
  }

  /* Where warp i actually sits at height y, once its slow drift is applied.
     The weft calls this too, so every crossing lands on the thread rather
     than on where the thread would be if it stood perfectly still. */
  function warpAt(i, y, t) {
    var wp = warps[i];
    return wp.x + Math.sin(t * 0.00021 + i * 0.85 + y * 0.0016) * 1.4;
  }

  /* One weft row: under a standing thread, over the next. That alternation
     is the whole point — it's what makes this cloth and not a grid. */
  function weft(y, from, to, alpha, col, parity, t) {
    var lo = Math.min(from, to), hi = Math.max(from, to);
    ctx.lineCap = 'round';
    ctx.lineWidth = 1.35;
    ctx.strokeStyle = 'rgba(' + col + ',' + alpha.toFixed(3) + ')';
    var run = lo;
    for (var i = 0; i < warps.length; i++) {
      var wx = warpAt(i, y, t);
      if (wx < lo - 10 || wx > hi + 10) continue;
      if (((i + parity) % 2) === 0) {
        // passes under: break the weft cleanly around the standing thread
        var a = Math.max(run, lo), b = Math.min(wx - 5.5, hi);
        if (b > a) { ctx.beginPath(); ctx.moveTo(a, y); ctx.lineTo(b, y); ctx.stroke(); }
        run = wx + 5.5;
      } else {
        // rides over: the crossing catches a little more light
        ctx.fillStyle = 'rgba(' + col + ',' + Math.min(alpha * 2.1, 0.6).toFixed(3) + ')';
        ctx.beginPath();
        ctx.ellipse(wx, y, 3.4, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (hi > run) {
      ctx.beginPath(); ctx.moveTo(Math.max(run, lo), y); ctx.lineTo(hi, y); ctx.stroke();
    }
  }

  function paint(t) {
    ctx.clearRect(0, 0, W, H);
    if (well) { ctx.fillStyle = well; ctx.fillRect(0, 0, W, H); }

    var i, j, y, x;

    // the standing threads, sampled along their drift
    for (i = 0; i < warps.length; i++) {
      var wp = warps[i];
      ctx.strokeStyle = 'rgba(' + BLUE + ',' + wp.a.toFixed(3) + ')';
      ctx.lineWidth = wp.w;
      ctx.beginPath();
      for (j = 0; j <= SEGS; j++) {
        y = H * (j / SEGS);
        x = warpAt(i, y, t);
        if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // the cloth woven so far, easing down to a resting weight
    for (i = 0; i < rows.length; i++) {
      var r = rows[i];
      if (r.a > r.floor) r.a = Math.max(r.floor, r.a - 0.00055);
      weft(r.y, 0, W, r.a, r.col, r.parity, t);
    }

    // the shuttle: one crossing at a time, reversing like a loom
    if (!shuttle && t > nextPass) {
      var slot = slots[rowN % slots.length];
      var ltr = rowN % 2 === 0;
      shuttle = {
        y: slot,
        x: ltr ? -40 : W + 40,
        from: ltr ? -40 : W + 40,
        v: (W + 80) / (PASS_MS / 16.7) * (ltr ? 1 : -1),
        col: (rowN % 4 === 2) ? GREEN : BLUE,
        parity: rowN % 2
      };
      // the row it's about to lay releases whatever was in that slot
      for (i = rows.length - 1; i >= 0; i--) {
        if (Math.abs(rows[i].y - slot) < 2) rows.splice(i, 1);
      }
      rowN++;
    }

    if (shuttle) {
      shuttle.x += shuttle.v;
      weft(shuttle.y, shuttle.from, shuttle.x, 0.17, shuttle.col, shuttle.parity, t);
      // the shuttle head, carrying the thread across
      var g = ctx.createRadialGradient(shuttle.x, shuttle.y, 0, shuttle.x, shuttle.y, 16);
      g.addColorStop(0, 'rgba(' + shuttle.col + ',0.18)');
      g.addColorStop(1, 'rgba(' + shuttle.col + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(shuttle.x, shuttle.y, 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(' + shuttle.col + ',0.62)';
      ctx.beginPath(); ctx.arc(shuttle.x, shuttle.y, 2.1, 0, Math.PI * 2); ctx.fill();

      if (shuttle.v > 0 ? shuttle.x > W + 40 : shuttle.x < -40) {
        rows.push({ y: shuttle.y, a: 0.14, floor: 0.05, col: shuttle.col, parity: shuttle.parity });
        shuttle = null;
        nextPass = t + rand(REST_MIN, REST_MAX);
      }
    }
  }

  function frame(t) {
    if (!t0) t0 = t;
    paint(t - t0);
    raf = visible ? requestAnimationFrame(frame) : null;
  }

  // reduced motion: the cloth already woven, holding still
  function still() {
    rows.length = 0;
    for (var i = 0; i < slots.length; i++) {
      rows.push({ y: slots[i], a: 0.055, floor: 0.055, col: (i % 4 === 2) ? GREEN : BLUE, parity: i % 2 });
    }
    shuttle = null;
    paint(0);
  }

  build();
  window.addEventListener('resize', function () {
    build();
    if (REDUCE) still();
  }, { passive: true });

  if (REDUCE) { still(); return; }

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
   HOW WE DO IT — four steps as tabs on a process rail
   ----------------------------------------------------------- */
function initSteps() {
  var root = document.querySelector('[data-steps]');
  if (!root) return;
  var tabs = [].slice.call(root.querySelectorAll('.iw-steps-tab'));
  var panels = [].slice.call(root.querySelectorAll('.iw-steps-panel'));
  var fill = root.querySelector('[data-steps-fill]');
  if (!tabs.length || tabs.length !== panels.length) return;

  var current = 0;

  function select(i, focus) {
    if (i < 0 || i >= tabs.length) return;
    current = i;
    tabs.forEach(function (t, k) {
      var on = k === i;
      t.classList.toggle('is-active', on);
      t.classList.toggle('is-done', k <= i);   // the rail fills up to where you are
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;                // one tab stop for the whole set
      // no [hidden] here: it would pull the panel out of the grid and let the
      // box resize per step. CSS visibility:hidden keeps the cell — and still
      // takes the panel out of the tab order and the accessibility tree.
      panels[k].classList.toggle('is-active', on);
    });
    // the line lands exactly on the active station (each station sits mid-tab)
    if (fill) fill.style.width = (12.5 + i * 25) + '%';
    if (focus) tabs[i].focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(i); });
  });

  root.querySelector('.iw-steps-tabs').addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown') { select((current + 1) % tabs.length, true); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp') { select((current - 1 + tabs.length) % tabs.length, true); }
    else if (k === 'Home') { select(0, true); }
    else if (k === 'End') { select(tabs.length - 1, true); }
    else return;
    e.preventDefault();
  });

  select(0);
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
  initSteps();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
