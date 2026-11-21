/**
 * ============================================================
 *  SEEK THE LIGHT — Main JS
 *  Handles: config rendering, cursor glow, mobile menu,
 *           navbar scroll state, FAQ accordion, reaction
 *           buttons (localStorage), scroll-reveal, analytics.
 * ============================================================
 */

import CONFIG from './config.js';
import { initForm } from './form.js';

/* ──────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────── */

/** Safely query one element */
const $ = (sel, ctx = document) => ctx.querySelector(sel);

/** Safely query all elements */
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Create element with optional attrs / innerHTML */
function el(tag, attrs = {}, html = '') {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class')       e.className = v;
    else if (k.startsWith('data-')) e.dataset[k.slice(5)] = v;
    else                     e.setAttribute(k, v);
  });
  if (html) e.innerHTML = html;
  return e;
}

/** Mark a string with the branded Glow-I */
function glowI(text) {
  return text.replace(/I/g, (match, offset, str) => {
    // Only style the I in LIGHT (the last one, preceded by L)
    return `<span class="glow-i" aria-hidden="true">I</span><span class="sr-only">I</span>`;
  });
}


/* ──────────────────────────────────────────────────────────
   1. POPULATE STATIC CONTENT FROM CONFIG
────────────────────────────────────────────────────────── */

function populateConfig() {
  const { brand, formUrl, story, feedback, faq } = CONFIG;

  // Google Form — iframe src + fallback href (now handled by form.js custom form)
  // const iframe = $('#google-form');
  // const fallback = $('#form-fallback');
  // if (iframe) iframe.src = formUrl;
  // if (fallback) fallback.href = formUrl.replace('?embedded=true', '');

  // Brand story paragraphs
  const storyBody = $('.story__body');
  if (storyBody) {
    story.paragraphs.forEach(text => {
      const p = el('p', {}, text);
      storyBody.appendChild(p);
    });
  }

  // Feedback section
  const fhHeading  = $('.feedback__heading');
  const fbBody     = $('.feedback__body');
  const incentLabel = $('.feedback__incentive-label');
  const incentVal   = $('.feedback__incentive-value');
  if (fhHeading)   fhHeading.textContent   = feedback.heading;
  if (fbBody)      fbBody.textContent       = feedback.body;
  if (incentLabel) incentLabel.textContent  = feedback.incentiveLabel;
  if (incentVal)   incentVal.textContent    = feedback.incentive;

  // Community / Instagram
  const igLink   = $('#instagram-link');
  const igHandle = $('#instagram-handle');
  if (igLink)   igLink.href          = brand.instagramUrl;
  if (igHandle) igHandle.textContent = brand.instagram;

  // Footer
  const footerEmail = $('#footer-email');
  const footerIg    = $('#footer-ig');
  const footerCopy  = $('#footer-copyright');
  if (footerEmail) {
    footerEmail.href        = `mailto:${brand.email}`;
    footerEmail.textContent = brand.email;
  }
  if (footerIg) {
    footerIg.href        = brand.instagramUrl;
    footerIg.textContent = brand.instagram;
  }
  if (footerCopy) footerCopy.textContent = brand.copyright;
}


/* ──────────────────────────────────────────────────────────
   2. RENDER PRODUCT CARDS
────────────────────────────────────────────────────────── */

