import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Clock, Phone, MessageCircle, Mail, MapPin, Navigation, ExternalLink, X, Check } from 'lucide-react';
import { HERO_SLIDES_DEFAULT, SiteContentProvider, useSiteContent } from './content/siteContent';
import AdminPanel from './components/AdminPanel';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export function TripadvisorOwlLogo({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
    >
      <circle cx="12" cy="12" r="12" fill="#34E0A1" />
      <path
        d="M19.3 9.2h-2.1c-1.3-.9-3.1-1.5-5.2-1.5s-3.9.6-5.2 1.5H4.7l1.5 1.8c-.7.7-1.1 1.7-1.1 2.8 0 2.3 1.9 4.1 4.1 4.1 1.3 0 2.4-.6 3.2-1.5l-.4.7-.4-.7c.8.9 1.9 1.5 3.2 1.5 2.3 0 4.1-1.9 4.1-4.1 0-1.1-.4-2.1-1.1-2.8l1.5-1.8zM9.2 16.4c-1.4 0-2.6-1.2-2.6-2.6s1.2-2.6 2.6-2.6 2.6 1.2 2.6 2.6-1.2 2.6-2.6 2.6zm2.8-3.8c0-1.2-.6-2.3-1.5-3 .9-.4 2-.6 3-.6s2.1.2 3 .6c-.9.7-1.5 1.8-1.5 3h-3zm2.8 3.8c-1.4 0-2.6-1.2-2.6-2.6s1.2-2.6 2.6-2.6 2.6 1.2 2.6 2.6-1.2 2.6-2.6 2.6z"
        fill="#000000"
      />
      <circle cx="9.2" cy="13.8" r="1.25" fill="#000000" />
      <circle cx="14.8" cy="13.8" r="1.25" fill="#000000" />
      <polygon points="12,15.2 10.9,16.9 13.1,16.9" fill="#000000" />
    </svg>
  );
}

