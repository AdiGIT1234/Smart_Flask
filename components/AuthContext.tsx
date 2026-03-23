"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("flask_user_session");
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error("Failed to parse stored user session", e);
        }
      }
    }
    return null;
  });

  useEffect(() => {
    // Initial check handled by state initializer
  }, []);

  const login = (name: string, email: string) => {
    const freshUser = { name, email };
    setUser(freshUser);
    localStorage.setItem("flask_user_session", JSON.stringify(freshUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("flask_user_session");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
