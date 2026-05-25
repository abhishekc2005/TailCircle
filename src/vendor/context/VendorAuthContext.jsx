import React, { createContext, useContext, useState, useEffect } from 'react';

const VendorAuthContext = createContext(null);

export const VendorAuthProvider = ({ children }) => {
  const [vendorUser, setVendorUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vendorRole, setVendorRole] = useState(null);

  useEffect(() => {
    // Check localStorage or mock initial state
    const checkAuth = async () => {
      try {
        const storedVendor = localStorage.getItem('tailcircle_vendor_user');
        if (storedVendor) {
          const parsed = JSON.parse(storedVendor);
          setVendorUser(parsed);
          setVendorRole(parsed.role);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to parse vendor user", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email, password, role) => {
    setIsLoading(true);
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser = {
      id: 'v_' + Math.random().toString(36).substr(2, 9),
      name: 'Test Vendor',
      email,
      role: role || 'shop', // 'shop', 'doctor', 'events', 'meals', 'memorial'
      status: 'verified', // 'pending', 'verified', 'suspended', 'rejected'
      businessName: 'Test Business'
    };
    
    setVendorUser(mockUser);
    setVendorRole(mockUser.role);
    setIsAuthenticated(true);
    localStorage.setItem('tailcircle_vendor_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return mockUser;
  };

  const register = async (vendorData) => {
    setIsLoading(true);
    // Mock register delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const mockUser = {
      id: 'v_' + Math.random().toString(36).substr(2, 9),
      ...vendorData,
      status: 'pending' // new registrations are pending
    };
    
    setVendorUser(mockUser);
    setVendorRole(mockUser.role);
    setIsAuthenticated(true);
    localStorage.setItem('tailcircle_vendor_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return mockUser;
  };

  const logout = () => {
    setVendorUser(null);
    setVendorRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('tailcircle_vendor_user');
  };

  const switchRole = (newRole) => {
    if (vendorUser) {
      const updatedUser = { ...vendorUser, role: newRole };
      setVendorUser(updatedUser);
      setVendorRole(newRole);
      localStorage.setItem('tailcircle_vendor_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <VendorAuthContext.Provider
      value={{
        vendorUser,
        isAuthenticated,
        isLoading,
        vendorRole,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </VendorAuthContext.Provider>
  );
};

export const useVendorAuth = () => {
  const context = useContext(VendorAuthContext);
  if (!context) {
    throw new Error('useVendorAuth must be used within a VendorAuthProvider');
  }
  return context;
};
