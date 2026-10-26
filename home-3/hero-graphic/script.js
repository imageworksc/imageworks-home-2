/* =====================================================================
   Hero graphic — desktop cursor spotlight, desktop hover groups and
   mobile tap-to-open cards.
   ===================================================================== */

const hero = document.querySelector('.hero');


/* ---------- cursor spotlight ---------- */

const cursorMask = document.getElementById('hero-cursor-mask');

hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    cursorMask.style.setProperty('--cursor-x', `${xPercent}%`);
    cursorMask.style.setProperty('--cursor-y', `${yPercent}%`);
});

// park the spotlight off-canvas when the mouse leaves
hero.addEventListener('mouseleave', () => {
    cursorMask.style.setProperty('--cursor-x', '-100%');
    cursorMask.style.setProperty('--cursor-y', '-100%');
});


/* ---------- hub theme: recolours the green side of the graphic blue ----------
   The pills follow the .hover-hub class in CSS; the SVG paint lives in
   attributes, so those are swapped here and their originals kept in data-*. */

const HUB_BLUE = {
    stroke: '#2F6FBF',
    fill: '#2F6FBF',
    iconRing: '#0897D6',
    arcStop: '#1266B5'
};

function swapAttr(selector, attr, key, value) {
    document.querySelectorAll(selector).forEach((el) => {
        if (!el.dataset[key]) el.dataset[key] = el.getAttribute(attr);
        el.setAttribute(attr, value);
    });
}

function restoreAttr(attr, key, dataAttr) {
    document.querySelectorAll(`[${dataAttr}]`).forEach((el) => {
        el.setAttribute(attr, el.dataset[key]);
        delete el.dataset[key];
    });
}

function applyHubBlueTheme(enable) {
    if (enable) {
        swapAttr('[class*="hero-tag-right-svg"] [stroke="#5A9E2F"]', 'stroke', 'hubOrigStroke', HUB_BLUE.stroke);
        swapAttr('[class*="hero-tag-right-svg"] [fill="#5A9E2F"]', 'fill', 'hubOrigFill', HUB_BLUE.fill);
        swapAttr('[class*="hero-tag-right-svg"] stop', 'stop-color', 'hubOrigStop', HUB_BLUE.stroke);
        swapAttr('[class*="hero-tag-right-icon"] > circle[r="32"]', 'fill', 'hubOrigFill', HUB_BLUE.iconRing);
        swapAttr('#hub-arc-green', 'fill', 'hubOrigFill', 'url(#paint_blue_left)');
        swapAttr('#paint0_linear_9320_2488 stop', 'stop-color', 'hubOrigStop', HUB_BLUE.arcStop);
        return;
    }

    restoreAttr('stroke', 'hubOrigStroke', 'data-hub-orig-stroke');
    restoreAttr('fill', 'hubOrigFill', 'data-hub-orig-fill');
    restoreAttr('stop-color', 'hubOrigStop', 'data-hub-orig-stop');
}


/* ---------- desktop hover groups ----------
   Delegated from the hero so moving between pieces of one group doesn't
   flicker in Chrome. */

let activeGroup = null;

function setGroupActive(group) {
    if (!group || activeGroup === group) return;
    if (activeGroup) clearGroupActive(activeGroup);

    activeGroup = group;

    if (group === 'hub') {
        hero.classList.add('hover-hub');
        applyHubBlueTheme(true);
        document.querySelector('.card-hub')?.classList.add('active');
        return;
    }

    hero.classList.remove('hover-hub');
    applyHubBlueTheme(false);
    hero.classList.add('is-hovering', `hover-${group}`);

    document.querySelector(`.card-${group}`)?.classList.add('active');
    document.querySelectorAll(`[data-group="${group}"]`).forEach((item) => {
        if (item.classList.contains('hero-tag-icon') || item.classList.contains('hero-tag-icon-label')) {
            item.classList.add('hover-active');
        }
    });
    document.querySelector(`.dot-${group}`)?.classList.add('active');
}

function clearGroupActive(group) {
    if (!group) return;

    if (group === 'hub') {
        hero.classList.remove('hover-hub');
        applyHubBlueTheme(false);
        document.querySelector('.card-hub')?.classList.remove('active');
        if (activeGroup === group) activeGroup = null;
        return;
    }

    hero.classList.remove(`hover-${group}`);
    document.querySelector(`.card-${group}`)?.classList.remove('active');
    document.querySelectorAll(`[data-group="${group}"]`).forEach((item) => {
        item.classList.remove('hover-active');
    });
    document.querySelector(`.dot-${group}`)?.classList.remove('active');

    if (activeGroup === group) {
        activeGroup = null;
        hero.classList.remove('is-hovering');
    }
}

hero.addEventListener('mouseover', (e) => {
    const target = e.target.closest('.hover-group');
    if (target) setGroupActive(target.getAttribute('data-group'));
});

hero.addEventListener('mouseout', (e) => {
    if (!activeGroup) return;

    const fromEl = e.target.closest('.hover-group');
    if (!fromEl || fromEl.getAttribute('data-group') !== activeGroup) return;

    const toEl = e.relatedTarget ? e.relatedTarget.closest('.hover-group') : null;
    const toGroup = toEl ? toEl.getAttribute('data-group') : null;

    // stay active when moving within the same group (hub hit ↔ hub card)
    if (toGroup === activeGroup) return;

    clearGroupActive(activeGroup);
});


/* ---------- mobile: tap a node to open its card as a centred overlay ---------- */

const MOBILE_CARDS = {
    'mn-l1': 'mob-card-l1',
    'mn-l2': 'mob-card-l2',
    'mn-l3': 'mob-card-l3',
    'mn-l4': 'mob-card-l4',
    'mn-r1': 'mob-card-r1',
    'mn-r2': 'mob-card-r2',
    'mn-r3': 'mob-card-r3',
    'mn-r4': 'mob-card-r4',
    'mn-hub': 'mob-card-hub'
};
const backdrop = document.getElementById('mob-backdrop');
let activeNode = null;

function closeActiveCard() {
    if (!activeNode) return;
    document.getElementById(MOBILE_CARDS[activeNode])?.classList.remove('active');
    document.getElementById(activeNode)?.classList.remove('active');
    backdrop?.classList.remove('active');
    activeNode = null;
}

Object.keys(MOBILE_CARDS).forEach((nodeId) => {
    const node = document.getElementById(nodeId);
    const card = document.getElementById(MOBILE_CARDS[nodeId]);
    if (!node || !card) return;

    node.addEventListener('click', (e) => {
        e.stopPropagation();
        const isSame = activeNode === nodeId;
        closeActiveCard();
        if (isSame) return;

        card.classList.add('active');
        node.classList.add('active');
        backdrop?.classList.add('active');
        activeNode = nodeId;
    });

    card.querySelector('.mob-card-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeActiveCard();
    });
});

// a tap on the backdrop or anywhere outside closes the card
backdrop?.addEventListener('click', closeActiveCard);
document.addEventListener('click', closeActiveCard);
