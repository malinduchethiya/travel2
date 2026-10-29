import { CREATIVE_TEXTS, CREATIVE_FIELDS } from './creativeContent';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export interface TextFieldMeta {
  key: string;
  label: string;
  multiline?: boolean;
}

export interface SiteSectionMeta {
  id: string;
  title: string;
  subtitle: string;
  fields: TextFieldMeta[];
}

export interface DemoImageSlot {
  id: string;
  sectionId: string;
  label: string;
  dimensionsHint: string;
  defaultSrc: string;
}

export const HERO_SLIDES_DEFAULT = [
  {
    slotId: 'hero.slide1.img',
    defaultSrc: '/assets/aistudio/hero_58b958e2.jpg',
    captionKey: 'hero.slide1.caption',
    locationKey: 'hero.slide1.location',
  },
  {
    slotId: 'hero.slide2.img',
    defaultSrc: '/assets/aistudio/ella_53a0777f.jpg',
    captionKey: 'hero.slide2.caption',
    locationKey: 'hero.slide2.location',
  },
  {
    slotId: 'hero.slide3.img',
    defaultSrc: '/assets/aistudio/tea-hills_bfabb10f.jpg',
    captionKey: 'hero.slide3.caption',
    locationKey: 'hero.slide3.location',
  },
  {
    slotId: 'hero.slide4.img',
    defaultSrc: '/assets/aistudio/galle_9e7733fe.jpg',
    captionKey: 'hero.slide4.caption',
    locationKey: 'hero.slide4.location',
  },
  {
    slotId: 'hero.slide5.img',
    defaultSrc: '/assets/aistudio/yala-safari_fbf20478.jpg',
    captionKey: 'hero.slide5.caption',
    locationKey: 'hero.slide5.location',
  },
  {
    slotId: 'hero.slide6.img',
    defaultSrc: '/assets/aistudio/mirissa_3d3801f6.jpg',
    captionKey: 'hero.slide6.caption',
    locationKey: 'hero.slide6.location',
  },
];

