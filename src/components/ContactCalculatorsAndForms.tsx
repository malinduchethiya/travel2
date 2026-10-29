import React, { useState, useEffect } from 'react';
import { Search, MapPin, Printer, Share2, Check, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

const SRI_LANKA_DESTINATIONS = [
  'Anuradhapura', 'Arugambay', 'Batticaloa', 'Belihuloya',
  'Bentota', 'Chilaw', 'Colombo', 'Ella',
  'Galle', 'Hambantota', 'Haputale', 'Hikkaduwa',
  'Jaffna', 'Kalpitiya', 'Kandy', 'Katharagama',
  'Kitulgala', 'Mahiyanganaya', 'Mannar', 'Maskeliya',
  'Mirissa', 'Nawalapitiya', 'Negombo', 'Nuwaraeliya',
  'Pinnawala', 'Polonnaruwa', 'Riverstone', 'Sigiriya',
  'Sinharaja', 'Tangalle', 'Tissa (Yala)', 'Trincomalee',
  'Udawalawa', 'Wilpattuwa'
];

const COUNTRIES = [
  'Sri Lanka', 'United Kingdom', 'Germany', 'Australia', 'United States',
  'France', 'India', 'China', 'Japan', 'Russia', 'United Arab Emirates',
  'Saudi Arabia', 'Canada', 'Netherlands', 'Italy', 'Spain', 'Switzerland',
  'Sweden', 'Singapore', 'Malaysia', 'New Zealand', 'South Africa', 'Other'
];

export default function ContactCalculatorsAndForms() {
  // ── Colombo Live Time & Search ──
  const [colomboTime, setColomboTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setColomboTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ── Round Tour Cost Calculator State ──
  const [days, setDays] = useState<number>(7);
  const [adults, setAdults] = useState<number>(2);
  const [kids, setKids] = useState<number>(0);
  const [vehicleType, setVehicleType] = useState<string>('car');
  const [hotelType, setHotelType] = useState<string>('3star');
  const [singleRooms, setSingleRooms] = useState<number>(0);
  const [doubleRooms, setDoubleRooms] = useState<number>(1);
  const [twinRooms, setTwinRooms] = useState<number>(0);
  const [tripleRooms, setTripleRooms] = useState<number>(0);
  const [familyRooms, setFamilyRooms] = useState<number>(0);

  // Round Tour Calculations
  const vehicleRate = vehicleType === 'van' ? 110 : vehicleType === 'coaster' ? 200 : vehicleType === 'car' ? 80 : 0;
  const vehicleCost = days * vehicleRate;

  const totalExplicitRooms = singleRooms + doubleRooms + twinRooms + tripleRooms + familyRooms;
  const autoRooms = Math.max(1, Math.ceil((adults + kids) / 2));
  const effectiveRooms = totalExplicitRooms > 0 ? totalExplicitRooms : autoRooms;

  const hotelRate = hotelType === '4star' ? 100 : hotelType === '5star' ? 180 : hotelType === 'boutique' ? 220 : hotelType === '3star' ? 60 : 0;
  const hotelCost = days * effectiveRooms * hotelRate;
  const totalTourCost = vehicleCost + hotelCost;

  // ── Transfer Cost Calculator State ──
  const [distanceKm, setDistanceKm] = useState<number>(100);
  const [transferVehicle, setTransferVehicle] = useState<string>('3-car');

  // Transfer Calculations
  let perKmLKR = 220;
  let minFareLKR = 6000;
  if (transferVehicle === '8-van') {
    perKmLKR = 320;
    minFareLKR = 8500;
  } else if (transferVehicle === '10-van') {
    perKmLKR = 380;
    minFareLKR = 10000;
  } else if (transferVehicle === '20-coaster') {
    perKmLKR = 600;
    minFareLKR = 18000;
  }

  const transferCostLKR = Math.max(minFareLKR, Math.round(distanceKm * perKmLKR));
  const transferCostUSD = (transferCostLKR / 300).toFixed(2);

  // ── Contact Form 1: Customized Round Tour ──
  const [tourFirstName, setTourFirstName] = useState('');
  const [tourLastName, setTourLastName] = useState('');
  const [tourEmail, setTourEmail] = useState('');
  const [tourContactNo, setTourContactNo] = useState('');
  const [tourCountry, setTourCountry] = useState('United Kingdom');
  const [tourType, setTourType] = useState('Own Itinerary');
  const [packageType, setPackageType] = useState('Standard');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    'Kandy', 'Sigiriya', 'Ella', 'Nuwaraeliya', 'Bentota'
  ]);
  const [tourFormVehicle, setTourFormVehicle] = useState('Honda Fit Shuttle ($80/Day)');
  const [tourAdults, setTourAdults] = useState<number>(2);
  const [tourKids, setTourKids] = useState<number>(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [tourNotes, setTourNotes] = useState('');
  const [tourReachUs, setTourReachUs] = useState('Web Search');
  const [tourAgreeTerms, setTourAgreeTerms] = useState(false);
  const [tourSubmitted, setTourSubmitted] = useState(false);

  const toggleDestination = (dest: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const handleTourBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourAgreeTerms) {
      alert('Please acknowledge and agree to the Terms and Conditions.');
      return;
    }
    const message = `*Customized Round Tour Booking Inquiry*\n\nName: ${tourFirstName} ${tourLastName}\nEmail: ${tourEmail}\nPhone: ${tourContactNo}\nCountry: ${tourCountry}\nTour Type: ${tourType}\nPackage Type: ${packageType}\nSelected Destinations (${selectedDestinations.length}): ${selectedDestinations.join(', ')}\nVehicle: ${tourFormVehicle}\nPax: ${tourAdults} Adults, ${tourKids} Kids\nDates: ${startDate} to ${endDate}\nArrival/Departure: ${arrivalTime} / ${departureTime}\nReach Us: ${tourReachUs}\nNotes: ${tourNotes}`;
    
    window.open(`https://wa.me/94712857705?text=${encodeURIComponent(message)}`, '_blank');
    setTourSubmitted(true);
  };

  // ── Contact Form 2: Transfer Booking ──
  const [transferFirstName, setTransferFirstName] = useState('');
  const [transferLastName, setTransferLastName] = useState('');
  const [transferEmail, setTransferEmail] = useState('');
  const [transferContactNo, setTransferContactNo] = useState('');
  const [transferCountry, setTransferCountry] = useState('United Kingdom');
  const [transferDateTime, setTransferDateTime] = useState('');
  const [pickFrom, setPickFrom] = useState('');
  const [dropTo, setDropTo] = useState('');
  const [transferFormVehicle, setTransferFormVehicle] = useState('3 Seater Car');
  const [transferAdults, setTransferAdults] = useState<number>(2);
  const [transferKids, setTransferKids] = useState<number>(0);
  const [transferNotes, setTransferNotes] = useState('');
  const [transferReachUs, setTransferReachUs] = useState('Web Search');
  const [transferAgreeTerms, setTransferAgreeTerms] = useState(false);
  const [transferSubmitted, setTransferSubmitted] = useState(false);

  const handleTransferBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferAgreeTerms) {
      alert('Please acknowledge and agree to the Terms and Conditions.');
      return;
    }
    const message = `*Private Airport / Intercity Transfer Inquiry*\n\nName: ${transferFirstName} ${transferLastName}\nEmail: ${transferEmail}\nPhone: ${transferContactNo}\nCountry: ${transferCountry}\nDate/Time: ${transferDateTime}\nPick From: ${pickFrom}\nDrop To: ${dropTo}\nVehicle: ${transferFormVehicle}\nPax: ${transferAdults} Adults, ${transferKids} Kids\nReach Us: ${transferReachUs}\nNotes: ${transferNotes}`;

    window.open(`https://wa.me/94712857705?text=${encodeURIComponent(message)}`, '_blank');
    setTransferSubmitted(true);
  };

  const scrollToRoundTourForm = () => {
    const el = document.getElementById('round-tour-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTransferForm = () => {
    const el = document.getElementById('transfer-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#352f2b] text-stone-100 py-10 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── TOP UTILITY BAR (Clock, Search, Maps link) ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-amber-800/40 pb-6">
          <div className="flex items-center gap-3 bg-[#2a2421] px-4 py-2 rounded-lg border border-amber-600/30">
            <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
            <div className="text-xs">
              <span className="text-stone-400 block font-mono">Colombo, Sri Lanka</span>
              <span className="text-amber-300 font-mono text-base font-bold">{colomboTime || '16:39 PM'}</span>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Sri+Lanka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-amber-200 underline tracking-wide font-medium"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Google Maps Sri Lanka</span>
          </a>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search Here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2a2421] text-stone-100 text-xs py-2 pl-3 pr-9 border border-amber-600/40 rounded focus:outline-none focus:border-amber-400 placeholder:text-stone-500"
            />
            <Search className="absolute right-2.5 top-2.5 w-4 h-4 text-amber-500" />
          </div>
        </div>

        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl md:text-4xl font-serif italic font-bold text-stone-100 tracking-wide leading-snug">
            Contact Us For Personalized Sri Lanka Tours & Private Transfers
          </h1>
          <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-normal">
            At 4Me Lanka Tours, We Specialize In Customized Sri Lanka Tours And Reliable Airport Transfers Designed To Match Your Travel Style. Whether You Want To Explore Ancient Historical Sites, Relax In Beautiful Coastal Towns, Or Discover The Scenic Hill Country And Lush Mountains, Our Expert Team Is Here To Help You Plan The Perfect Itinerary. Contact Us Today Via Phone, Email, Or WhatsApp For Quick Inquiries And Seamless Bookings. You Can Also Fill Out Our Online Contact Form With Your Travel Details And Special Requests For A Tailored Tour Or Private Transfer Service. Let Us Help You Create An Unforgettable Sri Lanka Holiday Experience With Comfort, Convenience, And Local Expertise.
          </p>
        </div>

        {/* ── DUAL CALCULATORS ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── CALCULATOR 1: ROUND TOUR COST CALCULATOR ── */}
          <div className="bg-[#2c2623] border border-amber-600/40 rounded-lg p-6 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h2 className="text-xl font-serif italic font-bold text-amber-300 border-b border-amber-600/30 pb-3">
                Round Tour Cost Calculator
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Inputs Column */}
                <div className="md:col-span-7 space-y-4 text-xs">
                  {/* Days */}
                  <div>
                    <div className="flex justify-between font-medium mb-1 text-stone-200">
                      <label>Number Of Days *</label>
                      <span className="text-amber-400 font-bold">{days} Days</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-stone-700 h-1.5 rounded cursor-pointer"
                    />
                    <span className="text-[10px] text-stone-400">Set The Number Of Days For The Tour</span>
                  </div>

                  {/* Adults */}
                  <div>
                    <div className="flex justify-between font-medium mb-1 text-stone-200">
                      <label>Adults *</label>
                      <span className="text-amber-400 font-bold">{adults}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-stone-700 h-1.5 rounded cursor-pointer"
                    />
                    <span className="text-[10px] text-stone-400">Number Of Adults</span>
                  </div>

                  {/* Kids */}
                  <div>
                    <div className="flex justify-between font-medium mb-1 text-stone-200">
                      <label>Kids *</label>
                      <span className="text-amber-400 font-bold">{kids}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={kids}
                      onChange={(e) => setKids(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-stone-700 h-1.5 rounded cursor-pointer"
                    />
                    <span className="text-[10px] text-stone-400">Number Of Kids (Aged 3 to 11)</span>
                  </div>

                  {/* Vehicle Type */}
                  <div>
                    <label className="block font-medium mb-1 text-stone-200">Vehicle Type *</label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/40 focus:outline-none focus:border-amber-400"
                    >
                      <option value="car">Car (1-3 Pax) - $80/Day</option>
                      <option value="van">Van (4-8 Pax) - $110/Day</option>
                      <option value="coaster">Coaster (9-20 Pax) - $200/Day</option>
                    </select>
                    <span className="text-[10px] text-stone-400">Select A Vehicle Based On Group Size</span>
                  </div>

                  {/* Hotel Type */}
                  <div>
                    <label className="block font-medium mb-1 text-stone-200">Hotel Type *</label>
                    <select
                      value={hotelType}
                      onChange={(e) => setHotelType(e.target.value)}
                      className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/40 focus:outline-none focus:border-amber-400"
                    >
                      <option value="3star">3 Star Standard ($60/room/night)</option>
                      <option value="4star">4 Star Superior ($100/room/night)</option>
                      <option value="5star">5 Star Luxury ($180/room/night)</option>
                      <option value="boutique">Boutique / Heritage ($220/room/night)</option>
                    </select>
                    <span className="text-[10px] text-stone-400">Select Hotel By Star Rating</span>
                  </div>

                  {/* Room Types Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[11px] text-stone-300">Single Rooms</label>
                      <select
                        value={singleRooms}
                        onChange={(e) => setSingleRooms(Number(e.target.value))}
                        className="w-full bg-[#1e1917] text-stone-100 p-1.5 rounded border border-amber-600/30"
                      >
                        {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? '- Select -' : n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-300">Double Rooms</label>
                      <select
                        value={doubleRooms}
                        onChange={(e) => setDoubleRooms(Number(e.target.value))}
                        className="w-full bg-[#1e1917] text-stone-100 p-1.5 rounded border border-amber-600/30"
                      >
                        {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? '- Select -' : n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-300">Twin Rooms</label>
                      <select
                        value={twinRooms}
                        onChange={(e) => setTwinRooms(Number(e.target.value))}
                        className="w-full bg-[#1e1917] text-stone-100 p-1.5 rounded border border-amber-600/30"
                      >
                        {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? '- Select -' : n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-300">Triple Rooms</label>
                      <select
                        value={tripleRooms}
                        onChange={(e) => setTripleRooms(Number(e.target.value))}
                        className="w-full bg-[#1e1917] text-stone-100 p-1.5 rounded border border-amber-600/30"
                      >
                        {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? '- Select -' : n}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[11px] text-stone-300">Family Rooms</label>
                      <select
                        value={familyRooms}
                        onChange={(e) => setFamilyRooms(Number(e.target.value))}
                        className="w-full bg-[#1e1917] text-stone-100 p-1.5 rounded border border-amber-600/30"
                      >
                        {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? '- Select -' : n}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Live Orange Cost Summary Panel */}
                <div className="md:col-span-5 bg-gradient-to-b from-orange-500 to-amber-600 text-stone-900 p-5 rounded-lg flex flex-col justify-between shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-900/20 pb-2">
                      <h3 className="font-serif font-bold text-lg text-white">4Me Lanka Tours</h3>
                      <div className="flex gap-2">
                        <button onClick={() => window.print()} title="Print" className="p-1 hover:bg-black/10 rounded">
                          <Printer className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-stone-900/80">Vehicle Cost</span>
                      <p className="text-2xl font-extrabold text-white">${vehicleCost}</p>
                      <p className="text-[10px] text-stone-900/80 leading-tight">Calculated For Selected Vehicle Type & Duration</p>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-stone-900/80">Hotel Cost</span>
                      <p className="text-2xl font-extrabold text-white">${hotelCost}</p>
                      <p className="text-[10px] text-stone-900/80 leading-tight">
                        Calculated For Selected Hotel & Room Types. Actual Cost May Slightly Differ Upon Selection.
                      </p>
                    </div>

                    <div className="border-t border-stone-900/20 pt-2">
                      <span className="text-xs uppercase tracking-wider font-bold text-stone-900">Total Tour Cost</span>
                      <p className="text-3xl font-black text-white">${totalTourCost}</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <div className="text-[11px] font-medium text-stone-900/90 bg-black/10 p-2.5 rounded">
                      <strong>Ready To Book Your Trip?</strong> Enjoy The Beauty And The Unique Hospitality.
                    </div>
                    <button
                      onClick={scrollToRoundTourForm}
                      className="w-full bg-[#1e1917] hover:bg-black text-amber-300 font-bold text-xs py-2.5 px-4 rounded transition shadow"
                    >
                      Inquiry Form
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 text-xs bg-[#1e1917] hover:bg-stone-900 text-stone-300 border border-amber-600/30 py-2 px-4 rounded w-max"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" /> Print Calculator Widget
            </button>
          </div>

          {/* ── CALCULATOR 2: TRANSFER COST CALCULATOR ── */}
          <div className="bg-[#2c2623] border border-amber-600/40 rounded-lg p-6 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h2 className="text-xl font-serif italic font-bold text-amber-300 border-b border-amber-600/30 pb-3">
                Transfer Cost Calculator
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Inputs Column */}
                <div className="md:col-span-7 space-y-5 text-xs">
                  {/* Distance Slider */}
                  <div>
                    <div className="flex justify-between font-medium mb-1 text-stone-200">
                      <label>Distance *</label>
                      <span className="text-amber-400 font-bold">{distanceKm} Km</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-stone-700 h-1.5 rounded cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                      <span>0 Km</span>
                      <span>Use Your Map And Specify The Distance From Your Pickup Location To Drop Location.</span>
                      <span>500 Km</span>
                    </div>
                  </div>

                  {/* Vehicle Type Radio Choices */}
                  <div>
                    <label className="block font-medium mb-2 text-stone-200">Vehicle Type *</label>
                    <div className="space-y-2 text-xs text-stone-300">
                      {[
                        { id: '3-car', label: '3 Seater Car' },
                        { id: '8-van', label: '8 Seater Van' },
                        { id: '10-van', label: '10 Seater Van' },
                        { id: '20-coaster', label: '20 Seater Coaster' },
                      ].map((v) => (
                        <label key={v.id} className="flex items-center gap-2 cursor-pointer hover:text-amber-300">
                          <input
                            type="radio"
                            name="transferVehicleRadio"
                            checked={transferVehicle === v.id}
                            onChange={() => setTransferVehicle(v.id)}
                            className="accent-amber-500"
                          />
                          <span>{v.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Orange Cost Summary Panel */}
                <div className="md:col-span-5 bg-gradient-to-b from-orange-500 to-amber-600 text-stone-900 p-5 rounded-lg flex flex-col justify-between shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-900/20 pb-2">
                      <h3 className="font-serif font-bold text-lg text-white">4Me Lanka Tours</h3>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-stone-900/80">Transfer Cost LKR</span>
                      <p className="text-2xl font-extrabold text-white">{transferCostLKR.toLocaleString()} LKR</p>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-stone-900/80">Transfer Cost USD</span>
                      <p className="text-3xl font-black text-white">${transferCostUSD} USD</p>
                      <p className="text-[10px] text-stone-900/80 leading-tight mt-2">
                        Estimated Cost For Your Selected Vehicle And Distance Including Tolls. May Slightly Change With Spot Location Tolls And Exchange Rate On Date.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <div className="text-[11px] font-medium text-stone-900/90 bg-black/10 p-2.5 rounded">
                      <strong>Book Your Ride Now?</strong> Get Started Travel Journey With Our Reliable Transfer Service.
                    </div>
                    <button
                      onClick={scrollToTransferForm}
                      className="w-full bg-[#1e1917] hover:bg-black text-amber-300 font-bold text-xs py-2.5 px-4 rounded transition shadow"
                    >
                      Inquiry Form
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 text-xs bg-[#1e1917] hover:bg-stone-900 text-stone-300 border border-amber-600/30 py-2 px-4 rounded w-max"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" /> Print Calculator Widget
            </button>
          </div>

        </div>


        {/* ── DUAL CONTACT FORMS ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">

          {/* ── FORM 1: CONTACT FOR CUSTOMIZED ROUND TOUR ── */}
          <div id="round-tour-form" className="bg-[#2c2623] border border-amber-600/40 rounded-lg p-6 shadow-xl space-y-5">
            <h2 className="text-xl font-serif italic font-bold text-amber-300 border-b border-amber-600/30 pb-3">
              Contact for Customized Round Tour.
            </h2>

            <form onSubmit={handleTourBookNow} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={tourFirstName}
                    onChange={(e) => setTourFirstName(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={tourLastName}
                    onChange={(e) => setTourLastName(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={tourEmail}
                    onChange={(e) => setTourEmail(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">Contact No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp / Viber / WeChat Prefix"
                    value={tourContactNo}
                    onChange={(e) => setTourContactNo(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Country *</label>
                  <select
                    value={tourCountry}
                    onChange={(e) => setTourCountry(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">Tour Type *</label>
                  <select
                    value={tourType}
                    onChange={(e) => setTourType(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  >
                    <option value="Own Itinerary">Own Itinerary</option>
                    <option value="Heritage Tour">Heritage Tour</option>
                    <option value="Wildlife Safari">Wildlife Safari</option>
                    <option value="Beach & Lagoon">Beach & Lagoon</option>
                    <option value="Hill Country & Tea">Hill Country & Tea</option>
                    <option value="Honeymoon Special">Honeymoon Special</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Package Type *</label>
                  <select
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  >
                    <option value="- Select -">- Select -</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Standard">Standard</option>
                    <option value="Budget">Budget</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>

              {/* 29-DESTINATION CHECKBOX GRID */}
              <div>
                <label className="block font-semibold text-amber-300 mb-2">
                  For Your Own Itinerary, Please Select Destinations. *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-[#1e1917] p-3 rounded border border-amber-600/30 max-h-56 overflow-y-auto text-[11px]">
                  {SRI_LANKA_DESTINATIONS.map((dest) => (
                    <label key={dest} className="flex items-center gap-1.5 cursor-pointer hover:text-amber-300">
                      <input
                        type="checkbox"
                        checked={selectedDestinations.includes(dest)}
                        onChange={() => toggleDestination(dest)}
                        className="accent-amber-500 rounded"
                      />
                      <span className="truncate">{dest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">Vehicle Type *</label>
                  <select
                    value={tourFormVehicle}
                    onChange={(e) => setTourFormVehicle(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  >
                    <option value="Honda Fit Shuttle ($80/Day)">Honda Fit Shuttle ($80/Day)</option>
                    <option value="Honda Vezel ($80/Day)">Honda Vezel ($80/Day)</option>
                    <option value="Toyota HiAce KDH Van ($110/Day)">Toyota HiAce KDH Van ($110/Day)</option>
                    <option value="Toyota Coaster ($200/Day)">Toyota Coaster ($200/Day)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Number Of Pax *</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
                      value={tourAdults}
                      onChange={(e) => setTourAdults(Number(e.target.value))}
                      className="w-1/2 bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 text-center"
                      placeholder="XX Adults"
                    />
                    <input
                      type="number"
                      min={0}
                      value={tourKids}
                      onChange={(e) => setTourKids(Number(e.target.value))}
                      className="w-1/2 bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 text-center"
                      placeholder="XX Kids (Below 12)"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">Start Date *</label>
                  <input
                    type="text"
                    placeholder="Dd / Mm / Yyyy"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">End Date *</label>
                  <input
                    type="text"
                    placeholder="Dd / Mm / Yyyy"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">Arrival Time *</label>
                  <input
                    type="text"
                    placeholder="Arrival Flight & Time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Departure Time *</label>
                  <input
                    type="text"
                    placeholder="Departure Flight & Time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 mb-1">Special Notes</label>
                <textarea
                  rows={3}
                  placeholder="Tell KuRa any hotel preferences or specific activities..."
                  value={tourNotes}
                  onChange={(e) => setTourNotes(e.target.value)}
                  className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                />
              </div>

              {/* How Do You Reach Us Radios */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1">How Do You Reach Us?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-stone-300">
                  {['Previous Tour', 'Recommendation', 'Web Search', 'Social Media', 'Review Site', 'Other'].map((r) => (
                    <label key={r} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="tourReachUs"
                        checked={tourReachUs === r}
                        onChange={() => setTourReachUs(r)}
                        className="accent-amber-500"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer text-stone-300">
                  <input
                    type="checkbox"
                    checked={tourAgreeTerms}
                    onChange={(e) => setTourAgreeTerms(e.target.checked)}
                    className="accent-amber-500 mt-0.5 rounded"
                  />
                  <span>I Acknowledge That I Have Read And Agree To The Terms And Conditions. *</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-3 rounded shadow-lg transition"
                >
                  Book Now
                </button>
              </div>

              {tourSubmitted && (
                <div className="p-3 bg-emerald-900/40 border border-emerald-500/50 rounded flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4" />
                  <span>Round Tour inquiry generated! Redirected to WhatsApp direct line.</span>
                </div>
              )}
            </form>
          </div>


          {/* ── FORM 2: CONTACT US FOR TRANSFER ── */}
          <div id="transfer-form" className="bg-[#2c2623] border border-amber-600/40 rounded-lg p-6 shadow-xl space-y-5">
            <h2 className="text-xl font-serif italic font-bold text-amber-300 border-b border-amber-600/30 pb-3">
              Contact Us for Transfer.
            </h2>

            <form onSubmit={handleTransferBookNow} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={transferFirstName}
                    onChange={(e) => setTransferFirstName(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={transferLastName}
                    onChange={(e) => setTransferLastName(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={transferEmail}
                    onChange={(e) => setTransferEmail(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">Contact No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp / Viber / WeChat Prefix"
                    value={transferContactNo}
                    onChange={(e) => setTransferContactNo(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Country *</label>
                  <select
                    value={transferCountry}
                    onChange={(e) => setTransferCountry(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 mb-1">Date / Time *</label>
                <input
                  type="text"
                  required
                  placeholder="Dd/Mm/Yyyy HH:MM"
                  value={transferDateTime}
                  onChange={(e) => setTransferDateTime(e.target.value)}
                  className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">Pick From *</label>
                  <input
                    type="text"
                    required
                    placeholder="Airport Or Hotel Name / Location"
                    value={pickFrom}
                    onChange={(e) => setPickFrom(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Drop To *</label>
                  <input
                    type="text"
                    required
                    placeholder="Airport Or Hotel Name / Location"
                    value={dropTo}
                    onChange={(e) => setDropTo(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1">Vehicle Type *</label>
                  <select
                    value={transferFormVehicle}
                    onChange={(e) => setTransferFormVehicle(e.target.value)}
                    className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                  >
                    <option value="3 Seater Car">3 Seater Car</option>
                    <option value="8 Seater Van">8 Seater Van</option>
                    <option value="10 Seater Van">10 Seater Van</option>
                    <option value="20 Seater Coaster">20 Seater Coaster</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 mb-1">Number Of Pax *</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
                      value={transferAdults}
                      onChange={(e) => setTransferAdults(Number(e.target.value))}
                      className="w-1/2 bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 text-center"
                      placeholder="XX Adults"
                    />
                    <input
                      type="number"
                      min={0}
                      value={transferKids}
                      onChange={(e) => setTransferKids(Number(e.target.value))}
                      className="w-1/2 bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 text-center"
                      placeholder="XX Kids (Below 12)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 mb-1">Special Notes</label>
                <textarea
                  rows={4}
                  placeholder="Mention flight numbers or luggage details..."
                  value={transferNotes}
                  onChange={(e) => setTransferNotes(e.target.value)}
                  className="w-full bg-[#1e1917] text-stone-100 p-2 rounded border border-amber-600/30 focus:border-amber-400"
                />
              </div>

              {/* How Do You Reach Us Radios */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1">How Do You Reach Us?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-stone-300">
                  {['Previous Tour', 'Recommendation', 'Web Search', 'Social Media', 'Review Site', 'Other'].map((r) => (
                    <label key={r} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="transferReachUs"
                        checked={transferReachUs === r}
                        onChange={() => setTransferReachUs(r)}
                        className="accent-amber-500"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer text-stone-300">
                  <input
                    type="checkbox"
                    checked={transferAgreeTerms}
                    onChange={(e) => setTransferAgreeTerms(e.target.checked)}
                    className="accent-amber-500 mt-0.5 rounded"
                  />
                  <span>I Acknowledge That I Have Read And Agree To The Terms And Conditions. *</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-3 rounded shadow-lg transition"
                >
                  Book Now
                </button>
              </div>

              {transferSubmitted && (
                <div className="p-3 bg-emerald-900/40 border border-emerald-500/50 rounded flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4" />
                  <span>Transfer request generated! Redirected to WhatsApp direct line.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* ── BOTTOM PAYMENT ACCEPTANCE BAR ── */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-amber-800/40 space-y-3">
          <div className="bg-amber-400 text-stone-900 px-8 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2">
            <span>Pay With</span>
            <span className="text-blue-900 font-black italic">Pay</span>
            <span className="text-sky-600 font-black italic">Pal</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            <span className="px-2 py-1 bg-stone-800 text-blue-400 rounded border border-stone-700">VISA</span>
            <span className="px-2 py-1 bg-stone-800 text-red-400 rounded border border-stone-700">MasterCard</span>
            <span className="px-2 py-1 bg-stone-800 text-blue-300 rounded border border-stone-700">AMEX</span>
            <span className="px-2 py-1 bg-stone-800 text-orange-400 rounded border border-stone-700">DISCOVER</span>
          </div>
        </div>

      </div>
    </div>
  );
}
