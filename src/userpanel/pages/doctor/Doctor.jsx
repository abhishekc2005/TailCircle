import { useState } from "react";
import { Header } from "../../components/common/Header";
import { cn } from "../../utils/cn";
import { PhoneCall } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import DoctorConsult from "../../components/modules/doctor/DoctorConsult";
import DoctorRecords from "../../components/modules/doctor/DoctorRecords";

export default function Doctor() {
  const [activeTab, setActiveTab] = useState("consult"); // "consult", "records"
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Veterinary Care" />
      
      {/* Top Navigation Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[60px] md:top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 flex">
          <button 
            onClick={() => setActiveTab("consult")}
            className={cn("flex-1 md:flex-none px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "consult" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            Consult Doctors
          </button>
          <button 
            onClick={() => setActiveTab("records")}
            className={cn("flex-1 md:flex-none px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "records" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            My Records
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto">
        {activeTab === "consult" && <DoctorConsult />}
        {activeTab === "records" && <DoctorRecords />}
      </div>

      {/* 7.9 Floating Emergency Button */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40">
        <button 
          onClick={() => setIsEmergencyActive(true)}
          className="w-16 h-16 bg-red-500 text-white rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)] flex flex-col items-center justify-center hover:bg-red-600 transition-colors animate-pulse"
        >
          <PhoneCall size={24} />
          <span className="text-[10px] font-black uppercase mt-0.5">SOS</span>
        </button>
      </motion.div>

      {/* Emergency Flow Modal (7.9) */}
      <AnimatePresence>
        {isEmergencyActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-red-950/80 backdrop-blur-md" onClick={() => setIsEmergencyActive(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl p-8 text-center shadow-2xl">
              
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <PhoneCall size={48} className="animate-ping absolute opacity-50" />
                <PhoneCall size={48} className="relative z-10" />
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Emergency SOS</h2>
              <p className="text-gray-500 mb-8">Connecting you to the nearest available emergency veterinarian...</p>
              
              <div className="space-y-3">
                <button onClick={() => { alert("Connected to Dr. Sarah Jenkins! Premium emergency charges apply."); setIsEmergencyActive(false); }} className="w-full bg-red-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-600 transition">
                  Connect Now (₹100)
                </button>
                <button onClick={() => setIsEmergencyActive(false)} className="w-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  Cancel SOS
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
