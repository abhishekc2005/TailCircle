import { useState } from "react";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { Search, MapPin, Star, Video, Building2, Calendar, Clock, ChevronRight, X, PhoneCall, CheckCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import DoctorVideoCall from "./DoctorVideoCall";

const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Ananya Krishnan", clinic: "Petcare Clinic", specialty: "Small Animals & Surgery", experience: "12 years exp", rating: 4.9, reviews: 412, distance: "Bandra West", image: "https://images.unsplash.com/photo-1594824436951-7f12bc50d2bb?auto=format&fit=crop&q=80&w=200", fee: 500, nextSlot: "4:00 PM", status: "Available" },
  { id: 2, name: "Dr. Rohan Patel", clinic: "Mumbai Pet Hospital", specialty: "Dermatology & Internal Medicine", experience: "9 years exp", rating: 4.8, reviews: 287, distance: "Andheri East", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200", fee: 600, nextSlot: "6:30 PM", status: "Available" },
  { id: 3, name: "Dr. Priya Mehta", clinic: "Happy Tails Vet", specialty: "Dental & Nutrition", experience: "15 years exp", rating: 4.9, reviews: 520, distance: "Juhu", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200", fee: 450, nextSlot: "Tomorrow", status: "Busy" },
];

export default function DoctorConsult() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const [selectedDoctor, setSelectedDoctor] = useState(null); 
  const [bookingStep, setBookingStep] = useState(null); // null, 'success'
  const [selectedDate, setSelectedDate] = useState(2); // Default to Thu 14 May (index 2)
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const [isVideoActive, setIsVideoActive] = useState(false); 

  const handleJoinVideo = () => {
    setIsVideoActive(true);
  };

  if (isVideoActive) {
    return <DoctorVideoCall doctor={MOCK_DOCTORS[0]} onClose={() => setIsVideoActive(false)} />;
  }

  return (
    <div className="p-4 lg:p-6 w-full max-w-2xl mx-auto">
      
      {/* Filters (Prototype Match) */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
        {["All", "Small Animals", "Dermatology", "Dental", "Surgery", "Nutrition"].map((cat) => (
          <button key={cat} onClick={() => setActiveFilter(cat)} className={cn("px-5 py-2.5 rounded-full text-sm font-bold shrink-0 transition", activeFilter === cat ? "bg-[#45b09e] text-white shadow-sm" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50")}>
            {cat}
          </button>
        ))}
      </div>

      {/* Emergency Banner */}
      <div className="bg-[#fff0f0] dark:bg-red-900/20 border border-[#ffe0e0] dark:border-red-900/50 rounded-2xl p-4 flex items-center justify-between mb-6 shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full border border-red-400 text-red-500 flex items-center justify-center mr-3 bg-white dark:bg-gray-900 shrink-0">
             <span className="font-black text-sm">!</span>
          </div>
          <div>
            <h4 className="font-black text-red-600 dark:text-red-400 text-sm">Pet Emergency?</h4>
            <p className="text-xs text-red-500/80 font-medium">Call our 24/7 emergency helpline</p>
          </div>
        </div>
        <button className="bg-[#e65c55] hover:bg-[#d44b44] text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md shrink-0">
          Call Now
        </button>
      </div>

      {/* Doctor List (Prototype Match) */}
      <div className="space-y-4">
        {MOCK_DOCTORS.map(doctor => (
          <Card key={doctor.id} className="p-4 flex flex-col hover:shadow-md transition-shadow relative">
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover shrink-0 border border-gray-100" />
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight">{doctor.name}</h3>
                  <p className="text-sm font-bold text-[#45b09e] my-0.5">{doctor.specialty}</p>
                  <p className="text-xs text-gray-500 font-medium">{doctor.clinic}</p>
                </div>
              </div>
              <span className={cn("flex items-center text-[10px] font-black px-2.5 py-1 rounded-full shrink-0", doctor.status === 'Available' ? 'bg-[#ebf7f5] dark:bg-green-900/20 text-[#45b09e] dark:text-green-400' : 'bg-gray-100 text-gray-500')}>
                <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5", doctor.status === 'Available' ? 'bg-[#45b09e]' : 'bg-gray-400')}></div> {doctor.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-3">
              <span className="flex items-center text-yellow-600"><Star size={12} className="mr-1 fill-current"/> {doctor.rating} ({doctor.reviews})</span>
              <span className="flex items-center text-gray-400">|</span>
              <span className="flex items-center"><Building2 size={12} className="mr-1"/> {doctor.experience}</span>
              <span className="flex items-center text-gray-400">|</span>
              <span className="flex items-center"><MapPin size={12} className="mr-1"/> {doctor.distance}</span>
            </div>

            <div className="flex items-center text-xs font-bold text-gray-600 dark:text-gray-400 mb-4">
              <Clock size={14} className="mr-2 text-[#45b09e]" /> Next: Today, {doctor.nextSlot} • ₹{doctor.fee} consult fee
            </div>

            <div className="flex gap-3">
              <button onClick={handleJoinVideo} className="flex-1 flex items-center justify-center py-3.5 rounded-2xl border-2 border-[#45b09e] text-[#45b09e] font-black text-sm hover:bg-[#45b09e]/5 transition">
                <Video size={16} className="mr-2"/> Video Call
              </button>
              <button onClick={() => setSelectedDoctor(doctor)} className="flex-1 flex items-center justify-center py-3.5 rounded-2xl bg-[#e65c55] text-white font-black text-sm hover:bg-[#d44b44] transition shadow-lg shadow-[#e65c55]/20">
                <Calendar size={16} className="mr-2"/> Book Appointment
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* MODAL: Select Date & Time (Screenshot 3) */}
      <AnimatePresence>
        {selectedDoctor && !bookingStep && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDoctor(null)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0 }} className="relative w-full max-w-md bg-[#f8f9fa] dark:bg-gray-900 rounded-t-[32px] sm:rounded-[32px] shadow-2xl flex flex-col max-h-[90vh]">
              
              <div className="p-6 pb-5 mt-2 flex justify-between items-start bg-white dark:bg-gray-900 rounded-t-[32px] shrink-0 border-b border-gray-100 dark:border-gray-800 relative">
                <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full absolute top-3 left-1/2 -translate-x-1/2"></div>
                <div className="flex gap-4 mt-2">
                  <img src={selectedDoctor.image} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white leading-tight mb-1">{selectedDoctor.name}</h2>
                    <p className="text-[#45b09e] font-black text-sm mb-1">{selectedDoctor.specialty}</p>
                    <p className="text-xs text-gray-500 font-medium">{selectedDoctor.clinic}</p>
                  </div>
                </div>
                <div className="bg-[#ebf7f5] dark:bg-[#45b09e]/10 px-3 py-2 rounded-2xl text-center border border-[#45b09e]/20 mt-2">
                  <p className="text-lg font-black text-[#45b09e]">₹{selectedDoctor.fee}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">consult</p>
                </div>
              </div>

              <div className="p-6 overflow-y-auto hide-scrollbar flex-1 bg-[#f8f9fa] dark:bg-gray-900">
                <h3 className="font-black text-lg text-gray-900 dark:text-white mb-4">Select Date</h3>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {[
                    { label: 'Today', date: '12', month: 'May' },
                    { label: 'Tmrw', date: '13', month: 'May' },
                    { label: 'Thu', date: '14', month: 'May' },
                    { label: 'Fri', date: '15', month: 'May' },
                    { label: 'Sat', date: '16', month: 'May' },
                  ].map((d, i) => (
                    <button key={i} onClick={() => setSelectedDate(i)} className={cn("flex flex-col items-center justify-center p-4 rounded-[20px] min-w-[76px] shrink-0 transition", selectedDate === i ? "bg-[#45b09e] text-white shadow-md" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700")}>
                      <span className={cn("text-[10px] font-bold mb-1", selectedDate === i ? "text-white/80" : "text-gray-400")}>{d.label}</span>
                      <span className="text-2xl font-black leading-none mb-1">{d.date}</span>
                      <span className={cn("text-xs font-bold", selectedDate === i ? "text-white/90" : "text-gray-500")}>{d.month}</span>
                    </button>
                  ))}
                </div>

                <h3 className="font-black text-lg text-gray-900 dark:text-white mt-8 mb-4">Select Time Slot</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { title: "Morning", time: "9:00 AM - 11:00 AM" },
                    { title: "Afternoon", time: "1:00 PM - 3:00 PM" },
                    { title: "Evening", time: "5:00 PM - 8:00 PM" },
                  ].map((s, i) => (
                    <button key={i} onClick={() => setSelectedSlot(i)} className={cn("p-4 rounded-[20px] text-center transition", selectedSlot === i ? "bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-white shadow-sm" : "bg-white dark:bg-gray-800 border-2 border-transparent text-gray-400 dark:text-gray-500 opacity-50")}>
                      <span className="block font-black text-sm mb-1 text-gray-900 dark:text-white">{s.title}</span>
                      <span className="block text-[10px] font-bold">{s.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#f8f9fa] dark:bg-gray-900 flex rounded-b-[32px] pb-6">
                <button 
                  onClick={() => {
                    if (selectedDate !== null && selectedSlot !== null) setBookingStep('success');
                  }} 
                  className={cn("w-full flex items-center justify-center py-4 rounded-2xl text-white font-black transition text-lg", selectedDate !== null && selectedSlot !== null ? "bg-[#cca7a2] shadow-lg shadow-[#cca7a2]/30" : "bg-[#e5ddd9] text-gray-400")}
                  style={selectedDate !== null && selectedSlot !== null ? { backgroundColor: '#a0948e' } : {}}
                >
                  <Calendar size={20} className="mr-2"/> {selectedSlot !== null ? 'Continue to confirm' : 'Select a time slot'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Booking Confirmed (Screenshot 5 Match) */}
      <AnimatePresence>
        {bookingStep === 'success' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-[32px] p-6 shadow-2xl text-center">
              
              <div className="w-20 h-20 bg-[#ebf7f5] dark:bg-[#45b09e]/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <div className="w-10 h-10 bg-[#45b09e] rounded-full flex items-center justify-center">
                  <CheckCircle size={24} className="text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
              <p className="text-gray-500 text-sm font-medium mb-6 px-4 leading-relaxed">Your spot at Happy Tails Boarding is reserved. See you there!</p>

              <div className="bg-[#fcfaf8] dark:bg-gray-800 rounded-[24px] p-5 text-left space-y-4 mb-6 border border-[#f5efe9] dark:border-gray-700">
                <div className="flex justify-between items-center border-b border-[#f5efe9] dark:border-gray-700 pb-3">
                  <span className="text-xs font-bold text-gray-500">Hostel</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white">Happy Tails Boarding</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#f5efe9] dark:border-gray-700 pb-3">
                  <span className="text-xs font-bold text-gray-500">Date</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white">13 May 2026</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#f5efe9] dark:border-gray-700 pb-3">
                  <span className="text-xs font-bold text-gray-500">Slot</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white">1:00 PM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500">Per night</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white">₹699</span>
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={() => { setBookingStep(null); setSelectedDoctor(null); }} className="w-full bg-[#45b09e] hover:bg-[#388f80] text-white font-black py-4 rounded-2xl transition shadow-lg shadow-[#45b09e]/20 text-lg">
                  View My Bookings
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
