import React, { createContext, useState, useContext, ReactNode } from 'react';
import { mockUsers } from '../data/users'; // ✅ Make sure this exists

// 🔐 Define Auth Context Type
interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// ✅ Create context with correct type
const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Define props type for provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem('authUser') || null
  );

  const login = (email: string, password: string): boolean => {
    const matchedUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (matchedUser) {
      localStorage.setItem('authUser', email);
      setUser(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};