import { useState } from "react";
import { Header } from "../../components/common/Header";
import { SwipeCard } from "../../components/modules/matches/SwipeCard";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageSquare, ShieldAlert, Ban, Heart, MapPin } from "lucide-react";

const MOCK_PETS = [
  { id: 1, name: "Bella", age: "2 yrs", gender: "Female", breed: "Golden Retriever", distance: "1.2", intent: "Companionship", medical: "Vaccinated, Spayed", owner: "Sarah (Verified)", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Charlie", age: "1 yr", gender: "Male", breed: "French Bulldog", distance: "3.5", intent: "Playdate", medical: "Vaccinated", owner: "Mike (Verified)", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Luna", age: "3 yrs", gender: "Female", breed: "Siberian Husky", distance: "5.0", intent: "Companionship", medical: "Vaccinated, Spayed", owner: "Emma", image: "https://images.unsplash.com/photo-1605568420125-4eb84e5541e2?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Max", age: "4 yrs", gender: "Male", breed: "German Shepherd", distance: "2.1", intent: "Breeding", medical: "Vaccinated, Health Tested", owner: "John (Verified)", image: "https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Daisy", age: "6 mos", gender: "Female", breed: "Pug", distance: "0.8", intent: "Playdate", medical: "Puppy shots", owner: "Alice", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Rocky", age: "2 yrs", gender: "Male", breed: "Boxer", distance: "4.2", intent: "Companionship", medical: "Vaccinated, Neutered", owner: "Chris (Verified)", image: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?auto=format&fit=crop&q=80&w=800" },
  { id: 7, name: "Zoe", age: "1 yr", gender: "Female", breed: "Poodle", distance: "1.5", intent: "Playdate", medical: "Vaccinated", owner: "Olivia", image: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?auto=format&fit=crop&q=80&w=800" },
  { id: 8, name: "Milo", age: "3 yrs", gender: "Male", breed: "Beagle", distance: "2.8", intent: "Companionship", medical: "Vaccinated, Neutered", owner: "Liam", image: "https://images.unsplash.com/photo-1537151608804-ea6f1cb3950b?auto=format&fit=crop&q=80&w=800" },
  { id: 9, name: "Lucy", age: "5 yrs", gender: "Female", breed: "Dachshund", distance: "6.0", intent: "Companionship", medical: "Vaccinated, Spayed", owner: "Sophia", image: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&q=80&w=800" },
  { id: 10, name: "Cooper", age: "1.5 yrs", gender: "Male", breed: "Labrador Retriever", distance: "1.1", intent: "Playdate", medical: "Vaccinated", owner: "Noah", image: "https://images.unsplash.com/photo-1579213838826-6fdad3d211f4?auto=format&fit=crop&q=80&w=800" },
  { id: 11, name: "Stella", age: "2.5 yrs", gender: "Female", breed: "Rottweiler", distance: "3.0", intent: "Breeding", medical: "Vaccinated", owner: "Ava (Verified)", image: "https://images.unsplash.com/photo-1565538871146-8153400bfa3f?auto=format&fit=crop&q=80&w=800" },
  { id: 12, name: "Bailey", age: "8 mos", gender: "Male", breed: "Australian Shepherd", distance: "4.5", intent: "Playdate", medical: "Vaccinated", owner: "William", image: "https://images.unsplash.com/photo-1587300003388-59208cb962cb?auto=format&fit=crop&q=80&w=800" },
  { id: 13, name: "Lola", age: "4 yrs", gender: "Female", breed: "Corgi", distance: "0.5", intent: "Companionship", medical: "Vaccinated, Spayed", owner: "Mia", image: "https://images.unsplash.com/photo-1612536057832-2ce7def8ee26?auto=format&fit=crop&q=80&w=800" },
  { id: 14, name: "Duke", age: "3 yrs", gender: "Male", breed: "Doberman", distance: "7.2", intent: "Playdate", medical: "Vaccinated", owner: "James", image: "https://images.unsplash.com/photo-1604085732959-19f86018af3e?auto=format&fit=crop&q=80&w=800" },
  { id: 15, name: "Sadie", age: "1 yr", gender: "Female", breed: "Border Collie", distance: "2.3", intent: "Playdate", medical: "Vaccinated", owner: "Isabella", image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=800" },
  { id: 16, name: "Tucker", age: "2 yrs", gender: "Male", breed: "Shih Tzu", distance: "1.8", intent: "Companionship", medical: "Vaccinated, Neutered", owner: "Benjamin", image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=800" },
  { id: 17, name: "Penny", age: "5 mos", gender: "Female", breed: "Chihuahua", distance: "0.9", intent: "Playdate", medical: "Puppy shots", owner: "Charlotte", image: "https://images.unsplash.com/photo-1605639156481-244775d6f803?auto=format&fit=crop&q=80&w=800" },
  { id: 18, name: "Bear", age: "6 yrs", gender: "Male", breed: "Saint Bernard", distance: "8.5", intent: "Companionship", medical: "Vaccinated, Neutered", owner: "Lucas", image: "https://images.unsplash.com/photo-1577174620023-3889da3b9f33?auto=format&fit=crop&q=80&w=800" },
  { id: 19, name: "Chloe", age: "2 yrs", gender: "Female", breed: "Yorkshire Terrier", distance: "1.4", intent: "Companionship", medical: "Vaccinated, Spayed", owner: "Amelia (Verified)", image: "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&q=80&w=800" },
  { id: 20, name: "Buster", age: "3 yrs", gender: "Male", breed: "Bulldog", distance: "2.9", intent: "Playdate", medical: "Vaccinated", owner: "Ethan", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800" },
];

export default function Matches() {
  const [cards, setCards] = useState(MOCK_PETS);
  const [selectedPet, setSelectedPet] = useState(null);
  const [matchOverlayPet, setMatchOverlayPet] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [myMatches, setMyMatches] = useState([MOCK_PETS[0], MOCK_PETS[2]]); // Mock history

  const handleSwipe = (direction, id) => {
    const swipedPet = cards.find(c => c.id === id);
    
    setTimeout(() => {
      setCards((prev) => prev.filter((card) => card.id !== id));
      
      // Mutual Match Simulation (30% chance on Right/Super Like)
      if ((direction === "right" || direction === "superlike") && Math.random() > 0.7) {
        setMatchOverlayPet(swipedPet);
        setMyMatches(prev => [swipedPet, ...prev]);
      }
    }, 200);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Custom Header matching the prototype */}
      <div className="pt-12 px-6 pb-2 bg-[#f8f9fa] dark:bg-gray-950 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#eaf5f3] rounded-full flex items-center justify-center">
            <span className="text-xl">🐾</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white leading-tight">Meet & Match</h1>
            <p className="text-[#45b09e] text-[11px] font-bold flex items-center mt-0.5">
              <MapPin size={10} className="mr-0.5" /> Mumbai
            </p>
          </div>
        </div>
        <button onClick={() => setIsDrawerOpen(true)} className="w-10 h-10 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 shadow-sm relative">
          <span className="text-gray-900 dark:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-7"></path><path d="M4 10V3"></path><path d="M12 21v-9"></path><path d="M12 8V3"></path><path d="M20 21v-5"></path><path d="M20 12V3"></path><path d="M1 14h6"></path><path d="M9 8h6"></path><path d="M17 16h6"></path></svg>
          </span>
          {myMatches.length > 0 && (
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#e65c55] rounded-full border-2 border-white dark:border-gray-900"></div>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 pb-4 bg-[#f8f9fa] dark:bg-gray-950 pt-2">
        <div className="flex gap-2">
          <button className="flex-1 bg-white dark:bg-gray-800 py-2.5 rounded-[20px] shadow-sm text-[#45b09e] text-xs font-bold transition">
            Discover 🧭
          </button>
          <button className="flex-1 py-2.5 text-gray-500 dark:text-gray-400 text-xs font-bold transition">
            Liked 💛 1
          </button>
          <button onClick={() => setIsDrawerOpen(true)} className="flex-1 py-2.5 text-gray-500 dark:text-gray-400 text-xs font-bold transition">
            Matches 🎉 {myMatches.length}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 relative bg-[#f8f9fa] dark:bg-gray-950 pt-2">
        <div className="relative w-full max-w-md h-[500px] flex items-center justify-center">
          {cards.length === 0 ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🐾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">No more pets nearby!</h3>
              <p className="text-gray-500 mt-2">Adjust your filters to see more potential matches.</p>
              <button 
                onClick={() => setCards(MOCK_PETS)}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition"
              >
                Reload
              </button>
            </div>
          ) : (
            <AnimatePresence>
              {cards.map((pet, index) => (
                <SwipeCard 
                  key={pet.id} 
                  pet={pet} 
                  active={index === cards.length - 1}
                  onSwipe={(dir) => handleSwipe(dir, pet.id)}
                  onInfo={(p) => setSelectedPet(p)}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* --- MODALS & OVERLAYS --- */}

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {selectedPet && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setSelectedPet(null)}
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl h-[85vh] sm:h-auto sm:max-h-[85vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 shrink-0">
                <img src={selectedPet.image} alt={selectedPet.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedPet(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full text-xs font-bold text-primary backdrop-blur-md">
                  {selectedPet.intent}
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto hide-scrollbar flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {selectedPet.name}, {selectedPet.age}
                    </h2>
                    <p className="text-gray-500 mt-1">{selectedPet.breed} • {selectedPet.gender}</p>
                    <p className="text-primary font-medium text-sm mt-1">{selectedPet.distance} miles away</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 border-b border-gray-100 dark:border-gray-800 pb-2">Medical Summary</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedPet.medical}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 border-b border-gray-100 dark:border-gray-800 pb-2">Owner Details</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{selectedPet.owner}</p>
                  </div>
                </div>

                {/* Safety Controls */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                  <button className="flex items-center justify-center w-full py-3 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 font-bold hover:bg-red-100 transition">
                    <ShieldAlert size={18} className="mr-2" /> Report Profile
                  </button>
                  <button className="flex items-center justify-center w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 transition">
                    <Ban size={18} className="mr-2" /> Block User
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mutual Match Overlay */}
      <AnimatePresence>
        {matchOverlayPet && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.h2 
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: "spring" }}
              className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-primary mb-12 italic tracking-tighter"
            >
              It's a Match!
            </motion.h2>

            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="relative">
                <img src="https://i.pravatar.cc/150?img=32" alt="You" className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-2xl" />
                <div className="absolute -bottom-2 right-0 bg-primary w-8 h-8 rounded-full flex items-center justify-center border-2 border-black">
                  <Heart size={16} className="text-white fill-white" />
                </div>
              </motion.div>
              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="relative">
                <img src={matchOverlayPet.image} alt={matchOverlayPet.name} className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-pink-500 shadow-2xl" />
                <div className="absolute -bottom-2 left-0 bg-pink-500 w-8 h-8 rounded-full flex items-center justify-center border-2 border-black">
                  <Heart size={16} className="text-white fill-white" />
                </div>
              </motion.div>
            </div>

            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl text-white/90 mb-10">
              You and {matchOverlayPet.name}'s owner have liked each other.
            </motion.p>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-col w-full max-w-xs gap-4">
              <button 
                onClick={() => setMatchOverlayPet(null)}
                className="w-full py-4 rounded-full bg-gradient-to-r from-pink-500 to-primary text-white font-bold text-lg flex items-center justify-center hover:scale-105 transition-transform"
              >
                <MessageSquare size={20} className="mr-2" /> Send Message
              </button>
              <button 
                onClick={() => setMatchOverlayPet(null)}
                className="w-full py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
              >
                Keep Swiping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Match Management Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40" onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Matches</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  {myMatches.map((match, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer">
                      <img src={match.image} alt={match.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 text-white">
                        <h4 className="font-bold">{match.name}</h4>
                        <div className="flex items-center text-[10px] bg-primary w-fit px-2 py-0.5 rounded-full mt-1">
                          <MessageSquare size={10} className="mr-1" /> Chat
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
