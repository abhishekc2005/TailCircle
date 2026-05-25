import { useState } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { 
  Settings, LogOut, Moon, Sun, ChevronRight, Package, History, Heart, User, 
  MapPin, Edit3, Plus, Camera, Bell, Shield, PackageCheck, CreditCard, PlayCircle, PauseCircle, Activity
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

// MOCK DATA
const PETS = [
  { id: 1, name: "Bella", type: "Dog", breed: "Golden Retriever", age: "2 Years", weight: "24 kg", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200" },
  { id: 2, name: "Max", type: "Dog", breed: "German Shepherd", age: "4 Years", weight: "32 kg", image: "https://images.unsplash.com/photo-1589941013453-ec89f33b6e95?auto=format&fit=crop&q=80&w=200" }
];

const SUBSCRIPTIONS = [
  { id: 'sub1', name: "Premium Meal Plan", status: "Active", renewal: "Jul 15, 2026", price: 89 },
  { id: 'sub2', name: "TailCircle Pro Medical", status: "Paused", renewal: "-", price: 29 },
];

const ORDERS = [
  { id: 'ord1', item: "Grain-Free Salmon Kibble 5kg", date: "Jun 10, 2026", status: "Shipped", price: 45 },
  { id: 'ord2', item: "Interactive Chew Toy", date: "May 28, 2026", status: "Delivered", price: 15 },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState("pets"); // "pets", "orders", "settings"
  const [showEditPet, setShowEditPet] = useState(null); // pet object or 'new'

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="My Account" />
      
      {/* Top Navigation Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[60px] md:top-0 z-30 overflow-x-auto hide-scrollbar">
        <div className="max-w-4xl mx-auto px-4 flex">
          <button onClick={() => setActiveTab("pets")} className={cn("px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap", activeTab === "pets" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}>Profile & Pets</button>
          <button onClick={() => setActiveTab("orders")} className={cn("px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap", activeTab === "orders" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}>Subs & Orders</button>
          <button onClick={() => setActiveTab("settings")} className={cn("px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap", activeTab === "settings" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}>History & Settings</button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 lg:p-6">
        
        {/* TAB 1: PROFILE & PETS (10.2, 10.3) */}
        {activeTab === "pets" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            
            {/* Owner Details */}
            <Card className="p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10" />
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center"><User className="mr-2 text-primary" size={20}/> Owner Details</h3>
                <button className="text-primary p-2 hover:bg-primary/10 rounded-full transition"><Edit3 size={18}/></button>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?img=32" alt={user?.name || "User"} className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md" />
                  <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg border-2 border-white dark:border-gray-800"><Camera size={14}/></button>
                </div>
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || "Sarah Jenkins"}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email || "sarah.j@example.com"} • +1 234 567 8900</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center sm:justify-start"><MapPin size={14} className="mr-1"/> 123 Pet Lane, NY 10001</p>
                </div>
              </div>
            </Card>

            {/* Pet Management */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center"><Heart className="mr-2 text-primary" size={20}/> My Pets</h3>
                <Button size="sm" variant="outline" onClick={() => setShowEditPet('new')}><Plus size={16} className="mr-1"/> Add Pet</Button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {PETS.map(pet => (
                  <Card key={pet.id} className="p-4 flex gap-4 items-center">
                    <img src={pet.image} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{pet.name}</h4>
                        <button onClick={() => setShowEditPet(pet)} className="text-gray-400 hover:text-primary transition p-1"><Edit3 size={16}/></button>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{pet.breed}</p>
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">{pet.age}</span>
                        <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">{pet.weight}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: SUBSCRIPTIONS & ORDERS (10.4, 10.5) */}
        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            
            {/* Subscriptions */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center"><Activity className="mr-2 text-primary" size={20}/> Active Subscriptions</h3>
              <div className="space-y-4">
                {SUBSCRIPTIONS.map(sub => (
                  <Card key={sub.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">{sub.name}</h4>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase", sub.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700')}>{sub.status}</span>
                      </div>
                      <p className="text-xs text-gray-500">Renews on: {sub.renewal}</p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto border-t sm:border-none border-gray-100 dark:border-gray-800 pt-4 sm:pt-0">
                      <span className="font-black text-xl text-gray-900 dark:text-white">₹{sub.price}<span className="text-xs font-normal text-gray-500">/mo</span></span>
                      <div className="flex gap-2 ml-auto">
                        <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"><PauseCircle size={18} className="text-gray-500"/></button>
                        <button className="text-xs font-bold px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">Manage</button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Orders */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center"><Package className="mr-2 text-primary" size={20}/> Recent Orders</h3>
              <Card className="p-0 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                {ORDERS.map(order => (
                  <div key={order.id} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500"><PackageCheck size={24}/></div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{order.item}</h4>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase", order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')}>{order.status}</span>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">₹{order.price}</p>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </motion.div>
        )}

        {/* TAB 3: HISTORY & SETTINGS (10.6 - 10.10) */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <History size={20} className="text-primary"/>
                  <span className="font-medium">Booking History (Events, Docs, Memorial)</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <Heart size={20} className="text-red-500"/>
                  <span className="font-medium">Saved Items & Wishlist</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <Link to="/wallet" className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <CreditCard size={20} className="text-blue-500"/>
                  <span className="font-medium">Wallet & Payments</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <Link to="/support" className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <Activity size={20} className="text-red-500"/>
                  <span className="font-medium">Help Center & Support</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
              <Link to="/chat" className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <Bell size={20} className="text-primary"/>
                  <span className="font-medium">My Messages</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </Link>
              <button onClick={toggleTheme} className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  {theme === 'dark' ? <Sun size={20} className="text-yellow-500"/> : <Moon size={20} className="text-indigo-500"/>}
                  <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <Bell size={20} className="text-orange-500"/>
                  <span className="font-medium">Notifications</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <Shield size={20} className="text-green-500"/>
                  <span className="font-medium">Privacy & Security</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <Settings size={20} className="text-gray-500"/>
                  <span className="font-medium">General Settings</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>

            <Button variant="danger" className="w-full py-4 text-base shadow-lg" onClick={logout}>
              <LogOut size={20} className="mr-2" /> Logout
            </Button>
          </motion.div>
        )}
      </div>

      {/* EDIT PET MODAL */}
      <AnimatePresence>
        {showEditPet && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEditPet(null)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0 }} className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{showEditPet === 'new' ? 'Add New Pet' : 'Edit Pet Profile'}</h2>
              </div>
              <div className="p-6 overflow-y-auto hide-scrollbar space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700">
                      {showEditPet !== 'new' && showEditPet.image ? <img src={showEditPet.image} className="w-full h-full object-cover"/> : <Camera size={32} className="text-gray-400"/>}
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg"><Camera size={14}/></button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Pet Name</label>
                  <input type="text" defaultValue={showEditPet !== 'new' ? showEditPet.name : ''} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Species</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white">
                      <option>Dog</option><option>Cat</option><option>Bird</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Breed</label>
                    <input type="text" defaultValue={showEditPet !== 'new' ? showEditPet.breed : ''} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Age</label>
                    <input type="text" defaultValue={showEditPet !== 'new' ? showEditPet.age : ''} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Weight</label>
                    <input type="text" defaultValue={showEditPet !== 'new' ? showEditPet.weight : ''} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex gap-4 rounded-b-3xl">
                <Button variant="outline" onClick={() => setShowEditPet(null)} className="w-1/3">Cancel</Button>
                <Button onClick={() => setShowEditPet(null)} className="flex-1">Save Details</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
