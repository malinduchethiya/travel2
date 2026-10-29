import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteContent } from '../content/siteContent';
import { Header, Footer, DetailDialog, PageHead, type Detail } from './ui';
import { Hero, Intro, Worlds, Atlas, Tours, Founder, Guestbook, Notes } from './HomeSections';
import { DestinationDirectory, ThingsToDo, Fleet, Contact } from './Pages';
function useMotion(path: string, root: React.RefObject<HTMLDivElement | null>, onChapter: (v: number) => void) {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    const gsap = window.gsap; const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger); const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.from('.j-entrance', { y: 68, opacity: 0, duration: 1.25, stagger: 0.12, ease: 'power3.out', clearProps: 'opacity,transform' });
      gsap.utils.toArray('.j-reveal').forEach((element: HTMLElement) => { gsap.from(element, { y: 48, opacity: 0, duration: 0.95, ease: 'power3.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: element, start: 'top 94%', once: true } }); });
      if (document.querySelector('.j-hero')) {
        gsap.to('.j-hero-landscape', { '--j-aperture-side': '0%', '--j-aperture-round': '0%', ease: 'none', scrollTrigger: { trigger: '.j-hero', start: 'top top', end: 'bottom 25%', scrub: 1 } });
        gsap.to('.j-hero-image', { yPercent: 12, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.j-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      }
      mm.add('(min-width: 960px)', () => {
        const track = document.querySelector<HTMLElement>('.j-worlds-track'); if (!track) return; let last = -1;
        gsap.to(track, { x: () => -(track.scrollWidth - document.documentElement.clientWidth), ease: 'none', scrollTrigger: { id: 'island-worlds', trigger: '.j-worlds', start: 'top top', end: () => `+=${track.scrollWidth - document.documentElement.clientWidth}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, onUpdate: (self: any) => { const n = Math.min(3, Math.round(self.progress * 3)); if (n !== last) { last = n; onChapter(n); } } } });
      });
      if (document.querySelector('.j-atlas')) gsap.from('.j-route-line', { strokeDashoffset: 1000, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: '.j-atlas', start: 'top 70%', once: true } });
      gsap.to('.j-page-progress', { scaleX: 1, transformOrigin: 'left', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.2 } });
    }, root);
    const refresh = () => ScrollTrigger.refresh(); const images = Array.from(root.current?.querySelectorAll('img') || []);
    images.forEach(i => i.addEventListener('load', refresh, { once: true })); document.fonts?.ready.then(refresh); refresh();
    return () => { images.forEach(i => i.removeEventListener('load', refresh)); mm.revert(); ctx.revert(); };
  }, [path]);
}
export default function CreativeSite() {
  const { t } = useSiteContent(); const root = useRef<HTMLDivElement>(null); const location = useLocation(); const mode = location.pathname.split('/')[1] || 'home';
  const [detail, setDetail] = useState<Detail | null>(null); const [chapter, setChapter] = useState(0);
  const route = ['destinations', 'tour-packages', 'todo', 'memories', 'blogs', 'contact'].includes(mode) ? mode : 'home';
  useMotion(location.pathname, root, setChapter);
  useEffect(() => { setDetail(null); const names: Record<string, string> = { home: 'Sri Lanka, a little differently.', destinations: 'Find your place in Sri Lanka', 'tour-packages': 'Journeys made personal', todo: 'Things to feel in Sri Lanka', memories: 'The guestbook', blogs: 'Island notes', contact: 'Let’s make a plan' }; document.title = `4Me Lanka Tours — ${names[route]}`; }, [location.pathname]);
  return <div className={`journal j-route-${route}`} ref={root}><a className="j-skip" href="#main">Skip to content</a><div className="j-page-progress" aria-hidden="true" /><Header /><main id="main">
    {route === 'home' && <><Hero /><Intro /><div className="j-worlds-shell"><Worlds active={chapter} /></div><Atlas /><Tours onOpen={setDetail} /><Founder /><Guestbook onOpen={setDetail} /><Notes onOpen={setDetail} /></>}
    {route === 'destinations' && <><PageHead number="01" top="THE ISLAND, UP CLOSE." title="Find your place." accent="Feel something new." description="Mountains to ocean. Ancient cities to quiet backroads. Follow the feeling that brought you here." /><Atlas /><DestinationDirectory onOpen={setDetail} /></>}
    {route === 'tour-packages' && <><PageHead number="02" top="CURATED ROUTES. PERSONAL JOURNEYS." title="Take the long way." accent="Make it your way." description="Private multi-day journeys, a day somewhere new, or simply a good ride. Start with a route. Make it yours." /><Tours full onOpen={setDetail} /><Fleet /></>}
    {route === 'todo' && <><PageHead number="03" top="A LITTLE LESS WATCHING. A LITTLE MORE DOING." title="Collect feelings." accent="Not just places." description="Tea in the hills. Hands in the clay. The rhythm of a kitchen, a village, a festival. Get a little closer." /><ThingsToDo onOpen={setDetail} /></>}
    {route === 'memories' && <><PageHead number="04" top="THE GUESTBOOK." title="Came as guests." accent="Left with stories." /><Guestbook full onOpen={setDetail} /></>}
    {route === 'blogs' && <><PageHead number="05" top="POSTCARDS, PRACTICALITIES & LOCAL CURIOSITIES." title="Notes from" accent="our little island." /><Notes full onOpen={setDetail} /></>}
    {route === 'contact' && <><PageHead number="06" top="EVERY GOOD JOURNEY STARTS WITH A HELLO." title={t('creative.contact.title')} accent={t('creative.contact.accent')} /><Contact /></>}
  </main><Footer />{detail && <DetailDialog value={detail} onClose={() => setDetail(null)} />}</div>;
}
