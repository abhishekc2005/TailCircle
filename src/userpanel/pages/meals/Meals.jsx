import { useState } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Check, Star, Info, Pause, Play, XCircle, MapPin, Clock, Calendar, ChefHat, Truck, Home, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

const PLANS = [
  {
    id: 'starter',
    name: 'Starter Plan',
    desc: 'Perfect for first-time subscribers who want flexible scheduling.',
    price: 49.99,
    meals: 10,
    features: ['10 fresh meals', 'Flexible scheduling', 'Skip deliveries when needed'],
    recommended: false,
  },
  {
    id: 'popular',
    name: 'Popular Plan',
    desc: 'Our most popular plan with priority delivery slots.',
    price: 89.99,
    meals: 20,
    features: ['20 fresh meals', 'Discounted pricing', 'Priority delivery slots', 'Free health report'],
    recommended: true,
  },
  {
    id: 'best_value',
    name: 'Best Value Plan',
    desc: 'Highest savings with premium veterinary benefits.',
    price: 129.99,
    meals: 30,
    features: ['30 fresh meals', 'Highest savings per meal', 'Dedicated pet nutritionist', 'Free vet check-up support'],
    recommended: false,
  },
  {
    id: 'custom',
    name: 'Custom Plan',
    desc: 'Tailored specifically for multiple pets or unique dietary needs.',
    price: 'Custom',
    meals: 'Any',
    features: ['Custom meal quantity', 'Custom pricing', 'Admin-configurable duration', 'Special dietary handling'],
    recommended: false,
  }
];

