import { NavLink } from "react-router-dom";
import { Home, Heart, Users, ShoppingBag, User } from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Heart, label: "Matches", path: "/matches" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: ShoppingBag, label: "Shop", path: "/shop" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 z-50 px-4 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "relative flex flex-col items-center justify-center w-16 h-14 transition-colors",
              isActive ? "text-[#32736b]" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            {({ isActive }) => (
              <>
                <div className={cn("p-1.5 rounded-full transition-all duration-300", isActive && "bg-[#32736b]/10")}>
                  <item.icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={cn("text-[10px] font-bold mt-1 transition-all", isActive ? "text-[#32736b]" : "text-gray-500")}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
