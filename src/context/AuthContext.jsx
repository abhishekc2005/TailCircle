import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (mock check)
    const storedUser = localStorage.getItem("petverse_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: "u123",
            name: "John Doe",
            email,
            pets: [
              { id: "p1", name: "Max", type: "Dog", breed: "Golden Retriever", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200" }
            ]
          };
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem("petverse_user", JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const signup = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: "u" + Date.now(), ...userData };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("petverse_user", JSON.stringify(newUser));
        resolve(newUser);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("petverse_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
