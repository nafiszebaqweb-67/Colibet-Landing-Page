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
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        // ignore
      }

      if (!res.ok) {
        console.error("Admin login failed:", res.status, text);
        return false;
      }

      const token = data?.token;
      if (!token) return false;

      localStorage.setItem(AUTH_KEY, token);
      localStorage.setItem("collibet_admin_user", JSON.stringify({ username }));
      setUser({ username });
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Admin login error:", err);
      return false;
    }
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
