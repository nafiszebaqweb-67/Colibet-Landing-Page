import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Edit2, Trash2, Filter } from "lucide-react";
import { useOrders } from "@/admin/api/hooks";

interface Order {
  id: string;
  customer: string;
  phone: string;
  garment: string;
  category: string;
  status: "new" | "progress" | "completed" | "cancelled";
  amount: number;
  date: string;
}

export const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState<"new" | "progress" | "completed" | "cancelled" | "all">("all");

  const { data: orders = [], isLoading, update } = useOrders();

  console.log("📊 AdminOrders - data received:", orders);
  console.log("📊 AdminOrders - isLoading:", isLoading);
  console.log("📊 AdminOrders - current tab:", tab);

  const statusColors: Record<Order["status"], string> = {
    new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    progress: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const ordersList = (orders as any[]) || [];
  const filteredOrders = ordersList.filter((order: any) => {
    const matchesSearch = (order.customer || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (String(order.id) || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = tab === "all" || order.status === tab;
    return matchesSearch && matchesTab;
  });

  console.log("📊 AdminOrders - ordersList:", ordersList);
  console.log("📊 AdminOrders - filteredOrders:", filteredOrders);

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
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="p-6">Loading orders...</div>
          ) : (
            <div className="space-y-4">
              {/* Tabs for order status */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
                {[
                  { key: "new", label: "New Orders" },
                  { key: "progress", label: "Order Progress" },
                  { key: "completed", label: "Order Completed" },
                  { key: "cancelled", label: "Order Cancelled" },
                  { key: "all", label: "All Orders" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key as any)}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                      tab === t.key
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Order ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Customer</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Garment</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Category</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-4 py-3 font-semibold text-primary">{order.id}</td>
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium">{order.customer || "N/A"}</p>
                              <p className="text-xs text-muted-foreground">{order.phone || "N/A"}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">{order.garment || "N/A"}</td>
                          <td className="px-4 py-3">{order.category || "N/A"}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                statusColors[order.status as Order["status"]]
                              }`}>
                              {String(order.status || "new").charAt(0).toUpperCase() + String(order.status || "new").slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{order.date || "N/A"}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1 flex-wrap">
                              {order.status !== "progress" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => (update as any).mutate({ id: order.id, patch: { status: "progress" } })}>
                                  Move to Progress
                                </Button>
                              )}
                              {order.status !== "completed" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => (update as any).mutate({ id: order.id, patch: { status: "completed" } })}>
                                  Mark Completed
                                </Button>
                              )}
                              {order.status !== "cancelled" && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => (update as any).mutate({ id: order.id, patch: { status: "cancelled" } })}>
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
