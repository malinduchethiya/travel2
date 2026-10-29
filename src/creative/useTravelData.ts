import { useMemo } from 'react';
import { useSiteContent } from '../content/siteContent';

export function useTravelData() {
  const { t, img } = useSiteContent();
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
        image: img('tours.pkg3.img', '/assets/aistudio/destinations/dest-colombo.jpg'),
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
  return { popularTours, destinationsList, todoList, regionalMemories, sampleBlogs, reviewsList };
}
