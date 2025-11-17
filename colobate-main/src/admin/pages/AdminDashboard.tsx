import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ShoppingCart, Users, TrendingUp, Clock, LucideIcon } from "lucide-react";
import { useOrders, useUsers } from "@/admin/api/hooks";
import { useNavigate } from "react-router-dom";

const dashboardData = [
  { month: "Jan", orders: 40, revenue: 24 },
  { month: "Feb", orders: 30, revenue: 13 },
  { month: "Mar", orders: 20, revenue: 98 },
  { month: "Apr", orders: 27, revenue: 39 },
  { month: "May", orders: 20, revenue: 48 },
  { month: "Jun", orders: 39, revenue: 38 },
];

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: number;
}

const StatCard = ({ icon: Icon, label, value, change }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
          <p className={`text-xs mt-1 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
            {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
          </p>
        </div>
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const AdminDashboard = () => {
  const { data: orders = [] } = useOrders();
  const { data: users = [] } = useUsers();
  const navigate = useNavigate();

  const totalOrders = Array.isArray(orders) ? orders.length : 0;
  const pendingOrders = Array.isArray(orders) ? orders.filter((o: any) => (o.status || "new") !== "completed" && (o.status || "new") !== "cancelled").length : 0;
  const revenue = Array.isArray(orders) ? orders.reduce((s: number, o: any) => s + (Number(o.amount) || 0), 0) : 0;
  const activeUsers = Array.isArray(users) ? users.length : 0;

  const shortRecent = Array.isArray(orders) ? orders.slice(0, 5) : [];
  const recentUsers = Array.isArray(users) ? users.slice(0, 5) : [];

  const fmt = (n: number) => new Intl.NumberFormat("en-IN").format(n);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button type="button" aria-label="View all orders" className="text-left" onClick={() => navigate('/admin/orders')}>
          <StatCard
            icon={ShoppingCart}
            label="Total Orders"
            value={fmt(totalOrders)}
            change={0}
          />
        </button>
        <button type="button" aria-label="View users" className="text-left" onClick={() => navigate('/admin/users')}>
          <StatCard
            icon={Users}
            label="Active Users"
            value={fmt(activeUsers)}
            change={0}
          />
        </button>
        <button type="button" aria-label="View revenue" className="text-left" onClick={() => navigate('/admin/analytics')}>
          <StatCard
            icon={TrendingUp}
            label="Revenue"
            value={`₹${fmt(revenue)}`}
            change={0}
          />
        </button>
        <button type="button" aria-label="View pending orders" className="text-left" onClick={() => navigate('/admin/orders?status=progress')}>
          <StatCard
            icon={Clock}
            label="Pending Orders"
            value={fmt(pendingOrders)}
            change={0}
          />
        </button>
      </div>

      {/* Charts Section (unchanged) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#0095ff" strokeWidth={2} dot={{ fill: "#0095ff" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#ffc100" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders (dynamic) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Garment</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {shortRecent.map((o: any) => (
                  <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer" onClick={() => navigate(`/admin/orders?status=${o.status || 'all'}&order=${encodeURIComponent(o.id)}`)}>
                    <td className="px-4 py-3 font-medium text-primary">{o.id}</td>
                    <td className="px-4 py-3">{o.customer || o.customer_name || "-"}</td>
                    <td className="px-4 py-3">{o.garment || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        o.status === "completed" ? "bg-green-100 text-green-800" :
                        o.status === "progress" ? "bg-yellow-100 text-yellow-800" :
                        o.status === "new" ? "bg-blue-100 text-blue-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {String(o.status || "new").charAt(0).toUpperCase() + String(o.status || "new").slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary">₹{fmt(Number(o.amount) || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Users */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">User ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Phone</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Orders</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentUsers.map((u: any) => (
                  <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-4 py-3 font-medium text-primary">{u.id}</td>
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.whatsapp_number || '-'}</td>
                    <td className="px-4 py-3">{u.orders_count ?? 0}</td>
                    <td className="px-4 py-3 font-semibold text-primary">₹{fmt(Number(u.total_spent) || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
