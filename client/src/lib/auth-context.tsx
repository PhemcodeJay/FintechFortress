import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

type User = {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (email: string, name: string) => Promise<void>;
  verify: () => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Simulate checking session
    const storedUser = localStorage.getItem("neobank_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockUser = {
      id: "user_1",
      email,
      name: "Alex Sterling",
      isVerified: true,
    };
    setUser(mockUser);
    localStorage.setItem("neobank_user", JSON.stringify(mockUser));
    setLocation("/dashboard");
  };

  const register = async (email: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockUser = {
      id: "user_new",
      email,
      name,
      isVerified: false, // Needs verification
    };
    setUser(mockUser);
    localStorage.setItem("neobank_user", JSON.stringify(mockUser));
    setLocation("/verify-email");
  };

  const verify = async () => {
    if (!user) return;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const updatedUser = { ...user, isVerified: true };
    setUser(updatedUser);
    localStorage.setItem("neobank_user", JSON.stringify(updatedUser));
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("neobank_user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("neobank_user");
    setLocation("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        verify,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