function renderProducts() {
  const grid = $('#product-grid');
  if (!grid) return;

  CONFIG.products.forEach((product, index) => {
    const num  = String(index + 1).padStart(2, '0');
    const saved = localStorage.getItem(`stl-reaction-${product.id}`);

    // ── Image or CSS placeholder ─────────────────────────
    const imgWrap = el('div', { class: 'product-card__img-wrap' });

    if (product.image) {
      const img = el('img', {
        src: product.image,
        alt: product.name,
        class: 'product-card__img',
        loading: 'lazy',
      });
      imgWrap.appendChild(img);
    } else {
      imgWrap.innerHTML = `
        <div class="product-card__placeholder" aria-label="${product.name} — coming soon">
          <span class="product-card__placeholder-num">${num}</span>
          <span class="product-card__placeholder-label">${product.name}</span>
          <span class="product-card__coming-soon">Coming Soon</span>
        </div>`;
    }

    // ── Card body ─────────────────────────────────────────
    const priceHtml = product.price
      ? `<p class="product-card__price">${product.price}</p>`
      : '';

    const cardBody = el('div', { class: 'product-card__body' }, `
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__desc">${product.description}</p>
      ${priceHtml}
    `);

    // ── Reaction buttons ───────────────────────────────────
    const reactionEl = el('div', {
      class: saved ? 'product-card__reaction voted' : 'product-card__reaction',
      'data-id': product.id,
    }, `
      <p class="product-card__reaction-label">Would you buy this?</p>
      <div class="product-card__reaction-btns" role="group" aria-label="Reaction for ${product.name}">
        <button class="reaction-btn ${saved === 'yes' ? 'active-yes' : ''}" data-vote="yes" aria-pressed="${saved === 'yes'}">Yes</button>
        <button class="reaction-btn ${saved === 'maybe' ? 'active-maybe' : ''}" data-vote="maybe" aria-pressed="${saved === 'maybe'}">Maybe</button>
        <button class="reaction-btn ${saved === 'no' ? 'active-no' : ''}" data-vote="no" aria-pressed="${saved === 'no'}">No</button>
      </div>
    `);

    // ── Thank-you state (shown after vote) ─────────────────
    const thankyouEl = el('div', {
      class: saved ? 'product-card__thankyou visible' : 'product-card__thankyou',
    }, `
      <p class="thankyou-msg">Thanks for your vote ✦</p>
      <a href="${CONFIG.formUrl.replace('?embedded=true', '')}"
         target="_blank"
         rel="noopener noreferrer"
         class="thankyou-more">Tell us more →</a>
    `);

    // ── Assemble card ──────────────────────────────────────
    const card = el('article', {
      class: 'product-card reveal',
      role: 'listitem',
      'aria-label': product.name,
    });

    // Stagger reveal delay
    if (index < 5) card.classList.add(`reveal--delay-${index + 1}`);

    card.appendChild(imgWrap);
    card.appendChild(cardBody);
    card.appendChild(reactionEl);
    card.appendChild(thankyouEl);

    grid.appendChild(card);
  });

  // Delegate reaction button clicks
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.reaction-btn');
    if (!btn) return;

    const reactionContainer = btn.closest('.product-card__reaction');
    const card = btn.closest('.product-card');
    const vote = btn.dataset.vote;
    const id   = reactionContainer.dataset.id;

    // Persist to localStorage
    localStorage.setItem(`stl-reaction-${id}`, vote);

    // Update aria-pressed on all buttons in this card
    $$('.reaction-btn', card).forEach(b => {
      b.setAttribute('aria-pressed', 'false');
      b.className = 'reaction-btn';
    });
    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add(`active-${vote}`);

    // Transition to thank-you state
    reactionContainer.classList.add('voted');
    const thankyou = card.querySelector('.product-card__thankyou');
    if (thankyou) thankyou.classList.add('visible');

    // Optional: fire analytics event
    trackEvent('product_reaction', { product: id, vote });
  });
}


/* ──────────────────────────────────────────────────────────
   3. FAQ ACCORDION
────────────────────────────────────────────────────────── */