export const DEFAULT_SITE_TEXTS: Record<string, string> = {
  ...CREATIVE_TEXTS,
  // Navigation & Header
  'nav.brand': '4Me Lanka Tours',
  'nav.home': 'Home',
  'nav.tours': "Our journeys",
  'nav.destinations': "The island",
  'nav.todo': "Things to feel",
  'nav.memories': "The guestbook",
  'nav.blogs': "Island notes",
  'nav.contact': "Let’s make a plan",
  'nav.cta': "Make it yours",
  'nav.mobileIndexLabel': 'Index · 4Me Lanka Tours',
  'nav.mobileFootLine1': 'Say Hi As Guests, Bye As Friends · SLTDA/TD/CAVA/1758',
  'nav.mobileFootLine2': 'WhatsApp / Voice: +94 71 285 7705 · 4melankatours@gmail.com',

  // Hero Section & Slideshow
  'hero.kicker': 'Explore Sri Lanka · The Paradise Island · Welcome To',
  'hero.title': '4Me Lanka Tours',
  'hero.accentEm': 'Say Hi As Guests,',
  'hero.accentRest': 'Bye As Friends.',
  'hero.btnPrimary': 'Explore Tour Packages',
  'hero.btnSecondary': 'Plan Your Custom Trip',
  'hero.sub':
    'Private chauffeur-guided multi-day tours, day excursions, hotel coordination, and islandwide airport transfers crafted personally for you by KuRa (Chaminda Kuruwita).',
  'hero.sideBadge': 'SLTDA/TD/CAVA/1758 · Since 2013',
  'hero.slide1.caption': 'Sigiriya Lion Rock Fortress',
  'hero.slide1.location': 'Cultural Triangle · UNESCO Heritage',
  'hero.slide2.caption': 'Nine Arch Highland Viaduct',
  'hero.slide2.location': 'Ella · Misty Hill Country Rail',
  'hero.slide3.caption': 'High-Grown Ceylon Tea Estates',
  'hero.slide3.location': 'Nuwara Eliya & Haputale · 2,000m',
  'hero.slide4.caption': '17th-Century Dutch Ocean Ramparts',
  'hero.slide4.location': 'Galle Fort · Southern Coast',
  'hero.slide5.caption': 'Wild Leopard & Tusker Country',
  'hero.slide5.location': 'Yala & Udawalawe National Parks',
  'hero.slide6.caption': 'Golden Palm & Whale Coastline',
  'hero.slide6.location': 'Mirissa & Bentota · Indian Ocean',

  // Horizontal Brand Ticker Strap
  'ticker.item1': 'AYUBOWAN · WELCOME TO SRI LANKA',
  'ticker.item2': 'TRIPADVISOR 5.0 ★ RATED',
  'ticker.item3': "TRAVELERS' CHOICE BEST OF THE BEST 2023 · 2024 · 2025",
  'ticker.item4': 'GOOGLE REVIEWS 5.0 ★ VERIFIED',
  'ticker.item5': 'FACEBOOK 5.0 ★ RATED',
  'ticker.item6': 'SLTDA REGISTERED · SLTDA/TD/CAVA/1758',
  'ticker.item7': 'SAY HI AS GUESTS, BYE AS FRIENDS',

  // 01 The Island (Ayubowan & Numbers Say)
  'island.label': 'The Island · Sri Lanka',
  'island.headingLine1': 'Explore the scenic beauty',
  'island.headingEm': '& unique hospitality.',
  'island.ayubowan': '“Ayubowan”',
  'island.welcome': 'Welcome To Sri Lanka — The Pearl of the Indian Ocean',
  'island.p1':
    'Sri Lanka, the Pearl of the Indian Ocean, is a tropical paradise with golden beaches, lush mountains, and breathtaking wildlife. With over 2,000 years of recorded history, Sri Lanka offers ancient cities, eight UNESCO World Heritage Sites, vibrant festivals, and rich living culture.',
  'island.p2':
    'Discover warm hospitality, diverse landscapes within a few hours’ drive, and unforgettable adventures in one of the world’s top travel destinations—guided privately at your own rhythm.',
  'island.tag1': '8 UNESCO World Heritage Sites',
  'island.tag2': '2,000+ Years of Living History',
  'island.tag3': '1,340 km Indian Ocean Coastline',
  'island.tag4': 'Private Chauffeur-Guided Comfort',
  'island.card1CapLeft': 'Ayubowan Greeting',
  'island.card1CapRight': 'Living Heritage',
  'island.card2CapLeft': 'Wonder of Asia Map',
  'island.card2CapBtn': 'Enlarge Map',
  'island.quote': 'The finest island of its size in all the world.',
  'island.statsSubhead': 'Numbers Say · Verified Track Record & Island Scale',
  'island.stat1Num': '258',
  'island.stat1Label': 'Completed Tours',
  'island.stat2Num': '772',
  'island.stat2Label': 'Happy Guests Hosted',
  'island.stat3Num': '24',
  'island.stat3Label': 'Countries Represented',
  'island.stat4Num': '07',
  'island.stat4Label': 'Years As Company · In Tourism Since 2013',

  // 02 The Founder, The Company & Vision/Mission/Values
  'founder.secLabel': 'The Founder & The Company',
  'founder.secHeadingLine1': 'Feel the warmth and camaraderie',
  'founder.secHeadingEm': 'of family-run Sri Lankan hospitality.',
  'founder.kicker': 'Personal Guide & Planner',
  'founder.name': 'KuRa – Chaminda Kuruwita',
  'founder.sub': 'Feel the warmth and camaraderie of Sri Lanka.',
  'founder.cred1': 'The Founder of 4Me Lanka Tours.',
  'founder.cred2': 'Since 2013 in Sri Lanka Tourism.',
  'founder.cred3': 'SLTDA Registered: SLTDA/TD/CAVA/1758.',
  'founder.cred4': 'Fluent English Speaking chauffeur-guide & itinerary planner.',
  'founder.cred5': 'Simple, Cheerful, Adaptable, Punctual, Friendly & much more.',
  'founder.cred6':
    'Personally committed to your safety, comfort, and authentic local experience: KuRa – Chaminda Kuruwita.',
  'company.kicker': 'Est. 2019',
  'company.name': '4Me Lanka Tours',
  'company.sub': 'Deal with the service to the satisfactory in Sri Lanka.',
  'company.cred1': 'Committed to being a leading private travel company in Sri Lanka.',
  'company.cred2': 'Complete Transportation, Hotel Booking & Activity Coordinating.',
  'company.cred3': 'Bespoke Multiday Tours, Day Tours & Airport Transfers.',
  'company.cred4': 'Experienced Private Drivers with modern, air-conditioned vehicles.',
  'company.cred5': 'English or Required Language speaking licensed guides.',
  'company.cred6': 'Mass Network of Qualified Professionals for all activities islandwide.',
  'company.cred7': "Operating Since 2019 as a Company · TripAdvisor Travellers' Choice Awarded (2023, 2024, 2025).",
  'company.cred8': 'Say Hi As Guests, Bye As Friends · AYUBOWAN.',
  'vmv.visionKicker': '01 · Principle One',
  'vmv.visionTitle': 'Our Vision',
  'vmv.visionText':
    'At 4Me Lanka Tours, our vision is to be Sri Lanka’s Most Trusted Family-Run Travel Company, recognized worldwide for creating journeys that feel personal, seamless, and unforgettable. We aspire to showcase the Pearl of the Indian Ocean through authentic Cultural Immersion, Warm Hospitality, and Tailor-Made Itineraries that turn every guest into a lifelong friend. Our goal is to set the benchmark for sustainable, caring, and client-focused tourism in Sri Lanka, where every traveler experiences the island as if it is designed “For Me”.',
  'vmv.missionKicker': '02 · Principle Two',
  'vmv.missionTitle': 'Our Mission',
  'vmv.missionText':
    'Our mission is to deliver Personalized Travel Experiences that blend Sri Lanka’s rich heritage, breathtaking landscapes, and vibrant traditions with modern comfort and reliability. Since 2019 we have been committed to designing Custom Itineraries that reflect each traveler’s pace, interests, and dreams. Offering Safe, Punctual, and Friendly Service through experienced drivers and guides fluent in English and other languages, coordinating Transportation, Hotels, and Activities with a vast network of qualified professionals across the island—living by our motto: “Say Hi As Guests, Bye As Friends.”',
  'vmv.valuesKicker': '03 · Principle Three',
  'vmv.valuesTitle': 'Our Values',
  'vmv.valuesText':
    '4Me Lanka Tours reflects our family’s love for travel and creating unforgettable experiences. Our name originated from “Four Mi,” inspired by the four family members’ names ending in “Mi.” As we developed our tours, we realized that each adventure was personal, leading us to the name “For Me,” highlighting our dedication to making every trip special. As a family-run business, we pour our heart into every detail, ensuring clients feel the tours are made just for them—capturing the essence of shared journeys in our paradise island.',

  // 03 Services (We Offer & For Your Journey)
  'services.secLabel': 'Capabilities & Services',
  'services.secHeadingLine1': 'Every detail arranged',
  'services.secHeadingEm': 'around your pace and selection.',
  'services.group1Title': 'We Offer',
  'services.group1Tag': 'End-to-End Island Coordination',
  'services.offer1Kicker': '01 · Priority Service',
  'services.offer1Title': 'Transportation (Priority Service)',
  'services.offer1Desc':
    'Travel in comfort with our modern vehicle fleet and friendly chauffeurs. From Airport Transfers to City Tours and Multi-Day Tours, we guarantee safety, punctuality, and ease as you explore Sri Lanka’s vibrant cities and breathtaking landscapes.',
  'services.offer1Motto': '“Your Journey, Our Promise”',
  'services.offer2Kicker': '02 · On Your Selection',
  'services.offer2Title': 'Hotel Bookings (On Your Selection)',
  'services.offer2Desc':
    'Choose from handpicked accommodations: Luxury Resorts, Cozy Hideaways, or Budget-Friendly Stays. Whether you prefer beachfront bliss or mountain serenity, we’ll match your exact style and budget.',
  'services.offer2Motto': '“Comfort, Choice, And Charm”',
  'services.offer3Kicker': '03 · As Your Request',
  'services.offer3Title': 'Activities (As Your Request)',
  'services.offer3Desc':
    'Immerse yourself in Sri Lanka’s rich heritage and natural wonders. From Cultural Tours and Village Visits to Wildlife Safaris, Boat Rides, and Water Sports, our expert guides make every moment memorable.',
  'services.offer3Motto': '“Explore More, Experience More”',
  'services.group2Title': 'For Your Journey',
  'services.group2Tag': 'Tailored Travel Formats',
  'services.format1Kicker': 'Format 01 · Islandwide Loops',
  'services.format1Title': 'Multi Day Tours',
  'services.format1Desc':
    'Start your Sri Lankan adventure with ease. Airport pickup, comfortable hotels, and personalized activities all arranged by our expert team. Our tailored multi-day tours make every moment unforgettable.',
  'services.format1Motto': '“Your Journey, Our Expertise”',
  'services.format2Kicker': 'Format 02 · Single-Day & Transit',
  'services.format2Title': 'Day Tours',
  'services.format2Desc':
    'Discover Sri Lanka’s vibrant streets, golden beaches, rich culture, and ancient wonders with our day and city tours. Perfect for transit travelers at Bandaranaike International Airport.',
  'services.format2Motto': '“Effortless Transit, Memorable Time”',
  'services.format3Kicker': 'Format 03 · BIA Airport & Point-to-Point',
  'services.format3Title': 'Transfers',
  'services.format3Desc':
    'Enjoy reliable, comfortable transfers to and from Bandaranaike International Airport (BIA) and other destinations. With professional drivers and modern vehicles, we ensure a smooth, hassle-free journey across Sri Lanka.',
  'services.format3Motto': '“On Time, Every Time”',

  // 04 Popular Tours
  'tours.secLabel': "KuRa's Popular Tours",
  'tours.secHeadingLine1': 'Curated itineraries',
  'tours.secHeadingEm': 'designed around how you travel.',
  'tours.tabAll': 'All Packages (04)',
  'tours.tabMultiday': 'Multi-Day Tours (12–28 Days)',
  'tours.tabDay': 'Day Tours (Galle & Colombo)',
  'tours.ctaCustom': 'Request Custom Itinerary',
  'tours.pkg1.title': 'Galle Day Tour',
  'tours.pkg1.subtitle': 'Explore the city with 4Me Lanka Tours',
  'tours.pkg1.duration': 'Day Tour',
  'tours.pkg1.desc':
    'A private coastal journey through the 17th-century Dutch ramparts, iconic lighthouse, hidden coves, and southern maritime heritage.',
  'tours.pkg1.stops': 'Dutch Fort · Light House · Unawatuna · Jungle Beach · Stick Fishing · General Market',
  'tours.pkg2.title': "KuRa's Adventure",
  'tours.pkg2.subtitle': 'Feel the beauty & unique hospitality of Sri Lanka',
  'tours.pkg2.duration': '11 Nights | 12 Days',
  'tours.pkg2.desc':
    'Our signature highland-to-coast loop blending white-water rapids, mist-covered tea estates, the Nine Arch rail line, elephant country, and golden southern beaches.',
  'tours.pkg2.stops': 'Negombo · Kithulgala · Nuwara Eliya · Ella · Haputale · Udawalawa · Mirissa · Bentota',
  'tours.pkg3.title': 'Colombo Day Tour',
  'tours.pkg3.subtitle': 'Explore the city with 4Me Lanka Tours',
  'tours.pkg3.duration': 'Day Tour',
  'tours.pkg3.desc':
    'Discover the island’s vibrant oceanfront capital—from colonial-era architecture and sacred lakeside temples to bustling bazaars and modern skyline views.',
  'tours.pkg3.stops': 'National Museum · Independence Square · Pettah Market · Gangaramaya Temple · Lotus Tower',
  'tours.pkg4.title': "KuRa's All Ceylon",
  'tours.pkg4.subtitle': 'Feel the beauty & unique hospitality of Sri Lanka',
  'tours.pkg4.duration': '27 Nights | 28 Days',
  'tours.pkg4.desc':
    'The complete grand expedition around the entire island—spanning the sacred northern peninsula, ancient kingdoms, eastern surf bays, cloud forests, and southern rainforests.',
  'tours.pkg4.stops':
    'Negombo · Kalpitiya · Anuradhapura · Mannar · Jaffna · Trincomalee · Sigiriya · Polonnaruwa · Riverstone · Kandy · Mahiyanganaya · Batticaloa · Arugam Bay · Ella · Nuwara Eliya · Haputale · Udawalawa · Yala · Tangalle · Mirissa · Sinharaja · Galle · Bentota',

  // 05 Destinations
  'places.secLabel': 'Destinations',
  'places.secHeadingLine1': 'Eight reasons',
  'places.secHeadingEm': 'to miss your flight home.',
  'places.secNote':
    'From the cultural triangle to the southern ramparts — the island’s essential stops, in no particular hurry.',
  'places.c1.region': 'Cultural Triangle',
  'places.c1.title': 'Sigiriya',
  'places.c1.desc':
    'A fifth-century sky fortress of frescoes, mirror walls and water gardens. Climb at dawn, before the rock retains the heat.',
  'places.c2.region': 'Hill Country',
  'places.c2.title': 'Ella',
  'places.c2.desc':
    'Nine arches, cloud forest and the slowest, most beautiful train ride in Asia. Walk the rails; stay for the waterfalls.',
  'places.c3.region': 'Central Highlands',
  'places.c3.title': 'Kandy',
  'places.c3.desc':
    'The last royal capital, wrapped around a lake. Drums at dusk in the Temple of the Sacred Tooth, every evening, without fail.',
  'places.c4.region': 'Tea Country',
  'places.c4.title': 'Nuwara Eliya',
  'places.c4.desc':
    'Cool air, colonial bungalows and tea estates stitched across the hills at two thousand metres. Bring a jacket in July.',
  'places.c5.region': 'Deep South',
  'places.c5.title': 'Yala',
  'places.c5.desc':
    'Leopard country: 979 square kilometres of thorn scrub, lagoon and elephant paths on the edge of the Indian Ocean.',
  'places.c6.region': 'Southern Coast',
  'places.c6.title': 'Galle',
  'places.c6.desc':
    'A Dutch-walled fort of ramparts, cinnamon and four-hundred-year-old streets. Best walked just before the lamps come on.',
  'places.c7.region': 'South Coast',
  'places.c7.title': 'Mirissa',
  'places.c7.desc':
    'Coconut-hill sunsets, blue whales offshore from November, and a bay that has never once hurried anybody.',
  'places.c8.region': 'North Central',
  'places.c8.title': 'Anuradhapura',
  'places.c8.desc':
    'The sacred city of dagobas, where the island’s oldest stories are still told beneath the sacred bodhi tree.',

  // 06 Experiences (To Do)
  'exp.secLabel': 'To Do · Experiences',
  'exp.secHeadingLine1': 'Four things worth',
  'exp.secHeadingEm': 'changing your plans for.',
  'exp.e1.tag': 'Kandy → Ella · 6–7 hours',
  'exp.e1.kicker': 'The hill country line',
  'exp.e1.title': 'A train that leans through the tea hills.',
  'exp.e1.desc':
    'Second class, windows open, six hours from Kandy to Ella. After Nanu Oya the track doubles back on itself and the whole carriage leans out to look. KuRa reserves your seats in advance and meets you at the arrival station with your luggage.',
  'exp.e2.tag': 'Haputale · 1,800 m',
  'exp.e2.kicker': 'Ceylon tea',
  'exp.e2.title': 'Two leaves and a bud.',
  'exp.e2.desc':
    'The pluckers work at a rhythm you can hear before you see them. Walk an estate at first light, watch the withering troughs, then taste a first flush that never leaves the island in this condition.',
  'exp.e3.tag': 'Koggala · Last light',
  'exp.e3.kicker': 'The stilt fishermen',
  'exp.e3.title': 'An old balancing act, gone quiet.',
  'exp.e3.desc':
    'They sit a metre above the swell on a crossbar lashed to a pole, patient as herons. Go quietly with a local guide, pay fairly, and watch the southern coast at dusk.',
  'exp.e4.tag': 'Arugam Bay · May–September',
  'exp.e4.kicker': 'East coast swells',
  'exp.e4.title': 'The other side of the monsoon.',
  'exp.e4.desc':
    'When the south gets wet, the east dries out and Arugam Bay fills with boards. The main point is a long right-hand reef break; beginners head to Whiskey Point. Evenings are for coconut roti and no plans.',

  // 07 Vehicle Fleet
  'fleet.secLabel': "KuRa's Vehicle Fleet",
  'fleet.secHeadingLine1': 'Modern, air-conditioned vehicles',
  'fleet.secHeadingEm': 'with transparent daily rates.',
  'fleet.v1.name': 'Toyota Coaster',
  'fleet.v1.price': '$200 / Per Day',
  'fleet.v1.specs': 'Luxury Mini Coach · Up to 22 Passengers · Full A/C',
  'fleet.v1.desc':
    'Spacious, high-roof touring coach ideal for extended family reunions, small group expeditions, and islandwide multi-day circuits with ample luggage capacity.',
  'fleet.v2.name': 'Honda Fit Shuttle',
  'fleet.v2.price': '$80 / Per Day',
  'fleet.v2.specs': 'Hybrid Comfort Wagon · 1–3 Passengers · Full A/C',
  'fleet.v2.desc':
    'Quiet, fuel-efficient hybrid wagon with generous rear legroom and deep luggage bay—perfect for couples, solo travelers, and small families exploring hill country and coast.',
  'fleet.v3.name': 'Honda Vezel',
  'fleet.v3.price': '$80 / Per Day',
  'fleet.v3.specs': 'Compact Crossover SUV · 1–3 Passengers · Full A/C',
  'fleet.v3.desc':
    'Elevated ride height for panoramic views across tea estates and national park approaches, paired with refined cabin comfort and private chauffeur service.',
  'fleet.extra1.label': 'High-Roof Passenger Van · 4–9 Guests',
  'fleet.extra1.name': 'Toyota HiAce KDH High Roof',
  'fleet.extra2.label': 'Hybrid Executive Sedan · 1–3 Guests',
  'fleet.extra2.name': 'Toyota Prius / Sedan Fleet',

  // 08 Reviews / Memories
  'reviews.secLabel': 'Clients Say · Memories',
  'reviews.secHeadingLine1': 'Rated 5.0 across every platform',
  'reviews.secHeadingEm': 'by travelers from 24 countries.',
  'reviews.scoreCount': 'Overall Rating · 87 Verified Reviews',
  'reviews.writeBtn': 'Write a Review',
  'reviews.r1.author': 'Verified Guest Consensus',
  'reviews.r1.title': 'Exceptional Tour Experience With Kura',
  'reviews.r1.text':
    'Kura has consistently received high praise for his exceptional hospitality and friendly demeanor, making every trip to Sri Lanka a memorable experience. Travelers appreciate his extensive knowledge of the country, flexibility in accommodating their needs, and ability to create a fun and stress-free environment. Many recommend Kura as the ideal guide for anyone looking to explore Sri Lanka’s beauty and culture.',
  'reviews.r2.author': 'Nozomi Z.',
  'reviews.r2.title': 'Amazing 6-Day Solo Trip. Felt So Safe With Kura, Best Tour In Sri Lanka',
  'reviews.r2.text':
    'I did a 6-day tour around Sri Lanka with 4Me Lanka Tours as a solo female traveler, and it was the best decision I made. Kura was both the planner and my driver, and his service was beyond excellent from start to finish. As a solo woman, safety was my biggest concern, but I felt 100% safe and cared for the entire time with Kura. He is extremely professional, respectful, and attentive to every detail.',
  'reviews.r3.author': 'Elena M.',
  'reviews.r3.title': 'An Unforgettable 12 Day Adventure. Exceptional Service From Start To Finish',
  'reviews.r3.text':
    'We did a fantastic 12 day tour in Sri Lanka, and we cannot recommend 4Me Lanka Tours highly enough! From the very first inquiry down to our final airport drop off, the service we received was absolute perfection. Our driver and guide, Kura, was the true highlight of our trip. He is incredibly professional, warm, and went above and beyond every single day to make our Sri Lankan journey unforgettable.',
  'reviews.r4.author': 'Patric H.',
  'reviews.r4.title': 'Amazing Family Holiday',
  'reviews.r4.text':
    'We had an amazing 15 day trip around Sri Lanka thanks to Kura, our tour guide and driver. From the moment he picked us up at the airport, Kura was friendly, professional, flexible, and always happy to help. He made us feel safe and comfortable throughout the journey and shared fascinating insights into Sri Lanka’s history, culture, and local attractions, making every stop even more meaningful.',
  'reviews.r5.author': 'Glenn H.',
  'reviews.r5.title': 'Kura Number 1 Driver',
  'reviews.r5.text':
    'We just got back from almost 2 weeks touring Sri Lanka with Kura. Punctual, deeply knowledgeable, and genuinely caring—he turned every drive and cultural stop into a highlight. His vehicle was spotless every morning and his local recommendations for food and viewpoints were unmatched.',
  'reviews.r6.author': 'NicoleB',
  'reviews.r6.title': 'Stop Scrolling And Book With 4Me Lanka Tours',
  'reviews.r6.text':
    'If you are planning a trip to Sri Lanka, stop scrolling and book with Kura at 4Me Lanka Tours. Everything from airport pickup to hotel coordination and wildlife safaris was seamless. You truly arrive as a guest and leave as a lifelong friend.',
  'reviews.r7.author': 'Matheo L.',
  'reviews.r7.title': 'Tour Of Sri Lanka',
  'reviews.r7.text':
    'Amazing 7 day Sri Lanka trip. Kura tailored the pace to match our exact interests, from climbing Sigiriya at dawn to the scenic train in Ella and southern coast beaches. Safe driving, great English, and warm hospitality throughout.',
  'reviews.r8.author': 'Katherine E.',
  'reviews.r8.title': 'Excellent 8-Day Family Tour With 4Me Lanka Tour',
  'reviews.r8.text':
    'Travelling as a family requires patience and flexibility, and Kura delivered both effortlessly. Every hotel and activity was coordinated with care, and our children loved learning about Sri Lankan wildlife and traditions from him.',

  // Quote & 09 When To Go (Blogs)
  'quote.line1': 'Say Hi As Guests.. Bye As Friends..',
  'quote.line2': 'With 4Me Lanka Tours.',
  'quote.cite': 'KuRa – Chaminda Kuruwita · SLTDA/TD/CAVA/1758',
  'when.secLabel': 'When to go · Travel Guide',
  'when.secHeadingLine1': 'Two monsoons,',
  'when.secHeadingEm': 'one dry island.',
  'when.intro':
    'There is no bad month to visit Sri Lanka — only the wrong coast. When the south-west monsoon soaks the west, the east is at its best, and the other way around.',
  'when.col1.season': 'Nov — Apr',
  'when.col1.title': 'West & south coast',
  'when.col1.desc':
    'Dry, bright and calm. Galle, Mirissa and the whale season off the south. Christmas is busy; January is perfect.',
  'when.col1.tag': 'Galle · Mirissa · Colombo',
  'when.col2.season': 'May — Sep',
  'when.col2.title': 'East coast',
  'when.col2.desc':
    'The monsoon flips. Trincomalee and Arugam Bay take over, surf peaks in June and August, and the beaches empty out.',
  'when.col2.tag': 'Arugam Bay · Trinco',
  'when.col3.season': 'Dec — Mar',
  'when.col3.title': 'Hill country',
  'when.col3.desc':
    'Clear mornings for the train, tea estates and Horton Plains — before the afternoon mist rolls up from the valley.',
  'when.col3.tag': 'Kandy · Ella · Nuwara Eliya',
  'when.note':
    'Inter-monsoon rain falls island-wide in October and November — short, warm, and usually over by dinner.',

  // 10 Contact Us & Footer
  'contact.secLabel': 'Contact Us · 24/7 Direct',
  'contact.secHeadingLine1': 'Start planning directly',
  'contact.secHeadingEm': 'with KuRa today.',
  'contact.ch1.label': 'Open 24/7',
  'contact.ch1.val': 'Round-the-Clock Support',
  'contact.ch2.label': 'Voice',
  'contact.ch2.val': '+94 71 285 7705',
  'contact.ch3.label': 'WhatsApp',
  'contact.ch3.val': '+94 71 285 7705',
  'contact.ch4.label': 'Viber',
  'contact.ch4.val': '+94 71 285 7705',
  'contact.ch5.label': 'E-Mail',
  'contact.ch5.val': '4melankatours@gmail.com',
  'contact.ch6.label': 'Address',
  'contact.ch6.val': 'BIA Airport & Islandwide',
  'contact.inquiryKicker': 'Tailor-Made For You',
  'contact.inquiryHeadingLine1': 'Design your journey',
  'contact.inquiryHeadingEm': '“For Me”.',
  'contact.inquiryDesc':
    'Whether you want one of KuRa’s popular tours, a private vehicle with driver, or a custom-built itinerary from scratch, send your preferences below. KuRa responds personally to every inquiry.',
  'contact.btnWhatsapp': 'Send via WhatsApp (+94 71 285 7705)',
  'contact.btnEmail': 'Send via E-Mail',
  'footer.wordmark': '4Me Lanka Tours',
  'footer.tagline1': 'Explore Sri Lanka · The Paradise Island.',
  'footer.tagline2': 'Say Hi As Guests, Bye As Friends · SLTDA Registered: SLTDA/TD/CAVA/1758',
  'footer.tagline3': 'Voice / WhatsApp / Viber: +94 71 285 7705 · 4melankatours@gmail.com',
  'footer.copyright': '2022–2026 © 4MeLankaTours · Powered By KuRa (Chaminda Kuruwita)',
  'footer.domain': 'www.4melankatours.com',
};

