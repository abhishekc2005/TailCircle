import { useState } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Search, ChevronDown, MessageCircle, AlertCircle, LifeBuoy, FileText, CheckCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

const FAQS = [
  { id: 1, q: "How do I cancel my meal subscription?", a: "You can pause or cancel your meal subscription directly from your Profile > Subs & Orders. Note that cancellations take 24 hours to process." },
  { id: 2, q: "Are emergency doctor consults available 24/7?", a: "Yes, our SOS Emergency feature instantly connects you to the nearest available on-call veterinarian. Additional premium charges apply." },
  { id: 3, q: "How do I get a refund for a cancelled event?", a: "If an event is cancelled by the organizer, the refund is automatically processed to your Wallet within 3-5 business days." },
  { id: 4, q: "How does the Match algorithm work?", a: "Our engine uses a combination of proximity, species compatibility, breed preferences, and behavioral intent (playdate vs breeding) to show you the best matches." }
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [ticketStep, setTicketStep] = useState(0); // 0: Start, 1: Form, 2: Success
  const [ticketIssue, setTicketIssue] = useState("");

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    setTicketStep(2);
    setTimeout(() => {
      setTicketStep(0);
      setTicketIssue("");
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Help & Support" />
      
      <div className="flex-1 w-full max-w-4xl mx-auto p-4 lg:p-6 space-y-8">
        
        {/* Help Search Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-center text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
          <LifeBuoy size={48} className="mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-black mb-2">How can we help you?</h2>
          <p className="text-white/80 max-w-md mx-auto mb-6">Search our knowledge base or submit a support ticket.</p>
          
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search FAQs..." className="w-full bg-white dark:bg-gray-900 border-none rounded-full pl-12 pr-4 py-4 text-gray-900 dark:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* FAQ Section (13.6) */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center"><FileText className="mr-2 text-primary" size={20}/> Frequently Asked Questions</h3>
            <div className="space-y-3">
              {FAQS.map(faq => (
                <Card key={faq.id} className="overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} className="w-full p-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">{faq.q}</span>
                    <ChevronDown size={16} className={cn("text-gray-400 transition-transform", openFaq === faq.id ? "rotate-180" : "")} />
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 mt-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </div>

          {/* Ticket Generation (13.5) */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center"><AlertCircle className="mr-2 text-primary" size={20}/> Generate Support Ticket</h3>
            
            <Card className="p-6 relative overflow-hidden h-full min-h-[300px]">
              <AnimatePresence mode="wait">
                
                {ticketStep === 0 && (
                  <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full items-center justify-center text-center">
                    <MessageCircle size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
                    <p className="text-gray-500 text-sm mb-6">Can't find what you're looking for? Open a ticket and our support team will get back to you within 24 hours.</p>
                    <Button onClick={() => setTicketStep(1)}>Open a Ticket</Button>
                  </motion.div>
                )}

                {ticketStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Issue Category</label>
                        <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white">
                          <option>Technical Issue</option>
                          <option>Payment & Wallet</option>
                          <option>Booking Problem</option>
                          <option>Service Feedback</option>
                          <option>Report User/Vendor</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Describe the Issue</label>
                        <textarea 
                          value={ticketIssue}
                          onChange={e => setTicketIssue(e.target.value)}
                          placeholder="Please provide details about your problem..." 
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white min-h-[120px] resize-none"
                          required
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => setTicketStep(0)} className="w-1/3">Cancel</Button>
                        <Button type="submit" className="flex-1">Submit Ticket</Button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {ticketStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full items-center justify-center text-center">
                    <CheckCircle size={64} className="text-green-500 mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ticket Submitted</h4>
                    <p className="text-gray-500 text-sm">Your ticket #TC-8893 has been created. You will receive an email shortly.</p>
                  </motion.div>
                )}

              </AnimatePresence>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
