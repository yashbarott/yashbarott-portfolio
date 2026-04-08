/* =====================================================
   PORTFOLIO — main.js
   Animations, interactions & scroll effects
   ===================================================== */

'use strict';

/* ── CURSOR ── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    rafId = requestAnimationFrame(animateFollower);
  }
  animateFollower();
})();

/* ── NAV SCROLL ── */
(function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('navMobile');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }
})();

/* ── HERO CHAR SPLIT & LOAD ANIMATION ── */
(function initHero() {
  // Pure CSS animation — no DOM manipulation of title lines
  // (preserves gradient on accent line)
  // Hero badge, sub, meta, ctas - stagger in
  const heroEls = document.querySelectorAll('.hero .reveal-fade');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 600 + i * 150);
  });
})();


/* ── SPLIT HEADINGS (section h2s) ── */
(function initSplitHeadings() {
  document.querySelectorAll('.split-heading').forEach(el => {
    // Don't re-split hero lines
    if (el.closest('.hero')) return;
    
    // Walk child nodes, wrap chars
    function splitNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        const text = node.textContent;
        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char === ' ' ? '\u00A0' : char;
          if (char === ' ') span.style.display = 'inline-block';
          frag.appendChild(span);
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Preserve spans like .text-accent
        const children = Array.from(node.childNodes);
        children.forEach(child => splitNode(child));
      }
    }

    // Preserve existing structure
    const childNodes = Array.from(el.childNodes);
    childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        // Wrap in word spans
        const words = child.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach(word => {
          if (/^\s+$/.test(word)) {
            frag.appendChild(document.createTextNode(' '));
          } else if (word) {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            word.split('').forEach(char => {
              const charSpan = document.createElement('span');
              charSpan.className = 'char';
              charSpan.textContent = char;
              wordSpan.appendChild(charSpan);
            });
            frag.appendChild(wordSpan);
            frag.appendChild(document.createTextNode(' '));
          }
        });
        child.parentNode.replaceChild(frag, child);
      }
    });
  });
})();

/* ── INTERSECTION OBSERVER (scroll reveals) ── */
(function initReveal() {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Don't unobserve cards — keep them visible
      }
    });
  }, options);

  // Observe all reveal elements
  document.querySelectorAll(
    '.reveal-fade, .reveal-up, .reveal-left, .reveal-card, .reveal-step, .split-heading'
  ).forEach(el => {
    if (!el.closest('.hero')) { // Skip hero (handled separately)
      observer.observe(el);
    }
  });
})();

/* ── STAT COUNTER ANIMATION ── */
(function initCounters() {
  const stats = document.querySelectorAll('.stat-num[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '+';
      let start = 0;
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out expo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(eased * target);
        el.textContent = prefix + current + (progress < 1 || target >= 10 ? '' : suffix);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = prefix + target + suffix;
        }
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();

/* ── STACK PILL MAGNETIC EFFECT ── */
(function initMagnetic() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.stack-pill').forEach(pill => {
    pill.addEventListener('mousemove', (e) => {
      const rect = pill.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      pill.style.transform = `translateY(-3px) translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = '';
    });
  });
})();

/* ── SMOOTH SCROLL FOR NAV LINKS ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('nav')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── SERVICE CARD TILT ── */
(function initTilt() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s';
    });
  });
})();

/* ── ACTIVE NAV LINK ON SCROLL ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.style.color = href === '#' + entry.target.id
            ? 'var(--white)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
})();

/* ── PAGE LOAD ── */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
setTimeout(() => { document.body.style.opacity = '1'; }, 50);