export const SITE_TEXT_SECTIONS: SiteSectionMeta[] = [
  { id: 'creative', title: 'Island Journal · New Design', subtitle: 'Headlines, editorial copy, and calls to action used by the redesigned public website.', fields: CREATIVE_FIELDS },
  {
    id: 'hero',
    title: '01 · Hero & Auto Slideshow',
    subtitle: 'Main centered title, motto, bottom-left bio, action buttons, and 6 slideshow captions.',
    fields: [
      { key: 'hero.kicker', label: 'Top Kicker Text' },
      { key: 'hero.title', label: 'Main Centered Title (Bold White)' },
      { key: 'hero.accentEm', label: 'Motto Under Title (Italic Part)' },
      { key: 'hero.accentRest', label: 'Motto Under Title (Second Part)' },
      { key: 'hero.btnPrimary', label: 'Primary Button Label' },
      { key: 'hero.btnSecondary', label: 'Secondary Button Label' },
      { key: 'hero.sub', label: 'Bottom-Left Description Paragraph', multiline: true },
      { key: 'hero.sideBadge', label: 'Vertical Side License Badge' },
      { key: 'hero.slide1.caption', label: 'Slide 01 Title' },
      { key: 'hero.slide1.location', label: 'Slide 01 Location' },
      { key: 'hero.slide2.caption', label: 'Slide 02 Title' },
      { key: 'hero.slide2.location', label: 'Slide 02 Location' },
      { key: 'hero.slide3.caption', label: 'Slide 03 Title' },
      { key: 'hero.slide3.location', label: 'Slide 03 Location' },
      { key: 'hero.slide4.caption', label: 'Slide 04 Title' },
      { key: 'hero.slide4.location', label: 'Slide 04 Location' },
      { key: 'hero.slide5.caption', label: 'Slide 05 Title' },
      { key: 'hero.slide5.location', label: 'Slide 05 Location' },
      { key: 'hero.slide6.caption', label: 'Slide 06 Title' },
      { key: 'hero.slide6.location', label: 'Slide 06 Location' },
    ],
  },
  {
    id: 'nav_ticker',
    title: '02 · Header Navigation & Brand Strap',
    subtitle: 'Top navigation bar items and high-contrast horizontal autorun brand ticker.',
    fields: [
      { key: 'nav.brand', label: 'Header Brand Name' },
      { key: 'nav.home', label: 'Nav Link 1 (Home)' },
      { key: 'nav.tours', label: 'Nav Link 2 (Tour Packages)' },
      { key: 'nav.destinations', label: 'Nav Link 3 (Destinations)' },
      { key: 'nav.todo', label: 'Nav Link 4 (To Do)' },
      { key: 'nav.memories', label: 'Nav Link 5 (Memories)' },
      { key: 'nav.blogs', label: 'Nav Link 6 (Blogs)' },
      { key: 'nav.contact', label: 'Nav Link 7 (Contact Us)' },
      { key: 'nav.cta', label: 'Header Right CTA Button' },
      { key: 'ticker.item1', label: 'Ticker Strap Badge 1' },
      { key: 'ticker.item2', label: 'Ticker Strap Badge 2 (Tripadvisor)' },
      { key: 'ticker.item3', label: 'Ticker Strap Badge 3 (Travelers Choice)' },
      { key: 'ticker.item4', label: 'Ticker Strap Badge 4 (Google)' },
      { key: 'ticker.item5', label: 'Ticker Strap Badge 5 (Facebook)' },
      { key: 'ticker.item6', label: 'Ticker Strap Badge 6 (SLTDA)' },
      { key: 'ticker.item7', label: 'Ticker Strap Badge 7 (Motto)' },
    ],
  },
  {
    id: 'island',
    title: '03 · The Island (Ayubowan & Stats)',
    subtitle: 'Welcome to Sri Lanka introduction, cultural highlights, quote, and animated counters.',
    fields: [
      { key: 'island.label', label: 'Section Label' },
      { key: 'island.headingLine1', label: 'Main Heading (Line 1)' },
      { key: 'island.headingEm', label: 'Main Heading (Italic Line 2)' },
      { key: 'island.ayubowan', label: 'Ayubowan Display Title' },
      { key: 'island.welcome', label: 'Welcome Subtitle' },
      { key: 'island.p1', label: 'Paragraph 1', multiline: true },
      { key: 'island.p2', label: 'Paragraph 2', multiline: true },
      { key: 'island.tag1', label: 'Highlight Pill 1' },
      { key: 'island.tag2', label: 'Highlight Pill 2' },
      { key: 'island.tag3', label: 'Highlight Pill 3' },
      { key: 'island.tag4', label: 'Highlight Pill 4' },
      { key: 'island.card1CapLeft', label: 'Photo 1 Caption Left' },
      { key: 'island.card1CapRight', label: 'Photo 1 Caption Right' },
      { key: 'island.card2CapLeft', label: 'Map Card Caption Left' },
      { key: 'island.card2CapBtn', label: 'Map Card Button Text' },
      { key: 'island.quote', label: 'Section Pull Quote', multiline: true },
      { key: 'island.statsSubhead', label: 'Counters Subheading' },
      { key: 'island.stat1Num', label: 'Counter 1 Number' },
      { key: 'island.stat1Label', label: 'Counter 1 Label' },
      { key: 'island.stat2Num', label: 'Counter 2 Number' },
      { key: 'island.stat2Label', label: 'Counter 2 Label' },
      { key: 'island.stat3Num', label: 'Counter 3 Number' },
      { key: 'island.stat3Label', label: 'Counter 3 Label' },
      { key: 'island.stat4Num', label: 'Counter 4 Number' },
      { key: 'island.stat4Label', label: 'Counter 4 Label' },
    ],
  },
  {
    id: 'founder',
    title: '04 · Founder, Company & Vision/Mission',
    subtitle: 'KuRa’s credentials, 4Me Lanka Tours profile, and Vision / Mission / Values.',
    fields: [
      { key: 'founder.secLabel', label: 'Section Label' },
      { key: 'founder.secHeadingLine1', label: 'Heading Line 1' },
      { key: 'founder.secHeadingEm', label: 'Heading Italic Line 2' },
      { key: 'founder.kicker', label: 'Founder Kicker' },
      { key: 'founder.name', label: 'Founder Name' },
      { key: 'founder.sub', label: 'Founder Subtitle' },
      { key: 'founder.cred1', label: 'Founder Point 01' },
      { key: 'founder.cred2', label: 'Founder Point 02' },
      { key: 'founder.cred3', label: 'Founder Point 03' },
      { key: 'founder.cred4', label: 'Founder Point 04' },
      { key: 'founder.cred5', label: 'Founder Point 05' },
      { key: 'founder.cred6', label: 'Founder Point 06', multiline: true },
      { key: 'company.kicker', label: 'Company Kicker' },
      { key: 'company.name', label: 'Company Name' },
      { key: 'company.sub', label: 'Company Subtitle' },
      { key: 'company.cred1', label: 'Company Point 01' },
      { key: 'company.cred2', label: 'Company Point 02' },
      { key: 'company.cred3', label: 'Company Point 03' },
      { key: 'company.cred4', label: 'Company Point 04' },
      { key: 'company.cred5', label: 'Company Point 05' },
      { key: 'company.cred6', label: 'Company Point 06' },
      { key: 'company.cred7', label: 'Company Point 07' },
      { key: 'company.cred8', label: 'Company Point 08' },
      { key: 'vmv.visionTitle', label: 'Vision Heading' },
      { key: 'vmv.visionText', label: 'Vision Paragraph', multiline: true },
      { key: 'vmv.missionTitle', label: 'Mission Heading' },
      { key: 'vmv.missionText', label: 'Mission Paragraph', multiline: true },
      { key: 'vmv.valuesTitle', label: 'Values Heading' },
      { key: 'vmv.valuesText', label: 'Values Paragraph', multiline: true },
    ],
  },
  {
    id: 'services',
    title: '05 · Services (We Offer & Formats)',
    subtitle: 'Transportation, Hotel Bookings, Activities, Multi-Day Tours, Day Tours, and Transfers.',
    fields: [
      { key: 'services.secLabel', label: 'Section Label' },
      { key: 'services.secHeadingLine1', label: 'Heading Line 1' },
      { key: 'services.secHeadingEm', label: 'Heading Italic Line 2' },
      { key: 'services.group1Title', label: 'Group 1 Title (We Offer)' },
      { key: 'services.group1Tag', label: 'Group 1 Subtitle' },
      { key: 'services.offer1Kicker', label: 'Service 1 Kicker' },
      { key: 'services.offer1Title', label: 'Service 1 Title' },
      { key: 'services.offer1Desc', label: 'Service 1 Description', multiline: true },
      { key: 'services.offer1Motto', label: 'Service 1 Motto' },
      { key: 'services.offer2Kicker', label: 'Service 2 Kicker' },
      { key: 'services.offer2Title', label: 'Service 2 Title' },
      { key: 'services.offer2Desc', label: 'Service 2 Description', multiline: true },
      { key: 'services.offer2Motto', label: 'Service 2 Motto' },
      { key: 'services.offer3Kicker', label: 'Service 3 Kicker' },
      { key: 'services.offer3Title', label: 'Service 3 Title' },
      { key: 'services.offer3Desc', label: 'Service 3 Description', multiline: true },
      { key: 'services.offer3Motto', label: 'Service 3 Motto' },
      { key: 'services.group2Title', label: 'Group 2 Title (For Your Journey)' },
      { key: 'services.group2Tag', label: 'Group 2 Subtitle' },
      { key: 'services.format1Kicker', label: 'Format 1 Kicker' },
      { key: 'services.format1Title', label: 'Format 1 Title' },
      { key: 'services.format1Desc', label: 'Format 1 Description', multiline: true },
      { key: 'services.format1Motto', label: 'Format 1 Motto' },
      { key: 'services.format2Kicker', label: 'Format 2 Kicker' },
      { key: 'services.format2Title', label: 'Format 2 Title' },
      { key: 'services.format2Desc', label: 'Format 2 Description', multiline: true },
      { key: 'services.format2Motto', label: 'Format 2 Motto' },
      { key: 'services.format3Kicker', label: 'Format 3 Kicker' },
      { key: 'services.format3Title', label: 'Format 3 Title' },
      { key: 'services.format3Desc', label: 'Format 3 Description', multiline: true },
      { key: 'services.format3Motto', label: 'Format 3 Motto' },
    ],
  },
  {
    id: 'tours',
    title: '06 · Tour Packages',
    subtitle: 'Curated itineraries, filter tabs, descriptions, and route highlights.',
    fields: [
      { key: 'tours.secLabel', label: 'Section Label' },
      { key: 'tours.secHeadingLine1', label: 'Heading Line 1' },
      { key: 'tours.secHeadingEm', label: 'Heading Italic Line 2' },
      { key: 'tours.tabAll', label: 'Filter Tab: All' },
      { key: 'tours.tabMultiday', label: 'Filter Tab: Multi-Day' },
      { key: 'tours.tabDay', label: 'Filter Tab: Day Tours' },
      { key: 'tours.ctaCustom', label: 'Custom Itinerary Button' },
      { key: 'tours.pkg1.title', label: 'Package 1 Title' },
      { key: 'tours.pkg1.subtitle', label: 'Package 1 Subtitle' },
      { key: 'tours.pkg1.duration', label: 'Package 1 Duration Badge' },
      { key: 'tours.pkg1.desc', label: 'Package 1 Description', multiline: true },
      { key: 'tours.pkg1.stops', label: 'Package 1 Route Highlights', multiline: true },
      { key: 'tours.pkg2.title', label: 'Package 2 Title' },
      { key: 'tours.pkg2.subtitle', label: 'Package 2 Subtitle' },
      { key: 'tours.pkg2.duration', label: 'Package 2 Duration Badge' },
      { key: 'tours.pkg2.desc', label: 'Package 2 Description', multiline: true },
      { key: 'tours.pkg2.stops', label: 'Package 2 Route Highlights', multiline: true },
      { key: 'tours.pkg3.title', label: 'Package 3 Title' },
      { key: 'tours.pkg3.subtitle', label: 'Package 3 Subtitle' },
      { key: 'tours.pkg3.duration', label: 'Package 3 Duration Badge' },
      { key: 'tours.pkg3.desc', label: 'Package 3 Description', multiline: true },
      { key: 'tours.pkg3.stops', label: 'Package 3 Route Highlights', multiline: true },
      { key: 'tours.pkg4.title', label: 'Package 4 Title' },
      { key: 'tours.pkg4.subtitle', label: 'Package 4 Subtitle' },
      { key: 'tours.pkg4.duration', label: 'Package 4 Duration Badge' },
      { key: 'tours.pkg4.desc', label: 'Package 4 Description', multiline: true },
      { key: 'tours.pkg4.stops', label: 'Package 4 Route Highlights', multiline: true },
    ],
  },
  {
    id: 'places',
    title: '07 · Destinations (8 Iconic Stops)',
    subtitle: 'Horizontal pinned reel of Sri Lanka’s 8 signature destinations.',
    fields: [
      { key: 'places.secLabel', label: 'Section Label' },
      { key: 'places.secHeadingLine1', label: 'Heading Line 1' },
      { key: 'places.secHeadingEm', label: 'Heading Italic Line 2' },
      { key: 'places.secNote', label: 'Section Intro Note', multiline: true },
      { key: 'places.c1.region', label: 'Stop 01 Region' },
      { key: 'places.c1.title', label: 'Stop 01 Name' },
      { key: 'places.c1.desc', label: 'Stop 01 Description', multiline: true },
      { key: 'places.c2.region', label: 'Stop 02 Region' },
      { key: 'places.c2.title', label: 'Stop 02 Name' },
      { key: 'places.c2.desc', label: 'Stop 02 Description', multiline: true },
      { key: 'places.c3.region', label: 'Stop 03 Region' },
      { key: 'places.c3.title', label: 'Stop 03 Name' },
      { key: 'places.c3.desc', label: 'Stop 03 Description', multiline: true },
      { key: 'places.c4.region', label: 'Stop 04 Region' },
      { key: 'places.c4.title', label: 'Stop 04 Name' },
      { key: 'places.c4.desc', label: 'Stop 04 Description', multiline: true },
      { key: 'places.c5.region', label: 'Stop 05 Region' },
      { key: 'places.c5.title', label: 'Stop 05 Name' },
      { key: 'places.c5.desc', label: 'Stop 05 Description', multiline: true },
      { key: 'places.c6.region', label: 'Stop 06 Region' },
      { key: 'places.c6.title', label: 'Stop 06 Name' },
      { key: 'places.c6.desc', label: 'Stop 06 Description', multiline: true },
      { key: 'places.c7.region', label: 'Stop 07 Region' },
      { key: 'places.c7.title', label: 'Stop 07 Name' },
      { key: 'places.c7.desc', label: 'Stop 07 Description', multiline: true },
      { key: 'places.c8.region', label: 'Stop 08 Region' },
      { key: 'places.c8.title', label: 'Stop 08 Name' },
      { key: 'places.c8.desc', label: 'Stop 08 Description', multiline: true },
    ],
  },
  {
    id: 'experiences',
    title: '08 · To Do / Experiences',
    subtitle: 'Four editorial stories: Hill country train, Ceylon tea, Stilt fishermen, and East coast surf.',
    fields: [
      { key: 'exp.secLabel', label: 'Section Label' },
      { key: 'exp.secHeadingLine1', label: 'Heading Line 1' },
      { key: 'exp.secHeadingEm', label: 'Heading Italic Line 2' },
      { key: 'exp.e1.tag', label: 'Experience 1 Image Badge' },
      { key: 'exp.e1.kicker', label: 'Experience 1 Kicker' },
      { key: 'exp.e1.title', label: 'Experience 1 Title' },
      { key: 'exp.e1.desc', label: 'Experience 1 Story', multiline: true },
      { key: 'exp.e2.tag', label: 'Experience 2 Image Badge' },
      { key: 'exp.e2.kicker', label: 'Experience 2 Kicker' },
      { key: 'exp.e2.title', label: 'Experience 2 Title' },
      { key: 'exp.e2.desc', label: 'Experience 2 Story', multiline: true },
      { key: 'exp.e3.tag', label: 'Experience 3 Image Badge' },
      { key: 'exp.e3.kicker', label: 'Experience 3 Kicker' },
      { key: 'exp.e3.title', label: 'Experience 3 Title' },
      { key: 'exp.e3.desc', label: 'Experience 3 Story', multiline: true },
      { key: 'exp.e4.tag', label: 'Experience 4 Image Badge' },
      { key: 'exp.e4.kicker', label: 'Experience 4 Kicker' },
      { key: 'exp.e4.title', label: 'Experience 4 Title' },
      { key: 'exp.e4.desc', label: 'Experience 4 Story', multiline: true },
    ],
  },
  {
    id: 'fleet',
    title: '09 · Vehicle Fleet & Daily Rates',
    subtitle: 'Toyota Coaster, Honda Fit Shuttle, Honda Vezel, HiAce KDH, and Prius fleet details.',
    fields: [
      { key: 'fleet.secLabel', label: 'Section Label' },
      { key: 'fleet.secHeadingLine1', label: 'Heading Line 1' },
      { key: 'fleet.secHeadingEm', label: 'Heading Italic Line 2' },
      { key: 'fleet.v1.name', label: 'Vehicle 1 Name' },
      { key: 'fleet.v1.price', label: 'Vehicle 1 Daily Rate' },
      { key: 'fleet.v1.specs', label: 'Vehicle 1 Specs' },
      { key: 'fleet.v1.desc', label: 'Vehicle 1 Description', multiline: true },
      { key: 'fleet.v2.name', label: 'Vehicle 2 Name' },
      { key: 'fleet.v2.price', label: 'Vehicle 2 Daily Rate' },
      { key: 'fleet.v2.specs', label: 'Vehicle 2 Specs' },
      { key: 'fleet.v2.desc', label: 'Vehicle 2 Description', multiline: true },
      { key: 'fleet.v3.name', label: 'Vehicle 3 Name' },
      { key: 'fleet.v3.price', label: 'Vehicle 3 Daily Rate' },
      { key: 'fleet.v3.specs', label: 'Vehicle 3 Specs' },
      { key: 'fleet.v3.desc', label: 'Vehicle 3 Description', multiline: true },
      { key: 'fleet.extra1.label', label: 'Additional Fleet 1 Label' },
      { key: 'fleet.extra1.name', label: 'Additional Fleet 1 Name' },
      { key: 'fleet.extra2.label', label: 'Additional Fleet 2 Label' },
      { key: 'fleet.extra2.name', label: 'Additional Fleet 2 Name' },
    ],
  },
  {
    id: 'reviews',
    title: '10 · Memories / Guest Reviews',
    subtitle: '5.0 rating header and verified Tripadvisor, Google, and Facebook guest testimonials.',
    fields: [
      { key: 'reviews.secLabel', label: 'Section Label' },
      { key: 'reviews.secHeadingLine1', label: 'Heading Line 1' },
      { key: 'reviews.secHeadingEm', label: 'Heading Italic Line 2' },
      { key: 'reviews.scoreCount', label: 'Score Summary Subtitle' },
      { key: 'reviews.writeBtn', label: 'Write a Review Button' },
      { key: 'reviews.r1.author', label: 'Review 1 Author (Consensus)' },
      { key: 'reviews.r1.title', label: 'Review 1 Title' },
      { key: 'reviews.r1.text', label: 'Review 1 Text', multiline: true },
      { key: 'reviews.r2.author', label: 'Review 2 Author' },
      { key: 'reviews.r2.title', label: 'Review 2 Title' },
      { key: 'reviews.r2.text', label: 'Review 2 Text', multiline: true },
      { key: 'reviews.r3.author', label: 'Review 3 Author' },
      { key: 'reviews.r3.title', label: 'Review 3 Title' },
      { key: 'reviews.r3.text', label: 'Review 3 Text', multiline: true },
      { key: 'reviews.r4.author', label: 'Review 4 Author' },
      { key: 'reviews.r4.title', label: 'Review 4 Title' },
      { key: 'reviews.r4.text', label: 'Review 4 Text', multiline: true },
      { key: 'reviews.r5.author', label: 'Review 5 Author' },
      { key: 'reviews.r5.title', label: 'Review 5 Title' },
      { key: 'reviews.r5.text', label: 'Review 5 Text', multiline: true },
      { key: 'reviews.r6.author', label: 'Review 6 Author' },
      { key: 'reviews.r6.title', label: 'Review 6 Title' },
      { key: 'reviews.r6.text', label: 'Review 6 Text', multiline: true },
      { key: 'reviews.r7.author', label: 'Review 7 Author' },
      { key: 'reviews.r7.title', label: 'Review 7 Title' },
      { key: 'reviews.r7.text', label: 'Review 7 Text', multiline: true },
      { key: 'reviews.r8.author', label: 'Review 8 Author' },
      { key: 'reviews.r8.title', label: 'Review 8 Title' },
      { key: 'reviews.r8.text', label: 'Review 8 Text', multiline: true },
    ],
  },
  {
    id: 'when_quote',
    title: '11 · Blogs / When To Go & Quote',
    subtitle: 'Signature motto banner and seasonal Sri Lanka travel guide.',
    fields: [
      { key: 'quote.line1', label: 'Banner Quote Line 1' },
      { key: 'quote.line2', label: 'Banner Quote Line 2 (Italic)' },
      { key: 'quote.cite', label: 'Banner Quote Citation' },
      { key: 'when.secLabel', label: 'When To Go Label' },
      { key: 'when.secHeadingLine1', label: 'Heading Line 1' },
      { key: 'when.secHeadingEm', label: 'Heading Italic Line 2' },
      { key: 'when.intro', label: 'Seasonal Intro Paragraph', multiline: true },
      { key: 'when.col1.season', label: 'Season 1 Months' },
      { key: 'when.col1.title', label: 'Season 1 Region' },
      { key: 'when.col1.desc', label: 'Season 1 Description', multiline: true },
      { key: 'when.col1.tag', label: 'Season 1 Stops' },
      { key: 'when.col2.season', label: 'Season 2 Months' },
      { key: 'when.col2.title', label: 'Season 2 Region' },
      { key: 'when.col2.desc', label: 'Season 2 Description', multiline: true },
      { key: 'when.col2.tag', label: 'Season 2 Stops' },
      { key: 'when.col3.season', label: 'Season 3 Months' },
      { key: 'when.col3.title', label: 'Season 3 Region' },
      { key: 'when.col3.desc', label: 'Season 3 Description', multiline: true },
      { key: 'when.col3.tag', label: 'Season 3 Stops' },
      { key: 'when.note', label: 'Bottom Seasonal Note', multiline: true },
    ],
  },
  {
    id: 'contact_footer',
    title: '12 · Contact Us, Channels & Footer',
    subtitle: '24/7 direct contact cards, custom trip inquiry panel, and footer details.',
    fields: [
      { key: 'contact.secLabel', label: 'Contact Section Label' },
      { key: 'contact.secHeadingLine1', label: 'Contact Heading Line 1' },
      { key: 'contact.secHeadingEm', label: 'Contact Heading Italic Line 2' },
      { key: 'contact.ch1.label', label: 'Channel 1 Label (24/7)' },
      { key: 'contact.ch1.val', label: 'Channel 1 Value' },
      { key: 'contact.ch2.label', label: 'Channel 2 Label (Voice)' },
      { key: 'contact.ch2.val', label: 'Channel 2 Value' },
      { key: 'contact.ch3.label', label: 'Channel 3 Label (WhatsApp)' },
      { key: 'contact.ch3.val', label: 'Channel 3 Value' },
      { key: 'contact.ch4.label', label: 'Channel 4 Label (Viber)' },
      { key: 'contact.ch4.val', label: 'Channel 4 Value' },
      { key: 'contact.ch5.label', label: 'Channel 5 Label (Email)' },
      { key: 'contact.ch5.val', label: 'Channel 5 Value' },
      { key: 'contact.ch6.label', label: 'Channel 6 Label (Address)' },
      { key: 'contact.ch6.val', label: 'Channel 6 Value' },
      { key: 'contact.inquiryKicker', label: 'Inquiry Panel Kicker' },
      { key: 'contact.inquiryHeadingLine1', label: 'Inquiry Heading Line 1' },
      { key: 'contact.inquiryHeadingEm', label: 'Inquiry Heading Italic Line 2' },
      { key: 'contact.inquiryDesc', label: 'Inquiry Intro Paragraph', multiline: true },
      { key: 'contact.btnWhatsapp', label: 'Form WhatsApp Submit Button' },
      { key: 'contact.btnEmail', label: 'Form Email Submit Button' },
      { key: 'footer.wordmark', label: 'Footer Giant Wordmark' },
      { key: 'footer.tagline1', label: 'Footer Tagline Line 1' },
      { key: 'footer.tagline2', label: 'Footer Tagline Line 2' },
      { key: 'footer.tagline3', label: 'Footer Tagline Line 3' },
      { key: 'footer.copyright', label: 'Footer Copyright Text' },
      { key: 'footer.domain', label: 'Footer Website Domain' },
    ],
  },
];

