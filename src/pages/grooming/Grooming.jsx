import { useState } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Search, MapPin, Star, Scissors, ChevronLeft, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

const STUDIOS = [
  {
    id: 1,
    name: "ClipPaw Grooming Studio",
    location: "Bandra West, Mumbai",
    rating: 4.9,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600",
    services: ["Full Grooming", "Bath & Blow Dry", "Nail Trim", "Ear cleaning"],
    price: 499,
  },
  {
    id: 2,
    name: "The Grooming Parlour",
    location: "Powai, Mumbai",
    rating: 4.8,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1537151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=600",
    services: ["Spa Bath", "Coat Conditioning", "Nail Grind", "Bandana"],
    price: 449,
  },
  {
    id: 3,
    name: "PawSpa & Grooming",
    location: "Juhu, Mumbai",
    rating: 4.6,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600",
    services: ["Aromatherapy Bath", "Puppy First Groom", "Senior", "Blueberry Facial"],
    price: 250,
  }
];

const ADD_ONS = [
  { id: 'aroma', name: 'Aromatherapy Bath', price: 250 },
  { id: 'puppy', name: 'Puppy First Groom', price: 250 },
  { id: 'senior', name: 'Senior Pet Handling', price: 250 },
  { id: 'blueberry', name: 'Blueberry Facial', price: 250 },
];

