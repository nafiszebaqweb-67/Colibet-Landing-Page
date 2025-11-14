import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  user?: { username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "collibet_admin_token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem(AUTH_KEY));
  const [user, setUser] = useState<{ username: string } | null>(() => {
    const u = localStorage.getItem("collibet_admin_user");
    return u ? JSON.parse(u) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // nothing
    }
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    // Demo credentials: admin / password123
    if (username === "admin" && password === "password123") {
      localStorage.setItem(AUTH_KEY, "demo-token");
      localStorage.setItem("collibet_admin_user", JSON.stringify({ username }));
      setUser({ username });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("collibet_admin_user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