export const DEMO_IMAGE_SLOTS: DemoImageSlot[] = [
{"id": "creative.intro.tea.img", "sectionId": "creative", "label": "Intro postcard — tea hills", "dimensionsHint": "High-resolution landscape", "defaultSrc": "/assets/aistudio/tea-hills_bfabb10f.jpg"},
{"id": "creative.worlds.01.img", "sectionId": "creative", "label": "Landscape chapter — hills", "dimensionsHint": "High-resolution landscape", "defaultSrc": "/assets/aistudio/ella_53a0777f.jpg"},
{"id": "creative.worlds.02.img", "sectionId": "creative", "label": "Landscape chapter — coast", "dimensionsHint": "High-resolution landscape", "defaultSrc": "/assets/aistudio/mirissa_3d3801f6.jpg"},
{"id": "creative.worlds.03.img", "sectionId": "creative", "label": "Landscape chapter — culture", "dimensionsHint": "High-resolution landscape", "defaultSrc": "/assets/aistudio/hero_58b958e2.jpg"},
{"id": "creative.worlds.04.img", "sectionId": "creative", "label": "Landscape chapter — wild", "dimensionsHint": "High-resolution landscape", "defaultSrc": "/assets/aistudio/yala-safari_fbf20478.jpg"},
{"id": "creative.atlas.sigiriya.img", "sectionId": "creative", "label": "Island finder — Sigiriya", "dimensionsHint": "High-resolution landscape", "defaultSrc": "/assets/aistudio/hero_58b958e2.jpg"},
{"id": "creative.atlas.ella.img", "sectionId": "creative", "label": "Island finder — Ella", "dimensionsHint": "High-resolution landscape", "defaultSrc": "/assets/aistudio/ella_53a0777f.jpg"},
{"id": "creative.atlas.galle.img", "sectionId": "creative", "label": "Island finder — Galle", "dimensionsHint": "High-resolution landscape", "defaultSrc": "/assets/aistudio/galle_9e7733fe.jpg"},
{"id": "creative.atlas.tissa-yala.img", "sectionId": "creative", "label": "Island finder — Yala", "dimensionsHint": "High-resolution landscape", "defaultSrc": "/assets/aistudio/yala-safari_fbf20478.jpg"},

  // Hero Slideshow
  {
    id: 'hero.slide1.img',
    sectionId: 'hero',
    label: 'Hero Slide 01 — Sigiriya Lion Rock',
    dimensionsHint: '1920×1080 Landscape',
    defaultSrc: '/assets/aistudio/hero_58b958e2.jpg',
  },
  {
    id: 'hero.slide2.img',
    sectionId: 'hero',
    label: 'Hero Slide 02 — Nine Arch Bridge, Ella',
    dimensionsHint: '1920×1080 Landscape',
    defaultSrc: '/assets/aistudio/ella_53a0777f.jpg',
  },
  {
    id: 'hero.slide3.img',
    sectionId: 'hero',
    label: 'Hero Slide 03 — Ceylon Tea Hills',
    dimensionsHint: '1920×1080 Landscape',
    defaultSrc: '/assets/aistudio/tea-hills_bfabb10f.jpg',
  },
  {
    id: 'hero.slide4.img',
    sectionId: 'hero',
    label: 'Hero Slide 04 — Galle Dutch Fort Lighthouse',
    dimensionsHint: '1920×1080 Landscape',
    defaultSrc: '/assets/aistudio/galle_9e7733fe.jpg',
  },
  {
    id: 'hero.slide5.img',
    sectionId: 'hero',
    label: 'Hero Slide 05 — Yala National Park Safari',
    dimensionsHint: '1920×1080 Landscape',
    defaultSrc: '/assets/aistudio/yala-safari_fbf20478.jpg',
  },
  {
    id: 'hero.slide6.img',
    sectionId: 'hero',
    label: 'Hero Slide 06 — Southern Palm Coast',
    dimensionsHint: '1920×1080 Landscape',
    defaultSrc: '/assets/aistudio/mirissa_3d3801f6.jpg',
  },

  // The Island
  {
    id: 'island.dancer.img',
    sectionId: 'island',
    label: 'Island Card 1 — Ayubowan Kandyan Dancer',
    dimensionsHint: '800×1000 Portrait',
    defaultSrc: '/assets/aistudio/kandyan-dancer.jpg',
  },
  {
    id: 'island.map.img',
    sectionId: 'island',
    label: 'Island Card 2 — Wonder of Asia Map',
    dimensionsHint: '800×1000 Portrait',
    defaultSrc: '/assets/aistudio/srilanka-illustrated-map.jpg',
  },

  // Founder & Company
  {
    id: 'founder.avatar.img',
    sectionId: 'founder',
    label: 'Founder Portrait — KuRa (Chaminda Kuruwita)',
    dimensionsHint: '600×600 Square',
    defaultSrc: '/assets/aistudio/kura-founder.jpg',
  },
  {
    id: 'company.logo.img',
    sectionId: 'founder',
    label: 'Company Emblem — 4Me Lanka Tours Logo',
    dimensionsHint: '600×600 Square',
    defaultSrc: '/assets/aistudio/4me-logo.png',
  },

  // Services
  {
    id: 'services.offer1.img',
    sectionId: 'services',
    label: 'We Offer 01 — Transportation',
    dimensionsHint: '900×600 Landscape',
    defaultSrc: '/assets/aistudio/offer-transport.jpg',
  },
  {
    id: 'services.offer2.img',
    sectionId: 'services',
    label: 'We Offer 02 — Hotel Bookings',
    dimensionsHint: '900×600 Landscape',
    defaultSrc: '/assets/aistudio/offer-hotels.jpg',
  },
  {
    id: 'services.offer3.img',
    sectionId: 'services',
    label: 'We Offer 03 — Activities',
    dimensionsHint: '900×600 Landscape',
    defaultSrc: '/assets/aistudio/offer-activities.jpg',
  },
  {
    id: 'services.format1.img',
    sectionId: 'services',
    label: 'For Your Journey 01 — Multi Day Tours',
    dimensionsHint: '900×600 Landscape',
    defaultSrc: '/assets/aistudio/tour-multiday.jpg',
  },
  {
    id: 'services.format2.img',
    sectionId: 'services',
    label: 'For Your Journey 02 — Day Tours',
    dimensionsHint: '900×600 Landscape',
    defaultSrc: '/assets/aistudio/tour-day.jpg',
  },
  {
    id: 'services.format3.img',
    sectionId: 'services',
    label: 'For Your Journey 03 — Airport Transfers',
    dimensionsHint: '900×600 Landscape',
    defaultSrc: '/assets/aistudio/tour-transfers.jpg',
  },

  // Tour Packages
  {
    id: 'tours.pkg1.img',
    sectionId: 'tours',
    label: 'Tour Package 01 — Galle Day Tour Cover',
    dimensionsHint: '1000×700 Landscape',
    defaultSrc: '/assets/aistudio/galle_9e7733fe.jpg',
  },
  {
    id: 'tours.pkg2.img',
    sectionId: 'tours',
    label: "Tour Package 02 — KuRa's Adventure Cover",
    dimensionsHint: '1000×700 Landscape',
    defaultSrc: '/assets/aistudio/ella_53a0777f.jpg',
  },
  {
    id: 'tours.pkg3.img',
    sectionId: 'tours',
    label: 'Tour Package 03 — Colombo Day Tour Cover',
    dimensionsHint: '1000×700 Landscape',
    defaultSrc: '/assets/aistudio/kandy_3e5113c7.jpg',
  },
  {
    id: 'tours.pkg4.img',
    sectionId: 'tours',
    label: "Tour Package 04 — KuRa's All Ceylon Cover",
    dimensionsHint: '1000×700 Landscape',
    defaultSrc: '/assets/aistudio/anuradhapura-2_376f70af.jpg',
  },

  // Fleet
  {
    id: 'fleet.v1.img',
    sectionId: 'fleet',
    label: 'Fleet 01 — Toyota Coaster Mini Coach',
    dimensionsHint: '900×600 Landscape',
    defaultSrc: '/assets/aistudio/vehicle-coaster.jpg',
  },
  {
    id: 'fleet.v2.img',
    sectionId: 'fleet',
    label: 'Fleet 02 — Honda Fit Shuttle Wagon',
    dimensionsHint: '900×600 Landscape',
    defaultSrc: '/assets/aistudio/vehicle-shuttle.jpg',
  },
  {
    id: 'fleet.v3.img',
    sectionId: 'fleet',
    label: 'Fleet 03 — Honda Vezel Crossover SUV',
    dimensionsHint: '900×600 Landscape',
    defaultSrc: '/assets/aistudio/vehicle-vezel.jpg',
  },
];

