import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Edit2, Trash2, Filter } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  phone: string;
  garment: string;
  category: string;
  status: "pending" | "measurement" | "stitching" | "processing" | "delivered" | "cancelled";
  amount: number;
  date: string;
}

export const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const orders: Order[] = [
    {
      id: "ORD1001",
      customer: "Rajesh Kumar",
      phone: "98765 43210",
      garment: "Formal Shirt",
      category: "Men",
      status: "delivered",
      amount: 2500,
      date: "2024-11-10",
    },
    {
      id: "ORD1002",
      customer: "Priya Singh",
      phone: "98765 43211",
      garment: "Saree Blouse",
      category: "Women",
      status: "stitching",
      amount: 1500,
      date: "2024-11-12",
    },
    {
      id: "ORD1003",
      customer: "Amit Verma",
      phone: "98765 43212",
      garment: "Pant",
      category: "Men",
      status: "processing",
      amount: 1200,
      date: "2024-11-13",
    },
    {
      id: "ORD1004",
      customer: "Neha Gupta",
      phone: "98765 43213",
      garment: "Lehenga",
      category: "Women",
      status: "measurement",
      amount: 5000,
      date: "2024-11-14",
    },
    {
      id: "ORD1005",
      customer: "Vikram Singh",
      phone: "98765 43214",
      garment: "Blazer",
      category: "Men",
      status: "pending",
      amount: 3500,
      date: "2024-11-14",
    },
  ];

  const statusColors: Record<Order["status"], string> = {
    pending: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    measurement: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    stitching: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Orders Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage all customer orders</p>
        </div>
        <Button variant="gold" size="lg">
          Create New Order
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by customer name or order ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div>
                <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="measurement">Measurement</option>
                  <option value="stitching">Stitching</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Garment</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-primary">{order.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{order.garment}</td>
                    <td className="px-4 py-3">{order.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-accent">₹{order.amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
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
