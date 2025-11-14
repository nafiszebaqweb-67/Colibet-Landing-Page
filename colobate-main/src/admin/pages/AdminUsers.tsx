import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Edit2, Trash2, Mail, Phone } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive";
  joinDate: string;
}

export const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users: User[] = [
    {
      id: "USR001",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "98765 43210",
      orders: 5,
      totalSpent: 12500,
      lastOrder: "2024-11-10",
      status: "active",
      joinDate: "2024-08-15",
    },
    {
      id: "USR002",
      name: "Priya Singh",
      email: "priya@example.com",
      phone: "98765 43211",
      orders: 3,
      totalSpent: 7500,
      lastOrder: "2024-11-12",
      status: "active",
      joinDate: "2024-09-20",
    },
    {
      id: "USR003",
      name: "Amit Verma",
      email: "amit@example.com",
      phone: "98765 43212",
      orders: 8,
      totalSpent: 18900,
      lastOrder: "2024-11-13",
      status: "active",
      joinDate: "2024-07-10",
    },
    {
      id: "USR004",
      name: "Neha Gupta",
      email: "neha@example.com",
      phone: "98765 43213",
      orders: 1,
      totalSpent: 5000,
      lastOrder: "2024-11-14",
      status: "active",
      joinDate: "2024-11-01",
    },
    {
      id: "USR005",
      name: "Vikram Singh",
      email: "vikram@example.com",
      phone: "98765 43214",
      orders: 2,
      totalSpent: 4700,
      lastOrder: "2024-10-20",
      status: "inactive",
      joinDate: "2024-06-05",
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Users Management</h1>
          <p className="text-muted-foreground mt-1">View and manage customer profiles</p>
        </div>
        <Button variant="gold" size="lg">
          Add New User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Users</p>
            <p className="text-3xl font-bold text-primary">{users.length}</p>
            <p className="text-xs text-green-600 mt-1">↑ 12% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Active Users</p>
            <p className="text-3xl font-bold text-accent">{users.filter(u => u.status === "active").length}</p>
            <p className="text-xs text-green-600 mt-1">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-primary">₹{users.reduce((sum, u) => sum + u.totalSpent, 0)}</p>
            <p className="text-xs text-green-600 mt-1">↑ From all users</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">User</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Contact</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Orders</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Total Spent</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Last Order</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Joined</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-primary">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                        {user.orders} orders
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-accent">₹{user.totalSpent}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.lastOrder}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.joinDate}</td>
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