function renderFaq() {
  const list = $('#faq-list');
  if (!list) return;

  CONFIG.faq.forEach((item, i) => {
    const answerId = `faq-answer-${i}`;

    const dt = el('dt', { class: 'faq__item' });
    const btn = el('button', {
      class: 'faq__question',
      'aria-expanded': 'false',
      'aria-controls': answerId,
      type: 'button',
    }, `
      ${item.q}
      <svg class="faq__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" stroke-width="1.2"/>
        <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="1.2"/>
      </svg>
    `);

    const dd = el('dd', { class: 'faq__answer', id: answerId, role: 'region' });
    const p  = el('p', {}, item.a);
    dd.appendChild(p);

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      $$('.faq__question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const ans = document.getElementById(b.getAttribute('aria-controls'));
        if (ans) ans.style.maxHeight = null;
      });

      // Toggle this one
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        dd.style.maxHeight = dd.scrollHeight + 'px';
      }
    });

    dt.appendChild(btn);
    dt.appendChild(dd);
    list.appendChild(dt);
  });
}


/* ──────────────────────────────────────────────────────────
   4. NAVBAR — scroll state + mobile menu
────────────────────────────────────────────────────────── */

function initNavbar() {
  const navbar  = $('.navbar');
  const burger  = $('.navbar__burger');
  const menu    = $('#mobile-menu');
  const overlay = $('.mobile-menu__overlay');
  const closeBtn = $('.mobile-menu__close');

  // Scroll state
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Open menu
  const openMenu = () => {
    menu?.classList.add('open');
    overlay?.classList.add('open');
    menu?.removeAttribute('aria-hidden');
    burger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  // Close menu
  const closeMenu = () => {
    menu?.classList.remove('open');
    overlay?.classList.remove('open');
    menu?.setAttribute('aria-hidden', 'true');
    burger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    burger?.focus();
  };

  burger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Close on mobile link click
  $$('.mobile-menu__link, .mobile-menu__cta').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.classList.contains('open')) closeMenu();
  });
}


/* ──────────────────────────────────────────────────────────
   5. CURSOR GLOW  (desktop / pointer device only)
────────────────────────────────────────────────────────── */

function initCursorGlow() {
  const glow = $('.cursor-glow');
  if (!glow || !window.matchMedia('(hover: hover)').matches) return;

  let raf;
  let mouseX = -999, mouseY = -999;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!raf) {
      raf = requestAnimationFrame(() => {
        glow.style.left = mouseX + 'px';
        glow.style.top  = mouseY + 'px';
        raf = null;
      });
    }
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });
}


/* ──────────────────────────────────────────────────────────
   6. SCROLL-REVEAL  (IntersectionObserver)
────────────────────────────────────────────────────────── */

function initScrollReveal() {
  // Respect reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // Observe story paragraphs, section headings, collection metrics, FAQ items
  $$('.reveal, .story__body p, .story__heading, .story__pullquote,' +
     '.section__label, .section__heading, .section__sub,' +
     '.collection__lead, .metric-card,' +
     '.community__ig-link, .faq__item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}


/* ──────────────────────────────────────────────────────────
   7. ANALYTICS HELPER
   (no-op until CONFIG.analytics.enabled = true)
────────────────────────────────────────────────────────── */

function trackEvent(name, props = {}) {
  if (!CONFIG.analytics.enabled) return;

  if (CONFIG.analytics.provider === 'ga4' && window.gtag) {
    window.gtag('event', name, props);
  } else if (CONFIG.analytics.provider === 'plausible' && window.plausible) {
    window.plausible(name, { props });
  }
}


/* ──────────────────────────────────────────────────────────
   8. SMOOTH SCROLL — fix for anchor links over fixed navbar
────────────────────────────────────────────────────────── */

function initSmoothScroll() {
  const NAVBAR_HEIGHT = 68;

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* ──────────────────────────────────────────────────────────
   INIT
────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  populateConfig();   // Fill in config-driven content first
  renderFaq();        // Build FAQ accordion
  initForm();         // Build custom multi-step form → Google Forms
  initNavbar();       // Nav scroll + mobile menu
  initCursorGlow();   // Desktop cursor glow
  initScrollReveal(); // Fade-up on scroll
  initSmoothScroll(); // Offset for fixed navbar
});