export function GoogleGLogo({ size = 15, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
    >
      <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
      <path
        d="M18.6 12.2c0-.5 0-1-.1-1.4H12v2.8h3.7c-.2.9-.7 1.7-1.4 2.2v1.8h2.3c1.3-1.2 2-3.1 2-5.4z"
        fill="#4285F4"
      />
      <path
        d="M12 19c1.9 0 3.4-.6 4.6-1.7l-2.3-1.8c-.6.4-1.4.7-2.3.7-1.8 0-3.3-1.2-3.8-2.8H5.8v1.8C7 17.5 9.3 19 12 19z"
        fill="#34A853"
      />
      <path
        d="M8.2 13.4c-.1-.4-.2-.9-.2-1.4s.1-1 .2-1.4V8.8H5.8C5.3 9.8 5 10.9 5 12s.3 2.2.8 3.2l2.4-1.8z"
        fill="#FBBC05"
      />
      <path
        d="M12 7.8c1 0 1.9.3 2.6 1l2-2C15.4 5.7 13.9 5 12 5 9.3 5 7 6.5 5.8 8.8l2.4 1.8c.5-1.6 2-2.8 3.8-2.8z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function FacebookFLogo({ size = 15, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
    >
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M15.1 12.9l.4-2.6h-2.5V8.6c0-.7.3-1.4 1.5-1.4h1.1V5c0 0-1-.2-2-.2-2 0-3.4 1.2-3.4 3.5v2H8v2.6h2.2V19h2.8v-6.1h2.1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function VerifiedCheckBadge({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Verified Reviewer"
      className="inline-block shrink-0"
    >
      <circle cx="12" cy="12" r="10" fill="#FF6B00" />
      <path
        d="M8.5 12.3l2.3 2.3 4.8-4.8"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomePage() {
  const { t, img } = useSiteContent();

  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotBarRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prevSlideIdxRef = useRef(0);

  const [tourFilter, setTourFilter] = useState<'all' | 'day' | 'multiday'>('all');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'Tripadvisor' | 'Google' | 'Facebook'>('all');
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [activeModal, setActiveModal] = useState<
    | null
    | { type: 'poster'; title: string; src: string; subtitle: string }
    | { type: 'map' }
    | { type: 'terms' }
  >(null);

  // Inquiry form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryTour, setInquiryTour] = useState("KuRa's Adventure (11 Nights | 12 Days)");
  const [inquiryVehicle, setInquiryVehicle] = useState('Honda Fit Shuttle ($80/Day)');
  const [inquiryDates, setInquiryDates] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const popularTours = useMemo(
    () => [
      {
        id: 'galle-day',
        title: t('tours.pkg1.title'),
        subtitle: t('tours.pkg1.subtitle'),
        duration: t('tours.pkg1.duration'),
        category: 'day' as const,
        image: img('tours.pkg1.img', '/assets/aistudio/galle_9e7733fe.jpg'),
        poster: '/assets/aistudio/poster-galle.jpg',
        description: t('tours.pkg1.desc'),
        stops: t('tours.pkg1.stops'),
      },
      {
        id: 'kuras-adventure',
        title: t('tours.pkg2.title'),
        subtitle: t('tours.pkg2.subtitle'),
        duration: t('tours.pkg2.duration'),
        category: 'multiday' as const,
        image: img('tours.pkg2.img', '/assets/aistudio/ella_53a0777f.jpg'),
        poster: '/assets/aistudio/poster-adventure.jpg',
        description: t('tours.pkg2.desc'),
        stops: t('tours.pkg2.stops'),
      },
      {
        id: 'colombo-day',
        title: t('tours.pkg3.title'),
        subtitle: t('tours.pkg3.subtitle'),
        duration: t('tours.pkg3.duration'),
        category: 'day' as const,
        image: img('tours.pkg3.img', '/assets/aistudio/kandy_3e5113c7.jpg'),
        poster: '/assets/aistudio/poster-colombo.jpg',
        description: t('tours.pkg3.desc'),
        stops: t('tours.pkg3.stops'),
      },
      {
        id: 'kuras-all-ceylon',
        title: t('tours.pkg4.title'),
        subtitle: t('tours.pkg4.subtitle'),
        duration: t('tours.pkg4.duration'),
        category: 'multiday' as const,
        image: img('tours.pkg4.img', '/assets/aistudio/anuradhapura-2_376f70af.jpg'),
        poster: '/assets/aistudio/poster-allceylon.jpg',
        description: t('tours.pkg4.desc'),
        stops: t('tours.pkg4.stops'),
      },
    ],
    [t, img]
  );

  const reviewsList = useMemo(
    () => [
      {
        id: 'summary',
        author: t('reviews.r1.author'),
        date: 'Based on 87 Reviews',
        platform: 'Summary' as const,
        title: t('reviews.r1.title'),
        fullText: t('reviews.r1.text'),
        isSummary: true,
      },
      {
        id: 'nozomi',
        author: t('reviews.r2.author'),
        date: 'Verified · Tripadvisor',
        platform: 'Tripadvisor' as const,
        title: t('reviews.r2.title'),
        fullText: t('reviews.r2.text'),
      },
      {
        id: 'elena',
        author: t('reviews.r3.author'),
        date: 'October 19 · Tripadvisor',
        platform: 'Tripadvisor' as const,
        title: t('reviews.r3.title'),
        fullText: t('reviews.r3.text'),
      },
      {
        id: 'patric',
        author: t('reviews.r4.author'),
        date: 'August 7 · Tripadvisor',
        platform: 'Tripadvisor' as const,
        title: t('reviews.r4.title'),
        fullText: t('reviews.r4.text'),
      },
      {
        id: 'glenn',
        author: t('reviews.r5.author'),
        date: 'July 11 · Tripadvisor',
        platform: 'Tripadvisor' as const,
        title: t('reviews.r5.title'),
        fullText: t('reviews.r5.text'),
      },
      {
        id: 'nicole',
        author: t('reviews.r6.author'),
        date: 'July 9 · Tripadvisor',
        platform: 'Tripadvisor' as const,
        title: t('reviews.r6.title'),
        fullText: t('reviews.r6.text'),
      },
      {
        id: 'matheo',
        author: t('reviews.r7.author'),
        date: 'May 15 · Google',
        platform: 'Google' as const,
        title: t('reviews.r7.title'),
        fullText: t('reviews.r7.text'),
      },
      {
        id: 'katherine',
        author: t('reviews.r8.author'),
        date: 'April 26 · Facebook',
        platform: 'Facebook' as const,
        title: t('reviews.r8.title'),
        fullText: t('reviews.r8.text'),
      },
    ],
    [t]
  );

  const filteredTours = popularTours.filter((pkg) => (tourFilter === 'all' ? true : pkg.category === tourFilter));
  const filteredReviews = reviewsList.filter((r) =>
    reviewFilter === 'all' ? true : r.platform === reviewFilter || r.isSummary
  );

  const handleSelectTourForInquiry = (tourName: string) => {
    setInquiryTour(tourName);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectVehicleForInquiry = (vehicleName: string) => {
    setInquiryVehicle(vehicleName);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    const text = [
      `Ayubowan KuRa! I would like to plan a Sri Lanka trip with 4Me Lanka Tours.`,
      inquiryName ? `Name: ${inquiryName}` : '',
      inquiryEmail ? `Email: ${inquiryEmail}` : '',
      `Selected Tour: ${inquiryTour}`,
      `Preferred Vehicle: ${inquiryVehicle}`,
      inquiryDates ? `Travel Dates / Guests: ${inquiryDates}` : '',
      inquiryNotes ? `Notes: ${inquiryNotes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/94712857705?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // GSAP Hero Auto Slideshow with Ken Burns Pan & Progress Indicator
  useEffect(() => {
    const SLIDE_DURATION = 5.4;
    const gsap = window.gsap;
    const currentSlide = slideRefs.current[heroSlideIdx];
    const prevSlide = slideRefs.current[prevSlideIdxRef.current];
    const currentImg = currentSlide?.querySelector('img');
    const currentBar = dotBarRefs.current[heroSlideIdx];

    if (gsap && currentSlide) {
      if (prevSlide && prevSlide !== currentSlide) {
        gsap.killTweensOf(prevSlide);
        gsap.to(prevSlide, {
          autoAlpha: 0,
          duration: 1.35,
          ease: 'power2.inOut',
        });
      }

      gsap.killTweensOf(currentSlide);
      gsap.fromTo(
        currentSlide,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.35, ease: 'power2.out' }
      );

      if (currentImg) {
        gsap.killTweensOf(currentImg);
        gsap.fromTo(
          currentImg,
          { scale: 1.15, xPercent: heroSlideIdx % 2 === 0 ? -1.8 : 1.8 },
          { scale: 1.02, xPercent: 0, duration: SLIDE_DURATION + 1.2, ease: 'none' }
        );
      }

      dotBarRefs.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.killTweensOf(bar);
        if (i !== heroSlideIdx) {
          gsap.set(bar, { scaleX: i < heroSlideIdx ? 1 : 0 });
        }
      });

      if (currentBar) {
        gsap.fromTo(
          currentBar,
          { scaleX: 0 },
          { scaleX: 1, duration: SLIDE_DURATION, ease: 'none' }
        );
      }

      gsap.fromTo(
        '.hero__slide-meta',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
      );
    }

    prevSlideIdxRef.current = heroSlideIdx;

    const timer = window.setTimeout(() => {
      setHeroSlideIdx((prev) => (prev + 1) % HERO_SLIDES_DEFAULT.length);
    }, SLIDE_DURATION * 1000);

    return () => window.clearTimeout(timer);
  }, [heroSlideIdx]);

  // Animate Tour Package cards when filter tab changes
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const cards = document.querySelectorAll('.tour-pkg');
    if (!cards.length) return;
    if (!gsap) {
      cards.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
      });
      return;
    }
    gsap.killTweensOf(cards);
    gsap.fromTo(
      cards,
      { y: 26, opacity: 0, rotateX: 4 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power3.out',
        overwrite: 'auto',
        clearProps: 'transform',
        onComplete: () => {
          if (ScrollTrigger) ScrollTrigger.refresh();
        },
      }
    );
  }, [tourFilter]);

  // Animate Review cards when platform filter tab changes
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const cards = document.querySelectorAll('.review-card');
    if (!cards.length) return;
    if (!gsap) {
      cards.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
      });
      return;
    }
    gsap.killTweensOf(cards);
    gsap.fromTo(
      cards,
      { y: 22, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.045,
        ease: 'power3.out',
        overwrite: 'auto',
        clearProps: 'transform',
        onComplete: () => {
          if (ScrollTrigger) ScrollTrigger.refresh();
        },
      }
    );
  }, [reviewFilter]);

  // Animate Modal entrance when opened
  useEffect(() => {
    if (!activeModal) return;
    const gsap = window.gsap;
    if (!gsap) return;
    gsap.fromTo('.modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(
      '.modal-box',
      { y: 28, scale: 0.96, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.42, ease: 'expo.out' }
    );
  }, [activeModal]);

  // Master GSAP Choreographed Animations & 3D Interactive Physics
  useEffect(() => {
    const $ = (s: string, c: Document | Element = document) => c.querySelector(s) as HTMLElement | null;
    const $$ = (s: string, c: Document | Element = document) => Array.from(c.querySelectorAll(s)) as HTMLElement[];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const S = reduce ? 0.7 : 1;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

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

    let onPointerMove: ((e: PointerEvent) => void) | null = null;
    let onPointerOver: ((e: PointerEvent) => void) | null = null;
    let onPointerOut: ((e: PointerEvent) => void) | null = null;

    const nav = $('#nav');
    const menu = $('#menu');
    const toggle = $('#navToggle');
    const menuLinks = $$('.menu__links a');
    let menuOpen = false;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      /* ── Hero Intro Sequence ────────────────────────────── */
      const heroWords = splitWords($('.hero__title'));
      gsap.set(heroWords, { yPercent: 130, rotateZ: 4, opacity: 0 });

      const heroIntro = gsap.timeline();
      heroIntro
        .to(
          heroWords,
          {
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 1.3 * S,
            ease: 'expo.out',
            stagger: 0.065 * S,
          },
          0.12
        )
        .from('.hero__accent', { y: 24, opacity: 0, duration: 0.95 * S, ease: 'power3.out' }, 0.36)
        .from('.hero__actions', { y: 22, opacity: 0, duration: 0.95 * S, ease: 'power3.out' }, 0.46)
        .from('.hero__slides-hud', { x: 24, opacity: 0, duration: 0.95 * S, ease: 'power3.out' }, 0.58)
        .from('.nav > *', { y: -18, opacity: 0, duration: 0.9 * S, stagger: 0.06, ease: 'power3.out' }, 0.15)
        .from('.hero__side', { opacity: 0, duration: 1 * S }, 0.85);

      /* ── Hero Scroll Parallax & 3D Depth ────────────────── */
      gsap.to('.hero__media', {
        yPercent: 14,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__content', {
        yPercent: -18,
        opacity: 0.12,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      /* ── Nav Scroll States ──────────────────────────────── */
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

      /* ── High-Contrast Ticker with Scroll-Velocity Boost ── */
      const ticker = $('.ticker__track');
      if (ticker) {
        const tickerTween = gsap.to(ticker, {
          xPercent: -50,
          duration: 32,
          ease: 'none',
          repeat: -1,
        });

        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self: any) => {
            const v = Math.min(4.5, Math.abs(self.getVelocity()) / 450);
            gsap.to(tickerTween, {
              timeScale: (self.direction === 1 ? 1 : -1) * (1 + v),
              duration: 0.25,
              overwrite: true,
              onComplete: () => {
                gsap.to(tickerTween, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
              },
            });
          },
        });
      }

      /* ── Section Header Kickers & 3D Word Reveals ───────── */
      $$('.sec-head .label').forEach((labelEl) => {
        gsap.from(labelEl, {
          x: -24,
          opacity: 0,
          duration: 0.9 * S,
          ease: 'power3.out',
          scrollTrigger: { trigger: labelEl, start: 'top 90%', once: true },
        });
      });

      $$('[data-words]').forEach((el) => {
        const words = splitWords(el);
        gsap.from(words, {
          yPercent: 120,
          rotateZ: 3,
          opacity: 0,
          duration: 1.15 * S,
          ease: 'expo.out',
          stagger: 0.03 * S,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      /* ── Generic Fades ──────────────────────────────────── */
      const dedicatedSelector =
        '.when__col, .island__visuals, .profile-panel, .vmv-col, .service-card, .fleet-card, .fleet-extra-strip';
      $$('[data-fade]')
        .filter((el) => !el.matches(dedicatedSelector))
        .forEach((el) => {
          gsap.from(el, {
            y: 34,
            opacity: 0,
            duration: 1 * S,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });

      /* ── 01 The Island: Ayubowan Cards, Parallax & Stats ── */
      $$('.island__card').forEach((card, i) => {
        const imgWrap = $('.island__card-img', card);
        const imgEl = $('.island__card-img img', card);
        gsap.from(card, {
          y: 44,
          opacity: 0,
          duration: 1.05 * S,
          delay: i * 0.14 * S,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.island__visuals', start: 'top 85%', once: true },
        });
        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.35 * S,
              delay: i * 0.14 * S,
              ease: 'expo.inOut',
              scrollTrigger: { trigger: '.island__visuals', start: 'top 85%', once: true },
            }
          );
        }
        if (imgEl) {
          gsap.fromTo(
            imgEl,
            { scale: 1.16, yPercent: -6 },
            {
              scale: 1.02,
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        }
      });

      gsap.from('.island__quote .quote-mark', {
        scale: 0.3,
        rotate: -30,
        opacity: 0,
        duration: 1.1 * S,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.island__quote', start: 'top 85%', once: true },
      });

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
              duration: 2.1 * S,
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
        y: 28,
        opacity: 0,
        duration: 1 * S,
        stagger: 0.09 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stats', start: 'top 90%', once: true },
      });

      /* ── 02 Founder, Company & Vision/Mission/Values ────── */
      $$('.profile-panel').forEach((panel, i) => {
        gsap.from(panel, {
          y: 44,
          opacity: 0,
          duration: 1.05 * S,
          delay: i * 0.14 * S,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 86%', once: true },
        });

        const avatarOrBadge = $('.profile-panel__avatar, .profile-panel__badge', panel);
        if (avatarOrBadge) {
          gsap.from(avatarOrBadge, {
            scale: 0.84,
            opacity: 0,
            duration: 0.95 * S,
            delay: (i * 0.14 + 0.15) * S,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: panel, start: 'top 86%', once: true },
          });
        }

        const creds = $$('.credential-list li', panel);
        if (creds.length) {
          gsap.from(creds, {
            x: -18,
            opacity: 0,
            duration: 0.75 * S,
            stagger: 0.055 * S,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 78%', once: true },
          });
        }
      });

      gsap.from('.vmv-col', {
        y: 38,
        opacity: 0,
        duration: 1.05 * S,
        stagger: 0.13 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.vmv-grid', start: 'top 85%', once: true },
      });

      /* ── 03 Services (We Offer & For Your Journey) ──────── */
      $$('.service-group').forEach((group) => {
        const head = $('.service-group__head', group);
        const cards = $$('.service-card', group);

        if (head) {
          gsap.from(head, {
            y: 22,
            opacity: 0,
            duration: 0.85 * S,
            ease: 'power3.out',
            scrollTrigger: { trigger: group, start: 'top 88%', once: true },
          });
        }

        cards.forEach((card, i) => {
          const media = $('.service-card__media', card);
          const imgEl = $('.service-card__media img', card);

          gsap.from(card, {
            y: 42,
            opacity: 0,
            duration: 1 * S,
            delay: i * 0.11 * S,
            ease: 'power3.out',
            scrollTrigger: { trigger: group, start: 'top 82%', once: true },
          });

          if (media) {
            gsap.fromTo(
              media,
              { clipPath: 'inset(0% 0% 100% 0%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.25 * S,
                delay: i * 0.11 * S,
                ease: 'expo.inOut',
                scrollTrigger: { trigger: group, start: 'top 82%', once: true },
              }
            );
          }

          if (imgEl) {
            gsap.fromTo(
              imgEl,
              { scale: 1.14, yPercent: -5 },
              {
                scale: 1.02,
                yPercent: 5,
                ease: 'none',
                scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
              }
            );
          }
        });
      });

      /* ── 04 KuRa's Popular Tours ────────────────────────── */
      gsap.from('.tours-filter-bar', {
        y: 22,
        opacity: 0,
        duration: 0.9 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.popular-tours', start: 'top 80%', once: true },
      });

      /* ── 05 Places: Pinned Horizontal Reel ──────────────── */
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
          const imgEl = $('.card__img img', card);
          if (!imgEl) return;
          gsap.fromTo(
            imgEl,
            { xPercent: 4, scale: 1.14 },
            {
              xPercent: -4,
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
          y: 46,
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

      /* ── 06 Experiences ─────────────────────────────────── */
      $$('[data-exp]').forEach((exp) => {
        const media = $('.exp__media', exp);
        const imgEl = $('.exp__img', exp);
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
        if (imgEl) {
          gsap.fromTo(
            imgEl,
            { yPercent: -8, scale: 1.08 },
            {
              yPercent: 8,
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: exp, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        }
        if (heading) {
          const words = splitWords(heading);
          gsap.from(words, {
            yPercent: 115,
            opacity: 0,
            duration: 1.05 * S,
            stagger: 0.035 * S,
            ease: 'expo.out',
            scrollTrigger: { trigger: exp, start: 'top 72%', once: true },
          });
        }
        gsap.from($$('.exp__text > p:not(.label), .exp__meta li', exp), {
          y: 20,
          opacity: 0,
          duration: 0.85 * S,
          stagger: 0.055 * S,
          ease: 'power3.out',
          scrollTrigger: { trigger: exp, start: 'top 68%', once: true },
        });
      });

      /* ── 07 KuRa's Vehicle Fleet ────────────────────────── */
      $$('.fleet-card').forEach((card, i) => {
        const media = $('.fleet-card__media', card);
        const imgEl = $('.fleet-card__media img', card);

        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 1 * S,
          delay: i * 0.11 * S,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.fleet-grid', start: 'top 84%', once: true },
        });

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.25 * S,
              delay: i * 0.11 * S,
              ease: 'expo.inOut',
              scrollTrigger: { trigger: '.fleet-grid', start: 'top 84%', once: true },
            }
          );
        }

        if (imgEl) {
          gsap.fromTo(
            imgEl,
            { scale: 1.14 },
            {
              scale: 1,
              duration: 1.45 * S,
              delay: i * 0.11 * S,
              ease: 'power3.out',
              scrollTrigger: { trigger: '.fleet-grid', start: 'top 84%', once: true },
            }
          );
        }
      });

      gsap.from('.fleet-extra-item', {
        y: 24,
        opacity: 0,
        duration: 0.9 * S,
        stagger: 0.1 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.fleet-extra-strip', start: 'top 88%', once: true },
      });

      /* ── 08 Verified Guest Reviews ──────────────────────── */
      gsap.from('.reviews-bar', {
        y: 24,
        opacity: 0,
        duration: 0.9 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.reviews', start: 'top 82%', once: true },
      });

      const scoreEl = $('.reviews-score__num');
      if (scoreEl) {
        const scoreState = { val: 0 };
        ScrollTrigger.create({
          trigger: '.reviews-bar',
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(scoreState, {
              val: 5.0,
              duration: 1.6 * S,
              ease: 'power3.out',
              onUpdate: () => {
                scoreEl.textContent = scoreState.val.toFixed(1);
              },
            });
          },
        });
      }

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

      /* ── 09 When to Go ──────────────────────────────────── */
      gsap.from('.when__col', {
        y: 34,
        opacity: 0,
        duration: 1 * S,
        stagger: 0.11 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.when__grid', start: 'top 86%', once: true },
      });
      gsap.from('.when__note', {
        opacity: 0,
        duration: 1.1 * S,
        scrollTrigger: { trigger: '.when__note', start: 'top 92%', once: true },
      });

      /* ── 10 Contact Us, 24/7 Channels & Awards ──────────── */
      gsap.from('.channel-box', {
        y: 28,
        opacity: 0,
        duration: 0.85 * S,
        stagger: 0.065 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.channels-grid', start: 'top 86%', once: true },
      });

      gsap.from('.inquiry-panel', {
        y: 36,
        opacity: 0,
        duration: 1.05 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.inquiry-panel', start: 'top 84%', once: true },
      });

      gsap.from('.award-seal', {
        scale: 0.85,
        y: 18,
        opacity: 0,
        duration: 0.9 * S,
        stagger: 0.1 * S,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.awards-row', start: 'top 88%', once: true },
      });

      gsap.from('.inquiry-form .form-field', {
        y: 18,
        opacity: 0,
        duration: 0.75 * S,
        stagger: 0.05 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.inquiry-form', start: 'top 85%', once: true },
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

      /* ── Page Progress ──────────────────────────────────── */
      gsap.to('#pageProgress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.4 },
      });
    });

    /* Mobile menu */
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
        .to(menuLinks, { yPercent: 0, opacity: 1, duration: 0.8 * S, stagger: 0.045 * S, ease: 'power3.out' }, '-=0.36');
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

    /* ── Custom Cursor + Magnetic Buttons + 3D Card Tilt ── */
    if (fine) {
      const cursor = $('#cursor');
      const heroContent = $('.hero__content');
      if (cursor) {
        const dot = $('.cursor__dot', cursor);
        const ring = $('.cursor__ring', cursor);
        const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
        const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
        const xRing = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3' });
        const yRing = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3' });
        const heroRotY = heroContent ? gsap.quickTo(heroContent, 'rotationY', { duration: 0.7, ease: 'power3.out' }) : null;
        const heroRotX = heroContent ? gsap.quickTo(heroContent, 'rotationX', { duration: 0.7, ease: 'power3.out' }) : null;
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

          if (heroRotY && heroRotX && window.scrollY < window.innerHeight) {
            const nx = (e.clientX / window.innerWidth - 0.5) * 5;
            const ny = -(e.clientY / window.innerHeight - 0.5) * 4;
            heroRotY(nx);
            heroRotX(ny);
          }
        };
        onPointerOver = (e: PointerEvent) => {
          const target = e.target as HTMLElement | null;
          const hot = target?.closest('a, button, summary, [data-card], .tour-pkg, .fleet-card, .service-card');
          gsap.to(ring, {
            scale: hot ? 1.7 : 1,
            borderColor: hot ? 'rgba(242,213,134,1)' : 'rgba(212,168,79,0.85)',
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
        document.addEventListener('pointerout', onPointerOut);
      }

      // Magnetic Buttons
      $$('.btn').forEach((btn) => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.45, ease: 'power3' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.45, ease: 'power3' });
        btn.addEventListener('pointermove', (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.18);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.24);
        });
        btn.addEventListener('pointerleave', () => {
          xTo(0);
          yTo(0);
        });
      });

      // Interactive 3D Hover Tilt on Cards
      $$('.service-card, .fleet-card, .island__card, .channel-box').forEach((card) => {
        const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.45, ease: 'power2.out' });
        const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.45, ease: 'power2.out' });
        card.addEventListener('pointermove', (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rotY(px * 6);
          rotX(-py * 6);
        });
        card.addEventListener('pointerleave', () => {
          rotX(0);
          rotY(0);
        });
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      if (toggle) toggle.removeEventListener('click', handleToggle);
      menuLinks.forEach((a) => a.removeEventListener('click', closeMenu));
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('load', refresh);
      if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);
      if (onPointerOver) document.removeEventListener('pointerover', onPointerOver);
      if (onPointerOut) document.removeEventListener('pointerout', onPointerOut);
      mm.revert();
      ctx.revert();
    };
  }, []);

  const renderTickerGroup = (keyPrefix: string) => (
    <div className="ticker__group" key={keyPrefix}>
      <span>{t('ticker.item1')}</span>
      <i>✦</i>
      <span className="inline-flex items-center gap-1.5">
        <TripadvisorOwlLogo size={14} /> {t('ticker.item2')}
      </span>
      <i>✦</i>
      <span className="inline-flex items-center gap-1.5">
        <img
          src="/assets/aistudio/tc-2025.png"
          alt=""
          className="w-4 h-4 rounded-full object-contain inline-block"
        />
        {t('ticker.item3')}
      </span>
      <i>✦</i>
      <span className="inline-flex items-center gap-1.5">
        <GoogleGLogo size={13} /> {t('ticker.item4')}
      </span>
      <i>✦</i>
      <span className="inline-flex items-center gap-1.5">
        <FacebookFLogo size={13} /> {t('ticker.item5')}
      </span>
      <i>✦</i>
      <span>{t('ticker.item6')}</span>
      <i>✦</i>
      <span>{t('ticker.item7')}</span>
      <i>✦</i>
    </div>
  );

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

      {/* ── TOP NAVIGATION (Strict 3-Zone Contract) ─────── */}
      <header className="nav" id="nav">
        <a className="brand" href="#top" aria-label="4Me Lanka Tours — back to top">
          <span className="brand__name">{t('nav.brand')}</span>
        </a>
        <nav className="nav__links" aria-label="Sections">
          <a href="#top">{t('nav.home')}</a>
          <a href="#tours">{t('nav.tours')}</a>
          <a href="#places">{t('nav.destinations')}</a>
          <a href="#experiences">{t('nav.todo')}</a>
          <a href="#reviews">{t('nav.memories')}</a>
          <a href="#when">{t('nav.blogs')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>
        <div className="nav__right">
          <a
            className="btn btn--line"
            href="https://wa.me/94712857705"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('nav.cta')}
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

      {/* ── MOBILE MENU ────────────────────────────────── */}
      <div className="menu" id="menu" aria-hidden="true">
        <div className="menu__inner">
          <p className="label">{t('nav.mobileIndexLabel')}</p>
          <nav className="menu__links" aria-label="Mobile sections">
            <a href="#top">{t('nav.home')}</a>
            <a href="#tours">{t('nav.tours')}</a>
            <a href="#places">{t('nav.destinations')}</a>
            <a href="#experiences">{t('nav.todo')}</a>
            <a href="#reviews">{t('nav.memories')}</a>
            <a href="#when">{t('nav.blogs')}</a>
            <a href="#contact">{t('nav.contact')}</a>
          </nav>
          <p className="menu__foot">
            {t('nav.mobileFootLine1')}
            <br />
            {t('nav.mobileFootLine2')}
          </p>
        </div>
      </div>

      <main id="top">
        {/* ── HERO + MULTI-IMAGE AUTO SLIDESHOW ──────────── */}
        <section className="hero" id="hero">
          <div className="hero__media">
            {HERO_SLIDES_DEFAULT.map((slide, idx) => (
              <div
                key={slide.slotId}
                ref={(el) => {
                  slideRefs.current[idx] = el;
                }}
                className={`hero__slide ${idx === heroSlideIdx ? 'is-active' : ''}`}
              >
                <img
                  src={img(slide.slotId, slide.defaultSrc)}
                  alt={t(slide.captionKey)}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                />
              </div>
            ))}
          </div>
          <div className="hero__veil" aria-hidden="true"></div>
          <span className="hero__side" aria-hidden="true">
            {t('hero.sideBadge')}
          </span>

          <div className="hero__content">
            <h1 className="hero__title">
              <span className="hero__line">{t('hero.title')}</span>
            </h1>
            <p className="hero__accent">
              <em>{t('hero.accentEm')}</em> {t('hero.accentRest')}
            </p>
            <div className="hero__actions">
              <a className="btn btn--gold" href="#tours">
                {t('hero.btnPrimary')}
              </a>
              <a className="btn btn--ghost" href="#contact">
                {t('hero.btnSecondary')}
              </a>
            </div>
          </div>

          <div className="hero__foot">
            <div className="hero__slides-hud">
              <div className="hero__slide-dots" role="tablist" aria-label="Hero landmark slideshow">
                {HERO_SLIDES_DEFAULT.map((s, idx) => (
                  <button
                    key={s.slotId}
                    type="button"
                    role="tab"
                    aria-selected={idx === heroSlideIdx}
                    aria-label={`Show slide ${idx + 1}: ${t(s.captionKey)}`}
                    onClick={() => setHeroSlideIdx(idx)}
                    className={`hero__slide-dot ${idx === heroSlideIdx ? 'is-active' : ''}`}
                  >
                    <span
                      ref={(el) => {
                        dotBarRefs.current[idx] = el;
                      }}
                      className="hero__slide-dot-bar"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HIGH-CONTRAST HORIZONTAL BRAND TICKER STRAP ── */}
        <div className="ticker" aria-label="Verified platform ratings and credentials">
          <div className="ticker__track">
            {renderTickerGroup('track-a')}
            {renderTickerGroup('track-b')}
          </div>
        </div>

        {/* ── 01 THE ISLAND (Ayubowan & Numbers Says) ──────── */}
        <section className="island" id="island">
          <div className="container">
            <header className="sec-head">
              <p className="label">
                <span>01</span> {t('island.label')}
              </p>
              <h2 className="display" data-words>
                {t('island.headingLine1')}
                <br />
                <em>{t('island.headingEm')}</em>
              </h2>
            </header>

            <div className="island__welcome">
              <div data-fade>
                <p className="island__ayubowan">{t('island.ayubowan')}</p>
                <p className="island__lede">{t('island.welcome')}</p>
                <div className="island__body">
                  <p>{t('island.p1')}</p>
                  <p>{t('island.p2')}</p>
                </div>
              </div>

              <div className="island__visuals" data-fade>
                <div className="island__card">
                  <div className="island__card-img">
                    <img
                      src={img('island.dancer.img', '/assets/aistudio/kandyan-dancer.jpg')}
                      alt="Traditional Sri Lankan Kandyan dancer offering the Ayubowan welcome greeting"
                      loading="lazy"
                    />
                  </div>
                  <div className="island__card-cap">
                    <span>{t('island.card1CapLeft')}</span>
                    <span>{t('island.card1CapRight')}</span>
                  </div>
                </div>

                <div className="island__card">
                  <div className="island__card-img">
                    <img
                      src={img('island.map.img', '/assets/aistudio/srilanka-illustrated-map.jpg')}
                      alt="Sri Lanka Paradise Island Wonder of Asia illustrated map of attractions"
                      loading="lazy"
                    />
                  </div>
                  <div className="island__card-cap">
                    <span>{t('island.card2CapLeft')}</span>
                    <button
                      type="button"
                      onClick={() => setActiveModal({ type: 'map' })}
                      className="underline font-bold hover:text-amber-700"
                    >
                      {t('island.card2CapBtn')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <blockquote className="island__quote" data-fade>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              {t('island.quote')}
            </blockquote>

            <p className="stats-subhead">{t('island.statsSubhead')}</p>
            <ul className="stats">
              <li className="stat">
                <span className="stat__num" data-count={t('island.stat1Num')}>
                  {t('island.stat1Num')}
                </span>
                <span className="stat__label">{t('island.stat1Label')}</span>
              </li>
              <li className="stat">
                <span className="stat__num" data-count={t('island.stat2Num')}>
                  {t('island.stat2Num')}
                </span>
                <span className="stat__label">{t('island.stat2Label')}</span>
              </li>
              <li className="stat">
                <span className="stat__num" data-count={t('island.stat3Num')}>
                  {t('island.stat3Num')}
                </span>
                <span className="stat__label">{t('island.stat3Label')}</span>
              </li>
              <li className="stat">
                <span className="stat__num" data-count={Number(t('island.stat4Num')) || 7} data-pad="2">
                  {t('island.stat4Num')}
                </span>
                <span className="stat__label">{t('island.stat4Label')}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── 02 THE FOUNDER, THE COMPANY & VISION/MISSION/VALUES ── */}
        <section className="heritage" id="founder">
          <div className="container">
            <header className="sec-head">
              <p className="label">
                <span>02</span> {t('founder.secLabel')}
              </p>
              <h2 className="display" data-words>
                {t('founder.secHeadingLine1')}
                <br />
                <em>{t('founder.secHeadingEm')}</em>
              </h2>
            </header>

            <div className="founder-company-grid">
              {/* THE FOUNDER */}
              <article className="profile-panel" data-fade>
                <div>
                  <div className="profile-panel__top">
                    <div className="profile-panel__avatar">
                      <img
                        src={img('founder.avatar.img', '/assets/aistudio/kura-founder.jpg')}
                        alt={t('founder.name')}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="label">
                        <span>Founder</span> {t('founder.kicker')}
                      </p>
                      <h3 className="profile-panel__title">{t('founder.name')}</h3>
                      <p className="profile-panel__sub">{t('founder.sub')}</p>
                    </div>
                  </div>

                  <ul className="credential-list">
                    <li>
                      <span className="bullet">01</span>
                      <span>{t('founder.cred1')}</span>
                    </li>
                    <li>
                      <span className="bullet">02</span>
                      <span>{t('founder.cred2')}</span>
                    </li>
                    <li>
                      <span className="bullet">03</span>
                      <span>{t('founder.cred3')}</span>
                    </li>
                    <li>
                      <span className="bullet">04</span>
                      <span>{t('founder.cred4')}</span>
                    </li>
                    <li>
                      <span className="bullet">05</span>
                      <span>{t('founder.cred5')}</span>
                    </li>
                    <li>
                      <span className="bullet">06</span>
                      <span>{t('founder.cred6')}</span>
                    </li>
                  </ul>
                </div>
              </article>

              {/* THE COMPANY */}
              <article className="profile-panel" data-fade>
                <div>
                  <div className="profile-panel__top">
                    <div className="profile-panel__avatar">
                      <img
                        src={img('company.logo.img', '/assets/aistudio/4me-logo.png')}
                        alt={t('company.name')}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="label">
                        <span>The Company</span> {t('company.kicker')}
                      </p>
                      <h3 className="profile-panel__title">{t('company.name')}</h3>
                      <p className="profile-panel__sub">{t('company.sub')}</p>
                    </div>
                  </div>

                  <ul className="credential-list">
                    <li>
                      <span className="bullet">01</span>
                      <span>{t('company.cred1')}</span>
                    </li>
                    <li>
                      <span className="bullet">02</span>
                      <span>{t('company.cred2')}</span>
                    </li>
                    <li>
                      <span className="bullet">03</span>
                      <span>{t('company.cred3')}</span>
                    </li>
                    <li>
                      <span className="bullet">04</span>
                      <span>{t('company.cred4')}</span>
                    </li>
                    <li>
                      <span className="bullet">05</span>
                      <span>{t('company.cred5')}</span>
                    </li>
                    <li>
                      <span className="bullet">06</span>
                      <span>{t('company.cred6')}</span>
                    </li>
                    <li>
                      <span className="bullet">07</span>
                      <span className="inline-flex flex-wrap items-center gap-1.5">
                        <TripadvisorOwlLogo size={16} />
                        <strong>{t('company.cred7')}</strong>
                      </span>
                    </li>
                    <li>
                      <span className="bullet">08</span>
                      <span>{t('company.cred8')}</span>
                    </li>
                  </ul>

                  <div className="flex items-center gap-3 pt-4 mt-4 border-t border-stone-300/60">
                    <img
                      src="/assets/aistudio/tc-2025.png"
                      alt="Tripadvisor Travelers' Choice Best of the Best 2025"
                      className="w-12 h-12 rounded-full object-contain"
                    />
                    <img
                      src="/assets/aistudio/tc-2024.png"
                      alt="Tripadvisor Travelers' Choice Best of the Best 2024"
                      className="w-12 h-12 rounded-full object-contain"
                    />
                    <img
                      src="/assets/aistudio/tc-2023.png"
                      alt="Tripadvisor Travelers' Choice Best of the Best 2023"
                      className="w-12 h-12 rounded-full object-contain"
                    />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-stone-800 leading-relaxed">
                      Tripadvisor Travelers&apos; Choice
                      <br />
                      Best of the Best · 2023 · 2024 · 2025
                    </span>
                  </div>
                </div>
              </article>
            </div>

            {/* VISION · MISSION · VALUES */}
            <div className="vmv-grid">
              <div className="vmv-col" data-fade>
                <span className="vmv-col__num">{t('vmv.visionKicker')}</span>
                <h3>{t('vmv.visionTitle')}</h3>
                <p>{t('vmv.visionText')}</p>
              </div>

              <div className="vmv-col" data-fade>
                <span className="vmv-col__num">{t('vmv.missionKicker')}</span>
                <h3>{t('vmv.missionTitle')}</h3>
                <p>{t('vmv.missionText')}</p>
              </div>

              <div className="vmv-col" data-fade>
                <span className="vmv-col__num">{t('vmv.valuesKicker')}</span>
                <h3>{t('vmv.valuesTitle')}</h3>
                <p>{t('vmv.valuesText')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 WE OFFER & FOR YOUR JOURNEY ───────────────── */}
        <section className="services" id="services">
          <div className="container">
            <header className="sec-head">
              <p className="label">
                <span>03</span> {t('services.secLabel')}
              </p>
              <h2 className="display" data-words>
                {t('services.secHeadingLine1')}
                <br />
                <em>{t('services.secHeadingEm')}</em>
              </h2>
            </header>

            {/* WE OFFER */}
            <div className="service-group">
              <div className="service-group__head">
                <h3>{t('services.group1Title')}</h3>
                <span className="label">{t('services.group1Tag')}</span>
              </div>

              <div className="service-cards">
                <article className="service-card" data-fade>
                  <div className="service-card__media">
                    <img
                      src={img('services.offer1.img', '/assets/aistudio/offer-transport.jpg')}
                      alt={t('services.offer1Title')}
                      loading="lazy"
                    />
                  </div>
                  <div className="service-card__body">
                    <div>
                      <span className="service-card__kicker">{t('services.offer1Kicker')}</span>
                      <h4 className="service-card__title">{t('services.offer1Title')}</h4>
                      <p className="service-card__desc">{t('services.offer1Desc')}</p>
                    </div>
                    <p className="service-card__motto">{t('services.offer1Motto')}</p>
                  </div>
                </article>

                <article className="service-card" data-fade>
                  <div className="service-card__media">
                    <img
                      src={img('services.offer2.img', '/assets/aistudio/offer-hotels.jpg')}
                      alt={t('services.offer2Title')}
                      loading="lazy"
                    />
                  </div>
                  <div className="service-card__body">
                    <div>
                      <span className="service-card__kicker">{t('services.offer2Kicker')}</span>
                      <h4 className="service-card__title">{t('services.offer2Title')}</h4>
                      <p className="service-card__desc">{t('services.offer2Desc')}</p>
                    </div>
                    <p className="service-card__motto">{t('services.offer2Motto')}</p>
                  </div>
                </article>

                <article className="service-card" data-fade>
                  <div className="service-card__media">
                    <img
                      src={img('services.offer3.img', '/assets/aistudio/offer-activities.jpg')}
                      alt={t('services.offer3Title')}
                      loading="lazy"
                    />
                  </div>
                  <div className="service-card__body">
                    <div>
                      <span className="service-card__kicker">{t('services.offer3Kicker')}</span>
                      <h4 className="service-card__title">{t('services.offer3Title')}</h4>
                      <p className="service-card__desc">{t('services.offer3Desc')}</p>
                    </div>
                    <p className="service-card__motto">{t('services.offer3Motto')}</p>
                  </div>
                </article>
              </div>
            </div>

            {/* FOR YOUR JOURNEY */}
            <div className="service-group">
              <div className="service-group__head">
                <h3>{t('services.group2Title')}</h3>
                <span className="label">{t('services.group2Tag')}</span>
              </div>

              <div className="service-cards">
                <article className="service-card" data-fade>
                  <div className="service-card__media">
                    <img
                      src={img('services.format1.img', '/assets/aistudio/tour-multiday.jpg')}
                      alt={t('services.format1Title')}
                      loading="lazy"
                    />
                  </div>
                  <div className="service-card__body">
                    <div>
                      <span className="service-card__kicker">{t('services.format1Kicker')}</span>
                      <h4 className="service-card__title">{t('services.format1Title')}</h4>
                      <p className="service-card__desc">{t('services.format1Desc')}</p>
                    </div>
                    <p className="service-card__motto">{t('services.format1Motto')}</p>
                  </div>
                </article>

                <article className="service-card" data-fade>
                  <div className="service-card__media">
                    <img
                      src={img('services.format2.img', '/assets/aistudio/tour-day.jpg')}
                      alt={t('services.format2Title')}
                      loading="lazy"
                    />
                  </div>
                  <div className="service-card__body">
                    <div>
                      <span className="service-card__kicker">{t('services.format2Kicker')}</span>
                      <h4 className="service-card__title">{t('services.format2Title')}</h4>
                      <p className="service-card__desc">{t('services.format2Desc')}</p>
                    </div>
                    <p className="service-card__motto">{t('services.format2Motto')}</p>
                  </div>
                </article>

                <article className="service-card" data-fade>
                  <div className="service-card__media">
                    <img
                      src={img('services.format3.img', '/assets/aistudio/tour-transfers.jpg')}
                      alt={t('services.format3Title')}
                      loading="lazy"
                    />
                  </div>
                  <div className="service-card__body">
                    <div>
                      <span className="service-card__kicker">{t('services.format3Kicker')}</span>
                      <h4 className="service-card__title">{t('services.format3Title')}</h4>
                      <p className="service-card__desc">{t('services.format3Desc')}</p>
                    </div>
                    <p className="service-card__motto">{t('services.format3Motto')}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 KURA'S POPULAR TOURS ──────────────────────── */}
        <section className="popular-tours" id="tours">
          <div className="container">
            <header className="sec-head">
              <p className="label label--light">
                <span>04</span> {t('tours.secLabel')}
              </p>
              <h2 className="display display--light" data-words>
                {t('tours.secHeadingLine1')}
                <br />
                <em>{t('tours.secHeadingEm')}</em>
              </h2>
            </header>

            <div className="tours-filter-bar">
              <div className="tours-tabs" role="tablist" aria-label="Filter tour packages">
                <button
                  type="button"
                  onClick={() => setTourFilter('all')}
                  className={`tours-tab ${tourFilter === 'all' ? 'is-active' : ''}`}
                >
                  {t('tours.tabAll')}
                </button>
                <button
                  type="button"
                  onClick={() => setTourFilter('multiday')}
                  className={`tours-tab ${tourFilter === 'multiday' ? 'is-active' : ''}`}
                >
                  {t('tours.tabMultiday')}
                </button>
                <button
                  type="button"
                  onClick={() => setTourFilter('day')}
                  className={`tours-tab ${tourFilter === 'day' ? 'is-active' : ''}`}
                >
                  {t('tours.tabDay')}
                </button>
              </div>

              <a className="btn btn--gold" href="#contact">
                {t('tours.ctaCustom')}
              </a>
            </div>

            <div className="tours-grid">
              {filteredTours.map((tour) => (
                <article key={tour.id} className="tour-pkg">
                  <div className="tour-pkg__media">
                    <img src={tour.image} alt={tour.title} loading="lazy" />
                    <span className="tour-pkg__duration">{tour.duration}</span>
                  </div>
                  <div className="tour-pkg__body">
                    <div>
                      <p className="tour-pkg__sub">{tour.subtitle}</p>
                      <h3 className="tour-pkg__title">{tour.title}</h3>
                      <p className="tour-pkg__desc">{tour.description}</p>
                      <div className="tour-pkg__stops">
                        <strong className="text-amber-300">Route &amp; Highlights: </strong>
                        {tour.stops}
                      </div>
                    </div>

                    <div className="tour-pkg__actions">
                      <button
                        type="button"
                        onClick={() => handleSelectTourForInquiry(`${tour.title} (${tour.duration})`)}
                        className="btn btn--gold"
                      >
                        Book / Inquire
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveModal({
                            type: 'poster',
                            title: tour.title,
                            subtitle: `${tour.duration} · ${tour.subtitle}`,
                            src: tour.poster,
                          })
                        }
                        className="btn btn--ghost"
                      >
                        View Tour Brochure
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 PLACES / DESTINATIONS (Pinned Horizontal Reel) ── */}
        <section className="places" id="places">
          <div className="places__pin">
            <div className="places__head container">
              <p className="label label--light">
                <span>05</span> {t('places.secLabel')}
              </p>
              <div className="places__head-row">
                <h2 className="display display--light" data-words>
                  {t('places.secHeadingLine1')}
                  <br />
                  <em>{t('places.secHeadingEm')}</em>
                </h2>
                <div className="places__note">
                  <p>{t('places.secNote')}</p>
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
                      alt={t('places.c1.title')}
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>01</span>
                    <span>{t('places.c1.region')}</span>
                  </div>
                  <div className="card__body">
                    <h3>{t('places.c1.title')}</h3>
                    <p>{t('places.c1.desc')}</p>
                  </div>
                </article>

                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/ella_53a0777f.jpg"
                      alt={t('places.c2.title')}
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>02</span>
                    <span>{t('places.c2.region')}</span>
                  </div>
                  <div className="card__body">
                    <h3>{t('places.c2.title')}</h3>
                    <p>{t('places.c2.desc')}</p>
                  </div>
                </article>

                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/kandy_3e5113c7.jpg"
                      alt={t('places.c3.title')}
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>03</span>
                    <span>{t('places.c3.region')}</span>
                  </div>
                  <div className="card__body">
                    <h3>{t('places.c3.title')}</h3>
                    <p>{t('places.c3.desc')}</p>
                  </div>
                </article>

                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/tea-hills_bfabb10f.jpg"
                      alt={t('places.c4.title')}
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>04</span>
                    <span>{t('places.c4.region')}</span>
                  </div>
                  <div className="card__body">
                    <h3>{t('places.c4.title')}</h3>
                    <p>{t('places.c4.desc')}</p>
                  </div>
                </article>

                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/yala-safari_fbf20478.jpg"
                      alt={t('places.c5.title')}
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>05</span>
                    <span>{t('places.c5.region')}</span>
                  </div>
                  <div className="card__body">
                    <h3>{t('places.c5.title')}</h3>
                    <p>{t('places.c5.desc')}</p>
                  </div>
                </article>

                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/galle_9e7733fe.jpg"
                      alt={t('places.c6.title')}
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>06</span>
                    <span>{t('places.c6.region')}</span>
                  </div>
                  <div className="card__body">
                    <h3>{t('places.c6.title')}</h3>
                    <p>{t('places.c6.desc')}</p>
                  </div>
                </article>

                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/mirissa_3d3801f6.jpg"
                      alt={t('places.c7.title')}
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>07</span>
                    <span>{t('places.c7.region')}</span>
                  </div>
                  <div className="card__body">
                    <h3>{t('places.c7.title')}</h3>
                    <p>{t('places.c7.desc')}</p>
                  </div>
                </article>

                <article className="card" data-card>
                  <div className="card__img">
                    <img
                      src="/assets/aistudio/anuradhapura-2_376f70af.jpg"
                      alt={t('places.c8.title')}
                      decoding="async"
                    />
                  </div>
                  <div className="card__top">
                    <span>08</span>
                    <span>{t('places.c8.region')}</span>
                  </div>
                  <div className="card__body">
                    <h3>{t('places.c8.title')}</h3>
                    <p>{t('places.c8.desc')}</p>
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
            </div>
          </div>
        </section>

        {/* ── 06 EXPERIENCES (TO DO) ───────────────────────── */}
        <section className="experiences" id="experiences">
          <div className="container">
            <header className="sec-head">
              <p className="label">
                <span>06</span> {t('exp.secLabel')}
              </p>
              <h2 className="display" data-words>
                {t('exp.secHeadingLine1')}
                <br />
                <em>{t('exp.secHeadingEm')}</em>
              </h2>
            </header>

            <article className="exp" data-exp>
              <div className="exp__media">
                <div className="exp__img">
                  <img
                    src="/assets/aistudio/train_016a8173.jpg"
                    alt={t('exp.e1.title')}
                    decoding="async"
                  />
                </div>
                <span className="exp__tag">{t('exp.e1.tag')}</span>
              </div>
              <div className="exp__text">
                <p className="label">
                  <span>i</span> {t('exp.e1.kicker')}
                </p>
                <h3>{t('exp.e1.title')}</h3>
                <p>{t('exp.e1.desc')}</p>
                <ul className="exp__meta">
                  <li>Depart early</li>
                  <li>Sit on the right after Nanu Oya</li>
                  <li>Chauffeur meets you at Ella station</li>
                </ul>
              </div>
            </article>

            <article className="exp exp--flip" data-exp>
              <div className="exp__media">
                <div className="exp__img">
                  <img
                    src="/assets/aistudio/tea_6f6d4029.jpg"
                    alt={t('exp.e2.title')}
                    decoding="async"
                  />
                </div>
                <span className="exp__tag">{t('exp.e2.tag')}</span>
              </div>
              <div className="exp__text">
                <p className="label">
                  <span>ii</span> {t('exp.e2.kicker')}
                </p>
                <h3>{t('exp.e2.title')}</h3>
                <p>{t('exp.e2.desc')}</p>
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
                    alt={t('exp.e3.title')}
                    decoding="async"
                  />
                </div>
                <span className="exp__tag">{t('exp.e3.tag')}</span>
              </div>
              <div className="exp__text">
                <p className="label">
                  <span>iii</span> {t('exp.e3.kicker')}
                </p>
                <h3>{t('exp.e3.title')}</h3>
                <p>{t('exp.e3.desc')}</p>
                <ul className="exp__meta">
                  <li>Koggala &amp; Ahangama</li>
                  <li>Dusk, not midday</li>
                  <li>Authentic local introduction</li>
                </ul>
              </div>
            </article>

            <article className="exp exp--flip" data-exp>
              <div className="exp__media">
                <div className="exp__img">
                  <img
                    src="/assets/aistudio/surf-coast_38d6410d.jpg"
                    alt={t('exp.e4.title')}
                    decoding="async"
                  />
                </div>
                <span className="exp__tag">{t('exp.e4.tag')}</span>
              </div>
              <div className="exp__text">
                <p className="label">
                  <span>iv</span> {t('exp.e4.kicker')}
                </p>
                <h3>{t('exp.e4.title')}</h3>
                <p>{t('exp.e4.desc')}</p>
                <ul className="exp__meta">
                  <li>Arugam Bay</li>
                  <li>Peak surf June–August</li>
                  <li>Boards &amp; coastal stays arranged</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* ── 07 KURA'S VEHICLE FLEET ──────────────────────── */}
        <section className="fleet" id="fleet">
          <div className="container">
            <header className="sec-head">
              <p className="label">
                <span>07</span> {t('fleet.secLabel')}
              </p>
              <h2 className="display" data-words>
                {t('fleet.secHeadingLine1')}
                <br />
                <em>{t('fleet.secHeadingEm')}</em>
              </h2>
            </header>

            <div className="fleet-grid">
              <article className="fleet-card" data-fade>
                <div className="fleet-card__media">
                  <img
                    src={img('fleet.v1.img', '/assets/aistudio/vehicle-coaster.jpg')}
                    alt={t('fleet.v1.name')}
                    loading="lazy"
                  />
                </div>
                <div className="fleet-card__body">
                  <div className="fleet-card__top">
                    <h3 className="fleet-card__name">{t('fleet.v1.name')}</h3>
                    <span className="fleet-card__price">{t('fleet.v1.price')}</span>
                  </div>
                  <p className="fleet-card__specs">{t('fleet.v1.specs')}</p>
                  <p className="fleet-card__desc">{t('fleet.v1.desc')}</p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectVehicleForInquiry(`${t('fleet.v1.name')} (${t('fleet.v1.price')})`)}
                      className="btn btn--ghost-dark w-full"
                    >
                      Select {t('fleet.v1.name')}
                    </button>
                  </div>
                </div>
              </article>

              <article className="fleet-card" data-fade>
                <div className="fleet-card__media">
                  <img
                    src={img('fleet.v2.img', '/assets/aistudio/vehicle-shuttle.jpg')}
                    alt={t('fleet.v2.name')}
                    loading="lazy"
                  />
                </div>
                <div className="fleet-card__body">
                  <div className="fleet-card__top">
                    <h3 className="fleet-card__name">{t('fleet.v2.name')}</h3>
                    <span className="fleet-card__price">{t('fleet.v2.price')}</span>
                  </div>
                  <p className="fleet-card__specs">{t('fleet.v2.specs')}</p>
                  <p className="fleet-card__desc">{t('fleet.v2.desc')}</p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectVehicleForInquiry(`${t('fleet.v2.name')} (${t('fleet.v2.price')})`)}
                      className="btn btn--ghost-dark w-full"
                    >
                      Select {t('fleet.v2.name')}
                    </button>
                  </div>
                </div>
              </article>

              <article className="fleet-card" data-fade>
                <div className="fleet-card__media">
                  <img
                    src={img('fleet.v3.img', '/assets/aistudio/vehicle-vezel.jpg')}
                    alt={t('fleet.v3.name')}
                    loading="lazy"
                  />
                </div>
                <div className="fleet-card__body">
                  <div className="fleet-card__top">
                    <h3 className="fleet-card__name">{t('fleet.v3.name')}</h3>
                    <span className="fleet-card__price">{t('fleet.v3.price')}</span>
                  </div>
                  <p className="fleet-card__specs">{t('fleet.v3.specs')}</p>
                  <p className="fleet-card__desc">{t('fleet.v3.desc')}</p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectVehicleForInquiry(`${t('fleet.v3.name')} (${t('fleet.v3.price')})`)}
                      className="btn btn--ghost-dark w-full"
                    >
                      Select {t('fleet.v3.name')}
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <div className="fleet-extra-strip" data-fade>
              <div className="fleet-extra-item">
                <div>
                  <span className="label">{t('fleet.extra1.label')}</span>
                  <h4 className="fleet-card__name mt-1">{t('fleet.extra1.name')}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectVehicleForInquiry(t('fleet.extra1.name'))}
                  className="btn btn--ghost-dark"
                >
                  Inquire Rate
                </button>
              </div>
              <div className="fleet-extra-item">
                <div>
                  <span className="label">{t('fleet.extra2.label')}</span>
                  <h4 className="fleet-card__name mt-1">{t('fleet.extra2.name')}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectVehicleForInquiry(t('fleet.extra2.name'))}
                  className="btn btn--ghost-dark"
                >
                  Inquire Rate
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 08 CLIENTS SAY / VERIFIED REVIEWS ────────────── */}
        <section className="reviews" id="reviews">
          <div className="container">
            <header className="sec-head">
              <p className="label label--light">
                <span>08</span> {t('reviews.secLabel')}
              </p>
              <h2 className="display display--light" data-words>
                {t('reviews.secHeadingLine1')}
                <br />
                <em>{t('reviews.secHeadingEm')}</em>
              </h2>
            </header>

            <div className="reviews-bar">
              <div className="reviews-bar__left">
                <div className="reviews-score">
                  <span className="reviews-score__num">5.0</span>
                  <div>
                    <div className="reviews-score__stars">★★★★★</div>
                    <div className="reviews-score__count">{t('reviews.scoreCount')}</div>
                  </div>
                </div>

                <div className="reviews-platforms" role="tablist" aria-label="Review platforms">
                  <button
                    type="button"
                    onClick={() => setReviewFilter('all')}
                    className={`platform-btn ${reviewFilter === 'all' ? 'is-active' : ''}`}
                  >
                    All Reviews 5.0
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('Tripadvisor')}
                    className={`platform-btn ${reviewFilter === 'Tripadvisor' ? 'is-active' : ''}`}
                  >
                    <TripadvisorOwlLogo size={15} />
                    Tripadvisor 5.0
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('Google')}
                    className={`platform-btn ${reviewFilter === 'Google' ? 'is-active' : ''}`}
                  >
                    <GoogleGLogo size={14} />
                    Google 5.0
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter('Facebook')}
                    className={`platform-btn ${reviewFilter === 'Facebook' ? 'is-active' : ''}`}
                  >
                    <FacebookFLogo size={14} />
                    Facebook 5.0
                  </button>
                </div>
              </div>

              <a
                className="btn btn--gold"
                href="https://wa.me/94712857705?text=Hi%20KuRa%2C%20I%20would%20like%20to%20share%20a%20review%20for%204Me%20Lanka%20Tours!"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('reviews.writeBtn')}
              </a>
            </div>

            <div className="reviews-grid">
              {filteredReviews.map((rev) => {
                const isExpanded = !!expandedReviews[rev.id];
                const dateLabel = rev.date.split('·')[0]?.trim() || rev.date;
                const shortText =
                  rev.fullText.length > 220 ? `${rev.fullText.slice(0, 220).trim()}…` : rev.fullText;

                return (
                  <article
                    key={rev.id}
                    className={`review-card ${rev.isSummary ? 'review-card--highlight' : ''}`}
                  >
                    <div>
                      <div className="review-card__meta">
                        <span className="review-card__author">
                          {rev.author} {!rev.isSummary && <VerifiedCheckBadge size={14} />}
                        </span>
                        <span className="review-card__date">
                          {rev.isSummary ? (
                            <>
                              <TripadvisorOwlLogo size={14} />
                              <GoogleGLogo size={13} />
                              <FacebookFLogo size={13} />
                              <span>{rev.date}</span>
                            </>
                          ) : (
                            <>
                              <span>{dateLabel} · On</span>
                              {rev.platform === 'Tripadvisor' && (
                                <span className="inline-flex items-center gap-1 text-emerald-300 font-bold">
                                  <TripadvisorOwlLogo size={14} /> Tripadvisor
                                </span>
                              )}
                              {rev.platform === 'Google' && (
                                <span className="inline-flex items-center gap-1 text-white font-bold">
                                  <GoogleGLogo size={13} /> Google
                                </span>
                              )}
                              {rev.platform === 'Facebook' && (
                                <span className="inline-flex items-center gap-1 text-sky-300 font-bold">
                                  <FacebookFLogo size={13} /> Facebook
                                </span>
                              )}
                            </>
                          )}
                        </span>
                      </div>
                      <div className="review-card__stars">★★★★★</div>
                      <h3 className="review-card__title">{rev.title}</h3>
                      <p className="review-card__text">{isExpanded ? rev.fullText : shortText}</p>
                    </div>
                    {rev.fullText.length > 220 && (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedReviews((prev) => ({
                              ...prev,
                              [rev.id]: !prev[rev.id],
                            }))
                          }
                          className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-amber-300 hover:underline"
                        >
                          {isExpanded ? 'Show Less' : 'Read More'}
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
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
              {t('quote.line1')}
              <br />
              <em>{t('quote.line2')}</em>
            </blockquote>
            <p className="quote__cite">{t('quote.cite')}</p>
          </div>
        </section>

        {/* ── 09 WHEN TO GO (BLOGS) ────────────────────────── */}
        <section className="when" id="when">
          <div className="container">
            <header className="sec-head">
              <p className="label">
                <span>09</span> {t('when.secLabel')}
              </p>
              <h2 className="display" data-words>
                {t('when.secHeadingLine1')}
                <br />
                <em>{t('when.secHeadingEm')}</em>
              </h2>
              <p className="when__intro" data-fade>
                {t('when.intro')}
              </p>
            </header>

            <div className="when__grid">
              <div className="when__col" data-fade>
                <p className="when__season">{t('when.col1.season')}</p>
                <h3>{t('when.col1.title')}</h3>
                <p>{t('when.col1.desc')}</p>
                <span className="when__tag">{t('when.col1.tag')}</span>
              </div>
              <div className="when__col" data-fade>
                <p className="when__season">{t('when.col2.season')}</p>
                <h3>{t('when.col2.title')}</h3>
                <p>{t('when.col2.desc')}</p>
                <span className="when__tag">{t('when.col2.tag')}</span>
              </div>
              <div className="when__col" data-fade>
                <p className="when__season">{t('when.col3.season')}</p>
                <h3>{t('when.col3.title')}</h3>
                <p>{t('when.col3.desc')}</p>
                <span className="when__tag">{t('when.col3.tag')}</span>
              </div>
            </div>
            <p className="when__note">{t('when.note')}</p>
          </div>
        </section>

        {/* ── 10 CONTACT US & 24/7 CHANNELS ────────────────── */}
        <section className="contact-sec" id="contact">
          <div className="container">
            <header className="sec-head">
              <p className="label label--light">
                <span>10</span> {t('contact.secLabel')}
              </p>
              <h2 className="display display--light" data-words>
                {t('contact.secHeadingLine1')}
                <br />
                <em>{t('contact.secHeadingEm')}</em>
              </h2>
            </header>

            <div className="channels-grid">
              <a href="#contact" className="channel-box">
                <div className="channel-box__icon">
                  <Clock size={20} strokeWidth={1.8} />
                </div>
                <span className="channel-box__label">{t('contact.ch1.label')}</span>
                <span className="channel-box__val">{t('contact.ch1.val')}</span>
              </a>

              <a href="tel:+94712857705" className="channel-box">
                <div className="channel-box__icon">
                  <Phone size={20} strokeWidth={1.8} />
                </div>
                <span className="channel-box__label">{t('contact.ch2.label')}</span>
                <span className="channel-box__val">{t('contact.ch2.val')}</span>
              </a>

              <a
                href="https://wa.me/94712857705"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-box"
              >
                <div className="channel-box__icon">
                  <MessageCircle size={20} strokeWidth={1.8} />
                </div>
                <span className="channel-box__label">{t('contact.ch3.label')}</span>
                <span className="channel-box__val">{t('contact.ch3.val')}</span>
              </a>

              <a href="tel:+94712857705" className="channel-box">
                <div className="channel-box__icon">
                  <Navigation size={20} strokeWidth={1.8} />
                </div>
                <span className="channel-box__label">{t('contact.ch4.label')}</span>
                <span className="channel-box__val">{t('contact.ch4.val')}</span>
              </a>

              <a href="mailto:4melankatours@gmail.com" className="channel-box">
                <div className="channel-box__icon">
                  <Mail size={20} strokeWidth={1.8} />
                </div>
                <span className="channel-box__label">{t('contact.ch5.label')}</span>
                <span className="channel-box__val">{t('contact.ch5.val')}</span>
              </a>

              <a
                href="https://maps.google.com/?q=Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-box"
              >
                <div className="channel-box__icon">
                  <MapPin size={20} strokeWidth={1.8} />
                </div>
                <span className="channel-box__label">{t('contact.ch6.label')}</span>
                <span className="channel-box__val">{t('contact.ch6.val')}</span>
              </a>
            </div>

            {/* CUSTOM TRIP INQUIRY PANEL */}
            <div className="inquiry-panel">
              <div>
                <p className="label label--light">
                  <span>Direct Booking</span> {t('contact.inquiryKicker')}
                </p>
                <h3 className="display display--light mt-3" style={{ fontSize: 'clamp(2rem, 3.4vw, 3.2rem)' }}>
                  {t('contact.inquiryHeadingLine1')}
                  <br />
                  <em>{t('contact.inquiryHeadingEm')}</em>
                </h3>
                <p className="mt-4 text-sm font-normal leading-relaxed text-stone-200">
                  {t('contact.inquiryDesc')}
                </p>

                <div className="awards-row">
                  <div className="award-seal">
                    <img
                      src="/assets/aistudio/tc-2025.png"
                      alt="Tripadvisor Travelers' Choice Awards Best of the Best 2025"
                      loading="lazy"
                    />
                    <span className="award-seal__caption">2025 Best of the Best</span>
                  </div>
                  <div className="award-seal">
                    <img
                      src="/assets/aistudio/tc-2024.png"
                      alt="Tripadvisor Travelers' Choice Awards Best of the Best 2024"
                      loading="lazy"
                    />
                    <span className="award-seal__caption">2024 Best of the Best</span>
                  </div>
                  <div className="award-seal">
                    <img
                      src="/assets/aistudio/tc-2023.png"
                      alt="Tripadvisor Travelers' Choice Best of the Best 2023"
                      loading="lazy"
                    />
                    <span className="award-seal__caption">2023 Best of the Best</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleWhatsAppInquiry} className="inquiry-form">
                <div className="form-field">
                  <label htmlFor="guestName">Your Name</label>
                  <input
                    id="guestName"
                    type="text"
                    required
                    placeholder="e.g. Elena & Family"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="guestEmail">Your Email</label>
                  <input
                    id="guestEmail"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="tourSelect">Tour Package / Service</label>
                  <select
                    id="tourSelect"
                    value={inquiryTour}
                    onChange={(e) => setInquiryTour(e.target.value)}
                  >
                    <option value="KuRa's Adventure (11 Nights | 12 Days)">
                      KuRa&apos;s Adventure (11 Nights | 12 Days)
                    </option>
                    <option value="KuRa's All Ceylon (27 Nights | 28 Days)">
                      KuRa&apos;s All Ceylon (27 Nights | 28 Days)
                    </option>
                    <option value="Galle Day Tour">Galle Day Tour</option>
                    <option value="Colombo Day Tour">Colombo Day Tour</option>
                    <option value="Custom Multi-Day Itinerary">Custom Multi-Day Itinerary</option>
                    <option value="BIA Airport Transfer Only">BIA Airport Transfer Only</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="vehicleSelect">Preferred Vehicle</label>
                  <select
                    id="vehicleSelect"
                    value={inquiryVehicle}
                    onChange={(e) => setInquiryVehicle(e.target.value)}
                  >
                    <option value="Honda Fit Shuttle ($80/Day)">Honda Fit Shuttle ($80/Day)</option>
                    <option value="Honda Vezel ($80/Day)">Honda Vezel ($80/Day)</option>
                    <option value="Toyota Coaster ($200/Day)">Toyota Coaster ($200/Day)</option>
                    <option value="Toyota HiAce KDH Van">Toyota HiAce KDH High Roof Van</option>
                    <option value="Toyota Prius Hybrid Sedan">Toyota Prius Hybrid Sedan</option>
                  </select>
                </div>
                <div className="form-field form-field--full">
                  <label htmlFor="travelDates">Arrival Date &amp; Number of Guests</label>
                  <input
                    id="travelDates"
                    type="text"
                    placeholder="e.g. Jan 14–26, 2027 · 2 Adults"
                    value={inquiryDates}
                    onChange={(e) => setInquiryDates(e.target.value)}
                  />
                </div>
                <div className="form-field form-field--full">
                  <label htmlFor="guestNotes">Special Interests (Hotels, Safaris, Train Tickets, etc.)</label>
                  <textarea
                    id="guestNotes"
                    rows={3}
                    placeholder="Tell KuRa what you'd love to see and experience in Sri Lanka..."
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                  />
                </div>
                <div className="form-field--full flex flex-wrap items-center gap-3 pt-2">
                  <button type="submit" className="btn btn--gold">
                    {t('contact.btnWhatsapp')}
                  </button>
                  <a
                    href={`mailto:4melankatours@gmail.com?subject=${encodeURIComponent(
                      `Sri Lanka Tour Inquiry: ${inquiryTour}`
                    )}&body=${encodeURIComponent(
                      `Hello KuRa,\n\nName: ${inquiryName}\nEmail: ${inquiryEmail}\nTour: ${inquiryTour}\nVehicle: ${inquiryVehicle}\nDates & Guests: ${inquiryDates}\nNotes: ${inquiryNotes}`
                    )}`}
                    className="btn btn--ghost"
                  >
                    {t('contact.btnEmail')}
                  </a>
                  {inquirySubmitted && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      <Check size={14} /> Inquiry prepared for KuRa
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <p className="footer__wordmark">{t('footer.wordmark')}</p>
              <p className="footer__tag">
                {t('footer.tagline1')}
                <br />
                {t('footer.tagline2')}
                <br />
                {t('footer.tagline3')}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <img
                  src="/assets/aistudio/tc-2025.png"
                  alt="Tripadvisor Travelers' Choice Awards Best of the Best 2025"
                  className="w-20 h-20 rounded-full object-contain"
                  loading="lazy"
                />
                <img
                  src="/assets/aistudio/tc-2024.png"
                  alt="Tripadvisor Travelers' Choice Awards Best of the Best 2024"
                  className="w-20 h-20 rounded-full object-contain"
                  loading="lazy"
                />
                <img
                  src="/assets/aistudio/tc-2023.png"
                  alt="Tripadvisor Travelers' Choice Best of the Best 2023"
                  className="w-20 h-20 rounded-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <nav className="footer__nav" aria-label="Footer">
              <div>
                <p className="label label--light">Navigation</p>
                <a href="#top">{t('nav.home')}</a>
                <a href="#tours">{t('nav.tours')}</a>
                <a href="#places">{t('nav.destinations')}</a>
                <a href="#experiences">{t('nav.todo')}</a>
                <a href="#reviews">{t('nav.memories')}</a>
                <a href="#when">{t('nav.blogs')}</a>
                <a href="#contact">{t('nav.contact')}</a>
              </div>

              <div>
                <p className="label label--light">Official Traveler Links</p>
                <a href="https://www.eta.gov.lk" target="_blank" rel="noopener noreferrer">
                  Online Visa (ETA) <ExternalLink className="inline ml-1" size={11} />
                </a>
                <a href="https://www.customs.gov.lk" target="_blank" rel="noopener noreferrer">
                  BIA Customs <ExternalLink className="inline ml-1" size={11} />
                </a>
                <a href="https://www.customs.gov.lk" target="_blank" rel="noopener noreferrer">
                  SL Customs <ExternalLink className="inline ml-1" size={11} />
                </a>
                <a href="https://www.immigration.gov.lk" target="_blank" rel="noopener noreferrer">
                  Immigration &amp; Emigration <ExternalLink className="inline ml-1" size={11} />
                </a>
                <a href="https://www.cbsl.gov.lk" target="_blank" rel="noopener noreferrer">
                  Exchange Rates <ExternalLink className="inline ml-1" size={11} />
                </a>
                <a href="https://www.sltda.gov.lk" target="_blank" rel="noopener noreferrer">
                  SLTDA <ExternalLink className="inline ml-1" size={11} />
                </a>
                <a href="https://seatreservation.railway.gov.lk" target="_blank" rel="noopener noreferrer">
                  Train Seats Booking <ExternalLink className="inline ml-1" size={11} />
                </a>
                <a href="https://www.caa.lk" target="_blank" rel="noopener noreferrer">
                  Drone Law <ExternalLink className="inline ml-1" size={11} />
                </a>
              </div>

              <div>
                <p className="label label--light">Connect &amp; Verify</p>
                <a href="https://wa.me/94712857705" target="_blank" rel="noopener noreferrer">
                  WhatsApp Direct
                </a>
                <a href="tel:+94712857705">Viber / Voice Call</a>
                <a href="mailto:4melankatours@gmail.com">4melankatours@gmail.com</a>
                <a href="#reviews" className="inline-flex items-center gap-2">
                  <TripadvisorOwlLogo size={15} /> Tripadvisor (5.0 ★)
                </a>
                <a href="#reviews" className="inline-flex items-center gap-2">
                  <GoogleGLogo size={14} /> Google Reviews (5.0 ★)
                </a>
                <a href="#reviews" className="inline-flex items-center gap-2">
                  <FacebookFLogo size={14} /> Facebook (5.0 ★)
                </a>
                <Link to="/admin" className="text-amber-300/80 hover:text-amber-200 mt-1">
                  Admin CMS (/admin)
                </Link>
              </div>
            </nav>
          </div>

          <div className="footer__bottom">
            <span>{t('footer.copyright')}</span>
            <div className="footer__socials">
              <button
                type="button"
                onClick={() => setActiveModal({ type: 'terms' })}
                className="underline hover:text-amber-300"
              >
                Terms &amp; Privacy Policy
              </button>
              <Link to="/admin" className="underline hover:text-amber-300">
                Admin Portal
              </Link>
              <span>{t('footer.domain')}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── INTERACTIVE MODALS ───────────────────────────── */}
      {activeModal && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-stone-700/60 pb-4 mb-5">
              <div>
                <p className="label label--light">
                  <span>4Me Lanka Tours</span>{' '}
                  {activeModal.type === 'poster'
                    ? activeModal.subtitle
                    : activeModal.type === 'map'
                    ? 'Paradise Island · Wonder of Asia'
                    : 'Legal & Guest Assurance'}
                </p>
                <h3 className="font-serif text-2xl font-bold text-stone-100 mt-1">
                  {activeModal.type === 'poster'
                    ? activeModal.title
                    : activeModal.type === 'map'
                    ? 'Sri Lanka Illustrated Attractions Map'
                    : 'Terms & Privacy Policy'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 border border-stone-700 hover:border-amber-400 text-stone-200"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {activeModal.type === 'poster' && (
              <div className="flex flex-col items-center gap-5">
                <img
                  src={activeModal.src}
                  alt={activeModal.title}
                  className="max-h-[70vh] w-auto border border-stone-700/60"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const title = activeModal.title;
                      setActiveModal(null);
                      handleSelectTourForInquiry(title);
                    }}
                    className="btn btn--gold"
                  >
                    Inquire About This Tour
                  </button>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--ghost">
                    Close
                  </button>
                </div>
              </div>
            )}

            {activeModal.type === 'map' && (
              <div className="flex flex-col items-center gap-5">
                <img
                  src={img('island.map.img', '/assets/aistudio/srilanka-illustrated-map.jpg')}
                  alt="Sri Lanka Wonder of Asia Illustrated Map"
                  className="max-h-[72vh] w-auto border border-stone-700/60"
                />
                <button type="button" onClick={() => setActiveModal(null)} className="btn btn--ghost">
                  Close Map
                </button>
              </div>
            )}

            {activeModal.type === 'terms' && (
              <div className="space-y-4 text-sm font-normal leading-relaxed text-stone-200">
                <p>
                  <strong className="text-white font-bold">1. SLTDA Registered Operator:</strong> 4Me Lanka Tours is
                  officially registered with the Sri Lanka Tourism Development Authority under registration number{' '}
                  <strong>SLTDA/TD/CAVA/1758</strong>, founded and operated by Chaminda Kuruwita (KuRa).
                </p>
                <p>
                  <strong className="text-white font-bold">2. Custom Itineraries &amp; Pricing:</strong> All multi-day
                  tours, day tours, hotel bookings, and vehicle rentals are tailored to your travel dates and group
                  size. Vehicle daily rates include a dedicated English-speaking chauffeur-guide and air-conditioned
                  transport.
                </p>
                <p>
                  <strong className="text-white font-bold">3. Privacy &amp; Guest Data:</strong> Contact details shared
                  via WhatsApp, Viber, phone, or email are used strictly to coordinate your Sri Lankan itinerary,
                  accommodations, and airport transfers.
                </p>
                <div className="pt-3">
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn--gold">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </SiteContentProvider>
  );
}
