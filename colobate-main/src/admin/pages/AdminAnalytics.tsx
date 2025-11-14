import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Target, Zap } from "lucide-react";

const monthlyData = [
  { month: "Jan", orders: 120, revenue: 85000, customers: 45 },
  { month: "Feb", orders: 145, revenue: 102000, customers: 52 },
  { month: "Mar", orders: 168, revenue: 118000, customers: 68 },
  { month: "Apr", orders: 192, revenue: 135000, customers: 85 },
  { month: "May", orders: 215, revenue: 151000, customers: 98 },
  { month: "Jun", orders: 245, revenue: 172000, customers: 112 },
];

const categoryData = [
  { name: "Men", value: 35, color: "#0095ff" },
  { name: "Women", value: 45, color: "#ffc100" },
  { name: "Kids", value: 20, color: "#4ade80" },
];

const garmentData = [
  { garment: "Shirt", count: 156, revenue: 390000 },
  { garment: "Pant", count: 143, revenue: 286000 },
  { garment: "Suit", count: 87, revenue: 435000 },
  { garment: "Kurti", count: 124, revenue: 186000 },
  { garment: "Lehenga", count: 92, revenue: 460000 },
];

export const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">Business performance and customer insights</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Growth</p>
                <p className="text-3xl font-bold text-primary">24.5%</p>
                <p className="text-xs text-green-600 mt-1">↑ 5.2% vs previous month</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <p className="text-3xl font-bold text-primary">8.4%</p>
                <p className="text-xs text-green-600 mt-1">↑ 1.2% vs previous month</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Order Value</p>
                <p className="text-3xl font-bold text-primary">₹2,840</p>
                <p className="text-xs text-green-600 mt-1">↑ ₹240 vs previous month</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#0095ff" strokeWidth={2} dot={{ fill: "#0095ff" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders vs Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Orders vs New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#0095ff" />
                <Bar dataKey="customers" fill="#ffc100" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Garments */}
        <Card>
          <CardHeader>
            <CardTitle>Top Garments by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={garmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="garment" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#ffc100" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Month</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Orders</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Revenue</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">New Customers</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Avg Order Value</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {monthlyData.map((data, idx) => {
                  const prevRevenue = idx > 0 ? monthlyData[idx - 1].revenue : data.revenue;
                  const growth = ((data.revenue - prevRevenue) / prevRevenue * 100).toFixed(1);
                  return (
                    <tr key={data.month} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 font-semibold">{data.month}</td>
                      <td className="px-4 py-3 text-primary font-semibold">{data.orders}</td>
                      <td className="px-4 py-3 text-accent font-semibold">₹{data.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3">{data.customers}</td>
                      <td className="px-4 py-3">₹{Math.round(data.revenue / data.orders).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${parseFloat(growth) >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {parseFloat(growth) >= 0 ? "+" : ""}{growth}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
