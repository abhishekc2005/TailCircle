import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { VendorAuthProvider, useVendorAuth } from '../context/VendorAuthContext';

// Layouts
import VendorLayout from '../layouts/VendorLayout';
import VendorAuthLayout from '../layouts/VendorAuthLayout';

// Auth Pages
import VendorLogin from '../auth/VendorLogin';
import VendorRegistration from '../auth/VendorRegistration';
import VendorPending from '../auth/VendorPending';

// Role Modules
import ShopDashboard from '../role-modules/shop/ShopDashboard';
import EventDashboard from '../role-modules/events/EventDashboard';
import DoctorDashboard from '../role-modules/doctor/DoctorDashboard';
import MealDashboard from '../role-modules/meals/MealDashboard';
import MemorialDashboard from '../role-modules/memorial/MemorialDashboard';

// Shared Pages
import Analytics from '../shared/Analytics';

const VendorProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, vendorUser } = useVendorAuth();
  
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/vendor/login" replace />;
  }

  if (vendorUser?.status === 'pending') {
    return <Navigate to="/vendor/pending" replace />;
  }

  if (vendorUser?.status === 'suspended' || vendorUser?.status === 'rejected') {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center p-6">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Account {vendorUser.status}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your vendor account has been {vendorUser.status}. Please contact support for more information.
          </p>
          <a href="mailto:support@tailcircle.com" className="w-full block bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    );
  }
  
  return children;
};

const RoleBasedDashboard = () => {
  const { vendorRole } = useVendorAuth();

  switch (vendorRole) {
    case 'shop':
      return <ShopDashboard />;
    case 'events':
      return <EventDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'meals':
      return <MealDashboard />;
    case 'memorial':
      return <MemorialDashboard />;
    default:
      return <Navigate to="/vendor/login" replace />;
  }
};

const VendorRoutesContent = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<VendorAuthLayout />}>
        <Route path="login" element={<VendorLogin />} />
        <Route path="register" element={<VendorRegistration />} />
      </Route>
      
      {/* Status Routes */}
      <Route path="pending" element={<VendorPending />} />

      {/* Protected Routes */}
      <Route path="/" element={<VendorProtectedRoute><VendorLayout /></VendorProtectedRoute>}>
        <Route index element={<RoleBasedDashboard />} />
        <Route path="analytics" element={<Analytics />} />
        
        {/* We will add specific role routes here later */}
        {/* Shop Routes */}
        {/* Events Routes */}
        {/* Doctor Routes */}
        {/* Meals Routes */}
        {/* Memorial Routes */}
        
        <Route path="*" element={<Navigate to="/vendor" replace />} />
      </Route>
    </Routes>
  );
};

export default function VendorRoutes() {
  return (
    <VendorAuthProvider>
      <VendorRoutesContent />
    </VendorAuthProvider>
  );
}
