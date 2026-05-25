import { useState } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Search, Send, MapPin, Paperclip, Phone, Video, MoreVertical, ChevronLeft, Image as ImageIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

// MOCK DATA
const CHATS = [
  { id: 1, name: "Dr. Sarah Jenkins", role: "Doctor", avatar: "https://i.pravatar.cc/150?img=47", lastMsg: "See you at 10 AM tomorrow.", time: "10:30 AM", unread: 0, online: true },
  { id: 2, name: "Elite Pet Studio", role: "Vendor", avatar: "https://i.pravatar.cc/150?img=12", lastMsg: "We can do the photoshoot outdoors.", time: "Yesterday", unread: 2, online: false },
  { id: 3, name: "Mike & Max", role: "Pet Parent", avatar: "https://i.pravatar.cc/150?img=33", lastMsg: "Sure, let's meet at Central Park!", time: "Monday", unread: 0, online: true },
  { id: 4, name: "TailCircle Support", role: "Support", avatar: "https://i.pravatar.cc/150?img=1", lastMsg: "Your refund has been processed.", time: "May 15", unread: 0, online: true },
];

export default function Chat() {
  const [activeChat, setActiveChat] = useState(null);
  const [msgInput, setMsgInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: "Hi! Are we still on for tomorrow?", time: "10:00 AM" },
    { id: 2, sender: 'me', text: "Yes, definitely!", time: "10:05 AM" },
    { id: 3, sender: 'them', text: "See you at 10 AM tomorrow.", time: "10:30 AM" }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: msgInput, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setMsgInput("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Messages" />
      
      <div className="flex-1 w-full max-w-5xl mx-auto flex overflow-hidden h-[calc(100vh-140px)]">
        
        {/* Chat List (Inbox) */}
        <div className={cn("w-full md:w-1/3 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900", activeChat ? "hidden md:flex" : "flex")}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search messages..." className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {CHATS.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                className={cn("p-4 flex gap-3 cursor-pointer transition border-b border-gray-100 dark:border-gray-800", activeChat?.id === chat.id ? "bg-primary/5 dark:bg-primary/10" : "hover:bg-gray-50 dark:hover:bg-gray-800/50")}
              >
                <div className="relative shrink-0">
                  <img src={chat.avatar} className="w-12 h-12 rounded-full object-cover" />
                  {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{chat.name}</h4>
                    <span className={cn("text-xs whitespace-nowrap ml-2", chat.unread > 0 ? "text-primary font-bold" : "text-gray-500")}>{chat.time}</span>
                  </div>
                  <p className="text-xs text-primary mb-1">{chat.role}</p>
                  <p className={cn("text-sm truncate", chat.unread > 0 ? "font-bold text-gray-900 dark:text-white" : "text-gray-500")}>{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-2">{chat.unread}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat Window (13.3) */}
        <div className={cn("flex-1 flex flex-col bg-gray-50 dark:bg-gray-950", !activeChat ? "hidden md:flex" : "flex")}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => setActiveChat(null)} className="md:hidden p-2 -ml-2 text-gray-500"><ChevronLeft size={20}/></button>
                  <div className="relative">
                    <img src={activeChat.avatar} className="w-10 h-10 rounded-full object-cover" />
                    {activeChat.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">{activeChat.name}</h3>
                    <p className="text-xs text-gray-500">{activeChat.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button className="p-2 text-gray-500 hover:text-primary transition"><Phone size={18}/></button>
                  <button className="p-2 text-gray-500 hover:text-primary transition"><Video size={18}/></button>
                  <button className="p-2 text-gray-500 hover:text-gray-900 transition"><MoreVertical size={18}/></button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center"><span className="text-xs font-bold bg-gray-200 dark:bg-gray-800 text-gray-500 px-3 py-1 rounded-full">Today</span></div>
                {messages.map(msg => (
                  <div key={msg.id} className={cn("flex flex-col max-w-[80%]", msg.sender === 'me' ? "ml-auto items-end" : "mr-auto items-start")}>
                    <div className={cn("px-4 py-2.5 rounded-2xl text-sm shadow-sm", msg.sender === 'me' ? "bg-primary text-white rounded-br-none" : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 rounded-bl-none")}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input (Supports text, image, file, location) */}
              <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <form onSubmit={handleSend} className="flex items-end gap-2">
                  <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 mb-1">
                    <button type="button" className="p-2 text-gray-500 hover:text-primary transition"><Paperclip size={18}/></button>
                    <button type="button" className="p-2 text-gray-500 hover:text-primary transition hidden sm:block"><ImageIcon size={18}/></button>
                    <button type="button" className="p-2 text-gray-500 hover:text-primary transition hidden sm:block"><MapPin size={18}/></button>
                  </div>
                  <input 
                    type="text" 
                    value={msgInput}
                    onChange={e => setMsgInput(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 mb-1"
                  />
                  <button type="submit" className={cn("p-3 rounded-full mb-1 transition flex items-center justify-center shadow-md", msgInput.trim() ? "bg-primary text-white hover:bg-primary-dark" : "bg-gray-200 dark:bg-gray-800 text-gray-400")}>
                    <Send size={18} className={msgInput.trim() ? "ml-1" : ""} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400 dark:text-gray-600">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4"><Send size={32} className="ml-1"/></div>
              <h3 className="text-xl font-bold mb-2">Your Inbox</h3>
              <p className="text-sm max-w-xs">Select a chat to start messaging users, vendors, and doctors.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
