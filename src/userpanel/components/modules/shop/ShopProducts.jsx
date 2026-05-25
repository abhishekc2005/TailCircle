import { useState } from "react";
import { Card } from "../../common/Card";
import { ShoppingCart, Search, Plus, Minus, Star, CreditCard, Banknote, Truck, CheckCircle, X, ArrowRight } from "lucide-react";
import { cn } from "../../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";

const CATEGORIES = ["All", "Food", "Treats", "Toys", "Grooming", "Walk Gear"];

const MOCK_PRODUCTS = [
  { id: 1, name: "Premium Dog Food - Salmon", category: "Food", price: 45.99, originalPrice: 55.00, discount: "15%", rating: 4.8, reviews: 124, stock: 15, image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400", time: "10 MINS" },
  { id: 2, name: "Hypoallergenic Deodorizing Wipes", category: "Grooming", price: 12.50, originalPrice: 15.00, discount: "15%", rating: 4.6, reviews: 445, stock: 30, image: "https://images.unsplash.com/photo-1583947581924-860bda6a5fdf?auto=format&fit=crop&q=80&w=400", time: "10 MINS" },
  { id: 3, name: "BioFeline Malt Paste", category: "Treats", price: 14.99, originalPrice: 18.00, discount: "16%", rating: 4.9, reviews: 289, stock: 5, image: "https://images.unsplash.com/photo-1628009368231-7bb7cbcb8122?auto=format&fit=crop&q=80&w=400", time: "1 DAY" },
  { id: 4, name: "Interactive Squeaky Toy", category: "Toys", price: 8.99, originalPrice: 10.99, discount: "18%", rating: 4.7, reviews: 56, stock: 120, image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400", time: "2 HOURS" },
];

const WALK_GEAR = [
  { id: 5, name: "Cavology Navy Velvet Harness Set", brand: "CAVOLOGY", price: 27.99, originalPrice: 34.99, discount: "20%", rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Ollie XO Sage Green Harness + Leash Set", brand: "OLLIE XO", price: 22.99, originalPrice: 27.99, discount: "18%", rating: 4.9, reviews: 176, image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400" },
];

export default function ShopProducts() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderState, setOrderState] = useState(0);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const addToCart = (e, product) => {
    e.stopPropagation();
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (e, productId) => {
    e.stopPropagation();
    setCart(prev => {
      const existing = prev.find(i => i.product.id === productId);
      if (existing.quantity === 1) return prev.filter(i => i.product.id !== productId);
      return prev.map(i => i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const getQuantity = (productId) => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Shared Product Card Renderer
  const renderProductCard = (product, isWalkGear = false) => (
    <Card key={product.id} className={cn("flex flex-col h-full overflow-hidden group hover:shadow-md transition-shadow", isWalkGear ? "min-w-[240px]" : "")} onClick={() => setSelectedProduct(product)}>
      <div className="relative h-44 bg-gray-50 dark:bg-gray-800 p-3 cursor-pointer overflow-hidden flex items-center justify-center">
        {product.discount && (
          <div className="absolute top-2 left-2 bg-[#e65c55] text-white text-[10px] font-black px-2 py-1 rounded-md z-10 shadow-sm uppercase tracking-wider">
            {product.discount} OFF
          </div>
        )}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="flex-1 mb-2">
          {product.brand && <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">{product.brand}</p>}
          <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 leading-tight mb-1">
            {product.name}
          </h4>
          <p className="text-[10px] text-gray-500 flex items-center mb-1">
            <Star size={10} className="fill-yellow-500 text-yellow-500 mr-1" />
            <span>{product.rating} <span className="text-gray-400">({product.reviews})</span></span>
          </p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <p className="font-black text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</p>
            {product.originalPrice && <p className="text-xs text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</p>}
          </div>
          
          {getQuantity(product.id) === 0 ? (
            <button onClick={(e) => addToCart(e, product)} className="w-full bg-[#e65c55] hover:bg-[#d44b44] text-white font-bold text-sm py-2.5 rounded-xl transition-colors shadow-sm">
              + Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-2 border-[#e65c55] rounded-xl overflow-hidden h-10 px-2">
              <button onClick={(e) => removeFromCart(e, product.id)} className="p-1 text-[#e65c55] hover:bg-red-50 rounded transition-colors"><Minus size={16} /></button>
              <span className="text-sm font-black w-8 text-center text-gray-900 dark:text-white">{getQuantity(product.id)}</span>
              <button onClick={(e) => addToCart(e, product)} className="p-1 text-[#e65c55] hover:bg-red-50 rounded transition-colors"><Plus size={16} /></button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-4 lg:p-6 w-full max-w-5xl mx-auto space-y-8">
      
      {/* Search & Categories */}
      <div className="flex flex-col md:flex-row gap-4 sticky top-[120px] md:top-[60px] z-20 bg-gray-50/90 dark:bg-gray-950/90 py-2 backdrop-blur-md">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#32736b]/50 text-gray-900 dark:text-white shadow-sm"
          />
        </div>
      </div>
      
      {/* Category Filter Pills (Prototype Style) */}
      <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar pb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm",
              activeCategory === cat 
                ? "bg-[#32736b] text-white" 
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Monthly Essentials Banner (Prototype Style) */}
      <div className="w-full bg-[#4f5b66] dark:bg-gray-800 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg mb-2">
        <div className="relative z-10">
          <span className="bg-[#32736b] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg mb-4 inline-block tracking-wider">📦 MONTHLY ESSENTIALS</span>
          <h1 className="text-4xl font-black mb-1 leading-tight">One Order.<br/>24-hr Delivery.</h1>
          <p className="text-white/80 text-sm mb-6 mt-3">Order your full monthly pack & save up to ₹3,000</p>
          <div className="flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg flex items-center"><CheckCircle size={12} className="mr-1.5"/> 24-hr delivery</span>
            <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg flex items-center"><CheckCircle size={12} className="mr-1.5"/> Save up to 30%</span>
            <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg flex items-center"><CheckCircle size={12} className="mr-1.5"/> Free on packs</span>
          </div>
        </div>
      </div>

      {/* Main Feed: Category Groupings */}
      {activeCategory === "All" ? (
        <div className="space-y-8">
          
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🛁</span>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Grooming Essentials</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Deep clean, coat care & paw love</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.filter(p => p.category === 'Grooming').map(product => renderProductCard(product))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🦴</span>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Treats & Rewards</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Training treats they'll do anything for</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.filter(p => p.category === 'Treats').map(product => renderProductCard(product))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🎾</span>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Toys & Play</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Built for bigger chewers & fetchers</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.filter(p => p.category === 'Toys').map(product => renderProductCard(product))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🥩</span>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Food Picks</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">High-protein, large-breed formulas</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.filter(p => p.category === 'Food').map(product => renderProductCard(product))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => renderProductCard(product))}
        </div>
      )}

      {/* Walk Gear Section */}
      <div className="pt-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🐕</span>
          <h2 className="text-xl font-black text-gray-900 dark:text-white">Walk Gear</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">Strong, stylish harnesses & leashes</p>
        
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4">
          {WALK_GEAR.map(product => renderProductCard(product, true))}
        </div>
      </div>

      {/* Browse All Products Banner */}
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition shadow-sm mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-[#32736b] rounded-lg">
            <Search size={20} />
          </div>
          <span className="font-bold text-gray-900 dark:text-white">Browse all products in the shop</span>
        </div>
        <ArrowRight size={20} className="text-gray-400" />
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-20 md:bottom-6 right-4 md:right-8 z-40">
          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="h-14 px-6 bg-[#32736b] text-white rounded-full shadow-2xl flex items-center justify-center relative hover:scale-105 transition-transform font-bold gap-3"
          >
            <ShoppingCart size={20} />
            <span>View Cart • ₹{cartTotal.toFixed(2)}</span>
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#e65c55] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
              {cart.reduce((s,i) => s + i.quantity, 0)}
            </span>
          </button>
        </motion.div>
      )}

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0 }} className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
              <div className="relative h-64 bg-gray-100 dark:bg-gray-800 rounded-t-3xl sm:rounded-t-3xl overflow-hidden shrink-0">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain p-4" />
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black rounded-full backdrop-blur transition"><X size={20}/></button>
              </div>
              <div className="p-6 overflow-y-auto hide-scrollbar flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">{selectedProduct.name}</h2>
                <div className="flex items-center text-yellow-500 mb-6">
                  <Star size={16} className="fill-current" />
                  <span className="font-bold ml-1">{selectedProduct.rating}</span>
                  <span className="text-gray-400 text-sm ml-2">({selectedProduct.reviews} reviews)</span>
                </div>
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Premium quality product suitable for your pet's daily needs. Fast delivery guaranteed.</p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4 bg-gray-50 dark:bg-gray-950 rounded-b-3xl">
                <div className="flex items-center gap-3">
                  <p className="text-3xl font-black text-gray-900 dark:text-white">₹{selectedProduct.price.toFixed(2)}</p>
                  {selectedProduct.originalPrice && <p className="text-lg text-gray-400 line-through">₹{selectedProduct.originalPrice.toFixed(2)}</p>}
                </div>
                {getQuantity(selectedProduct.id) === 0 ? (
                  <button onClick={(e) => addToCart(e, selectedProduct)} className="w-full bg-[#e65c55] hover:bg-[#d44b44] text-white font-bold text-lg py-4 rounded-2xl transition">Add to Cart</button>
                ) : (
                  <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-2 border-[#e65c55] rounded-2xl overflow-hidden h-14 px-4">
                    <button onClick={(e) => removeFromCart(e, selectedProduct.id)} className="p-2 text-[#e65c55] hover:bg-red-50 rounded-lg transition"><Minus size={24} /></button>
                    <span className="font-black text-xl w-12 text-center text-gray-900 dark:text-white">{getQuantity(selectedProduct.id)}</span>
                    <button onClick={(e) => addToCart(e, selectedProduct)} className="p-2 text-[#e65c55] hover:bg-red-50 rounded-lg transition"><Plus size={24} /></button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end sm:justify-center bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", bounce: 0 }} className="w-full max-w-md h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Cart</h2>
                <button onClick={() => setIsCheckoutOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><X size={16}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {orderState === 0 && (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                        <img src={item.product.image} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{item.product.name}</h4>
                          <p className="text-[#e65c55] font-black mt-1">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center text-gray-500 font-bold text-sm bg-white dark:bg-gray-900 rounded-lg px-2 shadow-sm border border-gray-100 dark:border-gray-800 h-8 mt-auto">
                          x{item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {orderState === 1 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <CheckCircle size={64} className="text-green-500" />
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white">Order Placed!</h2>
                      <p className="text-gray-500 mt-2">Your items are on the way.</p>
                    </div>
                    <button onClick={() => { setCart([]); setOrderState(0); setIsCheckoutOpen(false); }} className="text-[#32736b] font-bold hover:underline">Return to Shop</button>
                  </div>
                )}
              </div>

              {orderState === 0 && (
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-gray-500">Total</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => setOrderState(1)}
                    className="w-full py-4 bg-[#e65c55] text-white font-bold rounded-xl shadow-lg hover:bg-[#d44b44] transition"
                  >
                    Place Order
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
