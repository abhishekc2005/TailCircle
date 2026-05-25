import { Header } from "../../components/common/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Calendar as CalendarIcon, Star, ArrowRight, ChevronRight, CheckCircle } from "lucide-react";

const CATEGORIES = [
  { name: "Matches", color: "bg-pink-100 dark:bg-pink-900/30", icon: "❤️", path: "/matches" },
  { name: "Shop", color: "bg-blue-100 dark:bg-blue-900/30", icon: "🛍️", path: "/shop" },
  { name: "Doctor", color: "bg-green-100 dark:bg-green-900/30", icon: "🩺", path: "/doctor" },
  { name: "Meals", color: "bg-orange-100 dark:bg-orange-900/30", icon: "🍲", path: "/meals" },
  { name: "Events", color: "bg-yellow-100 dark:bg-yellow-900/30", icon: "🎪", path: "/events" },
  { name: "Grooming", color: "bg-teal-100 dark:bg-teal-900/30", icon: "✂️", path: "/grooming" },
  { name: "Adoption", color: "bg-indigo-100 dark:bg-indigo-900/30", icon: "🏠", path: "/matches" },
  { name: "Memorial", color: "bg-purple-100 dark:bg-purple-900/30", icon: "🕊️", path: "/memorial" },
];

const PROMOTIONS = [
  {
    id: 1,
    title: "50% Off First Vet Visit",
    subtitle: "Book a clinic visit today and get half off your first consultation.",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Premium Meal Plans",
    subtitle: "Subscribe now and get free treats for a month!",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400",
    gradient: "from-orange-500 to-yellow-400"
  }
];

const UPCOMING_EVENTS = [
  { id: 1, title: "Golden Retriever Meetup", date: "Jun 15", time: "10:00 AM", location: "Central Dog Park", price: "Free", slots: "12 left", image: "https://images.unsplash.com/photo-1537151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=400" },
  { id: 2, title: "Puppy Training Camp", date: "Jul 02", time: "09:00 AM", location: "Paws & Play Arena", price: "₹20", slots: "5 left", image: "https://images.unsplash.com/photo-1587300003388-59208cb962cb?auto=format&fit=crop&q=80&w=400" },
];

