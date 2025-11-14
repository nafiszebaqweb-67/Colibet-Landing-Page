import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/admin/AuthProvider";

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
