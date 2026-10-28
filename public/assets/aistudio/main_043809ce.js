/* ─────────────────────────────────────────────────────────
   Serendipity — motion layer (GSAP + ScrollTrigger)
   Animations run unconditionally; reduced-motion only softens.
   ───────────────────────────────────────────────────────── */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const S = reduce ? 0.7 : 1; // duration scale, never 0

  const loader = $("#loader");
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  function unlock() {
    document.body.classList.remove("is-locked");
    if (loader) {
      loader.style.display = "none";
      loader.setAttribute("aria-hidden", "true");
    }
  }

  if (!gsap || !ScrollTrigger) {
    unlock();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add("is-locked");

  /* Split text into word wrappers, preserving inline markup like <em> */
  function splitWords(root) {
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          if (!child.textContent.trim()) return;
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((chunk) => {
            if (!chunk.trim()) {
              frag.appendChild(document.createTextNode(chunk));
              return;
            }
            const outer = document.createElement("span");
            outer.className = "w";
            const inner = document.createElement("span");
            inner.className = "w__i";
            inner.textContent = chunk;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
          walk(child);
        }
      });
    };
    walk(root);
    return Array.from(root.querySelectorAll(".w__i"));
  }

  /* ── Hero intro state ───────────────────────────────── */
  const heroWords = splitWords($(".hero__title"));
  gsap.set(heroWords, { yPercent: 130, opacity: 0 });

  const heroIntro = gsap.timeline({ paused: true });
  heroIntro
    .to(heroWords, {
      yPercent: 0,
      opacity: 1,
      duration: 1.25 * S,
      ease: "expo.out",
      stagger: 0.055 * S,
    }, 0)
    .from(".hero__media img", { scale: 1.18, duration: 2.6 * S, ease: "power2.out" }, 0)
    .from(".hero__eyebrow", { y: 18, opacity: 0, duration: 0.9 * S, ease: "power3.out" }, 0.15)
    .from(".hero__sub", { y: 22, opacity: 0, duration: 0.9 * S, ease: "power3.out" }, 0.45)
    .from(".hero__foot", { opacity: 0, y: 16, duration: 0.9 * S, ease: "power3.out" }, 0.55)
    .from(".nav > *", { y: -16, opacity: 0, duration: 0.9 * S, stagger: 0.06, ease: "power3.out" }, 0.15)
    .from(".hero__side", { opacity: 0, duration: 1 * S }, 0.9);

  /* ── Loader ─────────────────────────────────────────── */
  let done = false;
  function finishLoader() {
    if (done) return;
    done = true;
    unlock();
  }

  const loadTl = gsap.timeline({ onComplete: finishLoader });
  const count = { v: 0 };
  const countEl = $("#loaderCount");
  const barEl = $("#loaderBar");

  if (loader) {
    gsap.set(loader, { clipPath: "inset(0% 0% 0% 0%)" });
    loadTl
      .from(".loader__place", { opacity: 0, y: 10, duration: 0.7 * S, ease: "power2.out" }, 0)
      .from(".loader__word", { yPercent: 30, opacity: 0, duration: 1.1 * S, ease: "expo.out" }, 0.05)
      .to(count, {
        v: 100,
        duration: 1.7 * S,
        ease: "power2.inOut",
        onUpdate: () => { if (countEl) countEl.textContent = String(Math.round(count.v)).padStart(2, "0"); },
      }, 0.1)
      .to(barEl, { scaleX: 1, duration: 1.7 * S, ease: "power2.inOut" }, 0.1)
      .to(".loader__inner", { yPercent: -6, opacity: 0, duration: 0.5 * S, ease: "power2.in" }, "-=0.15")
      .to(loader, { clipPath: "inset(0% 0% 100% 0%)", duration: 1 * S, ease: "expo.inOut" }, "-=0.2")
      .add(() => heroIntro.play(), "-=0.75");
  } else {
    heroIntro.play();
    unlock();
  }

  // Failsafe: never leave the page behind a curtain
  window.setTimeout(() => {
    if (!done) {
      loadTl.kill();
      finishLoader();
      heroIntro.progress(1);
    }
  }, 7000);

  /* ── Hero scroll parallax ───────────────────────────── */
  gsap.to(".hero__media", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".hero__content", {
    yPercent: -14,
    opacity: 0.15,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  /* ── Nav ────────────────────────────────────────────── */
  const nav = $("#nav");
  const menu = $("#menu");
  const toggle = $("#navToggle");
  let menuOpen = false;

  ScrollTrigger.create({
    trigger: ".hero",
    start: "bottom 88px",
    onEnter: () => nav.classList.add("is-solid"),
    onLeaveBack: () => nav.classList.remove("is-solid"),
  });

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      if (menuOpen) return;
      if (self.scroll() > 220 && self.direction === 1) nav.classList.add("is-hidden");
      else nav.classList.remove("is-hidden");
    },
  });

  /* Mobile menu */
  const menuLinks = $$(".menu__links a");
  gsap.set(menuLinks, { yPercent: 40, opacity: 0 });
  const menuTl = gsap.timeline({
    paused: true,
    onReverseComplete: () => {
      if (!menu) return;
      menu.style.visibility = "hidden";
      menu.setAttribute("aria-hidden", "true");
    },
  });
  if (menu) {
    menuTl
      .to(menu, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 * S, ease: "expo.inOut" })
      .to(menuLinks, { yPercent: 0, opacity: 1, duration: 0.8 * S, stagger: 0.055 * S, ease: "power3.out" }, "-=0.36");
  }

  function openMenu() {
    if (!menu) return;
    menuOpen = true;
    document.body.classList.add("is-locked");
    menu.style.visibility = "visible";
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    toggle.classList.add("is-open");
    nav.classList.add("is-menu");
    nav.classList.remove("is-solid", "is-hidden");
    menuTl.play();
  }

  function closeMenu() {
    if (!menu) return;
    menuOpen = false;
    document.body.classList.remove("is-locked");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    toggle.classList.remove("is-open");
    nav.classList.remove("is-menu");
    menuTl.reverse();
    if (window.scrollY > window.innerHeight * 0.6) nav.classList.add("is-solid");
  }

  if (toggle) {
    toggle.addEventListener("click", () => (menuOpen ? closeMenu() : openMenu()));
  }
  menuLinks.forEach((a) => a.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) closeMenu();
  });

  /* ── Generic word reveals ───────────────────────────── */
  $$("[data-words]").forEach((el) => {
    const words = splitWords(el);
    gsap.from(words, {
      yPercent: 115,
      opacity: 0,
      duration: 1.15 * S,
      ease: "expo.out",
      stagger: 0.028 * S,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  /* Generic fades */
  $$("[data-fade]").filter((el) => !el.classList.contains("when__col")).forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 1 * S,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  /* ── Stats counters ─────────────────────────────────── */
  $$("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count || 0);
    const pad = el.dataset.pad ? Number(el.dataset.pad) : 0;
    const comma = el.dataset.format === "comma";
    const state = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(state, {
          v: target,
          duration: 2 * S,
          ease: "power3.out",
          onUpdate: () => {
            const v = Math.round(state.v);
            el.textContent = comma ? v.toLocaleString("en-US") : pad ? String(v).padStart(pad, "0") : String(v);
          },
        });
      },
    });
  });

  gsap.from(".stat", {
    y: 22,
    opacity: 0,
    duration: 1 * S,
    stagger: 0.08 * S,
    ease: "power3.out",
    scrollTrigger: { trigger: ".stats", start: "top 90%", once: true },
  });

  /* ── Ticker ─────────────────────────────────────────── */
  const ticker = $(".ticker__track");
  if (ticker) {
    gsap.to(ticker, {
      xPercent: -50,
      duration: 34,
      ease: "none",
      repeat: -1,
    });
  }

  /* ── Places: pinned horizontal reel ─────────────────── */
  const mm = gsap.matchMedia();
  const placesIndex = $("#placesIndex");

  mm.add("(min-width: 1001px)", () => {
    const pin = $(".places__pin");
    const reel = $("#placesReel");
    const bar = $("#placesBar");
    if (!pin || !reel) return;
    const distance = () => Math.max(0, reel.scrollWidth - window.innerWidth);
    const cards = $$("[data-card]", reel);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => "+=" + (distance() + window.innerHeight * 0.5),
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (bar) gsap.set(bar, { scaleX: self.progress });
          if (placesIndex) {
            const i = Math.min(cards.length, Math.max(1, Math.round(self.progress * (cards.length - 1)) + 1));
            placesIndex.textContent = String(i).padStart(2, "0");
          }
        },
      },
    });

    tl.to(reel, { x: () => -distance(), ease: "none" }, 0);

    cards.forEach((card) => {
      const img = $(".card__img img", card);
      if (!img) return;
      gsap.fromTo(img,
        { xPercent: 3, scale: 1.12 },
        {
          xPercent: -3,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
    });

    gsap.from(cards, {
      y: 44,
      opacity: 0,
      duration: 1.1 * S,
      stagger: 0.07 * S,
      ease: "power3.out",
      scrollTrigger: { trigger: ".places", start: "top 55%", once: true },
    });
  });

  mm.add("(max-width: 1000px)", () => {
    gsap.from($$("[data-card]"), {
      y: 30,
      opacity: 0,
      duration: 0.9 * S,
      stagger: 0.06 * S,
      ease: "power3.out",
      scrollTrigger: { trigger: ".places", start: "top 70%", once: true },
    });
  });

  /* ── Experiences ────────────────────────────────────── */
  $$("[data-exp]").forEach((exp) => {
    const media = $(".exp__media", exp);
    const img = $(".exp__img", exp);
    const heading = $("h3", exp);

    if (media) {
      gsap.fromTo(media,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.35 * S,
          ease: "expo.inOut",
          scrollTrigger: { trigger: exp, start: "top 78%", once: true },
        });
    }
    if (img) {
      gsap.fromTo(img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: exp, start: "top bottom", end: "bottom top", scrub: true },
        });
    }
    if (heading) {
      const words = splitWords(heading);
      gsap.from(words, {
        yPercent: 110,
        opacity: 0,
        duration: 1.05 * S,
        stagger: 0.035 * S,
        ease: "expo.out",
        scrollTrigger: { trigger: exp, start: "top 72%", once: true },
      });
    }
    gsap.from($$(".exp__text > p:not(.label), .exp__meta li", exp), {
      y: 18,
      opacity: 0,
      duration: 0.85 * S,
      stagger: 0.055 * S,
      ease: "power3.out",
      scrollTrigger: { trigger: exp, start: "top 68%", once: true },
    });
  });

  /* ── Route: drawn path + pinned stops ───────────────── */
  function buildRoute(pinned) {
    const path = $("#routePath");
    const stops = $$(".stop");
    if (!path) return;

    const nodes = $$(".map-node");
    const len = path.getTotalLength();
    const fracs = nodes.map((node) => {
      const m = node.getAttribute("transform").match(/translate\(([-\d.]+)[ ,]([-\d.]+)\)/);
      const nx = parseFloat(m[1]);
      const ny = parseFloat(m[2]);
      let best = 0;
      let bestD = Infinity;
      for (let s = 0; s <= len; s += 3) {
        const pt = path.getPointAtLength(s);
        const d = (pt.x - nx) ** 2 + (pt.y - ny) ** 2;
        if (d < bestD) { bestD = d; best = s; }
      }
      return best / len;
    });

    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    let lastIdx = -1;
    const setActive = (p) => {
      let idx = 0;
      fracs.forEach((f, i) => { if (p >= f - 0.004) idx = i; });
      if (idx === lastIdx) return;
      lastIdx = idx;
      stops.forEach((s, i) => s.classList.toggle("is-active", i === idx));
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".route",
        start: "top top",
        end: pinned ? "+=170%" : "bottom 45%",
        pin: pinned ? ".route__pin" : false,
        pinSpacing: pinned,
        scrub: pinned ? 1 : 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: pinned ? (self) => setActive(self.progress) : undefined,
      },
    });

    tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);

    nodes.forEach((node, i) => {
      const ring = node.querySelector("circle");
      const at = 0.02 + fracs[i] * 0.96;
      gsap.set(node, { opacity: 0 });
      if (ring) gsap.set(ring, { attr: { r: 0 } });
      tl.to(node, { opacity: 1, duration: 0.05, ease: "power2.out" }, at)
        .to(ring, { attr: { r: 17 }, duration: 0.12, ease: "power3.out" }, at);
    });

    return tl;
  }

  mm.add("(min-width: 1001px)", () => { buildRoute(true); });
  mm.add("(max-width: 1000px)", () => { buildRoute(false); });

  /* ── When to go ─────────────────────────────────────── */
  gsap.from(".when__col", {
    y: 32,
    opacity: 0,
    duration: 1 * S,
    stagger: 0.1 * S,
    ease: "power3.out",
    scrollTrigger: { trigger: ".when__grid", start: "top 86%", once: true },
  });
  gsap.from(".when__note", {
    opacity: 0,
    duration: 1.1 * S,
    scrollTrigger: { trigger: ".when__note", start: "top 92%", once: true },
  });

  /* ── Quote ──────────────────────────────────────────── */
  gsap.from(".quote__mark", {
    scale: 0,
    rotate: -90,
    opacity: 0,
    duration: 1 * S,
    ease: "back.out(2)",
    scrollTrigger: { trigger: ".quote", start: "top 80%", once: true },
  });
  gsap.from(".quote__cite", {
    opacity: 0,
    duration: 1 * S,
    scrollTrigger: { trigger: ".quote", start: "top 60%", once: true },
  });

  /* ── CTA ────────────────────────────────────────────── */
  if ($(".cta__badge")) {
    gsap.to($(".cta__badge text"), {
      rotation: 360,
      svgOrigin: "100 100",
      duration: 42,
      repeat: -1,
      ease: "none",
    });
    gsap.from(".cta__badge", {
      scale: 0.6,
      opacity: 0,
      duration: 1.2 * S,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: ".cta", start: "top 78%", once: true },
    });
  }
  gsap.from(".cta__actions .btn", {
    y: 24,
    opacity: 0,
    duration: 0.9 * S,
    stagger: 0.1 * S,
    ease: "power3.out",
    scrollTrigger: { trigger: ".cta", start: "top 65%", once: true },
  });

  /* ── Footer ─────────────────────────────────────────── */
  gsap.from(".footer__wordmark", {
    yPercent: 35,
    opacity: 0,
    duration: 1.5 * S,
    ease: "expo.out",
    scrollTrigger: { trigger: ".footer", start: "top 82%", once: true },
  });
  gsap.from(".footer__nav > div", {
    y: 20,
    opacity: 0,
    duration: 1 * S,
    stagger: 0.1 * S,
    ease: "power3.out",
    scrollTrigger: { trigger: ".footer", start: "top 78%", once: true },
  });

  /* ── Page progress ──────────────────────────────────── */
  gsap.to("#pageProgress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
  });

  /* ── Cursor + magnetic buttons ──────────────────────── */
  if (fine) {
    const cursor = $("#cursor");
    if (cursor) {
      const dot = $(".cursor__dot", cursor);
      const ring = $(".cursor__ring", cursor);
      const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
      const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
      const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
      const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
      let shown = false;

      window.addEventListener("pointermove", (e) => {
        if (!shown) {
          shown = true;
          gsap.to(cursor, { opacity: 1, duration: 0.4 });
        }
        xDot(e.clientX); yDot(e.clientY);
        xRing(e.clientX); yRing(e.clientY);
      });
      document.addEventListener("pointerover", (e) => {
        const hot = e.target.closest("a, button, summary, [data-card]");
        gsap.to(ring, {
          scale: hot ? 1.65 : 1,
          borderColor: hot ? "rgba(228,201,137,0.95)" : "rgba(198,161,91,0.85)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(dot, { scale: hot ? 0.35 : 1, duration: 0.35 });
      });
      window.addEventListener("pointerout", (e) => {
        if (!e.relatedTarget) gsap.to(cursor, { opacity: 0, duration: 0.3 });
      });
    }

    $$(".btn").forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.16);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.22);
      });
      btn.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  }

  /* Keep measurements honest after fonts and images settle */
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
})();
