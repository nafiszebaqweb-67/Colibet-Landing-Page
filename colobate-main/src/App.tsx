import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./admin/layouts/AdminLayout";
import { AuthProvider } from "@/admin/AuthProvider";
import { RequireAuth } from "@/admin/RequireAuth";
import { AdminLogin } from "./admin/pages/AdminLogin";
import { AdminDashboard } from "./admin/pages/AdminDashboard";
import { AdminOrders } from "./admin/pages/AdminOrders";
import { AdminUsers } from "./admin/pages/AdminUsers";
import { AdminAnalytics } from "./admin/pages/AdminAnalytics";
import { AdminContent } from "./admin/pages/AdminContent";
import { AdminSettings } from "./admin/pages/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Admin Auth */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes - protected individually */}
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <RequireAuth>
                  <AdminLayout>
                    <AdminOrders />
                  </AdminLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RequireAuth>
                  <AdminLayout>
                    <AdminUsers />
                  </AdminLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <RequireAuth>
                  <AdminLayout>
                    <AdminAnalytics />
                  </AdminLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/admin/content"
              element={
                <RequireAuth>
                  <AdminLayout>
                    <AdminContent />
                  </AdminLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <RequireAuth>
                  <AdminLayout>
                    <AdminSettings />
                  </AdminLayout>
                </RequireAuth>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
