import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Left side - Dynamic Content / Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-90 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000" 
          alt="Happy dogs" 
          className="absolute inset-0 object-cover w-full h-full mix-blend-overlay"
        />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold mb-6">Welcome to Tail Circle</h1>
            <p className="text-xl opacity-90 max-w-lg">The premium ecosystem for your pets. Connect, match, and find everything your furry friend needs.</p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
