import { useState } from "react";
import { Header } from "../../components/common/Header";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Plus, ArrowUpRight, ArrowDownLeft, Download, Gift, Clock, CreditCard, Apple, CheckCircle, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

const data = [
  { name: 'Mon', spend: 40 },
  { name: 'Tue', spend: 30 },
  { name: 'Wed', spend: 20 },
  { name: 'Thu', spend: 27 },
  { name: 'Fri', spend: 18 },
  { name: 'Sat', spend: 23 },
  { name: 'Sun', spend: 34 },
];

const TRANSACTIONS = [
  { id: 1, type: 'debit', title: 'Premium Dog Food', amount: 45.99, date: 'Today, 2:30 PM', category: 'Shopping' },
  { id: 2, type: 'credit', title: 'Refund - Cancelled Order', amount: 12.50, date: 'Yesterday, 11:15 AM', category: 'Refund' },
  { id: 3, type: 'credit', title: 'Welcome Promo Bonus', amount: 20.00, date: 'May 21, 09:00 AM', category: 'Promo' },
  { id: 4, type: 'debit', title: 'Dr. Sarah Jenkins Consult', amount: 40.00, date: 'May 20, 10:00 AM', category: 'Doctor' },
];

export default function Wallet() {
  const [filter, setFilter] = useState('All'); // 'All', 'Credits', 'Debits'
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(50);
  const [topUpStep, setTopUpStep] = useState(0); // 0: Select Amount & Method, 1: Success

  const filteredTransactions = TRANSACTIONS.filter(tx => {
    if (filter === 'All') return true;
    if (filter === 'Credits') return tx.type === 'credit';
    if (filter === 'Debits') return tx.type === 'debit';
    return true;
  });

  const handleTopUp = () => {
    setTopUpStep(1);
    setTimeout(() => {
      setShowTopUp(false);
      setTopUpStep(0);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Wallet & Payments" />
      
      <div className="p-4 lg:p-6 max-w-4xl mx-auto w-full space-y-6">
        
        {/* Wallet Dashboard (11.1) */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-primary to-accent rounded-3xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <p className="text-white/80 font-medium mb-1">Total Available Balance</p>
              <h2 className="text-4xl font-bold mb-6">₹245.50</h2>
              
              <div className="flex gap-3">
                <Button className="bg-white text-primary hover:bg-white/90" onClick={() => setShowTopUp(true)}>
                  <Plus size={18} className="mr-2" /> Top Up Wallet
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Card className="p-4 flex-1 flex flex-col justify-center border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10">
              <div className="flex items-center text-orange-600 dark:text-orange-400 mb-2">
                <Gift size={16} className="mr-2" />
                <span className="text-xs font-bold uppercase">Promo Credits</span>
              </div>
              <p className="text-2xl font-black text-orange-700 dark:text-orange-300">₹20.00</p>
            </Card>

            <Card className="p-4 flex-1 flex flex-col justify-center border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10">
              <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                <Clock size={16} className="mr-2" />
                <span className="text-xs font-bold uppercase">Pending Refunds</span>
              </div>
              <p className="text-2xl font-black text-blue-700 dark:text-blue-300">₹45.00</p>
            </Card>
          </div>
        </div>

        {/* Chart */}
        <Card className="p-4">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Weekly Spending</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="spend" stroke="#aa3bff" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Transactions (11.2, 11.3, 11.5, 11.6) */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Transaction History</h3>
            
            <div className="flex gap-2 items-center w-full sm:w-auto">
              <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex">
                {['All', 'Credits', 'Debits'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn("px-4 py-1.5 text-xs font-bold rounded-lg transition", filter === f ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white")}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <Button size="sm" variant="outline" className="shrink-0"><Download size={14} className="mr-1" /> Statement</Button>
            </div>
          </div>

          <Card className="p-0 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
            {filteredTransactions.map(tx => (
              <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", tx.type === 'credit' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400')}>
                    {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{tx.title}</p>
                    <p className="text-xs text-gray-500">{tx.date} • {tx.category}</p>
                  </div>
                </div>
                <div className={cn("font-bold", tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white')}>
                  {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </Card>
        </div>

      </div>

      {/* TOP UP MODAL (11.4) */}
      <AnimatePresence>
        {showTopUp && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTopUp(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0 }} className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col">
              
              <div className="p-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Top Up Wallet</h2>
                <button onClick={() => setShowTopUp(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><X size={16}/></button>
              </div>

              <div className="p-6">
                {topUpStep === 0 ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Amount</label>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[20, 50, 100].map(amt => (
                          <button key={amt} onClick={() => setTopUpAmount(amt)} className={cn("py-2 rounded-xl font-bold border-2 transition", topUpAmount === amt ? "border-primary bg-primary/10 text-primary" : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300")}>
                            ₹{amt}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">₹</span>
                        <input type="number" value={topUpAmount} onChange={e => setTopUpAmount(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-8 pr-4 py-3 font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Payment Method</label>
                      <div className="space-y-2">
                        <label className="flex items-center p-3 border border-primary bg-primary/5 rounded-xl cursor-pointer">
                          <CreditCard size={20} className="text-primary mr-3" />
                          <span className="font-bold text-sm text-gray-900 dark:text-white flex-1">•••• 4242</span>
                          <CheckCircle size={16} className="text-primary" />
                        </label>
                        <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                          <Apple size={20} className="text-gray-900 dark:text-white mr-3" />
                          <span className="font-bold text-sm text-gray-900 dark:text-white flex-1">Apple Pay</span>
                        </label>
                      </div>
                    </div>

                    <Button onClick={handleTopUp} className="w-full py-4 text-base">Pay ₹{topUpAmount}</Button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Top Up Successful</h2>
                    <p className="text-gray-500">₹{topUpAmount} has been added to your wallet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
