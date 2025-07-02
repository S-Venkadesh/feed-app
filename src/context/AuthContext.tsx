import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
 user: userDetails | null;
  login: (userDetails) => boolean;
  logout: () => void;
  signUp: (userDetails) => boolean;
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

  const login = (loginDetails: userDetails): boolean => {
  const user = JSON.parse(localStorage.getItem("authUser") || 'null');

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
