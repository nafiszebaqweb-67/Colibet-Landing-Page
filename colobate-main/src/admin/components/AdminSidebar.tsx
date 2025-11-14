import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  FileText,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  onClose?: () => void;
}

export const AdminSidebar = ({ onClose }: AdminSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { label: "Content", path: "/admin/content", icon: FileText },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-primary to-primary/90 text-primary-foreground flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-primary-foreground/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-heading font-bold">Collibet Admin</h1>
        </div>
        <p className="text-xs text-primary-foreground/70">Control Center</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto py-4 space-y-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                active
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/20"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-foreground/20">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
