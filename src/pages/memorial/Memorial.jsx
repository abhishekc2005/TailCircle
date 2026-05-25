import { useState } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Truck, Heart, Image as ImageIcon, Feather, CheckCircle, Clock, User, Send, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

const SERVICES = [
  { id: 's1', title: 'Home Pickup', icon: Truck, desc: 'We come to you with care and dignity. Our team handles everything with the utmost respect for your family.', price: 150 },
  { id: 's2', title: 'Cremation Services', icon: Heart, desc: 'Peaceful, dignified cremation with your choice of private or communal service. Ashes returned in a keepsake urn.', price: 250 },
  { id: 's3', title: 'Memorial Keepsakes', icon: ImageIcon, desc: 'Paw prints, portraits, and personalised urns to help you hold onto the memories that matter most.', price: 75 },
  { id: 's4', title: 'Grief Support', icon: Feather, desc: 'A gentle conversation with a pet loss counselor.', price: 50 },
];

export default function Memorial() {
  const [activeTab, setActiveTab] = useState("book"); // "book", "track"
  
  // Booking Flow State
  const [bookingStep, setBookingStep] = useState(0); // 0: Services, 1: Form, 2: Success
  const [selectedService, setSelectedService] = useState(null);
  
  // Tracking Flow State
  const [requestStatus, setRequestStatus] = useState(2); // 0: Pending, 1: Accepted, 2: Assigned, 3: Completed
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Chat State
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: 'support', text: "Hello, I am David, your assigned counselor. I am on my way to your location. I am deeply sorry for your loss." }
  ]);

  const handleBookingComplete = (e) => {
    e.preventDefault();
    setBookingStep(2);
    setTimeout(() => {
      setActiveTab("track");
      setBookingStep(0);
      setSelectedService(null);
      setRequestStatus(0);
    }, 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages([...messages, { sender: 'user', text: chatMessage }]);
    setChatMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9fc] dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="The Last Drive" />
      
      {/* Top Navigation Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[60px] md:top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 flex">
          <button 
            onClick={() => setActiveTab("book")}
            className={cn("flex-1 md:flex-none px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "book" ? "border-emerald-600 dark:border-emerald-500 text-emerald-800 dark:text-emerald-400" : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300")}
          >
            Arrange Service
          </button>
          <button 
            onClick={() => setActiveTab("track")}
            className={cn("flex-1 md:flex-none px-6 py-4 text-sm font-bold border-b-2 transition-colors", activeTab === "track" ? "border-emerald-600 dark:border-emerald-500 text-emerald-800 dark:text-emerald-400" : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300")}
          >
            Active Request
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 lg:p-6">
        
        {/* TAB 1: ARRANGE SERVICE */}
        {activeTab === "book" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            
            {/* Hero Banner (Mint Green) */}
            <div className="bg-[#dcf4eb] dark:bg-emerald-900/30 rounded-3xl p-6 md:p-8">
              <div className="flex items-start gap-3 mb-3">
                <Feather className="text-[#32736b] dark:text-emerald-400 shrink-0 mt-1" size={24} />
                <h2 className="text-xl md:text-2xl font-black text-[#1e293b] dark:text-white">Saying goodbye is never easy.</h2>
              </div>
              <p className="text-[#475569] dark:text-emerald-100/70 text-sm leading-relaxed max-w-2xl pl-9">
                We offer compassionate farewell services for your beloved pet — handled with love, dignity, and care. You only need to reach out. We'll take care of the rest.
              </p>
            </div>

            {bookingStep === 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-2xl text-[#1e293b] dark:text-white mb-2">Our Services</h3>
                <div className="space-y-3">
                  {SERVICES.map(service => (
                    <Card key={service.id} className={cn("p-4 flex gap-4 cursor-pointer transition-all border-2", selectedService?.id === service.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-transparent hover:border-emerald-200 dark:hover:border-emerald-800")} onClick={() => setSelectedService(service)}>
                      <div className="w-14 h-14 rounded-2xl bg-[#dcf4eb] dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                        <service.icon size={24} className="text-[#32736b] dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-[#1e293b] dark:text-white mb-1">{service.title}</h4>
                        <p className="text-sm text-[#64748b] dark:text-gray-400 leading-relaxed">{service.desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>
                {selectedService && <Button onClick={() => setBookingStep(1)} className="w-full py-4 mt-6 bg-[#32736b] hover:bg-[#235850] text-white rounded-2xl text-lg font-bold">Request {selectedService.title}</Button>}
              </div>
            )}

            {bookingStep === 1 && (
              <form onSubmit={handleBookingComplete} className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Request Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Pet Name & Details</label>
                      <input type="text" placeholder="e.g. Bella (Dog, Golden Retriever)" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 text-gray-900 dark:text-white" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Your Location</label>
                      <input type="text" placeholder="Current address..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 text-gray-900 dark:text-white" required />
                    </div>
                  </div>
                </Card>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setBookingStep(0)} className="w-1/3 border-gray-300 text-gray-600">Back</Button>
                  <Button type="submit" className="flex-1 bg-[#32736b] hover:bg-[#235850] text-white">Submit Request</Button>
                </div>
              </form>
            )}

            {bookingStep === 2 && (
              <div className="text-center py-12">
                <CheckCircle size={64} className="text-[#32736b] mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Submitted</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">We are assigning the nearest support team to your location. You will be redirected to the tracking page.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: ACTIVE REQUEST */}
        {activeTab === "track" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row gap-6">
            
            {/* Tracking Progress */}
            <div className="flex-1 space-y-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white">Request Status</h3>
                  <span className="text-xs bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded text-emerald-700 dark:text-emerald-400 font-bold">REQ-#88392</span>
                </div>
                
                <div className="relative pl-6 space-y-8 border-l-2 border-emerald-100 dark:border-emerald-900/50 ml-3">
                  <div className="relative">
                    <div className={cn("absolute -left-[33px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center", requestStatus >= 0 ? "bg-[#32736b]" : "bg-gray-300")}></div>
                    <h4 className={cn("font-bold text-sm", requestStatus >= 0 ? "text-gray-900 dark:text-white" : "text-gray-400")}>Request Pending</h4>
                    <p className="text-xs text-gray-500 mt-1">We have received your service request.</p>
                  </div>

                  <div className="relative">
                    <div className={cn("absolute -left-[33px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center", requestStatus >= 1 ? "bg-[#32736b]" : "bg-gray-300")}></div>
                    <h4 className={cn("font-bold text-sm", requestStatus >= 1 ? "text-gray-900 dark:text-white" : "text-gray-400")}>Accepted & Assigned</h4>
                    <p className="text-xs text-gray-500 mt-1">David has been assigned to your request.</p>
                  </div>

                  <div className="relative">
                    <div className={cn("absolute -left-[33px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center", requestStatus >= 2 ? "bg-[#32736b]" : "bg-gray-300")}></div>
                    <h4 className={cn("font-bold text-sm", requestStatus >= 2 ? "text-gray-900 dark:text-white" : "text-gray-400")}>Support Team En Route</h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center"><Clock size={12} className="mr-1"/> Arriving in 15 mins</p>
                  </div>

                  <div className="relative">
                    <div className={cn("absolute -left-[33px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center", requestStatus >= 3 ? "bg-[#32736b]" : "bg-gray-300")}></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={cn("font-bold text-sm", requestStatus >= 3 ? "text-gray-900 dark:text-white" : "text-gray-400")}>Service Completed</h4>
                        <p className="text-xs text-gray-500 mt-1">The memorial service has been concluded.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex gap-2 justify-center opacity-30 hover:opacity-100 transition">
                  <button onClick={() => setRequestStatus(0)} className="text-[10px] px-2 py-1 bg-gray-200 rounded">Sim: Pending</button>
                  <button onClick={() => setRequestStatus(2)} className="text-[10px] px-2 py-1 bg-gray-200 rounded">Sim: Assigned</button>
                  <button onClick={() => setRequestStatus(3)} className="text-[10px] px-2 py-1 bg-gray-200 rounded">Sim: Completed</button>
                </div>
              </Card>
            </div>

            {/* Support Chat */}
            <Card className="flex-1 flex flex-col h-[500px] overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3"><User size={20} className="text-[#32736b]"/></div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">David (Support Counselor)</h3>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"/> Online
                  </p>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={cn("max-w-[85%] p-3 rounded-2xl text-sm", msg.sender === 'user' ? "ml-auto bg-[#32736b] text-white rounded-br-none" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none shadow-sm")}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 dark:border-gray-800 flex gap-2">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none"
                />
                <button type="submit" className="p-2 text-[#32736b] hover:bg-emerald-50 rounded-xl transition"><Send size={18}/></button>
              </form>
            </Card>

          </motion.div>
        )}

      </div>
    </div>
  );
}
