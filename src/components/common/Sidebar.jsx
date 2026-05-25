import { NavLink } from "react-router-dom";
import { Home, Heart, Users, ShoppingBag, Stethoscope, Calendar, Settings, Utensils, Flower2, Wallet } from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Heart, label: "Matches", path: "/matches" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: ShoppingBag, label: "Shop", path: "/shop" },
  { icon: Stethoscope, label: "Doctor", path: "/doctor" },
  { icon: Utensils, label: "Meals", path: "/meals" },
  { icon: Wallet, label: "Wallet", path: "/wallet" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Flower2, label: "Memorial", path: "/memorial" },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-50">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
          T
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
          Tail Circle
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto hide-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group relative",
              isActive 
                ? "bg-primary/10 text-primary font-semibold dark:bg-primary/20" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-6 h-6", isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300")} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <NavLink to="/profile" className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-10 h-10 rounded-full border-2 border-primary/20" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate dark:text-white">John Doe</p>
            <p className="text-xs text-gray-500 truncate dark:text-gray-400">View Profile</p>
          </div>
          <Settings className="w-5 h-5 text-gray-400" />
        </NavLink>
      </div>
    </aside>
  );
}
