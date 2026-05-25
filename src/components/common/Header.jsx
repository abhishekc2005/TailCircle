import { useState } from "react";
import { Bell, Search, X, Heart, ShoppingBag, Stethoscope, Calendar, MessageCircle, Moon, Sun } from "lucide-react";
import { Input } from "./Input";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";

export function Header({ title }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-40 glass border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden md:block">{title}</h1>
        <div className="md:hidden flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="font-bold text-lg dark:text-white">Tail Circle</span>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button onClick={() => setShowSearch(true)} className="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <Search className="w-6 h-6" />
          </button>
          
          <div className="hidden md:block w-64 cursor-pointer" onClick={() => setShowSearch(true)}>
            <div className="relative h-10 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center px-4 border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition text-gray-400">
              <Search className="w-4 h-4 mr-2" />
              <span className="text-sm">Global Search...</span>
            </div>
          </div>

          <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

          <Link to="/chat" className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <MessageCircle className="w-6 h-6" />
          </Link>
          
          <Link to="/notifications" className="relative p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
          </Link>
        </div>
      </header>

      {/* Global Search Overlay (13.1, 13.2) */}
      <AnimatePresence>
        {showSearch && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white dark:bg-gray-950 flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pets, doctors, products, events..." 
                  className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button onClick={() => setShowSearch(false)} className="p-3 text-gray-500 hover:text-gray-900 dark:hover:text-white transition bg-gray-100 dark:bg-gray-900 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex gap-2 overflow-x-auto hide-scrollbar">
              {['All', 'Pets', 'Shop', 'Doctors', 'Events'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setActiveFilter(f)}
                  className={cn("px-4 py-1.5 text-sm font-bold rounded-full transition shrink-0 border", activeFilter === f ? "bg-primary border-primary text-white" : "bg-transparent border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300")}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
              {searchQuery.length === 0 ? (
                <div className="text-gray-400 dark:text-gray-600 max-w-xs">
                  <Search size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="font-bold text-lg mb-2">Global Search</p>
                  <p className="text-sm">Type anything to search across the entire TailCircle ecosystem.</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-start">
                  <p className="text-sm text-gray-500 text-left mb-4">Showing mock results for "{searchQuery}" in {activeFilter}</p>
                  <div className="space-y-2">
                    {/* Mock Results */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center"><Heart size={20}/></div>
                      <div className="text-left flex-1"><p className="font-bold text-gray-900 dark:text-white text-sm">Bella (Golden Retriever)</p><p className="text-xs text-gray-500">Pet Match • 2 miles away</p></div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center"><ShoppingBag size={20}/></div>
                      <div className="text-left flex-1"><p className="font-bold text-gray-900 dark:text-white text-sm">Premium Grain-Free Food</p><p className="text-xs text-gray-500">Shop • ₹45.99</p></div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center"><Stethoscope size={20}/></div>
                      <div className="text-left flex-1"><p className="font-bold text-gray-900 dark:text-white text-sm">Dr. Sarah Jenkins</p><p className="text-xs text-gray-500">Doctor • Vet Specialist</p></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
