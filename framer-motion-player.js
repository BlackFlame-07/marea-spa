/**
 * MAREA SPA — HIGH-PERFORMANCE ZERO-LAG MOTION & LENIS ENGINE
 * Floor 2 | Ryan Howard | Blackflame Designs
 *
 * Calibrated for:
 * - 0ms perceived input lag (Crisp lerp: 0.12 with instant first-frame response)
 * - 60fps / 120fps GPU compositor isolation
 * - Hero parallax drift (translate3d)
 * - Dynamic frosted glass nav pill transition
 * - Stacking sticky ritual cards
 * - Zero hydration contention
 */

(() => {
  let lenis = null;
  let heroEl = null;
  let navEl = null;
  let cardEls = [];

  // -------------------------------------------------------------------------
  // 1. INITIALIZE ULTRA-RESPONSIVE ZERO-LAG LENIS ENGINE
  // -------------------------------------------------------------------------
  function initLenis() {
    if (typeof window.Lenis === 'undefined') {
      window.addEventListener('scroll', () => updateMotionElements(window.scrollY), { passive: true });
      return;
    }

    lenis = new window.Lenis({
      lerp: 0.12,           // Snappy 0ms input latency with natural exponential friction
      wheelMultiplier: 1.05, // Effortless mouse wheel feel
      touchMultiplier: 1.0,
      smoothWheel: true,
      smoothTouch: false,   // Native touch/trackpad pass-through
      syncTouch: false,
      autoResize: true,
    });

    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync motion elements on every smooth scroll tick
    lenis.on('scroll', (e) => {
      const scrollY = e.scroll !== undefined ? e.scroll : window.scrollY;
      updateMotionElements(scrollY);
    });

    // Anchor smooth travel
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.0 });
          }
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 2. CACHE & GPU-ACCELERATE TARGETS
  // -------------------------------------------------------------------------
  function cacheElements() {
    heroEl = document.querySelector('[data-framer-name="Hero"]') || document.querySelector('.framer-czfxt0');
    navEl = document.querySelector('nav');
    cardEls = Array.from(document.querySelectorAll('[data-framer-name="Sticky Container"]'));

    if (heroEl) {
      heroEl.style.willChange = 'transform';
      heroEl.style.transform = 'translateZ(0)';
    }

    if (navEl) {
      navEl.style.willChange = 'transform, background-color, backdrop-filter';
      navEl.style.transition =
        'background-color 0.25s ease, backdrop-filter 0.25s ease, -webkit-backdrop-filter 0.25s ease';
    }

    cardEls.forEach((sc) => {
      sc.style.position = 'sticky';
      sc.style.top = '50px';
      sc.style.zIndex = '10';
      sc.style.willChange = 'transform';
      sc.style.transform = 'translateZ(0)';
    });
  }

  // -------------------------------------------------------------------------
  // 3. 60FPS COMPOSITOR UPDATE
  // -------------------------------------------------------------------------
  function updateMotionElements(y) {
    // A. Hero Parallax Drift (Hardware translate3d)
    if (heroEl) {
      const parallaxY = Math.max(0, y * 0.22);
      heroEl.style.transform = `translate3d(0px, ${parallaxY}px, 0px)`;
    }

    // B. Dynamic Floating Nav Pill Transition
    if (navEl) {
      if (y > 60) {
        if (!navEl.classList.contains('framer-v-7tn02w')) {
          navEl.classList.remove('framer-v-o5gjp4');
          navEl.classList.add('framer-v-7tn02w');
          navEl.style.backgroundColor = 'rgba(194, 172, 136, 0.88)';
          navEl.style.backdropFilter = 'blur(24px)';
          navEl.style.webkitBackdropFilter = 'blur(24px)';
        }
      } else {
        if (!navEl.classList.contains('framer-v-o5gjp4')) {
          navEl.classList.remove('framer-v-7tn02w');
          navEl.classList.add('framer-v-o5gjp4');
          navEl.style.backgroundColor = 'transparent';
          navEl.style.backdropFilter = 'none';
          navEl.style.webkitBackdropFilter = 'none';
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // 4. INTERACTIVE FAQ ACCORDIONS
  // -------------------------------------------------------------------------
  function initAccordions() {
    const faqContainers = document.querySelectorAll(
      '.framer-btyrxr-container, .framer-1vblvhh-container, .framer-l5q4g8-container, .framer-19a0p0y-container, .framer-44lerr-container'
    );

    faqContainers.forEach((container) => {
      const item = container.querySelector('[class*="framer-v-"]');
      if (!item) return;

      container.style.cursor = 'pointer';
      container.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = item.classList.contains('framer-v-ao63kl');
        if (isOpen) {
          item.classList.remove('framer-v-ao63kl');
          item.classList.add('framer-v-1lrvwc4');
        } else {
          item.classList.remove('framer-v-1lrvwc4');
          item.classList.add('framer-v-ao63kl');
        }
        if (lenis) lenis.resize();
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. TACTILE HOVER MICRO-PHYSICS
  // -------------------------------------------------------------------------
  function initHoverMicroInteractions() {
    // Buttons (Book A Session / Learn More)
    document.querySelectorAll('.framer-XM2tU, .framer-8l6zor a').forEach((btn) => {
      btn.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
      btn.addEventListener('pointerenter', () => {
        btn.style.transform = 'scale(1.03)';
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transform = 'none';
      });
    });

    // Sticky Ritual Cards Subtle Hover Lift
    document.querySelectorAll('[data-framer-name="Card"]').forEach((card) => {
      card.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
      card.addEventListener('pointerenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = 'none';
        card.style.boxShadow = 'rgba(237, 232, 232, 0.35) 1px 3px 8px 1px';
      });
    });
  }

  // -------------------------------------------------------------------------
  // BOOTSTRAP
  // -------------------------------------------------------------------------
  function boot() {
    cacheElements();
    initLenis();
    initAccordions();
    initHoverMicroInteractions();
    updateMotionElements(window.scrollY);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
