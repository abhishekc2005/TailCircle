import { useState } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Calendar as CalendarIcon, MapPin, Users, Ticket, BellRing, Star, Cake, Camera, Scissors, CheckCircle, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

const EVENT_CATEGORIES = ["All", "Birthday", "Adoption", "Training", "Competitions", "Social Meetups"];

const PUBLIC_EVENTS = [
  {
    id: 1,
    title: "Annual Golden Retriever Meetup",
    category: "Social Meetups",
    date: "Jun 15, 2026",
    time: "10:00 AM",
    location: "Central Dog Park",
    organizer: "City Pet Club",
    fee: 15,
    attendees: 124,
    image: "https://images.unsplash.com/photo-1537151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Basic Obedience Training Camp",
    category: "Training",
    date: "Jul 02, 2026",
    time: "09:00 AM",
    location: "Paws & Play Arena",
    organizer: "Elite Dog Trainers",
    fee: 45,
    attendees: 45,
    image: "https://images.unsplash.com/photo-1587300003388-59208cb962cb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Mega Pet Adoption Drive",
    category: "Adoption",
    date: "Aug 10, 2026",
    time: "11:00 AM",
    location: "City Square Mall",
    organizer: "Paws Rescue NGO",
    fee: 0,
    attendees: 300,
    image: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?auto=format&fit=crop&q=80&w=800",
  }
];