const LOCAL_STORAGE_KEY = '4me_lanka_site_texts_v1';

interface SiteContentContextValue {
  texts: Record<string, string>;
  demoImages: Record<string, string>;
  user: User | null;
  authReady: boolean;
  cloudSynced: boolean;
  lastSavedAt: string | null;
  saving: boolean;
  t: (key: string) => string;
  img: (slotId: string, fallbackSrc?: string) => string;
  updateText: (key: string, value: string) => void;
  saveChanges: (customTexts?: Record<string, string>) => Promise<{ savedLocal: boolean; savedCloud: boolean }>;
  resetSectionToDefault: (sectionId: string) => Promise<void>;
  resetAllToDefault: () => Promise<void>;
  setDemoImage: (slotId: string, previewUrl: string | null) => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

function sanitizeTextsMap(raw: Record<string, string>): Record<string, string> {
  const cleaned: Record<string, string> = {};
  const keys = Object.keys(raw).slice(0, 490);
  for (const k of keys) {
    if (typeof raw[k] === 'string') {
      cleaned[k] = raw[k].slice(0, 4000);
    }
  }
  return cleaned;
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore localStorage parse errors
    }
    return {};
  });

  const [demoImages, setDemoImages] = useState<Record<string, string>>({});
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [cloudSynced, setCloudSynced] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Track Firebase Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Initial one-time fetch of public /site_content/main, plus real-time listener when authenticated
  useEffect(() => {
    let isMounted = true;
    const docRef = doc(db, 'site_content', 'main');

    getDoc(docRef)
      .then((snapshot) => {
        if (!isMounted) return;
        setCloudSynced(true);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && data.texts && typeof data.texts === 'object') {
            const cloudTexts = data.texts as Record<string, string>;
            setOverrides((prev) => {
              const merged = { ...cloudTexts, ...prev };
              try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
              } catch {
                // ignore
              }
              return merged;
            });
          }
        }
      })
      .catch(() => {
        // Offline or local-first fallback; local overrides and defaults remain active
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Attach real-time onSnapshot listener only when auth is ready and user is authenticated
  useEffect(() => {
    if (!authReady || !user) return;
    const docRef = doc(db, 'site_content', 'main');
    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        setCloudSynced(true);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && data.texts && typeof data.texts === 'object') {
            const cloudTexts = data.texts as Record<string, string>;
            setOverrides((prev) => {
              const merged = { ...cloudTexts, ...prev };
              try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
              } catch {
                // ignore
              }
              return merged;
            });
          }
        }
      },
      () => {
        // Ignore transient listener disconnects
      }
    );
    return () => unsub();
  }, [authReady, user]);

  // Cross-tab sync via storage event
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          setOverrides(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const texts = useMemo(() => {
    return { ...DEFAULT_SITE_TEXTS, ...overrides };
  }, [overrides]);

  const t = useCallback(
    (key: string): string => {
      if (overrides[key] !== undefined && overrides[key] !== '') {
        return overrides[key];
      }
      return DEFAULT_SITE_TEXTS[key] ?? key;
    },
    [overrides]
  );

  const img = useCallback(
    (slotId: string, fallbackSrc?: string): string => {
      if (demoImages[slotId]) {
        return demoImages[slotId];
      }
      if (fallbackSrc) return fallbackSrc;
      const slot = DEMO_IMAGE_SLOTS.find((s) => s.id === slotId);
      return slot ? slot.defaultSrc : '';
    },
    [demoImages]
  );

  const updateText = useCallback((key: string, value: string) => {
    setOverrides((prev) => {
      const next = { ...prev, [key]: value.slice(0, 4000) };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const saveChanges = useCallback(
    async (customTexts?: Record<string, string>) => {
      setSaving(true);
      const targetOverrides = sanitizeTextsMap(customTexts ?? overrides);
      let savedLocal = false;
      let savedCloud = false;

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(targetOverrides));
        setOverrides(targetOverrides);
        savedLocal = true;
      } catch {
        // ignore
      }

      if (auth.currentUser && auth.currentUser.emailVerified) {
        const path = 'site_content/main';
        try {
          await setDoc(doc(db, 'site_content', 'main'), {
            texts: targetOverrides,
            updatedBy: auth.currentUser.uid,
            updatedAt: serverTimestamp(),
          });
          savedCloud = true;
          setCloudSynced(true);
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, path);
        }
      }

      setLastSavedAt(new Date().toLocaleTimeString());
      setSaving(false);
      return { savedLocal, savedCloud };
    },
    [overrides]
  );

  const resetSectionToDefault = useCallback(
    async (sectionId: string) => {
      const sec = SITE_TEXT_SECTIONS.find((s) => s.id === sectionId);
      if (!sec) return;
      const next = { ...overrides };
      sec.fields.forEach((f) => {
        delete next[f.key];
      });
      await saveChanges(next);
    },
    [overrides, saveChanges]
  );

  const resetAllToDefault = useCallback(async () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
    setOverrides({});
    await saveChanges({});
  }, [saveChanges]);

  const setDemoImage = useCallback((slotId: string, previewUrl: string | null) => {
    setDemoImages((prev) => {
      const next = { ...prev };
      if (!previewUrl) {
        delete next[slotId];
      } else {
        next[slotId] = previewUrl;
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      texts,
      demoImages,
      user,
      authReady,
      cloudSynced,
      lastSavedAt,
      saving,
      t,
      img,
      updateText,
      saveChanges,
      resetSectionToDefault,
      resetAllToDefault,
      setDemoImage,
    }),
    [
      texts,
      demoImages,
      user,
      authReady,
      cloudSynced,
      lastSavedAt,
      saving,
      t,
      img,
      updateText,
      saveChanges,
      resetSectionToDefault,
      resetAllToDefault,
      setDemoImage,
    ]
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used inside SiteContentProvider');
  }
  return ctx;
}
