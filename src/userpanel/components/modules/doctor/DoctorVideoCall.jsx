import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, FileText, Camera, MoreVertical, Send } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export default function DoctorVideoCall({ doctor, onClose }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: 'doctor', text: "Hello! I can see Bella on camera. How long has she been vomiting?" }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages([...messages, { sender: 'user', text: chatMessage }]);
    setChatMessage("");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col md:flex-row">
      
      {/* Main Video Area */}
      <div className="flex-1 relative bg-black flex flex-col items-center justify-center overflow-hidden">
        
        {/* Remote Video (Doctor) */}
        <div className="absolute inset-0">
          <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Local Video (User/Pet) */}
        <motion.div drag dragConstraints={{ top: 20, right: 20, bottom: 20, left: 20 }} className="absolute top-6 right-6 w-28 h-40 md:w-40 md:h-56 bg-gray-800 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl z-20 cursor-move">
          {!isVideoOff ? (
            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover scale-x-[-1]" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500"><VideoOff size={32} /></div>
          )}
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white font-bold">You</div>
        </motion.div>

        {/* Top Info Bar */}
        <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-20">
          <div className="flex items-center text-white">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3" />
            <div>
              <h2 className="font-bold text-lg leading-tight">{doctor.name}</h2>
              <p className="text-xs text-white/70">12:45</p>
            </div>
          </div>
          <button className="text-white p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 z-20 flex items-center gap-4 bg-black/50 backdrop-blur-md px-6 py-4 rounded-full border border-white/10">
          <button onClick={() => setIsMuted(!isMuted)} className={cn("p-4 rounded-full transition", isMuted ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20")}>
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <button onClick={() => setIsVideoOff(!isVideoOff)} className={cn("p-4 rounded-full transition", isVideoOff ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20")}>
            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>
          
          <button onClick={() => setShowChat(!showChat)} className={cn("p-4 rounded-full transition relative md:hidden", showChat ? "bg-blue-500 text-white" : "bg-white/10 text-white hover:bg-white/20")}>
            <MessageSquare size={24} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-black" />
          </button>

          <button onClick={onClose} className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            <PhoneOff size={24} />
          </button>
        </div>
      </div>

      {/* Side Panel (Chat & Prescription - 7.5 & 7.7) */}
      <AnimatePresence>
        {(showChat || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }} 
            animate={{ width: 350, opacity: 1 }} 
            exit={{ width: 0, opacity: 0 }} 
            className="bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col absolute inset-y-0 right-0 z-30 md:relative"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 dark:text-white">Chat & Files</h3>
              <button onClick={() => setShowChat(false)} className="md:hidden text-gray-500"><PhoneOff size={16} className="rotate-90" /></button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900 text-sm">
                <p className="font-bold text-blue-800 dark:text-blue-300 mb-1 flex items-center"><FileText size={14} className="mr-1"/> Prescription Shared</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs mb-2">{doctor.name} has shared a digital prescription.</p>
                <button className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded shadow-sm">View Document</button>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={cn("max-w-[80%] p-3 rounded-2xl text-sm", msg.sender === 'user' ? "ml-auto bg-primary text-white rounded-br-none" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none")}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
              <button type="button" className="p-2 text-gray-500 hover:text-primary transition"><Camera size={20}/></button>
              <input 
                type="text" 
                value={chatMessage}
                onChange={e => setChatMessage(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 text-sm text-gray-900 dark:text-white focus:outline-none"
              />
              <button type="submit" className="p-2 text-primary hover:text-primary-dark transition"><Send size={20}/></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
