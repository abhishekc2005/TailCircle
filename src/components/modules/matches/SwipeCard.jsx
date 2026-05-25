import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { X, Heart, Star, Info } from "lucide-react";
import { useState } from "react";

export function SwipeCard({ pet, onSwipe, onInfo, active }) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [exitX, setExitX] = useState(0);

  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      setExitX(200);
      onSwipe("right");
    } else if (info.offset.x < -100) {
      setExitX(-200);
      onSwipe("left");
    }
  };

  const handleAction = async (direction) => {
    if (direction === "right") {
      await controls.start({ x: 200, opacity: 0, transition: { duration: 0.3 } });
      onSwipe("right");
    } else if (direction === "left") {
      await controls.start({ x: -200, opacity: 0, transition: { duration: 0.3 } });
      onSwipe("left");
    } else if (direction === "up") {
      await controls.start({ y: -200, opacity: 0, transition: { duration: 0.3 } });
      onSwipe("superlike");
    }
  };

  return (
    <motion.div
      className="absolute w-full max-w-[340px] flex flex-col items-center h-[580px] cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate,
        opacity,
        zIndex: active ? 10 : 0,
      }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      exit={{ x: exitX, opacity: 0, transition: { duration: 0.2 } }}
    >
      {/* Inner Card Container */}
      <div className="w-full bg-white rounded-[32px] shadow-lg overflow-hidden border border-gray-100 flex flex-col h-[480px] relative shrink-0">
        {/* Like/Nope stamps */}
      <motion.div style={{ opacity: likeOpacity }} className="absolute top-12 left-8 z-20 transform -rotate-12 border-4 border-[#45b09e] text-[#45b09e] text-4xl font-black px-4 py-2 rounded-xl">
        LIKE
      </motion.div>
      <motion.div style={{ opacity: nopeOpacity }} className="absolute top-12 right-8 z-20 transform rotate-12 border-4 border-[#e65c55] text-[#e65c55] text-4xl font-black px-4 py-2 rounded-xl">
        NOPE
      </motion.div>

      {/* Top Image Section */}
      <div className="relative w-full h-[60%] shrink-0">
        <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
        
        {/* Distance Pill */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-bold text-gray-900 shadow-sm flex items-center">
          <span className="text-[#e65c55] mr-1 text-sm">📍</span> {pet.distance} km
        </div>
        
        {/* Likes Pill */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-bold text-[#45b09e] shadow-sm flex items-center">
          ♡ {Math.floor(Math.random() * 50) + 10}
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="flex-1 bg-white p-5 flex flex-col">
        <div className="flex items-center mb-1">
          <h2 className="text-2xl font-black text-gray-900 mr-2">{pet.name}</h2>
          <span className="text-gray-400 text-[13px] font-medium mr-1">{pet.age}</span>
          <span className="text-sm mr-2">🐕</span>
          <span className="bg-[#eaf5f3] text-[#45b09e] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center">
            <span className="mr-1">⬡</span> Vacc'd
          </span>
        </div>
        
        <p className="text-gray-400 text-[11px] font-medium mb-3">
          {pet.owner}'s {pet.breed} • {pet.distance > 3 ? 'Andheri' : 'Bandra'}
        </p>

        {/* Paws Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[1,2,3,4,5].map(i => (
            <span key={i} className={i <= (pet.id % 2 === 0 ? 5 : 3) ? "text-gray-800" : "text-gray-200"}>
              🐾
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mt-auto">
          <span className="bg-[#45b09e] text-white text-[11px] font-bold px-3 py-1.5 rounded-full">Friendly</span>
          <span className="bg-[#ffdbd9] text-[#e65c55] text-[11px] font-bold px-3 py-1.5 rounded-full">Playful</span>
          <span className="bg-[#eaf5f3] text-[#45b09e] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center">🎾 Playdate</span>
        </div>
      </div>
      </div>

      {/* Floating Action Buttons */}
      {active && (
        <div className="w-full flex justify-center items-center gap-5 mt-6 z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); handleAction("left"); }}
            className="w-16 h-16 bg-white border-2 border-red-500 rounded-full flex items-center justify-center text-gray-900 shadow-md hover:scale-110 transition-transform"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onInfo(pet); }}
            className="w-12 h-12 bg-[#eaf5f3] rounded-full flex items-center justify-center text-[#45b09e] shadow-md hover:scale-110 transition-transform"
          >
            <Info size={24} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleAction("right"); }}
            className="w-16 h-16 bg-[#e65c55] rounded-full flex items-center justify-center text-gray-900 shadow-md hover:scale-110 transition-transform"
          >
            <span className="text-2xl">🐾</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}