const VENDORS = [
  { id: 'v1', name: "Pawsome Parties", type: "Birthday & Celebration", rating: 4.9, price: 150, image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=400", status: "Available" },
  { id: 'v2', name: "Elite Pet Studio", type: "Photoshoot", rating: 4.8, price: 200, image: "https://images.unsplash.com/photo-1516734212711-236b281f6233?auto=format&fit=crop&q=80&w=400", status: "Busy" },
];

export default function Events() {
  const [activeTab, setActiveTab] = useState("discover"); // "discover", "host", "my_events"
  const [activeCategory, setActiveCategory] = useState("All");

  // Booking States
  const [selectedEvent, setSelectedEvent] = useState(null); // Public Event Booking Modal
  const [selectedVendor, setSelectedVendor] = useState(null); // Private Vendor Booking Modal
  const [vendorStep, setVendorStep] = useState(0); // 0: Details, 1: Addons, 2: Confirm
  const [selectedAddons, setSelectedAddons] = useState([]);

  const filteredEvents = activeCategory === "All" ? PUBLIC_EVENTS : PUBLIC_EVENTS.filter(e => e.category === activeCategory);

  const handleTicketPurchase = () => {
    alert("Ticket Purchased! Push notification reminders have been enabled.");
    setSelectedEvent(null);
  };

  const handleVendorBooking = () => {
    alert("Personal Event Hosted! Vendor Booked Successfully.");
    setSelectedVendor(null);
    setVendorStep(0);
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Events & Parties" />
      
      {/* Top Navigation Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[60px] md:top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 flex">
          <button 
            onClick={() => setActiveTab("discover")}
            className={cn("flex-1 md:flex-none px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "discover" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            Discover Events
          </button>
          <button 
            onClick={() => setActiveTab("host")}
            className={cn("flex-1 md:flex-none px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "host" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            Host an Event
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto p-4 lg:p-6">
        
        {/* TAB: DISCOVER EVENTS */}
        {activeTab === "discover" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
              {EVENT_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0",
                    activeCategory === cat 
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" 
                      : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Public Event Feed */}
            <div className="space-y-4">
              
              {/* Featured Banner */}
              <div className="w-full bg-[#072f5f] text-white rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-end min-h-[300px]">
                <img src="https://images.unsplash.com/photo-1537151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40 object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#072f5f] via-[#072f5f]/80 to-transparent" />
                <div className="relative z-10 mt-auto">
                  <span className="bg-[#1e5eb0] text-white text-[10px] font-bold px-3 py-1.5 rounded-full mb-3 inline-block tracking-wider uppercase">🏊‍♂️ POOL PARTY – MAY 3, 2026</span>
                  <h1 className="text-4xl font-black mb-2 leading-tight">Dog Day<br/>Pool Party!</h1>
                  <p className="text-sm text-gray-300 mb-6 font-medium">Floaties • Splash Zone • DJ • Frozen Treats • Life Guard</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-black">₹799 <span className="text-sm font-medium text-gray-400">/ dog</span></p>
                      <p className="text-xs text-gray-400 mt-1">44 spots remaining</p>
                    </div>
                    <button onClick={() => setSelectedEvent(PUBLIC_EVENTS[0])} className="bg-[#1e5eb0] hover:bg-[#154687] text-white font-bold px-5 py-3 rounded-2xl flex items-center transition shadow-lg text-sm">
                      Book Spot <ChevronRight size={16} className="ml-1"/>
                    </button>
                  </div>
                </div>
              </div>

              {/* Two Cards Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#d0f0f5] rounded-[24px] relative overflow-hidden h-56 cursor-pointer group" onClick={() => setSelectedVendor(VENDORS[0])}>
                  <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" className="absolute bottom-0 right-0 w-full h-full object-cover object-bottom transition-transform group-hover:scale-105" />
                </div>
                <div className="bg-[#a84c32] rounded-[24px] p-5 text-white h-56 flex flex-col cursor-pointer hover:opacity-95 transition" onClick={() => setSelectedVendor(VENDORS[0])}>
                  <div className="mb-auto">
                    <span className="bg-[#d6336c] text-white text-[10px] font-black px-2 py-1 rounded-full mb-3 inline-block tracking-wider uppercase">🎂 BIRTHDAY PLANNING</span>
                    <h3 className="text-2xl font-black leading-tight mb-2 text-[#fff0f4]">Plan the Perfect<br/>Paw-ty!</h3>
                    <p className="text-xs text-[#ffd6e0] font-medium leading-relaxed">Cake • Décor • Games • Photographer included</p>
                  </div>
                  <button className="bg-[#d6336c] hover:bg-[#b02a58] text-white font-bold text-xs py-2.5 px-4 rounded-xl w-fit flex items-center transition mt-4">
                    Plan from ₹2,999 <ChevronRight size={14} className="ml-1"/>
                  </button>
                </div>
              </div>

              {/* Pool Party Series (Horizontal Scroll) */}
              <div className="pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center text-lg"><span className="text-xl mr-2">🏊‍♂️</span> Pool Party Series</h3>
                  <span className="text-sm font-bold text-primary">May 2026</span>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="min-w-[240px] h-32 overflow-hidden relative cursor-pointer rounded-[24px]">
                      <img src={`https://images.unsplash.com/photo-15${i}7151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=400`} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#1e5eb0] text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center">
                         🏊‍♂️ Pool
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB: HOST AN EVENT */}
        {activeTab === "host" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl p-8 text-white text-center shadow-lg">
              <h2 className="text-3xl font-black mb-2">Host the Perfect Party!</h2>
              <p className="text-white/80 max-w-md mx-auto">Book premium vendors for birthdays, photoshoots, and custom pet celebrations.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Available Vendors (8.5)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {VENDORS.map(vendor => (
                  <Card key={vendor.id} className="p-4 flex gap-4 cursor-pointer hover:shadow-md transition" onClick={() => setSelectedVendor(vendor)}>
                    <img src={vendor.image} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 dark:text-white leading-tight">{vendor.name}</h4>
                        <span className="text-xs font-bold flex items-center"><Star size={12} className="text-yellow-500 mr-1 fill-current"/>{vendor.rating}</span>
                      </div>
                      <p className="text-xs text-primary font-medium mt-1">{vendor.type}</p>
                      <div className="mt-4 flex justify-between items-end">
                        <p className="text-sm font-bold">₹{vendor.price} <span className="text-xs text-gray-500 font-normal">/ slot</span></p>
                        <span className={cn("text-[10px] font-bold px-2 py-1 rounded uppercase", vendor.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                          {vendor.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* MODAL: Public Event Ticket Booking (8.7, 8.8) */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0 }} className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
              <div className="h-48 relative">
                <img src={selectedEvent.image} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"><X size={16}/></button>
              </div>
              <div className="p-6">
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 inline-block">{selectedEvent.category}</span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{selectedEvent.title}</h2>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedEvent.date}, {selectedEvent.time}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-gray-500">Location</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedEvent.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Total Price</span>
                    <span className="font-black text-lg text-primary">{selectedEvent.fee === 0 ? 'Free' : `₹${selectedEvent.fee}`}</span>
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-500 mb-6 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-800 dark:text-blue-300">
                  <BellRing size={16} className="mr-2 shrink-0" />
                  You will receive a digital ticket and push reminders 24hrs before the event.
                </div>

                <Button onClick={handleTicketPurchase} className="w-full py-4 text-base shadow-lg"><Ticket size={18} className="mr-2"/> Confirm Ticket</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Plan My Pet's Birthday Party (Prototype Match) */}
      <AnimatePresence>
        {selectedVendor && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedVendor(null)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0 }} className="relative w-full max-w-md bg-[#f8f9fa] dark:bg-gray-900 rounded-t-[32px] sm:rounded-[32px] shadow-2xl flex flex-col max-h-[90vh]">
              
              <div className="relative h-64 shrink-0 rounded-t-[32px] overflow-hidden bg-[#8bd3d8]">
                <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover object-bottom" />
                <div className="absolute top-4 left-4 bg-[#e65c55] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Birthday</div>
                <button onClick={() => setSelectedVendor(null)} className="absolute top-4 right-4 p-2 bg-white text-gray-900 hover:bg-gray-100 rounded-full transition shadow-md"><X size={20}/></button>
              </div>

              <div className="p-6 overflow-y-auto hide-scrollbar flex-1 -mt-2">
                <div className="mb-4">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3 leading-tight tracking-tight flex items-center">🎂 Plan My Pet's Birthday Party</h2>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">We handle EVERYTHING — themed décor, pet-safe birthday cake, goodie bags, photographer, party games, and a custom invite. Min. 6 furry guests. Max fun guaranteed.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm mb-6 space-y-5">
                  <div className="flex items-start">
                    <CalendarIcon className="text-[#e65c55] mr-4 mt-0.5 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Date & Time</p>
                      <p className="font-bold text-gray-900 dark:text-white">Any Date • Customisable</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-[#e65c55] mr-4 mt-0.5 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Location</p>
                      <p className="font-bold text-gray-900 dark:text-white">At Your Venue or Ours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="text-[#e65c55] mr-4 mt-0.5 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Organizer</p>
                      <p className="font-bold text-gray-900 dark:text-white">PawParty India</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#fff0f4] dark:bg-[#e65c55]/10 rounded-3xl p-6 border border-[#ffe1e9] dark:border-[#e65c55]/20 mb-8">
                  <h3 className="font-black text-[#d6336c] dark:text-[#e65c55] text-lg mb-4 flex items-center gap-2">
                    <span className="text-xl">🎉</span> What's Included
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Custom themed décor (balloons, banners, tablecloths)",
                      "Pet-safe birthday cake (2 kg)",
                      "Goodie bags for all furry guests",
                      "Professional photographer (1 hr)",
                      "Party games & activities",
                      "Dedicated party coordinator"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-[#d6336c] dark:text-[#e65c55] mr-3 shrink-0 mt-0.5" size={16} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="p-4 bg-white dark:bg-gray-900 flex justify-between items-center rounded-b-[32px] gap-6 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                <div className="shrink-0">
                  <p className="text-3xl font-black text-gray-900 dark:text-white leading-none">₹2999</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">per event</p>
                </div>
                <button onClick={handleVendorBooking} className="flex-1 bg-[#e65c55] hover:bg-[#d44b44] text-white font-bold text-lg py-4 rounded-2xl transition shadow-lg shadow-[#e65c55]/20">
                  Plan My Paw-ty 🎂
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
