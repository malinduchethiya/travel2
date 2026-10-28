import { useEffect } from 'react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function App() {
  useEffect(() => {
    const $ = (s: string, c: Document | Element = document) => c.querySelector(s) as HTMLElement | null;
    const $$ = (s: string, c: Document | Element = document) => Array.from(c.querySelectorAll(s)) as HTMLElement[];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const S = reduce ? 0.7 : 1;

    const loader = $('#loader');
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    function unlock() {
      document.body.classList.remove('is-locked');
      if (loader) {
        loader.style.display = 'none';
        loader.setAttribute('aria-hidden', 'true');
      }
    }

    if (!gsap || !ScrollTrigger) {
      unlock();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add('is-locked');

    /* Split text into word wrappers, preserving inline markup like <em> */
    function splitWords(root: HTMLElement | null): HTMLElement[] {
      if (!root) return [];
      if (root.querySelector('.w__i')) {
        return Array.from(root.querySelectorAll('.w__i'));
      }
      const walk = (node: Node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            if (!child.textContent || !child.textContent.trim()) return;
            const frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach((chunk) => {
              if (!chunk.trim()) {
                frag.appendChild(document.createTextNode(chunk));
                return;
              }
              const outer = document.createElement('span');
              outer.className = 'w';
              const inner = document.createElement('span');
              inner.className = 'w__i';
              inner.textContent = chunk;
              outer.appendChild(inner);
              frag.appendChild(outer);
            });
            child.replaceWith(frag);
          } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
            walk(child);
          }
        });
      };
      walk(root);
      return Array.from(root.querySelectorAll('.w__i'));
    }

    /* ── Hero intro state ───────────────────────────────── */
    const heroWords = splitWords($('.hero__title'));
    gsap.set(heroWords, { yPercent: 130, opacity: 0 });

    const heroIntro = gsap.timeline({ paused: true });
    heroIntro
      .to(
        heroWords,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.25 * S,
          ease: 'expo.out',
          stagger: 0.055 * S,
        },
        0
      )
      .from('.hero__media img', { scale: 1.18, duration: 2.6 * S, ease: 'power2.out' }, 0)
      .from('.hero__eyebrow', { y: 18, opacity: 0, duration: 0.9 * S, ease: 'power3.out' }, 0.15)
      .from('.hero__sub', { y: 22, opacity: 0, duration: 0.9 * S, ease: 'power3.out' }, 0.45)
      .from('.hero__foot', { opacity: 0, y: 16, duration: 0.9 * S, ease: 'power3.out' }, 0.55)
      .from('.nav > *', { y: -16, opacity: 0, duration: 0.9 * S, stagger: 0.06, ease: 'power3.out' }, 0.15)
      .from('.hero__side', { opacity: 0, duration: 1 * S }, 0.9);

    /* ── Loader ─────────────────────────────────────────── */
    let done = false;
    function finishLoader() {
      if (done) return;
      done = true;
      unlock();
    }

    const loadTl = gsap.timeline({ onComplete: finishLoader });
    const count = { v: 0 };
    const countEl = $('#loaderCount');
    const barEl = $('#loaderBar');

    if (loader) {
      gsap.set(loader, { clipPath: 'inset(0% 0% 0% 0%)' });
      loadTl
        .from('.loader__place', { opacity: 0, y: 10, duration: 0.7 * S, ease: 'power2.out' }, 0)
        .from('.loader__word', { yPercent: 30, opacity: 0, duration: 1.1 * S, ease: 'expo.out' }, 0.05)
        .to(
          count,
          {
            v: 100,
            duration: 1.7 * S,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countEl) countEl.textContent = String(Math.round(count.v)).padStart(2, '0');
            },
          },
          0.1
        )
        .to(barEl, { scaleX: 1, duration: 1.7 * S, ease: 'power2.inOut' }, 0.1)
        .to('.loader__inner', { yPercent: -6, opacity: 0, duration: 0.5 * S, ease: 'power2.in' }, '-=0.15')
        .to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1 * S, ease: 'expo.inOut' }, '-=0.2')
        .add(() => heroIntro.play(), '-=0.75');
    } else {
      heroIntro.play();
      unlock();
    }

    const failsafeTimer = window.setTimeout(() => {
      if (!done) {
        loadTl.kill();
        finishLoader();
        heroIntro.progress(1);
      }
    }, 7000);

    /* ── Hero scroll parallax ───────────────────────────── */
    gsap.to('.hero__media', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__content', {
      yPercent: -14,
      opacity: 0.15,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    /* ── Nav ────────────────────────────────────────────── */
    const nav = $('#nav');
    const menu = $('#menu');
    const toggle = $('#navToggle');
    let menuOpen = false;

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'bottom 88px',
      onEnter: () => nav?.classList.add('is-solid'),
      onLeaveBack: () => nav?.classList.remove('is-solid'),
    });

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self: any) => {
        if (menuOpen || !nav) return;
        if (self.scroll() > 220 && self.direction === 1) nav.classList.add('is-hidden');
        else nav.classList.remove('is-hidden');
      },
    });

    /* Mobile menu */
    const menuLinks = $$('.menu__links a');
    gsap.set(menuLinks, { yPercent: 40, opacity: 0 });
    const menuTl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        if (!menu) return;
        menu.style.visibility = 'hidden';
        menu.setAttribute('aria-hidden', 'true');
      },
    });
    if (menu) {
      menuTl
        .to(menu, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8 * S, ease: 'expo.inOut' })
        .to(menuLinks, { yPercent: 0, opacity: 1, duration: 0.8 * S, stagger: 0.055 * S, ease: 'power3.out' }, '-=0.36');
    }

    function openMenu() {
      if (!menu || !toggle || !nav) return;
      menuOpen = true;
      document.body.classList.add('is-locked');
      menu.style.visibility = 'visible';
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      toggle.classList.add('is-open');
      nav.classList.add('is-menu');
      nav.classList.remove('is-solid', 'is-hidden');
      menuTl.play();
    }

    function closeMenu() {
      if (!menu || !toggle || !nav) return;
      menuOpen = false;
      document.body.classList.remove('is-locked');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.classList.remove('is-open');
      nav.classList.remove('is-menu');
      menuTl.reverse();
      if (window.scrollY > window.innerHeight * 0.6) nav.classList.add('is-solid');
    }

    const handleToggle = () => (menuOpen ? closeMenu() : openMenu());
    if (toggle) {
      toggle.addEventListener('click', handleToggle);
    }
    menuLinks.forEach((a) => a.addEventListener('click', closeMenu));
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    window.addEventListener('keydown', handleKeydown);

    /* ── Generic word reveals ───────────────────────────── */
    $$('[data-words]').forEach((el) => {
      const words = splitWords(el);
      gsap.from(words, {
        yPercent: 115,
        opacity: 0,
        duration: 1.15 * S,
        ease: 'expo.out',
        stagger: 0.028 * S,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    /* Generic fades */
    $$('[data-fade]')
      .filter((el) => !el.classList.contains('when__col'))
      .forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 1 * S,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

    /* ── Stats counters ─────────────────────────────────── */
    $$('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count || 0);
      const pad = el.dataset.pad ? Number(el.dataset.pad) : 0;
      const comma = el.dataset.format === 'comma';
      const state = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(state, {
            v: target,
            duration: 2 * S,
            ease: 'power3.out',
            onUpdate: () => {
              const v = Math.round(state.v);
              el.textContent = comma ? v.toLocaleString('en-US') : pad ? String(v).padStart(pad, '0') : String(v);
            },
          });
        },
      });
    });

    gsap.from('.stat', {
      y: 22,
      opacity: 0,
      duration: 1 * S,
      stagger: 0.08 * S,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.stats', start: 'top 90%', once: true },
    });

    /* ── Ticker ─────────────────────────────────────────── */
    const ticker = $('.ticker__track');
    if (ticker) {
      gsap.to(ticker, {
        xPercent: -50,
        duration: 34,
        ease: 'none',
        repeat: -1,
      });
    }

    /* ── Places: pinned horizontal reel ─────────────────── */
    const mm = gsap.matchMedia();
    const placesIndex = $('#placesIndex');

    mm.add('(min-width: 1001px)', () => {
      const pin = $('.places__pin');
      const reel = $('#placesReel');
      const bar = $('#placesBar');
      if (!pin || !reel) return;
      const distance = () => Math.max(0, reel.scrollWidth - window.innerWidth);
      const cards = $$('[data-card]', reel);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => '+=' + (distance() + window.innerHeight * 0.5),
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self: any) => {
            if (bar) gsap.set(bar, { scaleX: self.progress });
            if (placesIndex) {
              const i = Math.min(cards.length, Math.max(1, Math.round(self.progress * (cards.length - 1)) + 1));
              placesIndex.textContent = String(i).padStart(2, '0');
            }
          },
        },
      });

      tl.to(reel, { x: () => -distance(), ease: 'none' }, 0);

      cards.forEach((card) => {
        const img = $('.card__img img', card);
        if (!img) return;
        gsap.fromTo(
          img,
          { xPercent: 3, scale: 1.12 },
          {
            xPercent: -3,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

      gsap.from(cards, {
        y: 44,
        opacity: 0,
        duration: 1.1 * S,
        stagger: 0.07 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.places', start: 'top 55%', once: true },
      });
    });

    mm.add('(max-width: 1000px)', () => {
      gsap.from($$('[data-card]'), {
        y: 30,
        opacity: 0,
        duration: 0.9 * S,
        stagger: 0.06 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.places', start: 'top 70%', once: true },
      });
    });

    /* ── Experiences ────────────────────────────────────── */
    $$('[data-exp]').forEach((exp) => {
      const media = $('.exp__media', exp);
      const img = $('.exp__img', exp);
      const heading = $('h3', exp);

      if (media) {
        gsap.fromTo(
          media,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.35 * S,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: exp, start: 'top 78%', once: true },
          }
        );
      }
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: exp, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      }
      if (heading) {
        const words = splitWords(heading);
        gsap.from(words, {
          yPercent: 110,
          opacity: 0,
          duration: 1.05 * S,
          stagger: 0.035 * S,
          ease: 'expo.out',
          scrollTrigger: { trigger: exp, start: 'top 72%', once: true },
        });
      }
      gsap.from($$('.exp__text > p:not(.label), .exp__meta li', exp), {
        y: 18,
        opacity: 0,
        duration: 0.85 * S,
        stagger: 0.055 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: exp, start: 'top 68%', once: true },
      });
    });

    /* ── Route: drawn path + pinned stops ───────────────── */
    function buildRoute(pinned: boolean) {
      const path = document.querySelector('#routePath') as SVGPathElement | null;
      const stops = $$('.stop');
      if (!path) return;

      const nodes = $$('.map-node');
      const len = path.getTotalLength();
      const fracs = nodes.map((node) => {
        const attr = node.getAttribute('transform') || '';
        const m = attr.match(/translate\(([-\d.]+)[ ,]([-\d.]+)\)/);
        const nx = m ? parseFloat(m[1]) : 0;
        const ny = m ? parseFloat(m[2]) : 0;
        let best = 0;
        let bestD = Infinity;
        for (let s = 0; s <= len; s += 3) {
          const pt = path.getPointAtLength(s);
          const d = (pt.x - nx) ** 2 + (pt.y - ny) ** 2;
          if (d < bestD) {
            bestD = d;
            best = s;
          }
        }
        return best / len;
      });

      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      let lastIdx = -1;
      const setActive = (p: number) => {
        let idx = 0;
        fracs.forEach((f, i) => {
          if (p >= f - 0.004) idx = i;
        });
        if (idx === lastIdx) return;
        lastIdx = idx;
        stops.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.route',
          start: 'top top',
          end: pinned ? '+=170%' : 'bottom 45%',
          pin: pinned ? '.route__pin' : false,
          pinSpacing: pinned,
          scrub: pinned ? 1 : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: pinned ? (self: any) => setActive(self.progress) : undefined,
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);

      nodes.forEach((node, i) => {
        const ring = node.querySelector('circle');
        const at = 0.02 + fracs[i] * 0.96;
        gsap.set(node, { opacity: 0 });
        if (ring) gsap.set(ring, { attr: { r: 0 } });
        tl.to(node, { opacity: 1, duration: 0.05, ease: 'power2.out' }, at).to(
          ring,
          { attr: { r: 17 }, duration: 0.12, ease: 'power3.out' },
          at
        );
      });

      return tl;
    }

    mm.add('(min-width: 1001px)', () => {
      buildRoute(true);
    });
    mm.add('(max-width: 1000px)', () => {
      buildRoute(false);
    });

    /* ── When to go ─────────────────────────────────────── */
    gsap.from('.when__col', {
      y: 32,
      opacity: 0,
      duration: 1 * S,
      stagger: 0.1 * S,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.when__grid', start: 'top 86%', once: true },
    });
    gsap.from('.when__note', {
      opacity: 0,
      duration: 1.1 * S,
      scrollTrigger: { trigger: '.when__note', start: 'top 92%', once: true },
    });

    /* ── Quote ──────────────────────────────────────────── */
    gsap.from('.quote__mark', {
      scale: 0,
      rotate: -90,
      opacity: 0,
      duration: 1 * S,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: '.quote', start: 'top 80%', once: true },
    });
    gsap.from('.quote__cite', {
      opacity: 0,
      duration: 1 * S,
      scrollTrigger: { trigger: '.quote', start: 'top 60%', once: true },
    });

    /* ── CTA ────────────────────────────────────────────── */
    if ($('.cta__badge')) {
      gsap.to($('.cta__badge text'), {
        rotation: 360,
        svgOrigin: '100 100',
        duration: 42,
        repeat: -1,
        ease: 'none',
      });
      gsap.from('.cta__badge', {
        scale: 0.6,
        opacity: 0,
        duration: 1.2 * S,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.cta', start: 'top 78%', once: true },
      });
    }
    gsap.from('.cta__actions .btn', {
      y: 24,
      opacity: 0,
      duration: 0.9 * S,
      stagger: 0.1 * S,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cta', start: 'top 65%', once: true },
    });

    /* ── Footer ─────────────────────────────────────────── */
    gsap.from('.footer__wordmark', {
      yPercent: 35,
      opacity: 0,
      duration: 1.5 * S,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.footer', start: 'top 82%', once: true },
    });
    gsap.from('.footer__nav > div', {
      y: 20,
      opacity: 0,
      duration: 1 * S,
      stagger: 0.1 * S,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.footer', start: 'top 78%', once: true },
    });

    /* ── Page progress ──────────────────────────────────── */
    gsap.to('#pageProgress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.4 },
    });

    /* ── Cursor + magnetic buttons ──────────────────────── */
    let onPointerMove: ((e: PointerEvent) => void) | null = null;
    let onPointerOver: ((e: PointerEvent) => void) | null = null;
    let onPointerOut: ((e: PointerEvent) => void) | null = null;

    if (fine) {
      const cursor = $('#cursor');
      if (cursor) {
        const dot = $('.cursor__dot', cursor);
        const ring = $('.cursor__ring', cursor);
        const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
        const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
        const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
        const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
        let shown = false;

        onPointerMove = (e: PointerEvent) => {
          if (!shown) {
            shown = true;
            gsap.to(cursor, { opacity: 1, duration: 0.4 });
          }
          xDot(e.clientX);
          yDot(e.clientY);
          xRing(e.clientX);
          yRing(e.clientY);
        };
        onPointerOver = (e: PointerEvent) => {
          const target = e.target as HTMLElement | null;
          const hot = target?.closest('a, button, summary, [data-card]');
          gsap.to(ring, {
            scale: hot ? 1.65 : 1,
            borderColor: hot ? 'rgba(228,201,137,0.95)' : 'rgba(198,161,91,0.85)',
            duration: 0.35,
            ease: 'power2.out',
          });
          gsap.to(dot, { scale: hot ? 0.35 : 1, duration: 0.35 });
        };
        onPointerOut = (e: PointerEvent) => {
          if (!e.relatedTarget) gsap.to(cursor, { opacity: 0, duration: 0.3 });
        };

        window.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerover', onPointerOver);
        window.addEventListener('pointerout', onPointerOut);
      }

      $$('.btn').forEach((btn) => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3' });
        btn.addEventListener('pointermove', (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.16);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.22);
        });
        btn.addEventListener('pointerleave', () => {
          xTo(0);
          yTo(0);
        });
      });
    }

    /* Keep measurements honest after fonts and images settle */
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      window.clearTimeout(failsafeTimer);
      if (toggle) toggle.removeEventListener('click', handleToggle);
      menuLinks.forEach((a) => a.removeEventListener('click', closeMenu));
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('load', refresh);
      if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);
      if (onPointerOver) document.removeEventListener('pointerover', onPointerOver);
      if (onPointerOut) window.removeEventListener('pointerout', onPointerOut);
      mm.revert();
    };
  }, []);

  return (
    <>
      <a className="skip" href="#island">
        Skip to content
      </a>

      <div className="grain" aria-hidden="true"></div>
      <div className="page-progress" aria-hidden="true">
        <span id="pageProgress"></span>
      </div>
      <div className="cursor" id="cursor" aria-hidden="true">
        <span className="cursor__dot"></span>
        <span className="cursor__ring"></span>
      </div>

      <div className="loader" id="loader" aria-hidden="true">
        <div className="loader__inner">
          <span className="loader__place">Ceylon · 6°55′ N, 80°45′ E</span>
          <span className="loader__word">Serendipity</span>
          <div className="loader__meta">
            <span className="loader__count">
              <b id="loaderCount">00</b>
              <i>%</i>
            </span>
            <span className="loader__bar">
              <i id="loaderBar"></i>
            </span>
            <span className="loader__note">An island in slow motion</span>
          </div>
        </div>
      </div>

      <header className="nav" id="nav">
        <a className="brand" href="#top" aria-label="Serendipity — back to top">
          <span className="brand__mark" aria-hidden="true">
            ✦
          </span>
          <span className="brand__name">Serendipity</span>
          <span className="brand__sub">Sri Lanka</span>
        </a>
        <nav className="nav__links" aria-label="Sections">
          <a href="#island">
            <i>01</i>The island
          </a>
          <a href="#places">
            <i>02</i>Places
          </a>
          <a href="#experiences">
            <i>03</i>Experiences
          </a>
          <a href="#route">
            <i>04</i>The loop
          </a>
          <a href="#when">
            <i>05</i>When to go
          </a>
        </nav>
        <div className="nav__right">
          <a className="btn btn--line" href="#route">
            Plan the loop
          </a>
          <button
            className="nav__toggle"
            id="navToggle"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className="menu" id="menu" aria-hidden="true">
        <div className="menu__inner">
          <p className="label">Index</p>
          <nav className="menu__links" aria-label="Mobile sections">
            <a href="#island">
              <i>01</i>The island
            </a>
            <a href="#places">
              <i>02</i>Places
            </a>
            <a href="#experiences">
              <i>03</i>Experiences
            </a>
            <a href="#route">
              <i>04</i>The loop
            </a>
            <a href="#when">
              <i>05</i>When to go
            </a>
          </nav>
          <p className="menu__foot">
            Ceylon · 6°55′ N, 80°45′ E
            <br />
            An island in slow motion
          </p>
        </div>
      </div>

      <main id="top">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="hero" id="hero">
          <div className="hero__media">
            <img
              src="/assets/aistudio/sigiriya-view_e6bf3949.jpg"
              alt="Sigiriya rock rising out of the jungle, seen from Pidurangala at first light"
              fetchPriority="high"
            />
          </div>
          <div className="hero__veil" aria-hidden="true"></div>
          <span className="hero__side" aria-hidden="true">
            Ceylon — 2026
          </span>

          <div className="hero__content">
            <p className="hero__eyebrow">Sri Lanka · The Indian Ocean</p>
            <h1 className="hero__title">
              <span className="hero__line">Sri Lanka</span>
              <span className="hero__accent">
                <em>the island of</em> serendipity
              </span>
            </h1>
            <p className="hero__sub">
              Tea-high mountains, temple bells at dusk, leopards in the dry zone — and 1,340 kilometres of coast that
              never hurries.
            </p>
          </div>

          <div className="hero__foot">
            <ul className="hero__facts">
              <li>
                <b>08</b>
                <span>UNESCO sites</span>
              </li>
              <li>
                <b>26</b>
                <span>National parks</span>
              </li>
              <li>
                <b>1,340 km</b>
                <span>Of coastline</span>
              </li>
            </ul>
            <a className="scroll-cue" href="#island">
              <span>Scroll to wander</span>
              <span className="scroll-cue__line" aria-hidden="true"></span>
            </a>
          </div>
        </section>

        {/* ── TICKER ───────────────────────────────────────── */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            <span>
              Tea country <i>✦</i> Temple bells <i>✦</i> Leopards <i>✦</i> Slow trains <i>✦</i> Stilt fishermen{' '}
              <i>✦</i> Blue whales <i>✦</i> Monsoon light <i>✦</i>
            </span>
            <span>
              Tea country <i>✦</i> Temple bells <i>✦</i> Leopards <i>✦</i> Slow trains <i>✦</i> Stilt fishermen{' '}
              <i>✦</i> Blue whales <i>✦</i> Monsoon light <i>✦</i>
            </span>
          </div>
        </div>

        {/* ── 01 ISLAND ────────────────────────────────────── */}
        <section className="island" id="island">
          <div className="container">
            <header className="sec-head">
              <p className="label">
                <span>01</span> The island
              </p>
              <h2 className="display" data-words>
                Small enough to cross in a day.
                <br />
                <em>Strange enough to keep you for a month.</em>
              </h2>
            </header>

            <div className="island__grid">
              <p className="island__lede" data-words>
                Sixty-five thousand square kilometres of contradiction. In one morning you can watch elephants cross a
                tank, climb into cloud forest, and eat hoppers by the sea before the afternoon rain.
              </p>
              <div className="island__body" data-fade>
                <p>
                  The island runs on a slower clock. Trains lean through the hill country at thirty kilometres an hour.
                  Monks sweep temple courtyards at first light. Fishermen still balance on poles off the southern coast
                  at dusk, waiting for a herring.
                </p>
                <p>
                  It is a place of small miracles rather than grand ones — the <em>serendipity</em> the old name
                  promised. You arrive for the beaches and stay for the light on the paddy fields.
                </p>
              </div>
              <blockquote className="island__quote" data-fade>
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                The finest island of its size in all the world.
                <cite>Attributed to Marco Polo, 13th century</cite>
              </blockquote>
            </div>

            <ul className="stats">
              <li className="stat">
                <span className="stat__num" data-count="8" data-pad="2">
                  8
                </span>
                <span className="stat__label">UNESCO World Heritage sites</span>
              </li>
              <li className="stat">
                <span className="stat__num" data-count="26">
                  26
                </span>
                <span className="stat__label">National parks</span>
              </li>
              <li className="stat">
                <span className="stat__num" data-count="1340" data-format="comma">
                  1,340
                </span>
                <span className="stat__label">Kilometres of coastline</span>
              </li>
              <li className="stat">
                <span className="stat__num" data-count="2">
                  2
                </span>
                <span className="stat__label">Monsoons, on opposite coasts</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── 02 PLACES ────────────────────────────────────── */}
        <section className="places" id="places">
          <div className="places__pin">
            <div className="places__head container">
              <p className="label label--light">
                <span>02</span> Places
              </p>
              <div className="places__head-row">
                <h2 className="display display--light" data-words>
                  Eight reasons
                  <br />
                  <em>to miss your flight home.</em>
                </h2>
                <div className="places__note">
                  <p>
                    From the cultural triangle to the southern ramparts — the island&apos;s essential stops, in no
                    particular hurry.
                  </p>
                  <span className="places__count">
                    <b id="placesIndex">01</b> / 08
                  </span>
                </div>
              </div>
            </div>

            <div className="places__viewport">
              <div className="places__reel" id="placesReel">
                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/hero_58b958e2.jpg"
                      alt="Sigiriya rock fortress above its water gardens"
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>01</span>
                    <span>Cultural Triangle</span>
                  </div>
                  <div className="card__body">
                    <h3>Sigiriya</h3>
                    <p>
                      A fifth-century sky fortress of frescoes, mirror walls and water gardens. Climb at dawn, before
                      the rock retains the heat.
                    </p>
                  </div>
                </article>
                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/ella_53a0777f.jpg"
                      alt="A blue train crossing the Nine Arch Bridge near Ella"
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>02</span>
                    <span>Hill Country</span>
                  </div>
                  <div className="card__body">
                    <h3>Ella</h3>
                    <p>
                      Nine arches, cloud forest and the slowest, most beautiful train ride in Asia. Walk the rails; stay
                      for the waterfalls.
                    </p>
                  </div>
                </article>
                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/kandy_3e5113c7.jpg"
                      alt="The Temple of the Sacred Tooth Relic beside Kandy lake"
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>03</span>
                    <span>Central Highlands</span>
                  </div>
                  <div className="card__body">
                    <h3>Kandy</h3>
                    <p>
                      The last royal capital, wrapped around a lake. Drums at dusk in the Temple of the Sacred Tooth,
                      every evening, without fail.
                    </p>
                  </div>
                </article>
                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/tea-hills_bfabb10f.jpg"
                      alt="Tea estates combed across the hills near Haputale"
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>04</span>
                    <span>Tea Country</span>
                  </div>
                  <div className="card__body">
                    <h3>Nuwara Eliya</h3>
                    <p>
                      Cool air, colonial bungalows and tea estates stitched across the hills at two thousand metres.
                      Bring a jacket in July.
                    </p>
                  </div>
                </article>
                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/yala-safari_fbf20478.jpg"
                      alt="A tusker elephant walking through long grass in Yala"
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>05</span>
                    <span>Deep South</span>
                  </div>
                  <div className="card__body">
                    <h3>Yala</h3>
                    <p>
                      Leopard country: 979 square kilometres of thorn scrub, lagoon and elephant paths on the edge of
                      the Indian Ocean.
                    </p>
                  </div>
                </article>
                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/galle_9e7733fe.jpg"
                      alt="The white lighthouse inside Galle Fort"
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>06</span>
                    <span>Southern Coast</span>
                  </div>
                  <div className="card__body">
                    <h3>Galle</h3>
                    <p>
                      A Dutch-walled fort of ramparts, cinnamon and four-hundred-year-old streets. Best walked just
                      before the lamps come on.
                    </p>
                  </div>
                </article>
                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/mirissa_3d3801f6.jpg"
                      alt="A coconut palm leaning over the bay at Mirissa"
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>07</span>
                    <span>South Coast</span>
                  </div>
                  <div className="card__body">
                    <h3>Mirissa</h3>
                    <p>
                      Coconut-hill sunsets, blue whales offshore from November, and a bay that has never once hurried
                      anybody.
                    </p>
                  </div>
                </article>
                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/anuradhapura-2_376f70af.jpg"
                      alt="The white Ruwanwelisaya stupa at Anuradhapura"
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>08</span>
                    <span>North Central</span>
                  </div>
                  <div className="card__body">
                    <h3>Anuradhapura</h3>
                    <p>
                      The sacred city of dagobas, where the island&apos;s oldest stories are still told beneath the
                      sacred bodhi tree.
                    </p>
                  </div>
                </article>
                <div className="places__end">
                  <p className="label label--light">And then</p>
                  <p>
                    1,300 more
                    <br />
                    kilometres
                    <br />
                    <em>of coast.</em>
                  </p>
                </div>
              </div>
            </div>

            <div className="places__foot container">
              <div className="places__bar" aria-hidden="true">
                <span id="placesBar"></span>
              </div>
              <p className="places__hint">Scroll to travel east — or west</p>
            </div>
          </div>
        </section>

        {/* ── 03 EXPERIENCES ───────────────────────────────── */}
        <section className="experiences" id="experiences">
          <div className="container">
            <header className="sec-head">
              <p className="label">
                <span>03</span> Experiences
              </p>
              <h2 className="display" data-words>
                Four things worth
                <br />
                <em>changing your plans for.</em>
              </h2>
            </header>

            <article className="exp" data-exp>
              <div className="exp__media">
                <div className="exp__img">
                  <img
                    src="/assets/aistudio/train_016a8173.jpg"
                    alt="Passengers leaning out of the window of a hill country train"
                    decoding="async"
                  />
                </div>
                <span className="exp__tag">Kandy → Ella · 6–7 hours</span>
              </div>
              <div className="exp__text">
                <p className="label">
                  <span>i</span> The hill country line
                </p>
                <h3>
                  A train that leans
                  <br />
                  through the tea hills.
                </h3>
                <p>
                  Second class, windows open, six hours from Kandy to Ella. After Nanu Oya the track doubles back on
                  itself and the whole carriage leans out to look. Buy short eats at the station; the tea comes by the
                  cup.
                </p>
                <ul className="exp__meta">
                  <li>Depart early</li>
                  <li>Sit on the right after Nanu Oya</li>
                  <li>Book a reserved seat</li>
                </ul>
              </div>
            </article>

            <article className="exp exp--flip" data-exp>
              <div className="exp__media">
                <div className="exp__img">
                  <img
                    src="/assets/aistudio/tea_6f6d4029.jpg"
                    alt="Close view of bright green tea leaves on a Nuwara Eliya estate"
                    decoding="async"
                  />
                </div>
                <span className="exp__tag">Haputale · 1,800 m</span>
              </div>
              <div className="exp__text">
                <p className="label">
                  <span>ii</span> Ceylon tea
                </p>
                <h3>
                  Two leaves
                  <br />
                  and a bud.
                </h3>
                <p>
                  The pluckers work at a rhythm you can hear before you see them. Walk an estate at first light, watch
                  the withering troughs, then taste a first flush that never leaves the island in this condition.
                </p>
                <ul className="exp__meta">
                  <li>Haputale &amp; Nuwara Eliya</li>
                  <li>Best light before 9am</li>
                  <li>Visit a working factory</li>
                </ul>
              </div>
            </article>

            <article className="exp" data-exp>
              <div className="exp__media">
                <div className="exp__img">
                  <img
                    src="/assets/aistudio/stilt_b5edbf6f.jpg"
                    alt="Stilt fishermen perched on poles in the sea near Koggala"
                    decoding="async"
                  />
                </div>
                <span className="exp__tag">Koggala · Last light</span>
              </div>
              <div className="exp__text">
                <p className="label">
                  <span>iii</span> The stilt fishermen
                </p>
                <h3>
                  An old balancing act,
                  <br />
                  gone quiet.
                </h3>
                <p>
                  They sit a metre above the swell on a crossbar lashed to a pole, patient as herons. The tradition is
                  now rare and staged for cameras in places; go quietly, pay fairly, and watch the sea rather than the
                  lens.
                </p>
                <ul className="exp__meta">
                  <li>Koggala &amp; Ahangama</li>
                  <li>Dusk, not midday</li>
                  <li>Ask before photographing</li>
                </ul>
              </div>
            </article>

            <article className="exp exp--flip" data-exp>
              <div className="exp__media">
                <div className="exp__img">
                  <img
                    src="/assets/aistudio/surf-coast_38d6410d.jpg"
                    alt="Aerial view of the long beach and fishing boats at Arugam Bay"
                    decoding="async"
                  />
                </div>
                <span className="exp__tag">Arugam Bay · May–September</span>
              </div>
              <div className="exp__text">
                <p className="label">
                  <span>iv</span> East coast swells
                </p>
                <h3>
                  The other side
                  <br />
                  of the monsoon.
                </h3>
                <p>
                  When the south gets wet, the east dries out and Arugam Bay fills with boards. The main point is a long
                  right-hand reef break; beginners head to Whiskey Point. Evenings are for coconut roti and no plans.
                </p>
                <ul className="exp__meta">
                  <li>Arugam Bay</li>
                  <li>Peak surf June–August</li>
                  <li>Boards for hire on the beach</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* ── 04 ROUTE ─────────────────────────────────────── */}
        <section className="route" id="route">
          <div className="route__pin">
            <div className="container route__inner">
              <div className="route__copy">
                <p className="label label--light">
                  <span>04</span> The loop
                </p>
                <h2 className="display display--light" data-words>
                  Twelve days.
                  <br />
                  <em>One island. No rush.</em>
                </h2>
                <p className="route__lede" data-fade>
                  A suggested first loop: the cultural triangle, the hill country line, then down the coast back to
                  Colombo. Slow enough to stay two nights in the places you like.
                </p>
                <ol className="stops" id="stops">
                  <li className="stop is-active">
                    <span className="stop__day">Days 1–2</span>
                    <span className="stop__name">Negombo</span>
                    <span className="stop__note">Arrive, acclimatise, eat hoppers by the lagoon.</span>
                  </li>
                  <li className="stop">
                    <span className="stop__day">Day 3</span>
                    <span className="stop__name">Anuradhapura</span>
                    <span className="stop__note">Dagobas and the sacred bodhi tree.</span>
                  </li>
                  <li className="stop">
                    <span className="stop__day">Days 4–5</span>
                    <span className="stop__name">Sigiriya</span>
                    <span className="stop__note">Climb at dawn; water gardens in the afternoon.</span>
                  </li>
                  <li className="stop">
                    <span className="stop__day">Day 6</span>
                    <span className="stop__name">Kandy</span>
                    <span className="stop__note">The temple, the lake, the last royal capital.</span>
                  </li>
                  <li className="stop">
                    <span className="stop__day">Days 7–8</span>
                    <span className="stop__name">Ella</span>
                    <span className="stop__note">The train, Nine Arch, Little Adam&apos;s Peak.</span>
                  </li>
                  <li className="stop">
                    <span className="stop__day">Day 9</span>
                    <span className="stop__name">Yala</span>
                    <span className="stop__note">Dawn safari in leopard country.</span>
                  </li>
                  <li className="stop">
                    <span className="stop__day">Days 10–11</span>
                    <span className="stop__name">Mirissa</span>
                    <span className="stop__note">Whales offshore, coconut hill at sunset.</span>
                  </li>
                  <li className="stop">
                    <span className="stop__day">Day 12</span>
                    <span className="stop__name">Galle</span>
                    <span className="stop__note">Ramparts, cinnamon, the fort at dusk.</span>
                  </li>
                </ol>
              </div>

              <div className="route__map" aria-hidden="true">
                <svg viewBox="0 0 620 860" role="presentation" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E4C989" />
                      <stop offset="100%" stopColor="#C6A15B" />
                    </linearGradient>
                  </defs>
                  <g className="map-grid">
                    <line x1="0" y1="120" x2="620" y2="120"></line>
                    <line x1="0" y1="300" x2="620" y2="300"></line>
                    <line x1="0" y1="480" x2="620" y2="480"></line>
                    <line x1="0" y1="660" x2="620" y2="660"></line>
                    <line x1="140" y1="0" x2="140" y2="860"></line>
                    <line x1="320" y1="0" x2="320" y2="860"></line>
                    <line x1="500" y1="0" x2="500" y2="860"></line>
                  </g>
                  <path
                    className="map-shape"
                    d="M300 44c22 0 40 10 54 32 26 42 48 76 66 122 20 50 38 96 44 148 6 54 0 108-10 162-10 54-20 104-42 154-22 50-54 92-88 116-22 16-48 16-68 0-32-26-52-70-64-116-14-54-22-104-24-156-2-54 2-106 14-156 12-50 32-94 56-134 22-36 34-78 36-116 2-26 12-50 26-56z"
                  ></path>
                  <path
                    className="map-route"
                    id="routePath"
                    d="M180 530 C 188 490 208 448 226 412 C 239 384 248 353 258 331 C 280 348 301 374 321 400 C 318 438 307 478 302 517 C 327 546 351 568 374 592 C 393 618 408 640 416 660 C 400 696 366 726 334 742 C 318 750 300 752 286 754 C 262 750 236 734 218 720"
                    stroke="url(#routeGrad)"
                  ></path>
                  <g className="map-node" data-node="0" transform="translate(180,530)">
                    <circle r="17"></circle>
                    <circle className="map-node__dot" r="4"></circle>
                    <text x="-30" y="2" textAnchor="end">
                      Negombo
                    </text>
                    <text className="map-node__day" x="-30" y="20" textAnchor="end">
                      01–02
                    </text>
                  </g>
                  <g className="map-node" data-node="1" transform="translate(258,331)">
                    <circle r="17"></circle>
                    <circle className="map-node__dot" r="4"></circle>
                    <text x="30" y="2">
                      Anuradhapura
                    </text>
                    <text className="map-node__day" x="30" y="20">
                      03
                    </text>
                  </g>
                  <g className="map-node" data-node="2" transform="translate(321,400)">
                    <circle r="17"></circle>
                    <circle className="map-node__dot" r="4"></circle>
                    <text x="30" y="2">
                      Sigiriya
                    </text>
                    <text className="map-node__day" x="30" y="20">
                      04–05
                    </text>
                  </g>
                  <g className="map-node" data-node="3" transform="translate(302,517)">
                    <circle r="17"></circle>
                    <circle className="map-node__dot" r="4"></circle>
                    <text x="-30" y="2" textAnchor="end">
                      Kandy
                    </text>
                    <text className="map-node__day" x="-30" y="20" textAnchor="end">
                      06
                    </text>
                  </g>
                  <g className="map-node" data-node="4" transform="translate(374,592)">
                    <circle r="17"></circle>
                    <circle className="map-node__dot" r="4"></circle>
                    <text x="30" y="2">
                      Ella
                    </text>
                    <text className="map-node__day" x="30" y="20">
                      07–08
                    </text>
                  </g>
                  <g className="map-node" data-node="5" transform="translate(416,660)">
                    <circle r="17"></circle>
                    <circle className="map-node__dot" r="4"></circle>
                    <text x="30" y="2">
                      Yala
                    </text>
                    <text className="map-node__day" x="30" y="20">
                      09
                    </text>
                  </g>
                  <g className="map-node" data-node="6" transform="translate(286,754)">
                    <circle r="17"></circle>
                    <circle className="map-node__dot" r="4"></circle>
                    <text x="30" y="20">
                      Mirissa
                    </text>
                    <text className="map-node__day" x="30" y="38">
                      10–11
                    </text>
                  </g>
                  <g className="map-node" data-node="7" transform="translate(218,720)">
                    <circle r="17"></circle>
                    <circle className="map-node__dot" r="4"></circle>
                    <text x="-30" y="-6" textAnchor="end">
                      Galle
                    </text>
                    <text className="map-node__day" x="-30" y="12" textAnchor="end">
                      12
                    </text>
                  </g>
                </svg>
                <p className="route__scale">A suggestion, not a schedule · Not to scale</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUOTE ────────────────────────────────────────── */}
        <section className="quote">
          <div className="container">
            <span className="quote__mark" aria-hidden="true">
              ✦
            </span>
            <blockquote className="quote__text" data-words>
              You come for the island.
              <br />
              <em>You stay for the pace.</em>
            </blockquote>
            <p className="quote__cite">Field notes · Southern Province, 2026</p>
          </div>
        </section>

        {/* ── 05 WHEN ──────────────────────────────────────── */}
        <section className="when" id="when">
          <div className="container">
            <header className="sec-head">
              <p className="label">
                <span>05</span> When to go
              </p>
              <h2 className="display" data-words>
                Two monsoons,
                <br />
                <em>one dry island.</em>
              </h2>
              <p className="when__intro" data-fade>
                There is no bad month to visit Sri Lanka — only the wrong coast. When the south-west monsoon soaks the
                west, the east is at its best, and the other way around.
              </p>
            </header>

            <div className="when__grid">
              <div className="when__col" data-fade>
                <p className="when__season">Nov — Apr</p>
                <h3>West &amp; south coast</h3>
                <p>
                  Dry, bright and calm. Galle, Mirissa and the whale season off the south. Christmas is busy; January is
                  perfect.
                </p>
                <span className="when__tag">Galle · Mirissa · Colombo</span>
              </div>
              <div className="when__col" data-fade>
                <p className="when__season">May — Sep</p>
                <h3>East coast</h3>
                <p>
                  The monsoon flips. Trincomalee and Arugam Bay take over, surf peaks in June and August, and the
                  beaches empty out.
                </p>
                <span className="when__tag">Arugam Bay · Trinco</span>
              </div>
              <div className="when__col" data-fade>
                <p className="when__season">Dec — Mar</p>
                <h3>Hill country</h3>
                <p>
                  Clear mornings for the train, tea estates and Horton Plains — before the afternoon mist rolls up from
                  the valley.
                </p>
                <span className="when__tag">Kandy · Ella · Nuwara Eliya</span>
              </div>
            </div>
            <p className="when__note">
              Inter-monsoon rain falls island-wide in October and November — short, warm, and usually over by dinner.
            </p>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="cta">
          <div className="cta__halo" aria-hidden="true"></div>
          <div className="container cta__inner">
            <svg className="cta__badge" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="badgeCircle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"></path>
              </defs>
              <text>
                <textPath href="#badgeCircle">SLOW TRAVEL · CEYLON · INDIAN OCEAN ·</textPath>
              </text>
              <circle cx="100" cy="100" r="34"></circle>
              <text className="cta__badge-mark" x="100" y="112" textAnchor="middle">
                ✦
              </text>
            </svg>
            <h2 className="display display--light cta__title" data-words>
              The island
              <br />
              <em>is waiting.</em>
            </h2>
            <div className="cta__actions">
              <a className="btn btn--gold" href="#route">
                See the loop
              </a>
              <a className="btn btn--ghost" href="#top">
                Back to the top
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <p className="footer__wordmark">Serendipity</p>
              <p className="footer__tag">
                An independent design study of Sri Lanka.
                <br />
                No bookings are taken here — travel details are illustrative.
              </p>
            </div>
            <nav className="footer__nav" aria-label="Footer">
              <div>
                <p className="label">Explore</p>
                <a href="#island">The island</a>
                <a href="#places">Places</a>
                <a href="#experiences">Experiences</a>
                <a href="#route">The loop</a>
                <a href="#when">When to go</a>
              </div>
              <div>
                <p className="label">Coordinates</p>
                <p className="footer__meta">
                  6°55′ N, 80°45′ E
                  <br />
                  Indian Ocean
                  <br />
                  65,610 km²
                </p>
              </div>
            </nav>
          </div>

          <details className="credits">
            <summary>
              Photography credits <span aria-hidden="true">+</span>
            </summary>
            <ul>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Sigiriya_view_from_Pidurangala_4.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sigiriya from Pidurangala
                </a>{' '}
                — Nipuna Gamage, CC BY-SA 4.0
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Sigiriya.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Sigiriya
                </a>{' '}
                — Bernard Gagnon, CC BY-SA 3.0
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:SL_Demodara_near_Ella_asv2020-01_img02.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Nine Arch Bridge, Ella
                </a>{' '}
                — A.Savin, FAL
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:SL_Kandy_asv2020-01_img34_Sacred_Tooth_Temple.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Temple of the Sacred Tooth, Kandy
                </a>{' '}
                — A.Savin, FAL
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:SL_Anuradhapura_asv2020-01_img11_Ruwanwelisaya_Stupa.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ruwanwelisaya Stupa
                </a>{' '}
                — A.Savin, FAL
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:SL_Galle_Fort_asv2020-01_img24.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Galle Fort
                </a>{' '}
                — A.Savin, FAL
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Tea_plantation_Haputale.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Tea plantation, Haputale
                </a>{' '}
                — Adbar, CC BY-SA 3.0
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Sri_Lanka,_Tea_leaves,_Nuwara_Eliya.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Tea leaves, Nuwara Eliya
                </a>{' '}
                — Vyacheslav Argenberg, CC BY 4.0
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Sri_Lanka,_Haputale,_Train_in_the_mountains_of_Sri_Lanka%27s_%27Hill_Country%27.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Hill country train
                </a>{' '}
                — Vyacheslav Argenberg, CC BY 4.0
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Tuskers_of_Sri_Lanka.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Tuskers of Sri Lanka
                </a>{' '}
                — Sumudusoyza007, CC BY-SA 4.0
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Mirissa_sea_2.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Mirissa
                </a>{' '}
                — Thedani Karasnagoda, CC BY-SA 4.0
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Fishermen_practicing_traditional_stilt_fishing_near_Galle,_southern_Sri_Lanka,_20260207_1420_9464.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Stilt fishermen, Koggala
                </a>{' '}
                — Jakub Hałun, CC BY 4.0
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Beach_of_Arugam_Bay.jpg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Arugam Bay
                </a>{' '}
                — Dennis Sylvester Hurd, CC0
              </li>
            </ul>
            <p className="credits__note">
              All photographs via Wikimedia Commons, reproduced under their respective licences. Route and timings are
              illustrative.
            </p>
          </details>

          <div className="footer__bottom">
            <span>© 2026 Serendipity — a design study</span>
            <span>Sri Lanka · Indian Ocean</span>
          </div>
        </div>
      </footer>
    </>
  );
}
