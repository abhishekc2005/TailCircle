import { useState } from "react";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { ShieldCheck, MapPin, UploadCloud, FileText, CheckCircle, X, ChevronLeft, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../utils/cn";

const BUY_ADOPT_LISTINGS = [
  { id: 'b1', type: 'Buy', name: 'Max', species: 'Dog', breed: 'Cocker Spaniel', age: '2 months', gender: 'Female', price: '₹850', location: 'Versova, Mumbai', breeder: 'Spaniel Breeders', verified: true, image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400', traits: 'Cheerful, Gentle', size: 'Medium breed' },
  { id: 'b2', type: 'Buy', name: 'Luna', species: 'Dog', breed: 'Cocker Spaniel', age: '3 months', gender: 'Male', price: '₹800', location: 'Juhu, Mumbai', breeder: 'PawBreed India', verified: true, image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400', traits: 'Cheerful, Gentle', size: 'Medium breed' },
  { id: 'b3', type: 'Buy', name: 'Rocky', species: 'Dog', breed: 'Golden Retriever', age: '2 months', gender: 'Male', price: '₹950', location: 'Downtown Pet Store', breeder: 'Golden Life', verified: true, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400', traits: 'Friendly, Intelligent', size: 'Large breed' },
  { id: 'a1', type: 'Adopt', name: 'Milo', species: 'Cat', breed: 'Domestic Shorthair', age: '1 Year', gender: 'Male', price: 'Free Adoption', location: 'Paws Rescue NGO', breeder: 'Rescue', verified: true, image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=400', traits: 'Calm, Affectionate', size: 'Small' },
];

export default function ShopMarketplace() {
  const [activeTab, setActiveTab] = useState("buy"); // "buy", "sell", "adopt"
  
  // Breed View State
  const [selectedBreed, setSelectedBreed] = useState(null); // String like "Cocker Spaniel"
  
  // Enquiry Modal State
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  
  // Sell Pet Form State
  const [sellStep, setSellStep] = useState(0);

  const filteredListings = BUY_ADOPT_LISTINGS.filter(p => p.type.toLowerCase() === activeTab);
  
  // Unique breeds for the grid
  const uniqueBreeds = Array.from(new Set(filteredListings.map(p => p.breed))).map(breed => {
    return filteredListings.find(p => p.breed === breed);
  });

  const breedListings = BUY_ADOPT_LISTINGS.filter(p => p.breed === selectedBreed);

  const handleSellSubmit = (e) => {
    e.preventDefault();
    setSellStep(2);
  };

  const handleEnquire = (e, pet) => {
    e.stopPropagation();
    setShowEnquiryModal(true);
  };

  return (
    <div className="p-4 lg:p-6 w-full">
      
      {/* Sub-Navigation (Hidden when in Breed View) */}
      {!selectedBreed && (
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl mb-8 max-w-md mx-auto">
          {["buy", "sell", "adopt"].map(tab => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab); setSellStep(0); setSelectedBreed(null); }}
              className={cn(
                "flex-1 py-2.5 text-sm font-bold capitalize rounded-xl transition-all",
                activeTab === tab ? "bg-white dark:bg-gray-900 text-primary shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* BREED DETAIL VIEW (Prototype UI) */}
      {selectedBreed && (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center mb-6">
            <button onClick={() => setSelectedBreed(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition mr-2">
              <ChevronLeft size={24} className="text-gray-900 dark:text-white" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedBreed}</h2>
          </div>

          {/* Breed Header Card */}
          <div className="bg-[#fcf8f6] dark:bg-red-900/10 rounded-3xl p-4 flex items-center gap-4 mb-8">
            <img src={breedListings[0].image} alt={selectedBreed} className="w-20 h-20 rounded-2xl object-cover" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{selectedBreed}</h3>
              <p className="text-sm text-gray-500 mb-1">{breedListings[0].traits}</p>
              <span className="text-[10px] font-bold bg-[#f1eeec] dark:bg-red-900/30 text-[#e65c55] px-2 py-1 rounded-md">{breedListings[0].size}</span>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            {breedListings.length} {selectedBreed} available in Mumbai
          </h3>

          {/* Horizontal Listing Cards */}
          <div className="space-y-4">
            {breedListings.map(pet => (
              <Card key={pet.id} className="p-3 flex gap-4 items-stretch shadow-sm border border-gray-100 dark:border-gray-800">
                <img src={pet.image} alt={pet.breed} className="w-28 h-32 md:w-32 md:h-auto rounded-2xl object-cover" />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", pet.gender === 'Female' ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600")}>{pet.gender}</span>
                      <span className="text-[10px] text-gray-500">{pet.age}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1">{pet.breed}</h4>
                    <p className="text-[11px] text-gray-500 flex items-center mb-0.5"><ShieldCheck size={12} className="mr-1"/> {pet.breeder}</p>
                    <p className="text-[11px] text-gray-500 flex items-center"><MapPin size={12} className="mr-1"/> {pet.location}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-lg text-gray-900 dark:text-white">{pet.price}</span>
                    <button onClick={(e) => handleEnquire(e, pet)} className="bg-[#e65c55] hover:bg-[#d44b44] text-white text-sm font-bold px-4 py-2 rounded-xl transition shadow">
                      Enquire
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* BUY & ADOPT VIEWS (Grid of Breeds) */}
      {!selectedBreed && (activeTab === "buy" || activeTab === "adopt") && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{activeTab} by Breed</h2>
            <p className="text-sm text-gray-500">
              {activeTab === 'buy' ? 'Find your new best friend from verified breeders and owners.' : 'Give a loving home to a pet in need from our partner shelters.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uniqueBreeds.map(pet => (
              <Card key={pet.id} className="overflow-hidden group cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full" onClick={() => setSelectedBreed(pet.breed)}>
                <div className="relative h-48">
                  <img src={pet.image} alt={pet.breed} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex flex-col flex-1 text-center">
                  <h3 className="font-bold text-gray-900 dark:text-white">{pet.breed}</h3>
                  <p className="text-xs text-gray-500 mt-1">{filteredListings.filter(l => l.breed === pet.breed).length} available</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SELL VIEW */}
      {!selectedBreed && activeTab === "sell" && (
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">List Your Pet</h2>
            <p className="text-sm text-gray-500 mt-2">Find a safe and loving new home for your pet.</p>
          </div>

          <Card className="p-6 md:p-8">
            {sellStep === 0 && (
              <form className="space-y-6" onSubmit={() => setSellStep(1)}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Species</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white">
                      <option>Dog</option><option>Cat</option><option>Bird</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Breed</label>
                    <input type="text" placeholder="e.g. Beagle" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Age</label>
                    <input type="text" placeholder="e.g. 2 Months" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                    <input type="number" placeholder="0 for Adoption" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Medical History & Reason for Sale</label>
                  <textarea rows="3" placeholder="Vaccinations, health issues, reason..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" required />
                </div>
                <Button type="button" onClick={() => setSellStep(1)} className="w-full py-3">Next: Upload Media</Button>
              </form>
            )}

            {sellStep === 1 && (
              <form className="space-y-6" onSubmit={handleSellSubmit}>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition cursor-pointer">
                  <UploadCloud size={40} className="text-gray-400 mb-4" />
                  <p className="font-bold text-gray-900 dark:text-white mb-1">Upload Pet Photos</p>
                  <p className="text-xs text-gray-500">PNG, JPG or MP4 (Max 5MB)</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center">
                  <FileText className="text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Health Certificate (Optional)</p>
                    <p className="text-xs text-gray-500">Boosts trust and verification.</p>
                  </div>
                  <button type="button" className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">Upload</button>
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setSellStep(0)} className="w-1/3">Back</Button>
                  <Button type="submit" className="flex-1 py-3">Publish Listing</Button>
                </div>
              </form>
            )}

            {sellStep === 2 && (
              <div className="text-center py-8">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Listing Published!</h2>
                <p className="text-gray-500 mb-8">Your pet listing is now live. Interested buyers will contact you shortly.</p>
                <Button onClick={() => { setSellStep(0); setActiveTab('buy'); }} variant="outline">View Marketplace</Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ENQUIRY SUCCESS MODAL (Prototype UI) */}
      <AnimatePresence>
        {showEnquiryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEnquiryModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl p-6 md:p-8 text-center flex flex-col items-center">
              
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <CheckCircle size={32} className="text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Enquiry Sent!</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                The vendor will contact you within 24 hours. Please have your details ready for verification.
              </p>

              <div className="bg-[#fcf8f6] dark:bg-red-900/10 rounded-2xl p-4 flex items-start gap-3 w-full mb-8 text-left">
                <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 dark:text-gray-400">Always meet the vendor in person before making a payment.</p>
              </div>

              <button onClick={() => setShowEnquiryModal(false)} className="w-full bg-[#e65c55] hover:bg-[#d44b44] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#e65c55]/20 transition-transform active:scale-95 text-lg">
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