export default function Meals() {
  const [activeTab, setActiveTab] = useState("explore"); // "explore" or "dashboard"
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Dashboard states
  const [subscriptionStatus, setSubscriptionStatus] = useState("Active"); // Active, Paused
  const [deliveryStatus, setDeliveryStatus] = useState(1); // 0: Preparing, 1: Out for Delivery, 2: Delivered
  const [showRating, setShowRating] = useState(false);

  const handleClaimTrial = () => setIsTrialModalOpen(true);
  
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsConfigModalOpen(true);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsConfigModalOpen(false);
    setActiveTab("dashboard");
    alert("Successfully subscribed to " + selectedPlan.name);
  };

  const submitTrial = (e) => {
    e.preventDefault();
    setIsTrialModalOpen(false);
    alert("Free Trial Booked successfully for this Saturday!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Meal Subscriptions" />
      
      {/* Top Navigation Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-14 md:top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 flex">
          <button 
            onClick={() => setActiveTab("explore")}
            className={cn("px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "explore" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            Explore Plans
          </button>
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={cn("px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "dashboard" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            My Dashboard
          </button>
        </div>
      </div>

      <div className="p-4 lg:p-6 max-w-5xl mx-auto w-full">
        
        {activeTab === "explore" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* Free Trial Banner */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
              <div className="relative z-10 md:w-2/3 mb-4 md:mb-0">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm mb-3 inline-block">Saturdays Only</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">Claim Your Free Trial Meal</h2>
                <p className="text-white/90 text-sm mb-4">Experience the freshness, quality, and hygiene of our meals before subscribing. One-time complimentary service for first-time users.</p>
                <button 
                  onClick={handleClaimTrial}
                  className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-bold shadow-sm hover:scale-105 transition-transform"
                >
                  Book Free Trial
                </button>
              </div>
              <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" alt="Fresh Dog Food" className="absolute -right-10 md:right-0 top-0 h-full w-1/2 object-cover mix-blend-overlay opacity-50 rounded-l-full" />
            </div>

            <div className="text-center mt-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Plans</h2>
              <p className="text-gray-500 mt-2">Tailored nutrition delivered to your door.</p>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLANS.map(plan => (
                <Card key={plan.id} className={cn("relative overflow-hidden flex flex-col h-full", plan.recommended ? 'border-2 border-primary shadow-xl scale-100 lg:scale-105 z-10' : '')}>
                  {plan.recommended && (
                    <div className="bg-primary text-white text-center py-1.5 text-[10px] font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-gray-500 mb-4 h-12">{plan.desc}</p>
                    
                    <div className="mb-4 flex items-baseline">
                      <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{plan.price !== 'Custom' ? `₹${plan.price}` : 'Custom'}</span>
                      {plan.price !== 'Custom' && <span className="text-gray-500 text-xs ml-1">/ mo</span>}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-6">
                      <div className="text-xs font-bold text-primary mb-1">{plan.meals} Meals</div>
                    </div>

                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="text-green-500 mr-2 shrink-0 mt-0.5" size={14} />
                          <span className="text-gray-600 dark:text-gray-300 text-xs leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button onClick={() => handleSelectPlan(plan)} className="w-full mt-auto text-sm py-2" variant={plan.recommended ? 'primary' : 'outline'}>
                      Select Plan
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Subscription Controls */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    Popular Plan <span className={cn("ml-3 px-2 py-0.5 text-xs rounded-full font-bold", subscriptionStatus === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{subscriptionStatus}</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">20 meals/month • Dry Food • Next billing: Jun 1, 2026</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSubscriptionStatus(subscriptionStatus === "Active" ? "Paused" : "Active")}
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-lg hover:bg-gray-200 transition"
                  >
                    {subscriptionStatus === "Active" ? <><Pause size={16} className="mr-2"/> Pause</> : <><Play size={16} className="mr-2"/> Resume</>}
                  </button>
                  <button className="flex items-center px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-lg hover:bg-red-100 transition">
                    <XCircle size={16} className="mr-2"/> Cancel
                  </button>
                </div>
              </div>
            </Card>

            {/* Live Delivery Tracking */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Today's Delivery</h3>
              
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-200 dark:bg-gray-800" />
                
                <div className="space-y-8 relative">
                  {/* Step 1: Preparing */}
                  <div className="flex items-center">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center z-10 border-4 border-white dark:border-gray-900", deliveryStatus >= 0 ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-400")}>
                      <ChefHat size={20} />
                    </div>
                    <div className="ml-4">
                      <h4 className={cn("font-bold", deliveryStatus >= 0 ? "text-gray-900 dark:text-white" : "text-gray-400")}>Preparing Meal</h4>
                      <p className="text-xs text-gray-500">Chef is preparing your fresh meal.</p>
                    </div>
                  </div>

                  {/* Step 2: Out for Delivery */}
                  <div className="flex items-center">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center z-10 border-4 border-white dark:border-gray-900", deliveryStatus >= 1 ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-400")}>
                      <Truck size={20} />
                    </div>
                    <div className="ml-4">
                      <h4 className={cn("font-bold", deliveryStatus >= 1 ? "text-gray-900 dark:text-white" : "text-gray-400")}>Out for Delivery</h4>
                      <p className="text-xs text-gray-500">John is on the way. Arriving in 15 mins.</p>
                    </div>
                  </div>

                  {/* Step 3: Delivered */}
                  <div className="flex items-center">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center z-10 border-4 border-white dark:border-gray-900", deliveryStatus >= 2 ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-400")}>
                      <Home size={20} />
                    </div>
                    <div className="ml-4 flex-1 flex justify-between items-center">
                      <div>
                        <h4 className={cn("font-bold", deliveryStatus >= 2 ? "text-gray-900 dark:text-white" : "text-gray-400")}>Delivered</h4>
                        <p className="text-xs text-gray-500">Meal safely delivered to your doorstep.</p>
                      </div>
                      {deliveryStatus >= 2 && !showRating && (
                        <button onClick={() => setShowRating(true)} className="text-xs font-bold text-primary hover:underline">Rate Meal</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dev Simulation Controls (Hidden in production) */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex gap-2 justify-center opacity-50">
                <button onClick={() => setDeliveryStatus(0)} className="text-[10px] px-2 py-1 bg-gray-200 rounded">Sim: Prepare</button>
                <button onClick={() => setDeliveryStatus(1)} className="text-[10px] px-2 py-1 bg-gray-200 rounded">Sim: Transit</button>
                <button onClick={() => setDeliveryStatus(2)} className="text-[10px] px-2 py-1 bg-gray-200 rounded">Sim: Delivered</button>
              </div>
            </Card>

            {/* Delivery Feedback */}
            <AnimatePresence>
              {showRating && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30">
                    <div className="text-center">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">How was today's meal?</h3>
                      <div className="flex justify-center gap-2 mb-4">
                        {[1,2,3,4,5].map(star => (
                          <button key={star} onClick={() => setShowRating(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">
                            <Star size={32} className="fill-current" />
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">Your feedback helps us maintain quality.</p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}

      </div>

      {/* --- MODALS --- */}

      {/* Free Trial Modal (5.9) */}
      <AnimatePresence>
        {isTrialModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTrialModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden p-6">
              <button onClick={() => setIsTrialModalOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full"><X size={16}/></button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Book Free Trial</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs p-3 rounded-xl mb-6 flex items-start">
                <Info size={16} className="mr-2 shrink-0 mt-0.5" />
                <p><strong>Eligibility Verified:</strong> You are eligible for one free trial meal per registered pet. Deliveries are only on Saturdays.</p>
              </div>

              <form onSubmit={submitTrial} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Saturday</label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <select className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium text-gray-900 dark:text-white outline-none">
                      <option>Next Saturday (Jun 27)</option>
                      <option>Following Saturday (Jul 4)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Confirm Address</label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <input type="text" defaultValue="123 Pet Lane, Apt 4B" className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium text-gray-900 dark:text-white outline-none" />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4 py-3">Confirm Trial Delivery</Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Meal Preferences Configurator (5.4) */}
      <AnimatePresence>
        {isConfigModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsConfigModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Configure {selectedPlan?.name}</h2>
                <button onClick={() => setIsConfigModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 bg-gray-100 dark:bg-gray-800 rounded-full"><X size={16}/></button>
              </div>

              <form onSubmit={handleSubscribe} className="p-6 space-y-6">
                
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Food Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Dry Food', 'Wet Food', 'Cooked Meal', 'Special Diet'].map(type => (
                      <label key={type} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <input type="radio" name="food_type" className="text-primary focus:ring-primary" defaultChecked={type === 'Dry Food'} />
                        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Meals per Day</label>
                  <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    {[1, 2, 3].map(num => (
                      <label key={num} className="flex-1 text-center relative cursor-pointer">
                        <input type="radio" name="frequency" className="peer sr-only" defaultChecked={num === 2} />
                        <div className="py-2 text-sm font-bold text-gray-500 peer-checked:text-gray-900 dark:peer-checked:text-white peer-checked:bg-white dark:peer-checked:bg-gray-700 rounded-lg shadow-sm transition-all">
                          {num} {num === 1 ? 'Meal' : 'Meals'}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Dietary Restrictions & Notes</label>
                  <textarea 
                    placeholder="E.g., allergic to chicken, prefers grain-free..." 
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
                    rows="3"
                  />
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Total Monthly Cost</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">{selectedPlan?.price !== 'Custom' ? `₹${selectedPlan?.price}` : 'Contact Us'}</span>
                  </div>
                  <Button type="submit" className="w-full py-4 text-lg">Confirm Subscription</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
