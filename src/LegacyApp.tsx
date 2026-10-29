import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Clock, Phone, MessageCircle, Mail, MapPin, Navigation, ExternalLink, X, Check } from 'lucide-react';
import { HERO_SLIDES_DEFAULT, SiteContentProvider, useSiteContent } from './content/siteContent';
import AdminPanel from './components/AdminPanel';
import ContactCalculatorsAndForms from './components/ContactCalculatorsAndForms';

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

function HomePage({ viewMode = 'home' }: { viewMode?: 'home' | 'tours' | 'destinations' | 'todo' | 'memories' | 'blogs' | 'contact' }) {
  const { t, img } = useSiteContent();

  useEffect(() => {
    if (viewMode === 'contact') {
      const el = document.getElementById('contact');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [viewMode]);

  const [heroSlideIdx, setHeroSlideIdx] = useState(viewMode === 'tours' ? 2 : 0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotBarRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prevSlideIdxRef = useRef(viewMode === 'tours' ? 2 : 0);

  const [tourFilter, setTourFilter] = useState<'all' | 'day' | 'multiday' | 'transfers'>('all');
  const [showAllTours, setShowAllTours] = useState<boolean>(viewMode === 'tours');
  const [memoryRegionFilter, setMemoryRegionFilter] = useState<string>('all');
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
      // ── 9 MULTI-DAY TOUR PACKAGES ──
      {
        id: 'kuras-heritage',
        title: "Kura's Heritage",
        priceLabel: 'From 560$',
        subtitle: 'Feel the beauty & unique hospitality of Sri Lanka',
        duration: '06 Nights | 07 Days',
        category: 'multiday' as const,
        image: '/assets/aistudio/anuradhapura-2_376f70af.jpg',
        poster: '/assets/aistudio/poster-heritage.jpg',
        description:
          'Explore Sri Lanka’s sacred UNESCO Cultural Triangle—ancient stupas of Anuradhapura, the 5th-century Sigiriya Lion Rock Fortress, medieval Polonnaruwa, and the Temple of the Sacred Tooth Relic in Kandy.',
        stops: 'Anuradhapura, Sigiriya, Polonnaruwa, Kandy',
        isSignaturePoster: false,
      },
      {
        id: 'kuras-beachside-honeymoon',
        title: "Kura's Beachside Honeymoon",
        priceLabel: 'From 800$',
        subtitle: 'Feel the beauty & unique hospitality of Sri Lanka',
        duration: '09 Nights | 10 Days',
        category: 'multiday' as const,
        image: '/assets/aistudio/mirissa_3d3801f6.jpg',
        poster: '/assets/aistudio/poster-beach-honeymoon.jpg',
        description:
          'A romantic 10-day coastal & rainforest escape featuring golden beaches, candlelit oceanfront dining, whale watching in Mirissa, Sinharaja tropical rainforest, and coral reefs of Hikkaduwa.',
        stops: 'Bentota, Sinharaja, Tangalle, Mirissa & Hikkaduwa',
        isSignaturePoster: false,
      },
      {
        id: 'kuras-hillside-honeymoon',
        title: "Kura's Hillside Honeymoon",
        priceLabel: 'From 800$',
        subtitle: 'Feel the beauty & unique hospitality of Sri Lanka',
        duration: '09 Nights | 10 Days',
        category: 'multiday' as const,
        image: '/assets/aistudio/tea-hills_bfabb10f.jpg',
        poster: '/assets/aistudio/poster-hill-honeymoon.jpg',
        description:
          'Misty tea-country romance across Kandy, Little England in Nuwara Eliya, the scenic Ella mountain train, tranquil Belihuloya mountain streams, and Bentota beach.',
        stops: 'Kandy, Nuwaraeliya, Ella, Belihuloya & Bentota',
        isSignaturePoster: false,
      },
      {
        id: 'kuras-nature',
        title: "Kura's Nature",
        priceLabel: 'From 800$',
        subtitle: 'Feel the beauty & unique hospitality of Sri Lanka',
        duration: '09 Nights | 10 Days',
        category: 'multiday' as const,
        image: '/assets/aistudio/yala-safari_fbf20478.jpg',
        poster: '/assets/aistudio/poster-nature.jpg',
        description:
          'Designed for nature & waterfall lovers—Gentle giants in Pinnawala, highland cascades of Nawalapitiya & Maskeliya, white-water rafting in Kitulgala, UNESCO Sinharaja rainforest, and Bentota lagoon.',
        stops: 'Pinnawala, Nawalapitiya, Maskeliya, Kitulgala, Sinharaja & Bentota',
        isSignaturePoster: false,
      },
      {
        id: 'kuras-leisure',
        title: "Kura's Leisure",
        priceLabel: 'From 800$',
        subtitle: 'Feel the beauty & unique hospitality of Sri Lanka',
        duration: '09 Nights | 10 Days',
        category: 'multiday' as const,
        image: '/assets/aistudio/sigiriya-view_e6bf3949.jpg',
        poster: '/assets/aistudio/poster-leisure.jpg',
        description:
          'An unhurried 10-day signature holiday blending Sigiriya Rock Fortress, royal Kandy, cool Nuwara Eliya tea estates, Kithulgala rainforest rivers, and relaxing days along Bentota beach.',
        stops: 'Sigiriya, Kandy, Nuwaraeliya, Kithulgala & Bentota',
        isSignaturePoster: false,
      },
      {
        id: 'kuras-culture',
        title: "Kura's Culture",
        priceLabel: 'From 960$',
        subtitle: 'Feel the beauty & unique hospitality of Sri Lanka',
        duration: '11 Nights | 12 Days',
        category: 'multiday' as const,
        image: '/assets/aistudio/kandy_3e5113c7.jpg',
        poster: '/assets/aistudio/poster-culture.jpg',
        description:
          'A deep cultural and coastal loop covering ancient capitals, eastern bays of Trincomalee & Batticaloa, hill country heritage, southern wildlife in Tissamaharama, Dutch Galle Fort, and Colombo.',
        stops: 'Negombo, Anuradhapura, Mannar, Trincomalee, Batticaloa, Kandy, Nuwaraeliya, Ella, Tissamaharama, Galle & Colombo',
        isSignaturePoster: false,
      },
      {
        id: 'kuras-adventure',
        title: "Kura's Adventure",
        priceLabel: 'From 960$',
        subtitle: t('tours.pkg2.subtitle'),
        duration: t('tours.pkg2.duration'),
        category: 'multiday' as const,
        image: img('tours.pkg2.img', '/assets/aistudio/ella_53a0777f.jpg'),
        poster: '/assets/aistudio/poster-adventure-full.jpg',
        description: t('tours.pkg2.desc'),
        stops: 'Negombo, Kithulgala, Nuwaraeliya, Ella, Haputale, Udawalawa, Mirissa & Bentota',
        isSignaturePoster: true,
        signatureOrder: 2,
      },
      {
        id: 'kuras-ramayana',
        title: "Kura's Ramayana Trail",
        priceLabel: 'From 1280$',
        subtitle: 'Feel the beauty & unique hospitality of Sri Lanka',
        duration: '15 Nights | 16 Days',
        category: 'multiday' as const,
        image: '/assets/aistudio/anuradhapura-2_376f70af.jpg',
        poster: '/assets/aistudio/poster-ramayana.jpg',
        description:
          'Follow the sacred 16-day Ramayana heritage trail from Munneswaram in Chilaw, Mannar, Jaffna, and Trincomalee Koneswaram to Sigiriya, Seetha Amman Kovil in Nuwara Eliya, Ella, Kataragama, and Colombo.',
        stops: 'Chilaw, Anuradhapura, Mannar, Jaffna, Trincomalee, Sigiriya, Kandy, Nuwaraeliya, Ella, Katharagama, Hambantota, Galle & Colombo',
        isSignaturePoster: false,
      },
      {
        id: 'kuras-all-ceylon',
        title: "Kura's All Ceylon",
        priceLabel: 'From 2240$',
        subtitle: t('tours.pkg4.subtitle'),
        duration: t('tours.pkg4.duration'),
        category: 'multiday' as const,
        image: img('tours.pkg4.img', '/assets/aistudio/anuradhapura-2_376f70af.jpg'),
        poster: '/assets/aistudio/poster-all-ceylon-full.jpg',
        description: t('tours.pkg4.desc'),
        stops:
          'Negombo, Kalpitiya, Anuradhapura, Mannar, Jaffna, Trincomalee, Sigiriya, Polonnaruwa, Riverstone, Kandy, Mahiyanganaya, Batticaloa, Arugambay, Ella, Nuwaraeliya, Haputale, Udawalawa, Yala, Tangalle, Mirissa, Sinharaja, Galle & Bentota',
        isSignaturePoster: true,
        signatureOrder: 4,
      },

      // ── 9 DAY TOUR PACKAGES ──
      {
        id: 'negombo-day',
        title: 'Negombo Day Tour',
        priceLabel: 'From 30$',
        subtitle: 'Explore the city with 4Me Lanka Tours',
        duration: 'Day Tour',
        category: 'day' as const,
        image: '/assets/aistudio/mirissa_3d3801f6.jpg',
        poster: '/assets/aistudio/poster-negombo-day.jpg',
        description:
          'Discover Negombo’s historic Dutch canal & fort, golden beach, scenic lagoon boat ride, lively fish market, Angurukaramulla Temple, and St. Sebastian’s Church.',
        stops: 'Dutch Fort, Negombo Beach, Negombo Lagoon, Fish Market, Agurukaramulla Temple & St Sebastian Church',
        isSignaturePoster: false,
      },
      {
        id: 'colombo-day',
        title: 'Colombo Day Tour',
        priceLabel: 'From 60$',
        subtitle: t('tours.pkg3.subtitle'),
        duration: t('tours.pkg3.duration'),
        category: 'day' as const,
        image: img('tours.pkg3.img', '/assets/aistudio/kandy_3e5113c7.jpg'),
        poster: '/assets/aistudio/poster-colombo-day-full.jpg',
        description: t('tours.pkg3.desc'),
        stops: 'National Museum, Independence Square, Pettah Market, Gangarama Temple & Lotus Tower',
        isSignaturePoster: true,
        signatureOrder: 3,
      },
      {
        id: 'kithulgala-day',
        title: 'Kithulgala Day Tour',
        priceLabel: 'From 100$',
        subtitle: 'Explore the city with 4Me Lanka Tours',
        duration: 'Day Tour',
        category: 'day' as const,
        image: '/assets/aistudio/offer-activities.jpg',
        poster: '/assets/aistudio/poster-kithulgala-day.jpg',
        description:
          'An action-packed rainforest day excursion on the Kelani River featuring thrilling White Water Rafting, canyon jumping, and jungle trekking.',
        stops: 'White Water Rafting, Kelani River Rapids & Rainforest Trekking',
        isSignaturePoster: false,
      },
      {
        id: 'kandy-day',
        title: 'Kandy Day Tour',
        priceLabel: 'From 120$',
        subtitle: 'Explore the city with 4Me Lanka Tours',
        duration: 'Day Tour',
        category: 'day' as const,
        image: '/assets/aistudio/kandy_3e5113c7.jpg',
        poster: '/assets/aistudio/poster-kandy-day.jpg',
        description:
          'Experience Sri Lanka’s royal hill capital—Temple of the Sacred Tooth Relic, Kandy Lake, Bahirawakanda Buddha Statue, Kandy View Point, Peradeniya Royal Botanical Gardens, and Udawatta Kele Sanctuary.',
        stops: 'Temple Tooth, Kandy Lake, Bahirawakanda, View Point, Botanical Garden & Udawaththa Kale',
        isSignaturePoster: false,
      },
      {
        id: 'galle-day',
        title: 'Galle Day Tour',
        priceLabel: 'From 150$',
        subtitle: t('tours.pkg1.subtitle'),
        duration: t('tours.pkg1.duration'),
        category: 'day' as const,
        image: img('tours.pkg1.img', '/assets/aistudio/galle_9e7733fe.jpg'),
        poster: '/assets/aistudio/poster-galle-day-full.jpg',
        description: t('tours.pkg1.desc'),
        stops: 'Dutch Fort, Light House, Unawatuna, Jungle Beach, Stick Fishing & General Market',
        isSignaturePoster: true,
        signatureOrder: 1,
      },
      {
        id: 'sigiriya-day',
        title: 'Sigiriya Day Tour',
        priceLabel: 'From 150$',
        subtitle: 'Explore the city with 4Me Lanka Tours',
        duration: 'Day Tour',
        category: 'day' as const,
        image: '/assets/aistudio/hero_58b958e2.jpg',
        poster: '/assets/aistudio/poster-sigiriya-day.jpg',
        description:
          'Climb Sigiriya Lion Rock & Pidurangala, visit the Golden Cave Temple, embark on a Minneriya/Kaudulla Wild Elephant Safari, and visit Kandalama Lake, Thalkote Lake & Popham’s Arboretum.',
        stops: 'Pidurangala, Cave Temple, Wild Safari, Kandalama Lake, Thalkote Lake & Pophams Arboretum',
        isSignaturePoster: false,
      },
      {
        id: 'bentota-day',
        title: 'Bentota Day Tour',
        priceLabel: 'From 100$',
        subtitle: 'Explore the city with 4Me Lanka Tours',
        duration: 'Day Tour',
        category: 'day' as const,
        image: '/assets/aistudio/surf-coast_38d6410d.jpg',
        poster: '/assets/aistudio/poster-bentota-day.jpg',
        description:
          'Enjoy Ventura Beach, jet-ski & river water sports, Kande Vihara Temple, Brief Garden by Bevis Bawa, Madu River mangrove boat safari, Sea Turtle Hatchery, Mask Factory, and Ayurvedic Spa.',
        stops:
          'Ventura Beach, Water Sport, Kande Vihara Temple, Brief Garden, Spice Garden, Madu River, Turtle Hatchery, Mask Factory & Ayurvedic Spa',
        isSignaturePoster: false,
      },
      {
        id: 'pinnawala-day',
        title: 'Pinnawala Day Tour',
        priceLabel: 'From 100$',
        subtitle: 'Explore the city with 4Me Lanka Tours',
        duration: 'Day Tour',
        category: 'day' as const,
        image: '/assets/aistudio/yala-safari_fbf20478.jpg',
        poster: '/assets/aistudio/poster-pinnawala-day.jpg',
        description:
          'Watch the famous elephant herd bathe in the Maha Oya river at Pinnawala Elephant Orphanage, visit the Pinnawala Open Zoo, experience an authentic Old Village tour, and explore the Bird Sanctuary.',
        stops: 'Elephant Orphanage, Zoo, Old Village & Bird Sanctuary',
        isSignaturePoster: false,
      },
      {
        id: 'kalpitiya-day',
        title: 'Kalpitiya Day Tour',
        priceLabel: 'From 150$',
        subtitle: 'Explore the city with 4Me Lanka Tours',
        duration: 'Day Tour',
        category: 'day' as const,
        image: '/assets/aistudio/stilt_b5edbf6f.jpg',
        poster: '/assets/aistudio/poster-kalpitiya-day.jpg',
        description:
          'Venture to the Kalpitiya peninsula for world-class Kite Surfing, Spinner Dolphin Watching, St. Anne’s Shrine, 17th-century Dutch Fort, Donkey Point, Colombo Face, and Lagoon Safari.',
        stops: 'Kite Surfing, Dolphin Watching, St Annes Shrine, Dutch Fort, Donkey Point, Colombo Face & Lagoon Safari',
        isSignaturePoster: false,
      },
    ],
    [t, img]
  );

  const signaturePosterTours = useMemo(
    () =>
      popularTours
        .filter((p) => p.isSignaturePoster)
        .sort((a, b) => (a.signatureOrder || 99) - (b.signatureOrder || 99)),
    [popularTours]
  );

  const multiDayTours = useMemo(
    () => popularTours.filter((p) => p.category === 'multiday'),
    [popularTours]
  );

  const dayTours = useMemo(
    () => popularTours.filter((p) => p.category === 'day'),
    [popularTours]
  );

  const destinationsList = useMemo(
    () => [
      { id: 'anuradhapura', name: 'Anuradhapura', img: '/assets/aistudio/destinations/dest-anuradhapura.jpg' },
      { id: 'arugambay', name: 'Arugambay', img: '/assets/aistudio/destinations/dest-arugambay.jpg' },
      { id: 'batticaloa', name: 'Batticaloa', img: '/assets/aistudio/destinations/dest-batticaloa.jpg' },
      { id: 'belihuloya', name: 'Belihuloya', img: '/assets/aistudio/destinations/dest-belihuloya.jpg' },
      { id: 'bentota', name: 'Bentota', img: '/assets/aistudio/destinations/dest-bentota.jpg' },
      { id: 'colombo', name: 'Colombo', img: '/assets/aistudio/destinations/dest-colombo.jpg' },
      { id: 'ella', name: 'Ella', img: '/assets/aistudio/destinations/dest-ella.jpg' },
      { id: 'galle', name: 'Galle', img: '/assets/aistudio/destinations/dest-galle.jpg' },
      { id: 'haputale', name: 'Haputale', img: '/assets/aistudio/destinations/dest-haputale.jpg' },
      { id: 'hambantota', name: 'Hambantota', img: '/assets/aistudio/destinations/dest-hambantota.jpg' },
      { id: 'hikkaduwa', name: 'Hikkaduwa', img: '/assets/aistudio/destinations/dest-hikkaduwa.jpg' },
      { id: 'jaffna', name: 'Jaffna', img: '/assets/aistudio/destinations/dest-jaffna.jpg' },
      { id: 'kalpitiya', name: 'Kalpitiya', img: '/assets/aistudio/destinations/dest-kalpitiya.jpg' },
      { id: 'kandy', name: 'Kandy', img: '/assets/aistudio/destinations/dest-kandy.jpg' },
      { id: 'kitulgala', name: 'Kitulgala', img: '/assets/aistudio/destinations/dest-kitulgala.jpg' },
      { id: 'mahiyanganaya', name: 'Mahiyanganaya', img: '/assets/aistudio/destinations/dest-mahiyanganaya.jpg' },
      { id: 'mannar', name: 'Mannar', img: '/assets/aistudio/destinations/dest-mannar.jpg' },
      { id: 'mirissa', name: 'Mirissa', img: '/assets/aistudio/destinations/dest-mirissa.jpg' },
      { id: 'negombo', name: 'Negombo', img: '/assets/aistudio/destinations/dest-negombo.jpg' },
      { id: 'nuwaraeliya', name: 'Nuwaraeliya', img: '/assets/aistudio/destinations/dest-nuwaraeliya.jpg' },
      { id: 'pinnawala', name: 'Pinnawala', img: '/assets/aistudio/destinations/dest-pinnawala.jpg' },
      { id: 'polonnaruwa', name: 'Polonnaruwa', img: '/assets/aistudio/destinations/dest-polonnaruwa.jpg' },
      { id: 'riverston', name: 'Riverston', img: '/assets/aistudio/destinations/dest-riverston.jpg' },
      { id: 'sigiriya', name: 'Sigiriya', img: '/assets/aistudio/destinations/dest-sigiriya.jpg' },
      { id: 'sinharaja', name: 'Sinharaja', img: '/assets/aistudio/destinations/dest-sinharaja.jpg' },
      { id: 'tangalle', name: 'Tangalle', img: '/assets/aistudio/destinations/dest-tangalle.jpg' },
      { id: 'tissa-yala', name: 'Tissa – Yala', img: '/assets/aistudio/destinations/dest-tissa-yala.jpg' },
      { id: 'trincomalee', name: 'Trincomalee', img: '/assets/aistudio/destinations/dest-trincomalee.jpg' },
      { id: 'udawalawa', name: 'Udawalawa', img: '/assets/aistudio/destinations/dest-udawalawa.jpg' },
    ],
    []
  );

  const todoList = useMemo(
    () => [
      {
        id: 'cultural-show',
        title: 'Colombo Cultural Show | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-cultural-show.jpg',
        youtubeQuery: 'Colombo Cultural Show Destination SRI LANKA',
      },
      {
        id: 'yoga-meditation',
        title: 'Sri Lanka | Yoga | Meditation | Wellness',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-yoga-meditation.jpg',
        youtubeQuery: 'Sri Lanka Yoga Meditation Wellness Destination SRI LANKA',
      },
      {
        id: 'kottu-roti',
        title: 'The sound of Kottu Roti | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-kottu-roti.jpg',
        youtubeQuery: 'The sound of Kottu Roti Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'pekoe-trail',
        title: 'Pekoe Trail | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-pekoe-trail.jpg',
        youtubeQuery: 'Pekoe Trail Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'masks-making',
        title: 'Ambalangoda | Sri Lanka | Masks & Mask Making',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-masks-making.jpg',
        youtubeQuery: 'Ambalangoda Masks Mask Making Destination SRI LANKA',
      },
      {
        id: 'metal-craft',
        title: 'Metal Craft | Handicrafts of Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-metal-craft.jpg',
        youtubeQuery: 'Metal Craft Handicrafts of Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'batik-dyeing',
        title: 'The art of dyeing | Batik Manufacture | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-batik-dyeing.jpg',
        youtubeQuery: 'The art of dyeing Batik Manufacture Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'scenic-hikes',
        title: '7 Best short and scenic hikes | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-scenic-hikes.jpg',
        youtubeQuery: '7 Best short and scenic hikes Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'paddy-cultivation',
        title: 'Traditional Paddy Cultivation in Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-paddy-cultivation.jpg',
        youtubeQuery: 'Traditional Paddy Cultivation Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'natural-rubber',
        title: 'Natural Rubber Harvest & Processing | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-natural-rubber.jpg',
        youtubeQuery: 'Natural Rubber Harvest Processing Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'jewellery-manufacture',
        title: 'Jewellery Manufacture in Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-jewellery-manufacture.jpg',
        youtubeQuery: 'Jewellery Manufacture Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'gemstones',
        title: 'Sri Lankan Gemstones & Lapidary Art',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-gemstones.jpg',
        youtubeQuery: 'Sri Lankan Gemstones Lapidary Art Destination SRI LANKA',
      },
      {
        id: 'ceylon-tea',
        title: 'Ceylon Tea | Brewing a perfect cup | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-ceylon-tea.jpg',
        youtubeQuery: 'Ceylon Tea Brewing a perfect cup Destination SRI LANKA',
      },
      {
        id: 'spice-island',
        title: 'Spice Island | Spices & Herbs of Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-spice-island.jpg',
        youtubeQuery: 'Spice Island Spices Herbs Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'ceylon-cinnamon',
        title: 'Ceylon Cinnamon | The true cinnamon | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-ceylon-cinnamon.jpg',
        youtubeQuery: 'Ceylon Cinnamon The true cinnamon Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'coconut-artisans',
        title: 'Coconut Artisans of Sri Lanka | The craft',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-coconut-artisans.jpg',
        youtubeQuery: 'Coconut Artisans of Sri Lanka The craft Destination SRI LANKA',
      },
      {
        id: 'turtle-conservation',
        title: 'Sea Turtle Conservation in Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-turtle-conservation.jpg',
        youtubeQuery: 'Sea Turtle Conservation Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'madu-lake',
        title: 'Madu Lake Safari | Mangrove Ecosystem | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-madu-lake.jpg',
        youtubeQuery: 'Madu Lake Safari Mangrove Ecosystem Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'cycling',
        title: 'Cycling Tours & Countryside Trails | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-cycling.jpg',
        youtubeQuery: 'Cycling Tours Countryside Trails Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'kitulgala-rafting',
        title: 'Kitulgala White Water Rafting | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-kitulgala-rafting.jpg',
        youtubeQuery: 'Kitulgala White Water Rafting Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'rathnadeepa-gems',
        title: 'Rathnadeepa | Island of Gems | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-rathnadeepa-gems.jpg',
        youtubeQuery: 'Rathnadeepa Island of Gems Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'peraliya-train',
        title: 'Peraliya Tsunami Train Memorial | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-peraliya-train.jpg',
        youtubeQuery: 'Peraliya Tsunami Train Memorial Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'kandy-perahera',
        title: 'Kandy Esala Perahera Procession | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-kandy-perahera.jpg',
        youtubeQuery: 'Kandy Esala Perahera Procession Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'ramayana-trail',
        title: 'Ramayana Trail Heritage Sites | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-ramayana-trail.jpg',
        youtubeQuery: 'Ramayana Trail Heritage Sites Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'stone-artistry',
        title: 'Ancient Stone Artistry | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-stone-artistry.jpg',
        youtubeQuery: 'Ancient Stone Artistry Sri Lanka Destination SRI LANKA',
      },
      {
        id: 'hydraulic-civilization',
        title: 'Amazing Ancient Hydraulic Civilization | Sri Lanka',
        channel: 'Destination SRI LANKA',
        thumb: '/assets/aistudio/todo/todo-hydraulic-civilization.jpg',
        youtubeQuery: 'Amazing Ancient Hydraulic Civilization Sri Lanka Destination SRI LANKA',
      },
    ],
    []
  );

  const regionalMemories = useMemo(
    () => [
      {
        regionKey: 'europeans',
        regionTitle: 'Europeans',
        subtitle: 'Guests from UK, Germany, France, Netherlands, Italy & Switzerland',
        flag: '🇪🇺',
        items: [
          {
            id: 'eur-1',
            title: 'Nuwara Eliya Tea Gardens & Highland Train',
            guestName: 'Elena & Lucas (Munich, Germany)',
            location: 'Nuwara Eliya & Ella',
            tour: "KuRa's Hillside Honeymoon",
            image: '/assets/aistudio/tea-hills_bfabb10f.jpg',
            quote: 'Chaminda was the best chauffeur-guide! Our tea estate tour and mountain train ride were completely seamless.',
            date: 'October 2025',
          },
          {
            id: 'eur-2',
            title: 'Sigiriya Rock Climb & Ancient Minneriya Safari',
            guestName: 'The Miller Family (Bristol, UK)',
            location: 'Sigiriya & Minneriya',
            tour: "KuRa's Heritage Tour",
            image: '/assets/aistudio/hero_58b958e2.jpg',
            quote: 'An unforgettable 7-day cultural trip. Seeing wild elephant herds with KuRa was the highlight of our holiday.',
            date: 'September 2025',
          },
          {
            id: 'eur-3',
            title: 'Galle Dutch Fort Ramparts & Unawatuna Sunset',
            guestName: 'Jean & Sophie (Lyon, France)',
            location: 'Galle Fort & Unawatuna',
            tour: 'Galle Day Excursion',
            image: '/assets/aistudio/galle_9e7733fe.jpg',
            quote: 'Wonderful history and beautiful ocean sunset views. Highly recommend 4Me Lanka Tours to anyone traveling from France!',
            date: 'August 2025',
          },
          {
            id: 'eur-4',
            title: 'Kandy Sacred Tooth Relic & Royal Botanical Gardens',
            guestName: 'Matteo & Francesca (Milan, Italy)',
            location: 'Kandy Hill Capital',
            tour: "KuRa's Culture Tour",
            image: '/assets/aistudio/kandy_3e5113c7.jpg',
            quote: 'KuRa organized incredible boutique stay hotels and provided deep cultural insights into ancient Kandy history.',
            date: 'July 2025',
          },
        ],
      },
      {
        regionKey: 'australians',
        regionTitle: 'Australians',
        subtitle: 'Travelers & Adventurers from Sydney, Melbourne, Perth & Brisbane',
        flag: '🇦🇺',
        items: [
          {
            id: 'aus-1',
            title: 'Nine Arch Bridge & Ella Rock Hike',
            guestName: 'Liam & Hannah (Melbourne, Australia)',
            location: 'Ella Mountain Range',
            tour: "KuRa's Adventure",
            image: '/assets/aistudio/ella_53a0777f.jpg',
            quote: 'The Demodara Nine Arch train photography spot was spectacular! KuRa knew the exact train schedule times.',
            date: 'August 2025',
          },
          {
            id: 'aus-2',
            title: 'Arugam Bay Surf & East Coast Coastline',
            guestName: 'Jack & Surf Squad (Sydney, Australia)',
            location: 'Arugam Bay',
            tour: "KuRa's All Ceylon",
            image: '/assets/aistudio/surf-coast_38d6410d.jpg',
            quote: 'Pristine ocean waves and relaxed vibes! Our custom vehicle transfer and board transport were handled flawlessly.',
            date: 'July 2025',
          },
          {
            id: 'aus-3',
            title: 'Mirissa Whale Watching & Coral Reef Snorkeling',
            guestName: 'Chloe & Ben (Perth, Australia)',
            location: 'Mirissa & Hikkaduwa',
            tour: "KuRa's Beachside Honeymoon",
            image: '/assets/aistudio/mirissa_3d3801f6.jpg',
            quote: 'We saw blue whales in Mirissa! KuRa is extremely friendly, punctual, and safe on Sri Lankan highways.',
            date: 'May 2025',
          },
        ],
      },
      {
        regionKey: 'americans',
        regionTitle: 'Americans',
        subtitle: 'Guests from New York, California, Texas, Toronto & Vancouver',
        flag: '🇺🇸',
        items: [
          {
            id: 'usa-1',
            title: 'Anuradhapura Sacred Stupas & Heritage Triangle',
            guestName: 'David & Sarah (San Francisco, USA)',
            location: 'Anuradhapura World Heritage',
            tour: "KuRa's Heritage",
            image: '/assets/aistudio/anuradhapura-2_376f70af.jpg',
            quote: '2,500 years of living history! Traveling with 4Me Lanka Tours made navigating Sri Lanka comfortable and effortless.',
            date: 'October 2025',
          },
          {
            id: 'usa-2',
            title: 'Yala National Park Leopard Safari Expedition',
            guestName: 'Marcus & Jessica (Chicago, USA)',
            location: 'Yala & Tissamaharama',
            tour: "KuRa's All Ceylon",
            image: '/assets/aistudio/yala-safari_fbf20478.jpg',
            quote: 'We spotted a Sri Lankan leopard and sloth bear on our first jeep drive! Incredible wildlife experience.',
            date: 'June 2025',
          },
          {
            id: 'usa-3',
            title: 'Bentota Water Sports & Lagoon Mangrove Safari',
            guestName: 'The Roberts Family (Austin, Texas)',
            location: 'Bentota Lagoon & Turtle Hatchery',
            tour: 'Bentota Day Tour',
            image: '/assets/aistudio/destinations/dest-bentota.jpg',
            quote: 'Jet skiing and releasing baby sea turtles at dusk in Bentota was an unforgettable day for our kids.',
            date: 'April 2025',
          },
        ],
      },
      {
        regionKey: 'mideasterns',
        regionTitle: 'Mid Easterns',
        subtitle: 'Families & Travelers from Dubai, Abu Dhabi, Doha, Riyadh & Kuwait',
        flag: '🇦🇪',
        items: [
          {
            id: 'me-1',
            title: 'Misty Nuwara Eliya Highlands & Gregory Lake Resort',
            guestName: 'Al-Mansoor Family (Dubai, UAE)',
            location: 'Nuwara Eliya & Little England',
            tour: "KuRa's Leisure Tour",
            image: '/assets/aistudio/destinations/dest-nuwaraeliya.jpg',
            quote: 'Perfect cool mountain weather and private luxury van with driver. KuRa arranged family-friendly Halal dining spots.',
            date: 'August 2025',
          },
          {
            id: 'me-2',
            title: 'Kitulgala Rainforest Kelani River Rafting',
            guestName: 'Tariq & Friends (Riyadh, Saudi Arabia)',
            location: 'Kitulgala Valley',
            tour: 'Kithulgala Day Tour',
            image: '/assets/aistudio/offer-activities.jpg',
            quote: 'High energy rafting and lush green jungle scenery! Clean vehicle with air conditioning and top hospitality.',
            date: 'June 2025',
          },
          {
            id: 'me-3',
            title: 'Colombo City Tour & Lotus Tower Sky View',
            guestName: 'Hassan & Family (Doha, Qatar)',
            location: 'Colombo Fort & Galle Face Green',
            tour: 'Colombo Day Tour',
            image: '/assets/aistudio/destinations/dest-colombo.jpg',
            quote: 'Wonderful shopping in Colombo and dinner along Galle Face Green beach front.',
            date: 'March 2025',
          },
        ],
      },
      {
        regionKey: 'eastasians',
        regionTitle: 'Chinese & Japanese',
        subtitle: 'Cultural Explorers from Tokyo, Kyoto, Beijing, Shanghai & Guangzhou',
        flag: '🇯🇵 🇨🇳',
        items: [
          {
            id: 'ea-1',
            title: 'Kandy Esala Perahera & Tooth Relic Temple',
            guestName: 'Nozomi & Kenji (Tokyo, Japan)',
            location: 'Kandy Temple of Tooth',
            tour: "KuRa's Culture Tour",
            image: '/assets/aistudio/destinations/dest-kandy.jpg',
            quote: 'Spectacular traditional Kandyan dancers and elephant processions! KuRa ensured comfortable seats for viewing.',
            date: 'August 2025',
          },
          {
            id: 'ea-2',
            title: 'Sigiriya Frescoes & Golden Rock Temple',
            guestName: 'Wei & Lin (Shanghai, China)',
            location: 'Sigiriya & Dambulla',
            tour: 'Sigiriya Day Excursion',
            image: '/assets/aistudio/sigiriya-view_e6bf3949.jpg',
            quote: 'Climbing Sigiriya fortress at sunrise was magnificent. Very respectful, attentive driver service.',
            date: 'October 2025',
          },
          {
            id: 'ea-3',
            title: 'Pinnawala Elephant Bathing in River Maha Oya',
            guestName: 'Yuki & Sakura (Kyoto, Japan)',
            location: 'Pinnawala Orphanage',
            tour: 'Pinnawala Day Tour',
            image: '/assets/aistudio/destinations/dest-pinnawala.jpg',
            quote: 'Watching 80+ elephants river bathing close up was magical! Great photography tips from KuRa.',
            date: 'February 2025',
          },
        ],
      },
      {
        regionKey: 'indians',
        regionTitle: 'Indians',
        subtitle: 'Couples, Families & Groups from Mumbai, Delhi, Bengaluru, Chennai & Hyderabad',
        flag: '🇮🇳',
        items: [
          {
            id: 'ind-1',
            title: 'Ramayana Trail - Seetha Amman Kovil & Hakgala Gardens',
            guestName: 'Patel Family (Ahmedabad, India)',
            location: 'Nuwara Eliya & Ashok Vatika',
            tour: "KuRa's Ramayana Trail",
            image: '/assets/aistudio/poster-ramayana.jpg',
            quote: 'Sacred journey visiting Munneswaram, Seetha Amman Kovil, and Koneswaram temple in Trincomalee.',
            date: 'October 2025',
          },
          {
            id: 'ind-2',
            title: 'Bentota Water Sports & Sunset Beach Dinner',
            guestName: 'Rohan & Ananya (Bengaluru, India)',
            location: 'Bentota Beach Resort',
            tour: "KuRa's Beachside Honeymoon",
            image: '/assets/aistudio/surf-coast_38d6410d.jpg',
            quote: 'Amazing honeymoon trip! Water sports in Bentota and romantic candlelit seafood dinner on the shore.',
            date: 'September 2025',
          },
          {
            id: 'ind-3',
            title: 'Trincomalee Nilaveli Beach & Pigeon Island Snorkeling',
            guestName: 'Sharma Family (Delhi, India)',
            location: 'Trincomalee & Nilaveli',
            tour: "KuRa's All Ceylon",
            image: '/assets/aistudio/destinations/dest-trincomalee.jpg',
            quote: 'Crystal clear ocean waters and vibrant coral marine life at Pigeon Island. Excellent travel coordination!',
            date: 'June 2025',
          },
        ],
      },
      {
        regionKey: 'southasians',
        regionTitle: 'South Asians',
        subtitle: 'Friends & Travelers from Maldives, Nepal, Bangladesh & Regional Diaspora',
        flag: '🇲🇻 🇳🇵 🇧🇩',
        items: [
          {
            id: 'sa-1',
            title: 'Colombo Shopping, Dutch Hospital & Pettah Bazaar',
            guestName: 'Ibrahim & Friends (Male, Maldives)',
            location: 'Colombo City',
            tour: 'Colombo Day Tour',
            image: '/assets/aistudio/destinations/dest-colombo.jpg',
            quote: 'Convenient airport transfer, luxury van, and high-end shopping around Colombo One Galle Face and Dutch Hospital.',
            date: 'August 2025',
          },
          {
            id: 'sa-2',
            title: 'Scenic Hill Country Railway Journey to Ella',
            guestName: 'Shrestha Family (Kathmandu, Nepal)',
            location: 'Kandy to Ella Train',
            tour: "KuRa's Adventure",
            image: '/assets/aistudio/train_016a8173.jpg',
            quote: 'Breath-taking mountain passes and tea plantation slopes. KuRa is like a trusted brother in Sri Lanka!',
            date: 'May 2025',
          },
          {
            id: 'sa-3',
            title: 'Traditional Stilt Fishing & Southern Coastal Drive',
            guestName: 'Rahman & Family (Dhaka, Bangladesh)',
            location: 'Ahangama & Koggala Coast',
            tour: "KuRa's Culture Tour",
            image: '/assets/aistudio/stilt_b5edbf6f.jpg',
            quote: 'Experiencing traditional stilt fishermen along the southern coastline was a memorable highlight.',
            date: 'April 2025',
          },
        ],
      },
    ],
    []
  );

  const sampleBlogs = useMemo(
    () => [
      {
        id: 'alan-walker',
        title: 'Alan Walker Live in Sri Lanka 2026',
        author: 'By Chaminda Kuruwita',
        date: 'June 25, 2026',
        category: 'ENTERTAINMENT & EVENTS',
        image: '/assets/aistudio/offer-activities.jpg',
        excerpt:
          'Alan Walker Live In Sri Lanka 2026 – Payed Festival Alan Walker is Coming To Sri Lanka! For Fans Of The Global EDM Superstar Come Family Experience An Electrifying Performance At The Payed Festival 2026, Happening In Colombo On August 28–29, 2026. This Two-Day Festival Promises To Be One Of The Biggest Music Events Of The Year.',
        fullContent: `Alan Walker Live In Sri Lanka 2026 – Payed Festival

Alan Walker is officially coming to Sri Lanka! For fans of the global EDM superstar, experience an electrifying live performance at the Payed Festival 2026, happening in Colombo on August 28–29, 2026. This two-day music festival promises to be one of the biggest international entertainment events of the year in South Asia.

Key Event Highlights:
• Location: Colombo Waterfront / Viharamahadevi Park Open Air Arena
• Dates: August 28–29, 2026
• VIP Lounge & Chauffeur Pickups available through 4Me Lanka Tours
• Special pre-concert & post-concert island tours arranged for international visitors.`,
      },
      {
        id: 'tipping-in-srilanka',
        title: 'Tipping in Srilanka',
        author: 'By Chaminda Kuruwita',
        date: 'January 20, 2026',
        category: 'TRAVEL TIPS & GUIDES',
        image: '/assets/aistudio/srilanka-illustrated-map.jpg',
        excerpt:
          'Tipping In Srilanka: What You Need To Know. Customary Tipping Is A Form Of Gratitude, Not An Obligation. This Guide Is Intended To Provide Practical Advice On Sri Lanka’s Tipping Culture And The Recommended Range Of Gratuities To Help You Make An Informed Decision. Please Note That This Guide Is Specifically Addressing Tipping On Private Tours.',
        fullContent: `Tipping In Srilanka: What You Need To Know

Customary tipping in Sri Lanka is an expression of gratitude for exceptional service rather than a strict obligation. When booking private chauffeur-guided tours with 4Me Lanka Tours, tipping your driver-guide or local hotel staff is customary and deeply appreciated.

Recommended Tipping Guidelines:
• Private Tour Driver-Guide: $10 - $20 USD per day depending on group size and service satisfaction.
• Hotel Baggage Handlers: 200 - 500 LKR per bag.
• Restaurant Waiters: 10% of bill (if service charge is not included).
• Jeep Safari Drivers (Yala/Minneriya): 1,000 - 2,000 LKR per jeep drive.`,
      },
      {
        id: 'srilankan-national-flag',
        title: 'Srilankan National Flag',
        author: 'By Chaminda Kuruwita',
        date: 'July 21, 2024',
        category: 'HERITAGE & SYMBOLS',
        image: '/assets/aistudio/hero-slide-sigiriya-aerial.jpg',
        excerpt:
          'The Srilankan National Flag, Commonly Called The Sinha Flag Or Lion Flag Of Sri Lanka, Is A Symbol Of Pride, Rich Cultural Heritage And History, Deep Reflection Of Joy That Is Ancient And Symbolic To Its People. The Srilankan National Flag, Also Known As The Lion Flag, Is A Representation Of The Country’s Identity, Values, And Heritage.',
        fullContent: `The Sri Lankan National Flag: History & Symbolism

The Sri Lankan National Flag, commonly known as the Sinha Flag (Lion Flag), is one of the most distinctive and meaningful national flags in the world.

Key Symbols Explained:
1. The Golden Lion: Represents bravery and the Sinhalese people ('Sinha' meaning lion).
2. The Sword in Paw: Represents authority, sovereignty, and justice.
3. Four Bo Leaves: Located in the four corners, representing the four virtues of Buddhism — Loving-kindness (Metta), Compassion (Karuna), Sympathetic Joy (Mudita), and Equanimity (Upekkha).
4. Orange & Green Vertical Stripes: Represent the minority Tamil (Orange) and Muslim (Green) communities, highlighting unity across religions and ethnicities.`,
      },
      {
        id: 'national-anthem',
        title: 'National Anthem Of Srilanka',
        author: 'By Chaminda Kuruwita',
        date: 'July 21, 2024',
        category: 'HERITAGE & CULTURAL PRIDE',
        image: '/assets/aistudio/kandyan-dancer.jpg',
        excerpt:
          'National Anthem Of Srilanka, A Symbol Of Unity And Pride. The National Anthem Of Srilanka, "Sri Lanka Matha", Is More Than Just A Song. It Is A Symbol Of Unity, Pride, And The Rich Cultural Heritage Of The Island Nation. Whether You’re A Tourist Visiting Sri Lanka, Or A Traveler Exploring Sri Lanka, Understanding The Story Behind The Anthem Adds Depth To Your Journey.',
        fullContent: `National Anthem of Sri Lanka: "Sri Lanka Matha"

Composed by Ananda Samarakoon in 1940, "Sri Lanka Matha" is a soulful invocation celebrating the natural beauty, bountiful lands, and cultural harmony of Mother Sri Lanka.

Cultural Significance:
• Sung in both Sinhala ("Sri Lanka Matha") and Tamil ("Sri Lanka Thaai") during official national observances.
• Inspires deep respect for the island's mountains, rivers, ancient heritage, and peaceful co-existence.`,
      },
      {
        id: 'buddhist-flag',
        title: 'Buddhist Flag Of Srilanka',
        author: 'By Chaminda Kuruwita',
        date: 'July 21, 2024',
        category: 'RELIGIOUS HERITAGE',
        image: '/assets/aistudio/anuradhapura-2_376f70af.jpg',
        excerpt:
          'Buddhist Flag Of Sri Lanka, A Symbol Of Peace And Harmony. The Buddhist Flag Of Sri Lanka Holds The Distinction Of Being A Symbol Of Cultural And Religious Identity. The Buddhist Flag Holds A Special Place. It Is Not Only A Symbol Of Buddhist Faith In Sri Lanka But Also Represents The Core Values Of Peace, Harmony, And Spiritual Light.',
        fullContent: `The Six Colors of the Buddhist Flag

Designed in Colombo in 1885 by the Colombo Committee and Colonel Henry Steel Olcott, the Buddhist flag represents the six aura colors emanated from the Buddha upon reaching Enlightenment:

1. Blue (Nila): Universal Compassion
2. Yellow (Pita): The Middle Path
3. Red (Lohita): Blessings of Practice
4. White (Odata): Purity and Liberation
5. Orange (Manjettha): The Buddha’s Teachings
6. Spectrum (Prabhashvara): The Combination of Truth and Enlightenment.`,
      },
      {
        id: 'vesak-ceremony',
        title: 'Vesak Ceremony In Srilanka',
        author: 'By Chaminda Kuruwita',
        date: 'July 21, 2024',
        category: 'FESTIVALS & CELEBRATIONS',
        image: '/assets/aistudio/kandy_3e5113c7.jpg',
        excerpt:
          'Vesak Ceremony In Sri Lanka, Celebrating Buddha’s Enlightenment. Vesak Ceremony In Sri Lanka, Also Known As Vesak Full Moon Poya Day, Is One Of The Most Significant And Widely Celebrated Buddhist Festivals. This Sacred Day Commemorates The Birth, Enlightenment, And Passing Away Of Lord Buddha, Making It A Triple Blessed Day For Buddhists.',
        fullContent: `Vesak Full Moon Poya: Festival of Light & Giving

Vesak is Sri Lanka's most radiant festival, celebrated on the full moon of May. Cities and villages across the island transform into magical wonderlands adorned with giant illuminated paper lanterns (Vesak Kuudu) and massive pandols (Torana) illustrating Jataka tales.

Highlights of Vesak in Sri Lanka:
• Dansalas: Free food stalls set up by locals offering ice cream, tea, rice & curry to all passersby as an act of generosity.
• Temple Devotions: Millions wear white and visit sacred stupas for meditation, oil lamp offerings, and chanting.`,
      },
      {
        id: 'traditional-hospitality',
        title: 'Traditional Hospitality & Ayubowan Culture',
        author: 'By Chaminda Kuruwita',
        date: 'August 10, 2025',
        category: 'CULTURE & WELCOME',
        image: '/assets/aistudio/kura-founder.jpg',
        excerpt:
          'Experience the warmth of authentic Sri Lankan hospitality! From the traditional folded-hands greeting "Ayubowan" (May you live long) to serving fresh King Coconut juice upon arrival, learn why Sri Lanka is famed as the island of smiles.',
        fullContent: `Ayubowan! The Essence of Sri Lankan Hospitality

In Sri Lanka, guests are treated with the highest honor. The traditional greeting "Ayubowan" is delivered with folded palms near the chest, wishing the recipient a long and healthy life.

At 4Me Lanka Tours, founder Chaminda Kuruwita (KuRa) embodies our core company motto: "Say Hi As Guests, Bye As Friends." From chilled bottled water and fresh tropical fruit snacks during long scenic drives to personal introduction to local villagers, you experience genuine warmth throughout your journey.`,
      },
      {
        id: 'kandy-perahera-guide',
        title: 'Kandy Esala Perahera Spectacle',
        author: 'By Chaminda Kuruwita',
        date: 'July 15, 2025',
        category: 'CULTURAL SPECTACLE',
        image: '/assets/aistudio/destinations/dest-kandy.jpg',
        excerpt:
          'A 10-night grand festival featuring majestic tusker elephants adorned in silk robes, fire dancers, whip-crackers, and Kandyan drummers honoring the Sacred Tooth Relic of Lord Buddha in Kandy.',
        fullContent: `The Kandy Esala Perahera Pageantry

Dating back to the 3rd century BC, the Kandy Esala Perahera is one of Asia's oldest and grandest religious processions. Held annually in July/August, the procession takes place over ten consecutive nights.

What to Expect:
• The Grand Maligawa Tusker carrying the sacred golden casket.
• Hundreds of traditional Kandyan fire dancers and acrobats.
• VIP seating arrangements with 4Me Lanka Tours for the best photography angles.`,
      },
      {
        id: 'ceylon-tea-country',
        title: 'Exploring Ceylon Tea Country & Scenic Train',
        author: 'By Chaminda Kuruwita',
        date: 'June 05, 2025',
        category: 'NATURE & SCENIC',
        image: '/assets/aistudio/tea_6f6d4029.jpg',
        excerpt:
          'Journey through misty mountain tea estates in Nuwara Eliya and Haputale. Learn how British planters developed world-famed Ceylon Tea and take the iconic blue train over Nine Arch Bridge to Ella.',
        fullContent: `Ceylon Tea Estate Trail & Blue Train

Sri Lanka is the world's 3rd largest tea exporter, famous for Ceylon Tea with crisp mountain flavors.

Highlights:
• Guided factory walk-throughs observing withered leaves, rolling, oxidation, and grading.
• Tasting pure Single Origin High Grown Ceylon Black Tea.
• Scenic 3-hour train ride from Nanu Oya to Ella through cloud forests and emerald valleys.`,
      },
      {
        id: 'wildlife-safari-guide',
        title: 'Ultimate Wildlife Safari Guide: Yala & Minneriya',
        author: 'By Chaminda Kuruwita',
        date: 'May 18, 2025',
        category: 'WILDLIFE & SAFARI',
        image: '/assets/aistudio/yala-safari_fbf20478.jpg',
        excerpt:
          'Sri Lanka has the highest density of leopards in the world at Yala, plus the famous "Gathering" of 300+ wild Asian elephants at Minneriya Reservoir. Plan your ideal safari drive with local park experts.',
        fullContent: `Sri Lanka Wildlife Safari Guide

Sri Lanka is a biodiversity hotspot boasting 91 species of mammals and 433 bird species.

Top Safari Parks:
1. Yala National Park: Famed for Block 1 leopard sightings and sloth bears.
2. Minneriya National Park: Famed for "The Elephant Gathering" between July and October.
3. Udawalawa National Park: Year-round guaranteed elephant herd viewings.`,
      },
      {
        id: 'best-time-to-visit',
        title: 'Best Time to Visit Sri Lanka: Season & Weather Breakdown',
        author: 'By Chaminda Kuruwita',
        date: 'April 12, 2025',
        category: 'WEATHER & SEASONS',
        image: '/assets/aistudio/mirissa_3d3801f6.jpg',
        excerpt:
          'Sri Lanka is a year-round tropical paradise! Because monsoon seasons alternate between the West Coast and East Coast, there is always sunny beach weather somewhere on the island.',
        fullContent: `Sri Lanka Weather & Travel Seasons

• West & South Coast (Bentota, Galle, Mirissa, Yala): Best weather from November to April.
• East Coast (Trincomalee, Pasikudah, Arugam Bay): Best weather from April to September.
• Cultural Triangle & Kandy: Excellent weather almost all year round.`,
      },
      {
        id: 'sri-lankan-food-guide',
        title: 'Sri Lankan Cuisine: Spices, Rice & Curry, Kottu & Hoppers',
        author: 'By Chaminda Kuruwita',
        date: 'March 22, 2025',
        category: 'FOOD & GASTRONOMY',
        image: '/assets/aistudio/todo/todo-kottu-roti.jpg',
        excerpt:
          'Indulge in fiery crab curry, bowl-shaped Egg Hoppers, coconut sambal, and the rhythmic chopping sounds of street-side Kottu Roti. Discover the rich spice flavors of Ceylon.',
        fullContent: `A Foodie's Guide to Sri Lankan Cuisine

Sri Lankan food relies on aromatic spices like Ceylon cardamom, roasted curry powder, garcinia (goraka), and fresh coconut milk.

Must-Try Dishes:
• Rice & Curry: 5 to 7 seasonal vegetable curries served with red heritage rice.
• Kottu Roti: Chopped flatbread wok-tossed with vegetables, egg, spices, and chicken or beef curry.
• Egg Hoppers (Appa): Crispy bowl-shaped coconut pancakes with a soft-boiled egg in the center.`,
      },
      {
        id: 'surfing-sri-lanka',
        title: 'Surfing Sri Lanka: Arugam Bay to Mirissa',
        author: 'By Chaminda Kuruwita',
        date: 'February 14, 2025',
        category: 'ADVENTURE & SPORTS',
        image: '/assets/aistudio/surf-coast_38d6410d.jpg',
        excerpt:
          'From world-class point breaks in Arugam Bay to beginner-friendly beach breaks in Weligama and Hikkaduwa, Sri Lanka is a dream surf destination for boarders of all skill levels.',
        fullContent: `Surfing Sri Lanka: East vs. South Coast

• Arugam Bay (May – September): World Top 10 right-hand point break.
• Weligama & Hiriketiya (November – April): Gentle sandy beach breaks ideal for learning and longboarding.`,
      },
      {
        id: 'ramayana-trail-guide',
        title: 'Sacred Ramayana Trail Sites in Sri Lanka',
        author: 'By Chaminda Kuruwita',
        date: 'January 10, 2025',
        category: 'PILGRIMAGE & HISTORY',
        image: '/assets/aistudio/poster-ramayana.jpg',
        excerpt:
          'Follow the epic Ramayana trail visiting Munneswaram Kovil, Seetha Amman Temple in Ashok Vatika, Sanjeevani Hill in Ritigala, Ravana Falls in Ella, and Koneswaram Temple in Trincomalee.',
        fullContent: `Sacred Ramayana Heritage Trail

Sri Lanka is home to over 50 historical sites associated with the ancient Ramayana epic.

Key Sacred Stops:
• Munneswaram & Manavari Kovil in Chilaw.
• Seetha Amman Temple & Hakgala Botanical Gardens (Ashok Vatika).
• Ravana Cave & Waterfall in Ella.
• Thirukoneswaram Temple perched above Swami Rock cliff in Trincomalee.`,
      },
      {
        id: 'visa-eta-airport-tips',
        title: 'Sri Lanka Visa (ETA/e-Visa) & Airport Arrival Tips',
        author: 'By Chaminda Kuruwita',
        date: 'January 02, 2025',
        category: 'PRACTICAL TRAVEL TIPS',
        image: '/assets/aistudio/destinations/dest-negombo.jpg',
        excerpt:
          'Essential arrival information for Bandaranaike International Airport (BIA Colombo). Learn about e-Visa online application, SIM card pickup, currency exchange, and chauffeur pickup arrangements.',
        fullContent: `Bandaranaike Airport (BIA) Arrival Guide

1. Electronic Travel Authorization (ETA / e-Visa): Apply online prior to travel or obtain Visa on Arrival at BIA.
2. SIM Cards: Dialog and Mobitel counters operate 24/7 in the arrivals hall offering 30-day tourist data packages.
3. Private Transfer: Your 4Me Lanka Tours chauffeur guide meets you right outside arrivals holding a 4Me Lanka Tours sign board.`,
      },
    ],
    []
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

  const filteredTours = popularTours.filter((pkg) => {
    if (tourFilter !== 'all' && pkg.category !== tourFilter) return false;
    if (!showAllTours && tourFilter === 'all' && !pkg.isSignaturePoster) return false;
    return true;
  });
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
    const cards = document.querySelectorAll('.tour-pkg, .pkg-poster-item');
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
        stagger: 0.05,
        ease: 'power3.out',
        overwrite: 'auto',
        clearProps: 'transform',
        onComplete: () => {
          if (ScrollTrigger) ScrollTrigger.refresh();
        },
      }
    );
  }, [tourFilter, showAllTours]);

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
      gsap.from('.poster-card', {
        y: 36,
        opacity: 0,
        duration: 0.95 * S,
        stagger: 0.1 * S,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.poster-showcase-grid', start: 'top 84%', once: true },
      });

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
        <Link className="brand" to="/" aria-label="4Me Lanka Tours — back to home">
          <span className="brand__name">{t('nav.brand')}</span>
        </Link>
        <nav className="nav__links" aria-label="Sections">
          <Link to="/" className={viewMode === 'home' ? 'is-active' : ''}>
            {t('nav.home')}
          </Link>
          <Link to="/tour-packages" className={viewMode === 'tours' ? 'is-active' : ''}>
            {t('nav.tours')}
          </Link>
          <Link to="/destinations" className={viewMode === 'destinations' ? 'is-active' : ''}>
            {t('nav.destinations')}
          </Link>
          <Link to="/todo" className={viewMode === 'todo' ? 'is-active' : ''}>
            {t('nav.todo')}
          </Link>
          <Link to="/memories" className={viewMode === 'memories' ? 'is-active' : ''}>
            {t('nav.memories')}
          </Link>
          <Link to="/blogs" className={viewMode === 'blogs' ? 'is-active' : ''}>
            {t('nav.blogs')}
          </Link>
          <Link to="/contact" className={viewMode === 'contact' ? 'is-active' : ''}>
            {t('nav.contact')}
          </Link>
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
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/tour-packages">{t('nav.tours')}</Link>
            <Link to="/destinations">{t('nav.destinations')}</Link>
            <Link to="/todo">{t('nav.todo')}</Link>
            <Link to="/memories">{t('nav.memories')}</Link>
            <Link to="/blogs">{t('nav.blogs')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
          </nav>
          <p className="menu__foot">
            {t('nav.mobileFootLine1')}
            <br />
            {t('nav.mobileFootLine2')}
          </p>
        </div>
      </div>

      <main id="top">
        {viewMode === 'home' && (
          <>
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
                  <Link className="btn btn--gold" to="/tour-packages">
                    {t('hero.btnPrimary')}
                  </Link>
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
          </>
        )}

        {viewMode === 'home' && (
          <>
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
          </>
        )}

        {/* ── 04 KURA'S POPULAR TOURS / ALL TOUR PACKAGES ───── */}
        <section className="popular-tours" id="tours">
          <div className="container">
            <header className="sec-head">
              <p className="label label--light">
                <span>{viewMode === 'tours' ? '01' : '04'}</span> {t('tours.secLabel')}
              </p>
              <h2 className="display display--light" data-words>
                {t('tours.secHeadingLine1')}
                <br />
                <em>{t('tours.secHeadingEm')}</em>
              </h2>
            </header>

            {/* On Home Page: 4-Column Signature Tour Poster Showcase */}
            {viewMode === 'home' && !showAllTours && (
              <>
                <div className="poster-showcase-grid">
                  {signaturePosterTours.map((tour) => (
                    <article key={`poster-${tour.id}`} className="poster-card">
                      <div
                        className="poster-card__art"
                        onClick={() =>
                          setActiveModal({
                            type: 'poster',
                            title: `${tour.title} ${tour.priceLabel}`,
                            subtitle: `${tour.duration} · ${tour.subtitle}`,
                            src: tour.poster,
                          })
                        }
                      >
                        <img src={tour.poster} alt={`${tour.title} Official Tour Poster`} loading="lazy" />
                        <span className="poster-card__badge">{tour.duration}</span>
                      </div>
                      <div className="poster-card__foot">
                        <div>
                          <h3 className="poster-card__title">
                            {tour.title}{' '}
                            <span className="text-amber-300 text-base">{tour.priceLabel}</span>
                          </h3>
                          <p className="poster-card__stops">{tour.stops}</p>
                        </div>
                        <div className="poster-card__btns">
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectTourForInquiry(`${tour.title} (${tour.duration}) - ${tour.priceLabel}`)
                            }
                            className="btn btn--gold"
                          >
                            View &amp; Book
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveModal({
                                type: 'poster',
                                title: `${tour.title} ${tour.priceLabel}`,
                                subtitle: `${tour.duration} · ${tour.subtitle}`,
                                src: tour.poster,
                              })
                            }
                            className="btn btn--ghost"
                          >
                            Full Poster
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="tours-view-all-bar">
                  <Link to="/tour-packages" className="btn btn--gold">
                    View All Tours (18 Packages) →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowAllTours(true)}
                    className="btn btn--ghost"
                  >
                    Expand All 18 Packages Here
                  </button>
                </div>
              </>
            )}

            {/* On Tour Packages Page (or when expanded on Home): All 9 Multi-Day Tours + All 9 Day Tours */}
            {(viewMode === 'tours' || showAllTours) && (
              <>
                <div className="tours-filter-bar">
                  <div className="tours-tabs" role="tablist" aria-label="Filter tour packages">
                    <button
                      type="button"
                      onClick={() => setTourFilter('all')}
                      className={`tours-tab ${tourFilter === 'all' ? 'is-active' : ''}`}
                    >
                      All Packages (18)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTourFilter('multiday')}
                      className={`tours-tab ${tourFilter === 'multiday' ? 'is-active' : ''}`}
                    >
                      Multi-Day Tours (09)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTourFilter('day')}
                      className={`tours-tab ${tourFilter === 'day' ? 'is-active' : ''}`}
                    >
                      Day Tours (09)
                    </button>
                  </div>

                  <a className="btn btn--gold" href="#contact">
                    Customize Tour
                  </a>
                </div>

                {/* ── 9 MULTI-DAY TOUR PACKAGES (3-Column Poster Grid) ── */}
                {(tourFilter === 'all' || tourFilter === 'multiday') && (
                  <div>
                    <h3 className="packages-sec-title">KuRa’s Multi-Day Tour Packages</h3>
                    <div className="packages-3col-grid">
                      {multiDayTours.map((tour) => (
                        <article key={tour.id} className="pkg-poster-item">
                          <div
                            className="pkg-poster-item__frame"
                            onClick={() =>
                              setActiveModal({
                                type: 'poster',
                                title: `${tour.title} ${tour.priceLabel}`,
                                subtitle: `${tour.duration} · ${tour.subtitle}`,
                                src: tour.poster,
                              })
                            }
                          >
                            <img src={tour.poster} alt={`${tour.title} ${tour.priceLabel}`} loading="lazy" />
                          </div>
                          <div className="pkg-poster-item__meta">
                            <h4 className="pkg-poster-item__title">
                              {tour.title} <span className="pkg-poster-item__price">{tour.priceLabel}</span>
                            </h4>
                            <p className="pkg-poster-item__routes">{tour.stops}</p>
                            <div className="pkg-poster-item__actions">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSelectTourForInquiry(`${tour.title} (${tour.duration}) - ${tour.priceLabel}`)
                                }
                                className="btn btn--gold"
                              >
                                View &amp; Book
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveModal({
                                    type: 'poster',
                                    title: `${tour.title} ${tour.priceLabel}`,
                                    subtitle: `${tour.duration} · ${tour.subtitle}`,
                                    src: tour.poster,
                                  })
                                }
                                className="btn btn--ghost"
                              >
                                Full Poster
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    <div className="packages-divider-bar">
                      <a href="#contact" className="btn btn--gold">
                        Customize Tour
                      </a>
                    </div>
                  </div>
                )}

                {/* ── 9 DAY TOUR PACKAGES (3-Column Poster Grid) ── */}
                {(tourFilter === 'all' || tourFilter === 'day') && (
                  <div>
                    <h3 className="packages-sec-title">KuRa’s Day Tour Packages</h3>
                    <div className="packages-3col-grid">
                      {dayTours.map((tour) => (
                        <article key={tour.id} className="pkg-poster-item">
                          <div
                            className="pkg-poster-item__frame"
                            onClick={() =>
                              setActiveModal({
                                type: 'poster',
                                title: `${tour.title} ${tour.priceLabel}`,
                                subtitle: `${tour.duration} · ${tour.subtitle}`,
                                src: tour.poster,
                              })
                            }
                          >
                            <img src={tour.poster} alt={`${tour.title} ${tour.priceLabel}`} loading="lazy" />
                          </div>
                          <div className="pkg-poster-item__meta">
                            <h4 className="pkg-poster-item__title">
                              <u>{tour.title.replace(' Day Tour', '')}</u> Day Tour{' '}
                              <span className="pkg-poster-item__price">{tour.priceLabel}</span>
                            </h4>
                            <p className="pkg-poster-item__routes">{tour.stops}</p>
                            <div className="pkg-poster-item__actions">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSelectTourForInquiry(`${tour.title} - ${tour.priceLabel}`)
                                }
                                className="btn btn--gold"
                              >
                                View &amp; Book
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveModal({
                                    type: 'poster',
                                    title: `${tour.title} ${tour.priceLabel}`,
                                    subtitle: `${tour.duration} · ${tour.subtitle}`,
                                    src: tour.poster,
                                  })
                                }
                                className="btn btn--ghost"
                              >
                                Full Poster
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    <div className="packages-divider-bar">
                      <a href="#contact" className="btn btn--gold">
                        Customize Tour
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ── 05 PLACES / EXPLORE DESTINATIONS ──────────────────── */}
        {viewMode === 'destinations' && (
          <section className="destinations-sec pt-28" id="places">
            <div className="container">
              <h2 className="destinations-sec__heading">Explore Destinations..</h2>
              <div className="destinations-grid">
                {destinationsList.map((dest) => (
                  <article
                    key={dest.id}
                    className="dest-card"
                    onClick={() => {
                      setInquiryNotes(`Interested in visiting ${dest.name}`);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <img src={dest.img} alt={`Visit ${dest.name} in Sri Lanka with 4Me Lanka Tours`} loading="lazy" />
                    <h3 className="dest-card__title">{dest.name}</h3>
                  </article>
                ))}
              </div>
              <div className="pt-4">
                <a href="#contact" className="destinations-more-link">
                  For More Destinations..
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ── 06 EXPERIENCES (TO DO) ───────────────────────── */}
        {viewMode === 'todo' && (
          <section className="experiences bg-[#3e3833] py-16 md:py-24 text-white pt-28" id="experiences">
            <div className="container">
              <header className="sec-head mb-12">
                <p className="label label--light">
                  <span>TO DO</span> Destination Sri Lanka
                </p>
                <h2 className="display display--light">
                  Things To Do in Sri Lanka
                  <br />
                  <em>Must-See Video Experiences</em>
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {todoList.map((item) => (
                  <a
                    key={item.id}
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.youtubeQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-xl border-2 border-amber-600/80 bg-[#352f2b] shadow-2xl transition-all duration-300 hover:border-amber-400 hover:scale-[1.01]"
                  >
                    <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-stone-900">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* YouTube Play Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-20 items-center justify-center rounded-2xl bg-red-600/90 shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600">
                          <svg className="h-8 w-8 fill-white ml-1" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Watch on YouTube Badge */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded bg-black/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm border border-white/10">
                        <span>Watch on</span>
                        <span className="flex items-center text-red-500 font-bold">
                          <svg className="h-3.5 w-3.5 fill-current mr-0.5" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          YouTube
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Bottom callout note from user screenshot */}
              <div className="mt-16 text-center border-t border-amber-800/40 pt-10">
                <p className="font-serif italic text-2xl md:text-4xl text-amber-100 tracking-wide">
                  For All To Do Videos Please Visit “Destination SriLanka”
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── 07 KURA'S VEHICLE FLEET ──────────────────────── */}
        {viewMode === 'home' && (
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
        )}

        {/* ── 08 CLIENTS SAY / VERIFIED REVIEWS ────────────── */}
        {viewMode === 'home' && (
          <>
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
          </>
        )}

        {/* ── 08 GUEST MEMORIES & REGIONAL GALLERIES ───────── */}
        {viewMode === 'memories' && (
          <section className="memories-sec bg-[#2b2622] text-white py-16 md:py-24 border-t border-amber-900/40 pt-28" id="memories">
            <div className="container">
              <header className="sec-head mb-10">
                <p className="label label--light">
                  <span>MEMORIES</span> Guest Galleries Across The World
                </p>
                <h2 className="display display--light">
                  Happy Memories in Sri Lanka
                  <br />
                  <em>With KuRa &amp; 4Me Lanka Tours</em>
                </h2>
              </header>

              {/* Region Selector Tabs */}
              <div className="mb-12 flex flex-wrap items-center gap-2 border-b border-amber-900/40 pb-6">
                <button
                  type="button"
                  onClick={() => setMemoryRegionFilter('all')}
                  className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
                    memoryRegionFilter === 'all'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-lg'
                      : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  All Regional Galleries ({regionalMemories.reduce((acc, r) => acc + r.items.length, 0)})
                </button>
                {regionalMemories.map((reg) => (
                  <button
                    key={reg.regionKey}
                    type="button"
                    onClick={() => setMemoryRegionFilter(reg.regionKey)}
                    className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                      memoryRegionFilter === reg.regionKey
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-lg'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                    }`}
                  >
                    <span>{reg.flag}</span>
                    <span>{reg.regionTitle} ({reg.items.length})</span>
                  </button>
                ))}
              </div>

              {/* Separated Regional Gallery Sections */}
              <div className="space-y-16">
                {regionalMemories
                  .filter((reg) => memoryRegionFilter === 'all' || memoryRegionFilter === reg.regionKey)
                  .map((reg) => (
                    <div key={reg.regionKey} className="rounded-2xl border border-amber-900/40 bg-[#352f2b] p-6 md:p-8 shadow-2xl">
                      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-800/30 pb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{reg.flag}</span>
                            <h3 className="font-serif text-2xl md:text-3xl font-bold text-amber-200 tracking-wide">
                              {reg.regionTitle} Gallery
                            </h3>
                            <span className="rounded-full bg-amber-500/20 px-3 py-0.5 text-xs font-mono font-bold text-amber-300 border border-amber-500/30">
                              {reg.items.length} Memories
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-stone-300 font-normal">{reg.subtitle}</p>
                        </div>

                        <a
                          href="https://wa.me/94712857705?text=Hi%20KuRa%21%20I%20saw%20the%20guest%20memories%20gallery%20and%20would%20like%20to%20plan%20a%20tour."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--gold self-start md:self-auto text-xs"
                        >
                          Book Similar {reg.regionTitle} Itinerary
                        </a>
                      </div>

                      {/* Photo Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reg.items.map((item) => (
                          <article
                            key={item.id}
                            className="group relative overflow-hidden rounded-xl border border-amber-900/50 bg-[#2d2824] shadow-xl transition-all duration-300 hover:border-amber-400 hover:scale-[1.015]"
                          >
                            <div
                              className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer bg-stone-900"
                              onClick={() =>
                                setActiveModal({
                                  type: 'poster',
                                  title: item.title,
                                  subtitle: `${item.guestName} · ${item.location} (${item.date})\n\n"${item.quote}"`,
                                  src: item.image,
                                })
                              }
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-stone-950/80 px-3 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-sm border border-amber-500/20">
                                <span>📍</span> {item.location}
                              </div>

                              <div className="absolute top-3 right-3 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-950 shadow-md">
                                {item.tour}
                              </div>

                              <div className="absolute bottom-3 left-3 right-3">
                                <h4 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                                  {item.title}
                                </h4>
                              </div>
                            </div>

                            <div className="p-4 space-y-2 text-stone-300 text-xs leading-relaxed">
                              <p className="font-semibold text-amber-100 flex items-center justify-between">
                                <span>👤 {item.guestName}</span>
                                <span className="text-[10px] text-stone-400 font-mono">{item.date}</span>
                              </p>
                              <p className="italic text-stone-300/90 line-clamp-2">
                                &ldquo;{item.quote}&rdquo;
                              </p>
                              <div className="pt-2 flex items-center justify-between border-t border-stone-800">
                                <span className="text-amber-400 font-bold text-xs">★★★★★ Verified Review</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveModal({
                                      type: 'poster',
                                      title: item.title,
                                      subtitle: `${item.guestName} · ${item.location} (${item.date})\n\n"${item.quote}"`,
                                      src: item.image,
                                    })
                                  }
                                  className="text-[11px] font-bold text-amber-300 hover:text-white underline"
                                >
                                  View Full Photo →
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Bottom Memory Submission CTA */}
              <div className="mt-16 rounded-2xl border border-amber-700/50 bg-gradient-to-br from-[#3e3833] to-[#2b2622] p-8 text-center space-y-4 shadow-2xl">
                <h3 className="font-serif text-2xl md:text-4xl text-amber-200 font-bold">
                  Traveled with 4Me Lanka Tours?
                </h3>
                <p className="text-stone-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                  Send your tour photos with KuRa to be featured in our official guest gallery for your country!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <a
                    href="https://wa.me/94712857705?text=Hi%20KuRa%2C%20I%20would%20like%20to%20send%20our%20Sri%20Lanka%20tour%20photos%20for%20the%20Memories%20page!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--gold"
                  >
                    Send Photos on WhatsApp
                  </a>
                  <a href="#contact" className="btn btn--ghost">
                    Inquire / Plan Your Trip
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 09 BLOGS & TRAVEL GUIDES ─────────────────────── */}
        {viewMode === 'blogs' && (
          <section className="blogs-sec bg-[#352f2b] py-16 md:py-24 text-white pt-28" id="when">
            <div className="container">
              <header className="sec-head mb-12">
                <p className="label label--light">
                  <span>BLOGS</span> Sri Lanka Travel Guides &amp; Culture
                </p>
                <h2 className="display display--light">
                  Travel Insights &amp; Stories
                  <br />
                  <em>Explore Sri Lanka Like A Local</em>
                </h2>
              </header>

              {/* 2-Column Grid matching Screenshot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {sampleBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl border border-amber-900/40 bg-[#2d2824] p-5 shadow-2xl transition-all duration-300 hover:border-amber-400 hover:scale-[1.01]"
                  >
                    <div>
                      <div
                        className="relative aspect-[16/9.5] w-full overflow-hidden rounded-lg cursor-pointer bg-stone-900 mb-4"
                        onClick={() =>
                          setActiveModal({
                            type: 'poster',
                            title: blog.title,
                            subtitle: `${blog.author} · ${blog.date}\n\n${blog.fullContent}`,
                            src: blog.image,
                          })
                        }
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-stone-950/80 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 backdrop-blur-sm border border-amber-500/20">
                          {blog.category}
                        </span>
                      </div>

                      <h3
                        className="font-serif italic text-xl md:text-2xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors cursor-pointer leading-snug mb-2"
                        onClick={() =>
                          setActiveModal({
                            type: 'poster',
                            title: blog.title,
                            subtitle: `${blog.author} · ${blog.date}\n\n${blog.fullContent}`,
                            src: blog.image,
                          })
                        }
                      >
                        {blog.title}
                      </h3>

                      <p className="font-mono text-[11px] text-stone-400 font-semibold mb-3">
                        {blog.author} &bull; {blog.date}
                      </p>

                      <p className="text-stone-300 text-xs leading-relaxed line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-amber-900/30">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveModal({
                            type: 'poster',
                            title: blog.title,
                            subtitle: `${blog.author} · ${blog.date}\n\n${blog.fullContent}`,
                            src: blog.image,
                          })
                        }
                        className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>READ MORE</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 10 CONTACT US & CALCULATORS ────────────────── */}
        {(viewMode === 'contact' || viewMode === 'tours') && (
          <section className={`contact-sec ${viewMode === 'contact' ? 'pt-28' : ''}`} id="contact">
            <ContactCalculatorsAndForms />
          </section>
        )}
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
                <Link to="/">{t('nav.home')}</Link>
                <Link to="/tour-packages">{t('nav.tours')}</Link>
                <Link to="/destinations">{t('nav.destinations')}</Link>
                <Link to="/todo">{t('nav.todo')}</Link>
                <Link to="/memories">{t('nav.memories')}</Link>
                <Link to="/blogs">{t('nav.blogs')}</Link>
                <Link to="/contact">{t('nav.contact')}</Link>
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
          <Route path="/tour-packages" element={<HomePage key="tours" viewMode="tours" />} />
          <Route path="/destinations" element={<HomePage key="destinations" viewMode="destinations" />} />
          <Route path="/todo" element={<HomePage key="todo" viewMode="todo" />} />
          <Route path="/todo/*" element={<HomePage key="todo" viewMode="todo" />} />
          <Route path="/memories" element={<HomePage key="memories" viewMode="memories" />} />
          <Route path="/memories/*" element={<HomePage key="memories" viewMode="memories" />} />
          <Route path="/blogs" element={<HomePage key="blogs" viewMode="blogs" />} />
          <Route path="/blogs/*" element={<HomePage key="blogs" viewMode="blogs" />} />
          <Route path="/contact" element={<HomePage key="contact" viewMode="contact" />} />
          <Route path="/contact/*" element={<HomePage key="contact" viewMode="contact" />} />
          <Route path="*" element={<HomePage key="home" viewMode="home" />} />
        </Routes>
      </BrowserRouter>
    </SiteContentProvider>
  );
}