export default function Grooming() {
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState(['aroma', 'puppy', 'blueberry']); // Default pre-selected as per screenshot
  const [selectedDate, setSelectedDate] = useState(0); // Today
  const [selectedSlot, setSelectedSlot] = useState(null);

  const toggleAddOn = (id) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const totalPrice = selectedAddOns.reduce((sum, addOnId) => {
    const addon = ADD_ONS.find(a => a.id === addOnId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Grooming" />

      <div className="p-4 lg:p-6 w-full max-w-2xl mx-auto space-y-6">
        
        {/* Top Banner */}
        <div className="bg-[#eef7f6] dark:bg-[#45b09e]/10 border border-[#e2efed] dark:border-[#45b09e]/20 rounded-[20px] p-4 flex items-center shadow-sm">
          <div className="w-10 h-10 bg-[#45b09e]/10 dark:bg-[#45b09e]/20 rounded-xl flex items-center justify-center mr-4 text-[#45b09e] shrink-0">
            <Scissors size={20} className="transform -rotate-45" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-0.5 leading-tight">Pamper your pet today</h3>
            <p className="text-[11px] text-gray-500 font-medium">Certified groomers • Stress-free environment</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search salons or area..." 
            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#45b09e] transition shadow-sm"
          />
        </div>

        <div>
          <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">5 grooming studios in Mumbai</h2>
          
          <div className="space-y-5">
            {STUDIOS.map(studio => (
              <Card key={studio.id} className="overflow-hidden bg-white dark:bg-gray-900 rounded-[24px] border-none shadow-sm hover:shadow-md transition">
                <div className="h-44 relative bg-[#eef7f6]">
                  <img src={studio.image} className="w-full h-full object-cover object-bottom" alt={studio.name} />
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{studio.name}</h3>
                    <div className="flex items-center text-[10px] font-bold text-[#45b09e] bg-[#ebf7f5] dark:bg-[#45b09e]/10 px-2 py-1 rounded-md shrink-0">
                      <Star size={10} className="mr-1 fill-[#45b09e]" /> {studio.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-[11px] font-medium text-gray-500 mb-4">
                    <MapPin size={12} className="mr-1" /> {studio.location}
                  </div>

                  <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-5 pb-1">
                    {studio.services.map((srv, i) => (
                      <span key={i} className="whitespace-nowrap px-3 py-1.5 bg-[#eef7f6] dark:bg-[#45b09e]/5 text-[#45b09e] text-[10px] font-bold rounded-full">
                        {srv}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Starting from</p>
                      <p className="text-xl font-black text-gray-900 dark:text-white leading-none">₹{studio.price}</p>
                    </div>
                    <button onClick={() => setSelectedStudio(studio)} className="bg-[#e65c55] hover:bg-[#d44b44] text-white font-bold text-sm px-6 py-3 rounded-[14px] shadow-md shadow-[#e65c55]/20 transition">
                      Book Slot
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Details / Booking Flow Overlay (Screenshot 3 & 4) */}
      <AnimatePresence>
        {selectedStudio && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ type: "spring", bounce: 0, duration: 0.4 }} 
            className="fixed inset-0 z-50 bg-[#f8f9fa] dark:bg-gray-950 flex flex-col overflow-y-auto hide-scrollbar"
          >
            {/* Header Image Area */}
            <div className="relative h-64 shrink-0 bg-[#eef7f6]">
              <img src={selectedStudio.image} className="w-full h-full object-cover object-center" alt={selectedStudio.name} />
              <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
                <button onClick={() => setSelectedStudio(null)} className="w-10 h-10 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full flex items-center justify-center shadow-lg transition hover:bg-white">
                  <ChevronLeft size={24} className="mr-0.5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[#f8f9fa] dark:bg-gray-950 -mt-6 rounded-t-[32px] relative z-10 px-5 pt-8 pb-32">
              
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">{selectedStudio.name}</h1>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-xs font-bold text-[#45b09e] bg-[#ebf7f5] dark:bg-[#45b09e]/10 px-2 py-1 rounded-md mb-1">
                    <Star size={12} className="mr-1 fill-[#45b09e]" /> {selectedStudio.rating}
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">{selectedStudio.reviews} reviews</span>
                </div>
              </div>
              
              <div className="flex items-center text-xs font-medium text-gray-500 mb-6">
                <MapPin size={14} className="mr-1" /> {selectedStudio.location}
              </div>

              <p className="text-sm font-medium text-gray-500 leading-relaxed mb-8">
                Holistic grooming with aromatherapy baths and gentle senior-pet handling. Puppy first-groom packages available to build positive associations.
              </p>

              {/* Add-ons */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white leading-none">Select Add-ons</h3>
                  <span className="text-[10px] font-medium text-gray-400">Tap to add • prices per service</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {ADD_ONS.map(addon => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <button 
                        key={addon.id} 
                        onClick={() => toggleAddOn(addon.id)}
                        className={cn(
                          "px-4 py-3 rounded-[20px] text-left transition-all relative overflow-hidden border",
                          isSelected 
                            ? "bg-[#45b09e] border-[#45b09e] text-white shadow-md shadow-[#45b09e]/20" 
                            : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white"
                        )}
                      >
                        {isSelected && <Check size={12} className="absolute top-4 left-3 text-white/70" />}
                        <span className={cn("block font-bold text-sm leading-tight mb-1", isSelected ? "pl-3" : "")}>{addon.name}</span>
                        <span className={cn("block text-[11px] font-bold", isSelected ? "text-white/80 pl-3" : "text-gray-400")}>₹{addon.price}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white dark:bg-gray-900 rounded-[24px] p-5 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
                <h3 className="font-black text-[15px] text-gray-900 dark:text-white mb-4">Price Breakdown</h3>
                
                <div className="space-y-3 mb-4">
                  {selectedAddOns.map(addOnId => {
                    const addon = ADD_ONS.find(a => a.id === addOnId);
                    if (!addon) return null;
                    return (
                      <div key={addon.id} className="flex justify-between items-center text-sm font-medium text-gray-500">
                        <span className="flex items-center"><Scissors size={14} className="mr-2 transform -rotate-45 text-gray-400"/> {addon.name}</span>
                        <span className="font-bold text-gray-900 dark:text-white">₹{addon.price}</span>
                      </div>
                    )
                  })}
                  {selectedAddOns.length === 0 && (
                    <div className="text-sm font-medium text-gray-400 italic">No add-ons selected</div>
                  )}
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-4">
                  <span className="font-black text-base text-gray-900 dark:text-white">Total</span>
                  <span className="font-black text-2xl text-[#45b09e]">₹{totalPrice}</span>
                </div>
              </div>

              {/* Select Date */}
              <div className="mb-8">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">Select Date</h3>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-5 px-5">
                  {[
                    { label: 'Today', date: '12', month: 'May' },
                    { label: 'Tmrw', date: '13', month: 'May' },
                    { label: 'Thu', date: '14', month: 'May' },
                    { label: 'Fri', date: '15', month: 'May' },
                    { label: 'Sat', date: '16', month: 'May' },
                  ].map((d, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedDate(i)} 
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-[20px] min-w-[76px] shrink-0 transition border", 
                        selectedDate === i 
                          ? "bg-[#45b09e] border-[#45b09e] text-white shadow-md shadow-[#45b09e]/20" 
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-800"
                      )}
                    >
                      <span className={cn("text-[10px] font-bold mb-1", selectedDate === i ? "text-white/80" : "text-gray-400")}>{d.label}</span>
                      <span className="text-2xl font-black leading-none mb-1">{d.date}</span>
                      <span className={cn("text-[10px] font-bold", selectedDate === i ? "text-white/90" : "text-gray-400")}>{d.month}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time Slot */}
              <div className="mb-8">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">Select Time Slot</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { title: "Morning", time: "9:00 AM - 11:00 AM" },
                    { title: "Afternoon", time: "1:00 PM - 3:00 PM" },
                    { title: "Evening", time: "5:00 PM - 8:00 PM" },
                  ].map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedSlot(i)} 
                      className={cn(
                        "p-4 rounded-[20px] text-center transition border", 
                        selectedSlot === i 
                          ? "bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-white shadow-sm" 
                          : "bg-white dark:bg-gray-900 border-2 border-transparent text-gray-400 dark:text-gray-500 opacity-60"
                      )}
                    >
                      <span className="block font-black text-[13px] mb-1 text-gray-900 dark:text-white">{s.title}</span>
                      <span className="block text-[10px] font-bold">{s.time}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#f8f9fa] via-[#f8f9fa] to-transparent dark:from-gray-950 dark:via-gray-950 z-20 flex justify-center pb-8">
              <div className="w-full max-w-md">
                <button 
                  onClick={() => {
                    if (selectedSlot !== null) {
                      alert("Grooming booking confirmed!");
                      setSelectedStudio(null);
                    }
                  }} 
                  className={cn(
                    "w-full flex items-center justify-center py-4 rounded-2xl text-white font-black transition text-lg backdrop-blur-md", 
                    selectedSlot !== null 
                      ? "bg-[#e65c55] shadow-xl shadow-[#e65c55]/30" 
                      : "bg-[#e1d5d1]/90 text-white/90"
                  )}
                  style={selectedSlot === null ? { backgroundColor: '#dbceca' } : {}}
                >
                  {selectedSlot !== null ? 'Continue to Book' : 'Select a Slot to Continue'}
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