const MATCH_PROFILES = [
  { id: 1, name: "Bella", breed: "Golden Retriever", age: "2 yrs", distance: "1.2 km", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Max", breed: "German Shepherd", age: "4 yrs", distance: "2.1 km", image: "https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Luna", breed: "Siberian Husky", age: "3 yrs", distance: "5.0 km", image: "https://images.unsplash.com/photo-1605568420125-4eb84e5541e2?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Charlie", breed: "French Bulldog", age: "1 yr", distance: "3.5 km", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Daisy", breed: "Pug", age: "6 mos", distance: "0.8 km", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Rocky", breed: "Boxer", age: "2 yrs", distance: "4.2 km", image: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?auto=format&fit=crop&q=80&w=400" },
  { id: 7, name: "Zoe", breed: "Poodle", age: "1 yr", distance: "1.5 km", image: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?auto=format&fit=crop&q=80&w=400" },
  { id: 8, name: "Milo", breed: "Beagle", age: "3 yrs", distance: "2.8 km", image: "https://images.unsplash.com/photo-1537151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=400" },
  { id: 9, name: "Lucy", breed: "Dachshund", age: "5 yrs", distance: "6.0 km", image: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&q=80&w=400" },
  { id: 10, name: "Cooper", breed: "Labrador Retriever", age: "1.5 yrs", distance: "1.1 km", image: "https://images.unsplash.com/photo-1579213838826-6fdad3d211f4?auto=format&fit=crop&q=80&w=400" },
  { id: 11, name: "Stella", breed: "Rottweiler", age: "2.5 yrs", distance: "3.0 km", image: "https://images.unsplash.com/photo-1565538871146-8153400bfa3f?auto=format&fit=crop&q=80&w=400" },
];

const NEARBY_VENDORS = [
  { id: 1, name: "Happy Paws Clinic", type: "Doctor", rating: 4.8, distance: "2.5 km", image: "https://images.unsplash.com/photo-1516734212711-236b281f6233?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "The Wagging Tail Shop", type: "Shop", rating: 4.6, distance: "1.1 km", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Fresh Bowl Meals", type: "Meals", rating: 4.9, distance: "3.2 km", image: "https://images.unsplash.com/photo-1583947581924-860bda6a5fdf?auto=format&fit=crop&q=80&w=400" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0">
      <Header title="Home Dashboard" />
      
      <div className="p-4 md:p-6 lg:p-8 space-y-8 md:space-y-10 max-w-7xl mx-auto w-full">
        
        {/* 1. Meet & Match Red Banner */}
        <div className="bg-[#e65c55] rounded-3xl p-5 text-white flex justify-between items-center shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-1 flex items-center"><span className="text-2xl mr-2">🐾</span> Meet & Match</h2>
            <p className="text-[11px] text-white/90 font-medium">Find playdates, friends & mates near you</p>
          </div>
          <Link to="/matches" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-2xl text-xs font-bold transition relative z-10 flex items-center">
            Explore <ChevronRight size={14} className="ml-1" />
          </Link>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-black/10 to-transparent"></div>
        </div>

        {/* 2. New Service Grid (Responsive: 2 cols mobile, 3 tablet, 6 desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {[
            { id: 'grooming', badge: 'SPA', title: 'Grooming', subtitle: 'Spa & salon', color: 'bg-[#45b09e]', img: 'https://images.unsplash.com/photo-1516734212711-236b281f6233?auto=format&fit=crop&q=80&w=400', path: '/grooming' },
            { id: 'daycare', badge: 'STAY', title: 'Daycare', subtitle: 'Safe & fun boarding', color: 'bg-[#e65c55]', img: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&q=80&w=400', path: '/' },
            { id: 'vets', badge: 'VETS', title: 'Find Vets', subtitle: 'Book 60 sec', color: 'bg-[#45b09e]', img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400', path: '/doctor' },
            { id: 'events', badge: 'EVENTS', title: 'Events', subtitle: 'Parties • Training • Shows', color: 'bg-[#e65c55]', img: 'https://images.unsplash.com/photo-1537151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=400', path: '/events' },
            { id: 'shop', badge: 'SHOP', title: 'Shop Now', subtitle: 'Food • Toys • Accessories', color: 'bg-[#45b09e]', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400', path: '/shop' },
            { id: 'adopt', badge: 'ADOPT', title: 'Adopt & Buy', subtitle: 'Find your forever pet', color: 'bg-[#e65c55]', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400', path: '/matches' },
          ].map(service => (
            <Link key={service.id} to={service.path} className="rounded-3xl overflow-hidden flex flex-col h-48 md:h-56 lg:h-64 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="h-28 relative bg-gray-200 shrink-0">
                <img src={service.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                  {service.badge}
                </div>
              </div>
              <div className={`${service.color} flex-1 p-4 flex flex-col justify-center text-white`}>
                <h3 className="font-black text-[15px] leading-tight mb-0.5">{service.title}</h3>
                <p className="text-[10px] font-medium opacity-90">{service.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Responsive Banners Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 3. Insurance Banner */}
          <div className="bg-[#1f2937] rounded-[32px] p-6 lg:p-8 relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow min-h-[220px] flex flex-col justify-between">
            <div className="relative z-10 w-3/4">
              <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2">Protect what matters most.</h2>
              <p className="text-xs text-gray-300 font-medium mb-6 leading-relaxed">Plans from ₹199/month • Covers accidents, illness & surgery</p>
              <button className="bg-[#e65c55] hover:bg-[#d44b44] text-white text-xs lg:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-lg flex items-center w-max">
                Explore Plans <ArrowRight size={16} className="ml-1.5" />
              </button>
            </div>
            <div className="absolute right-[-10%] bottom-[-15%] text-white/5 font-black text-8xl lg:text-9xl italic select-none pointer-events-none">Relief</div>
          </div>

          {/* 4. Pet Wellness Banner */}
          <div className="bg-[#1e3a47] rounded-[32px] p-6 lg:p-8 relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow min-h-[220px] flex flex-col justify-between">
            <div className="relative z-10 w-full">
              <span className="bg-[#45b09e]/20 text-[#45b09e] text-[10px] lg:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-4 inline-block">PET WELLNESS</span>
              <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-6 w-5/6">Is your pet's vaccination up to date?</h2>
              <Link to="/doctor" className="bg-[#45b09e] hover:bg-[#388f80] text-white text-xs lg:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-lg inline-flex items-center w-max">
                Book a Vet <ArrowRight size={16} className="ml-1.5" />
              </Link>
            </div>
          </div>

          {/* 5. Fresh Food Delivery */}
          <div className="bg-gray-200 rounded-[32px] relative overflow-hidden flex flex-col text-center shadow-sm hover:shadow-lg transition-shadow min-h-[220px] group">
            <img src="https://images.unsplash.com/photo-1583947581924-860bda6a5fdf?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-[#45b09e] text-white text-[9px] lg:text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider shadow-sm">COMING SOON</span>
            </div>

            <div className="relative z-10 p-6 lg:p-8 flex flex-col items-center justify-center flex-1">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">🥗</div>
               <h3 className="text-xl lg:text-2xl font-black text-white mb-2 leading-tight">Chef-made meals</h3>
               <p className="text-xs text-gray-200 font-medium mb-5 max-w-[220px] leading-relaxed">Vet-approved fresh food • Launching in Mumbai</p>
               <button className="bg-[#e65c55] hover:bg-[#d44b44] text-white text-xs lg:text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg flex items-center transition">
                 🔔 Notify Me
               </button>
            </div>
          </div>
        </div>

        {/* 6. Upcoming Events (Screenshot 3) */}
        <div>
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Upcoming Events</h3>
            <Link to="/events" className="text-xs font-bold text-[#45b09e] hover:underline flex items-center">See all <ArrowRight size={14} className="ml-1"/></Link>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            
            {/* Event Card 1 */}
            <div className="min-w-[200px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-32 relative bg-[#a8d5e2]">
                <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover object-bottom" />
                <div className="absolute top-3 left-3 bg-[#e65c55] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Birthday</div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 leading-tight h-10"><span className="mr-1">🎂</span> Plan My Pet's Birthday Party</h4>
                <div className="flex items-center text-[10px] text-gray-500 font-medium mb-3">
                  <CalendarIcon size={12} className="mr-1 shrink-0" /> Any Date
                </div>
                <p className="text-[#e65c55] font-black text-lg">₹2999</p>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="min-w-[200px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-32 relative bg-gray-200">
                <img src="https://images.unsplash.com/photo-1537151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover mix-blend-screen opacity-70" />
                <div className="absolute inset-0 bg-[#0d3b66]/20" />
                <div className="absolute top-3 left-3 bg-[#45b09e] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Pool Party</div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 leading-tight h-10"><span className="mr-1">🏊‍♂️</span> Dog Day Pool Party</h4>
                <div className="flex items-center text-[10px] text-gray-500 font-medium mb-3">
                  <CalendarIcon size={12} className="mr-1 shrink-0" /> May 3, 2026
                </div>
                <p className="text-[#45b09e] font-black text-lg">₹799</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
