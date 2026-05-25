import { useState } from "react";
import { Header } from "../../components/common/Header";
import { cn } from "../../utils/cn";

import ShopProducts from "../../components/modules/shop/ShopProducts";
import ShopServices from "../../components/modules/shop/ShopServices";
import ShopMarketplace from "../../components/modules/shop/ShopMarketplace";

export default function Shop() {
  const [activeTab, setActiveTab] = useState("products"); // "products", "services", "marketplace"

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 lg:pb-0 relative">
      <Header title="Shop & Marketplace" />
      
      {/* Top Navigation Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[60px] md:top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 flex justify-between md:justify-start md:gap-8 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab("products")}
            className={cn("px-4 md:px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap", activeTab === "products" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab("services")}
            className={cn("px-4 md:px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap", activeTab === "services" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            Services Booking
          </button>
          <button 
            onClick={() => setActiveTab("marketplace")}
            className={cn("px-4 md:px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap", activeTab === "marketplace" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white")}
          >
            Pet Marketplace
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto">
        {activeTab === "products" && <ShopProducts />}
        {activeTab === "services" && <ShopServices />}
        {activeTab === "marketplace" && <ShopMarketplace />}
      </div>
    </div>
  );
}
