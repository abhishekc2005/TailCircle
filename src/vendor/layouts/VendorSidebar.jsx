import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useVendorAuth } from '../context/VendorAuthContext';
import { 
  LayoutDashboard, 
  Store, 
  Calendar, 
  Stethoscope, 
  Utensils, 
  HeartHandshake, 
  PieChart, 
  Settings, 
  LogOut,
  Package,
  Users,
  MessageSquare,
  Clock
} from 'lucide-react';

export default function VendorSidebar({ isOpen, setIsOpen }) {
  const { vendorRole, logout } = useVendorAuth();
  const location = useLocation();

  const roleModules = {
    shop: [
      { name: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
      { name: 'Products', path: '/vendor/products', icon: Package },
      { name: 'Orders', path: '/vendor/orders', icon: Store },
      { name: 'Appointments', path: '/vendor/appointments', icon: Calendar },
      { name: 'Analytics', path: '/vendor/analytics', icon: PieChart },
      { name: 'Reviews', path: '/vendor/reviews', icon: MessageSquare },
    ],
    events: [
      { name: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
      { name: 'My Events', path: '/vendor/events', icon: Calendar },
      { name: 'Bookings', path: '/vendor/bookings', icon: Users },
      { name: 'Analytics', path: '/vendor/analytics', icon: PieChart },
    ],
    doctor: [
      { name: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
      { name: 'Appointments', path: '/vendor/appointments', icon: Clock },
      { name: 'Patients', path: '/vendor/patients', icon: Stethoscope },
      { name: 'Analytics', path: '/vendor/analytics', icon: PieChart },
    ],
    meals: [
      { name: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
      { name: 'Menu', path: '/vendor/menu', icon: Utensils },
      { name: 'Deliveries', path: '/vendor/deliveries', icon: Store },
      { name: 'Analytics', path: '/vendor/analytics', icon: PieChart },
    ],
    memorial: [
      { name: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
      { name: 'Requests', path: '/vendor/requests', icon: HeartHandshake },
      { name: 'Services', path: '/vendor/services', icon: Store },
      { name: 'Analytics', path: '/vendor/analytics', icon: PieChart },
    ]
  };

  const navItems = roleModules[vendorRole] || roleModules.shop;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-[calc(100vh-64px)]
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/vendor' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
          <Link
            to="/vendor/settings"
            className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          >
            <Settings className="w-5 h-5 mr-3 text-gray-400" />
            Settings
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
