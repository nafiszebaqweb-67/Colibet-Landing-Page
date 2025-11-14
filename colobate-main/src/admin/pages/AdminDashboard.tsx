import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ShoppingCart, Users, TrendingUp, Clock, LucideIcon } from "lucide-react";

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
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value="1,245"
          change={12.5}
        />
        <StatCard
          icon={Users}
          label="Active Users"
          value="342"
          change={8.2}
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue"
          value="₹85,234"
          change={23.1}
        />
        <StatCard
          icon={Clock}
          label="Pending Orders"
          value="23"
          change={-5.4}
        />
      </div>

      {/* Charts Section */}
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

      {/* Recent Orders */}
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
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-4 py-3 font-medium text-primary">#ORD{1000 + i}</td>
                    <td className="px-4 py-3">Rajesh Kumar</td>
                    <td className="px-4 py-3">Formal Shirt</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        i === 1 ? "bg-green-100 text-green-800" :
                        i === 2 ? "bg-yellow-100 text-yellow-800" :
                        i === 3 ? "bg-blue-100 text-blue-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        {i === 1 ? "Delivered" : i === 2 ? "Processing" : i === 3 ? "Stitching" : "Measurement"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary">₹{2500 + i * 500}</td>
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
