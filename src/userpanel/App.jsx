import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Layouts
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";

// Pages
import Login from "./pages/auth/Login";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Onboarding from "./pages/auth/Onboarding";
import Signup from "./pages/auth/Signup";
import Intro from "./pages/intro/Intro";
import Home from "./pages/home/Home";
import Matches from "./pages/matches/Matches";
import Community from "./pages/community/Community";

import Shop from "./pages/shop/Shop";
import Doctor from "./pages/doctor/Doctor";
import Profile from "./pages/profile/Profile";
import Wallet from "./pages/wallet/Wallet";
import Meals from "./pages/meals/Meals";

import Events from "./pages/events/Events";
import Memorial from "./pages/memorial/Memorial";
import Notifications from "./pages/notifications/Notifications";
import Grooming from "./pages/grooming/Grooming";
import Chat from "./pages/chat/Chat";
import HelpCenter from "./pages/support/HelpCenter";

// Vendor Routes
import VendorRoutes from "./vendor/routes/VendorRoutes";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div></div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/intro" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="signup" element={<Signup />} />
        <Route index element={<Navigate to="/intro" replace />} />
      </Route>
      
      {/* Intro Route */}
      <Route path="/intro" element={<Intro />} />

      {/* Protected Main Routes */}
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="matches" element={<Matches />} />
        <Route path="community" element={<Community />} />
        <Route path="shop" element={<Shop />} />
        <Route path="doctor" element={<Doctor />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="meals" element={<Meals />} />
        <Route path="events" element={<Events />} />
        <Route path="grooming" element={<Grooming />} />
        <Route path="memorial" element={<Memorial />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chat" element={<Chat />} />
        <Route path="support" element={<HelpCenter />} />
        {/* We will add other routes here iteratively */}
      </Route>
      
      {/* Vendor Routes */}
      <Route path="/vendor/*" element={<VendorRoutes />} />
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster 
            position="top-center"
            toastOptions={{
              className: "dark:bg-gray-800 dark:text-white",
            }}
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
