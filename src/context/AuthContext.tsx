import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { mockUsers } from "../data/users"; // ✅ Make sure this exists

interface AuthContextType {
 user: userDetails | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signUp: (userName: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

interface userDetails {
  userName: string;
  password: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
const [user, setUser] = useState<userDetails | null>(() => {
  const stored = localStorage.getItem("authUser");
  return stored ? JSON.parse(stored) : null;
});

  const login = (loginDetails: any): boolean => {
    let userDetails = localStorage.getItem("authUser");
    const user = JSON.parse(userDetails);

    if (user !== null &&
      user.userName === loginDetails.userName &&
      user.password === loginDetails.password
    ) {
      setUser(user);
      return true;
    } else {
      return false;
    }
  };

  const signUp = (userDetails: any): boolean => {
    localStorage.setItem("authUser", JSON.stringify(userDetails));
    return true;
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{  user, login, logout, signUp}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
