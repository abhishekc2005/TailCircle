import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
    title: "Find Your Pet's Perfect Match",
    subtitle: "Connect with nearby pets for playdates, socialization, and lasting friendships."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    title: "Shop Premium Pet Essentials",
    subtitle: "From gourmet food to fun toys — everything your fur baby deserves, delivered fast."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
    title: "Join India's Pet Community",
    subtitle: "Events, vets, tips & a tribe of pet parents who get it. Welcome to the pack!"
  }
];

export default function Intro() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate("/auth/login");
    }
  };

  const handleSkip = () => {
    navigate("/auth/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      {/* Top Bar */}
      <div className="flex justify-end pt-4 mb-4">
        <button 
          onClick={handleSkip}
          className="text-gray-500 dark:text-gray-400 font-medium text-sm hover:text-gray-900 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">
        <div className="relative w-full aspect-square md:max-h-[500px] mb-8 overflow-hidden rounded-[40px] shadow-sm">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={SLIDES[currentSlide].image}
              alt={SLIDES[currentSlide].title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="text-center min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                {SLIDES[currentSlide].title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-relaxed max-w-sm mx-auto px-4">
                {SLIDES[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-between items-center max-w-md mx-auto w-full pb-8">
        {/* Pagination Dots */}
        <div className="flex gap-2">
          {SLIDES.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-[#45b09e] w-6" 
                  : "bg-gray-200 dark:bg-gray-800 w-2"
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div>
          {currentSlide === SLIDES.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-8 py-3.5 rounded-[20px] bg-[#e65c55] text-white font-bold text-[15px] shadow-md hover:bg-[#d64e47] transition hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-[#e65c55] text-white flex items-center justify-center shadow-md hover:bg-[#d64e47] transition hover:scale-110 active:scale-95"
            >
              <ArrowRight strokeWidth={2.5} size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
