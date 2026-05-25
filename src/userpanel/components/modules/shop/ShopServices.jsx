import { useState } from "react";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { Scissors, Home, Star, MapPin, Calendar, Clock, Check, X, Camera, Activity } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../utils/cn";

const VENDORS = {
  daycare: [
    { id: 'd1', name: 'Happy Tails Day Care', rating: 4.8, price: 25, type: 'Day Care', distance: '1.2 km', image: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&q=80&w=400', amenities: ['AC Rooms', '24/7 CCTV', 'Play Area'] },
    { id: 'd2', name: 'Paws & Play Resort', rating: 4.9, price: 35, type: 'Day Care', distance: '3.5 km', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400', amenities: ['Vet on Call', 'Night Care', 'Food Included'] },
  ],
  grooming: [
    { id: 'g1', name: 'Glamour Paws Spa', rating: 4.7, price: 40, type: 'Grooming', distance: '0.8 km', image: 'https://images.unsplash.com/photo-1516734212711-236b281f6233?auto=format&fit=crop&q=80&w=400', addons: ['Bath & Blow Dry', 'Nail Trim', 'Spa Treatment'] },
    { id: 'g2', name: 'Elite Pet Stylists', rating: 4.6, price: 55, type: 'Grooming', distance: '2.1 km', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400', addons: ['Full Grooming', 'Teeth Brushing', 'Anti-Tick Bath'] },
  ]
};

export default function ShopServices() {
  const [activeServiceTab, setActiveServiceTab] = useState("grooming"); // "daycare" or "grooming"
  const [selectedVendor, setSelectedVendor] = useState(null);
  
  // Booking Flow States
  const [bookingState, setBookingState] = useState(0); // 0: Select Addons/Amenities, 1: Date & Time, 2: Confirmed/Tracking
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    setBookingState(0);
    setSelectedAddons([]);
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const confirmBooking = () => {
    setBookingState(2);
  };

  return (
    <div className="p-4 lg:p-6 w-full">
      
      {/* Service Type Switcher */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveServiceTab("grooming")}
          className={cn("flex-1 py-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all", activeServiceTab === "grooming" ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:border-gray-200")}
        >
          <Scissors size={28} />
          <span className="font-bold">Grooming</span>
        </button>
        <button 
          onClick={() => setActiveServiceTab("daycare")}
          className={cn("flex-1 py-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all", activeServiceTab === "daycare" ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 hover:border-gray-200")}
        >
          <Home size={28} />
          <span className="font-bold">Day Care</span>
        </button>
      </div>

      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Rated {activeServiceTab === "grooming" ? "Groomers" : "Day Cares"}</h2>
          <p className="text-sm text-gray-500">Book trusted professionals near you.</p>
        </div>
      </div>

      {/* Vendor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {VENDORS[activeServiceTab].map(vendor => (
          <Card key={vendor.id} className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleVendorSelect(vendor)}>
            <div className="h-48 relative">
              <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-2 py-1 rounded-md shadow flex items-center">
                <Star size={12} className="text-yellow-500 mr-1 fill-yellow-500" /> {vendor.rating}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{vendor.name}</h3>
                <span className="text-primary font-bold">Starts at ₹{vendor.price}</span>
              </div>
              <p className="text-xs text-gray-500 flex items-center mb-4"><MapPin size={12} className="mr-1"/> {vendor.distance}</p>
              
              <div className="flex flex-wrap gap-2">
                {(vendor.amenities || vendor.addons).map((tag, i) => (
                  <span key={i} className="text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Booking Flow Modal */}
      <AnimatePresence>
        {selectedVendor && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedVendor(null)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0 }} className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
              
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50 rounded-t-3xl sm:rounded-t-3xl">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{selectedVendor.name}</h2>
                  <p className="text-xs text-primary font-medium">{bookingState === 0 ? "Select Preferences" : bookingState === 1 ? "Select Date & Time" : "Booking Confirmed"}</p>
                </div>
                <button onClick={() => setSelectedVendor(null)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 transition"><X size={16}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                
                {bookingState === 0 && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Choose {activeServiceTab === 'grooming' ? 'Add-on Services' : 'Amenities to utilize'}</h3>
                    <div className="space-y-3">
                      {(selectedVendor.amenities || selectedVendor.addons).map((tag, i) => (
                        <label key={i} className={cn("flex items-center p-4 border rounded-xl cursor-pointer transition-all", selectedAddons.includes(tag) ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800")}>
                          <div className={cn("w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors", selectedAddons.includes(tag) ? "bg-primary border-primary text-white" : "border-gray-300 dark:border-gray-600")}>
                            {selectedAddons.includes(tag) && <Check size={14} />}
                          </div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{tag}</span>
                          <span className="ml-auto text-sm text-gray-500">+₹{Math.floor(Math.random() * 20) + 10}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {bookingState === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">Select Date</h3>
                      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                        {["Today", "Tomorrow", "Jun 26", "Jun 27"].map((d, i) => (
                          <button key={d} className={cn("px-6 py-3 rounded-xl border font-bold text-sm shrink-0", i === 0 ? "bg-primary border-primary text-white" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300")}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-between">
                        Time Slot <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500 font-normal">Immediate Available</span>
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"].map((t, i) => (
                          <button key={t} className={cn("py-3 rounded-xl border font-bold text-sm text-center", i === 1 ? "bg-primary/10 border-primary text-primary" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300")}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {bookingState === 2 && (
                  <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-2xl p-6 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full text-white flex items-center justify-center mx-auto mb-4">
                        <Check size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">Booking Confirmed!</h2>
                      <p className="text-sm text-green-600 dark:text-green-500">Your appointment is set for Today at 11:30 AM.</p>
                    </div>

                    {/* Live Tracking Dashboard (6.15.6 & 6.16.6) */}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Live Service Updates</h3>
                      <div className="relative pl-6 space-y-6 border-l-2 border-gray-200 dark:border-gray-800 ml-3">
                        
                        <div className="relative">
                          <div className="absolute -left-[31px] bg-primary w-4 h-4 rounded-full border-4 border-white dark:border-gray-900" />
                          <p className="text-xs text-gray-500 mb-1">11:30 AM</p>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">Pet Received</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Bella has been checked in successfully.</p>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute -left-[31px] bg-primary w-4 h-4 rounded-full border-4 border-white dark:border-gray-900" />
                          <p className="text-xs text-gray-500 mb-1">11:45 AM</p>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">Service Started</h4>
                          
                          {/* 6.16.7 Media Updates */}
                          <div className="mt-3 flex gap-2">
                            <div className="w-20 h-20 rounded-xl overflow-hidden relative group">
                              <img src="https://images.unsplash.com/photo-1516734212711-236b281f6233?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><Camera size={16} className="text-white"/></div>
                            </div>
                          </div>
                        </div>

                        <div className="relative opacity-50">
                          <div className="absolute -left-[31px] bg-gray-300 dark:bg-gray-700 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900" />
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">Ready for Pickup</h4>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
                
              </div>

              {bookingState < 2 && (
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 rounded-b-3xl flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Est. Total</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">₹{selectedVendor.price + (selectedAddons.length * 15)}</p>
                  </div>
                  <Button onClick={() => bookingState === 0 ? setBookingState(1) : confirmBooking()} className="px-8 py-3 rounded-xl text-base">
                    {bookingState === 0 ? "Continue" : "Confirm Booking"}
                  </Button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
