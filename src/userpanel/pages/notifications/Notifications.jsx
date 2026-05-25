import { useState } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { 
  Bell, Heart, Calendar, ShoppingBag, Activity, RefreshCw, Smartphone, Mail, MessageSquare, ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

// MOCK NOTIFICATIONS (12.1)
const INBOX = [
  { id: 1, type: 'health', icon: Activity, color: 'text-red-500 bg-red-50 dark:bg-red-900/20', title: 'Health Alert', desc: 'Bella\'s Rabies Booster is overdue. Please schedule immediately.', time: '10m ago', unread: true },
  { id: 2, type: 'order', icon: ShoppingBag, color: 'text-green-500 bg-green-50 dark:bg-green-900/20', title: 'Service Alert', desc: 'Your Premium Dog Food has shipped.', time: '1h ago', unread: true },
  { id: 3, type: 'sub', icon: RefreshCw, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20', title: 'Subscription Alert', desc: 'Your Meal Plan renews tomorrow.', time: '3h ago', unread: false },
  { id: 4, type: 'event', icon: Calendar, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20', title: 'Event Alert', desc: 'Annual Golden Retriever Meetup is this weekend!', time: '1d ago', unread: false },
  { id: 5, type: 'match', icon: Heart, color: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20', title: 'New Match!', desc: 'You and Max liked each other.', time: '2d ago', unread: false }
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("inbox"); // "inbox", "preferences"

  // Preferences State (12.2, 12.3)
  const [channels, setChannels] = useState({
    push: true,
    email: false,
    sms: false
  });

  const [categories, setCategories] = useState({
    health: true,
    orders: true,
    subs: true,
    events: false,
    matches: true
  });

  const toggleChannel = (key) => setChannels(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleCategory = (key) => setCategories(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Notifications" />
      
      {/* Top Navigation Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[60px] md:top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 flex">
          <button 
            onClick={() => setActiveTab("inbox")}
            className={cn("flex-1 px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "inbox" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            Inbox
          </button>
          <button 
            onClick={() => setActiveTab("preferences")}
            className={cn("flex-1 px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "preferences" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            Preferences
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 lg:p-6">
        
        {/* TAB 1: INBOX (12.1) */}
        {activeTab === "inbox" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Recent Alerts</h3>
              <button className="text-sm font-bold text-primary">Mark all read</button>
            </div>
            
            {INBOX.map(notif => (
              <Card key={notif.id} className={cn("p-4 flex gap-4 transition-colors cursor-pointer", notif.unread ? "bg-white dark:bg-gray-900 shadow-sm border-primary/20" : "bg-gray-50 dark:bg-gray-900/50 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800/80")}>
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", notif.color)}>
                  <notif.icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={cn("font-bold text-sm truncate", notif.unread ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400")}>
                      {notif.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2 font-medium">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{notif.desc}</p>
                </div>
                {notif.unread && (
                  <div className="w-3 h-3 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_rgba(var(--color-primary),0.5)]"></div>
                )}
              </Card>
            ))}
          </motion.div>
        )}

        {/* TAB 2: PREFERENCES (12.2, 12.3) */}
        {activeTab === "preferences" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            
            {/* Delivery Channels */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bell className="text-primary" size={20} />
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Delivery Channels</h3>
              </div>
              <Card className="p-0 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                <div className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl flex items-center justify-center"><Smartphone size={20} /></div>
                    <div><h4 className="font-bold text-gray-900 dark:text-white text-sm">Push Notifications</h4><p className="text-xs text-gray-500">Instant alerts on your device.</p></div>
                  </div>
                  <Toggle active={channels.push} onClick={() => toggleChannel('push')} />
                </div>
                <div className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-xl flex items-center justify-center"><MessageSquare size={20} /></div>
                    <div><h4 className="font-bold text-gray-900 dark:text-white text-sm">SMS Alerts</h4><p className="text-xs text-gray-500">Text messages for critical updates.</p></div>
                  </div>
                  <Toggle active={channels.sms} onClick={() => toggleChannel('sms')} />
                </div>
                <div className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-xl flex items-center justify-center"><Mail size={20} /></div>
                    <div><h4 className="font-bold text-gray-900 dark:text-white text-sm">Email Updates</h4><p className="text-xs text-gray-500">Daily summaries and receipts.</p></div>
                  </div>
                  <Toggle active={channels.email} onClick={() => toggleChannel('email')} />
                </div>
              </Card>
            </div>

            {/* Notification Categories */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="text-primary" size={20} />
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Alert Categories</h3>
              </div>
              <Card className="p-0 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                <CategoryToggle title="Health & Medical Alerts" desc="Vaccinations, doctor appointments." active={categories.health} onClick={() => toggleCategory('health')} />
                <CategoryToggle title="Service & Order Updates" desc="Shop orders, tracking, bookings." active={categories.orders} onClick={() => toggleCategory('orders')} />
                <CategoryToggle title="Subscription Alerts" desc="Renewals and payment issues." active={categories.subs} onClick={() => toggleCategory('subs')} />
                <CategoryToggle title="Matches & Social" desc="New pet matches and community likes." active={categories.matches} onClick={() => toggleCategory('matches')} />
                <CategoryToggle title="Events & Meetups" desc="Local events and invitations." active={categories.events} onClick={() => toggleCategory('events')} />
              </Card>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}

// Helper Components
function Toggle({ active, onClick }) {
  return (
    <button onClick={onClick} className={cn("w-12 h-6 rounded-full p-1 transition-colors relative", active ? "bg-primary" : "bg-gray-300 dark:bg-gray-700")}>
      <motion.div layout className={cn("w-4 h-4 rounded-full bg-white shadow-sm", active ? "ml-auto" : "mr-auto")} />
    </button>
  );
}

function CategoryToggle({ title, desc, active, onClick }) {
  return (
    <div className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition cursor-pointer" onClick={onClick}>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <Toggle active={active} onClick={onClick} />
    </div>
  );
}
