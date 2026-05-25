import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../common/Sidebar";
import { BottomNav } from "../common/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ChatWidget } from "../chat/ChatWidget";

export default function MainLayout() {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col lg:flex-row">
      <Sidebar />
      
      <main className="flex-1 lg:ml-72 pb-20 lg:pb-0 relative overflow-x-hidden min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        
        {/* Common User Feature: Global Floating Help / Chat */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-24 lg:bottom-8 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-[0_8px_30px_rgb(170,59,255,0.4)] flex items-center justify-center hover:scale-110 transition-transform hover:bg-primary-dark"
        >
          <MessageSquare size={24} />
        </button>

        <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>

      <BottomNav />
    </div>
  );
}
