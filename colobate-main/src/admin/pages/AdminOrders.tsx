import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Eye, Edit2, Trash2, Filter, Play, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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
  // Additional DB fields
  customer_id?: string | null;
  fabric_type?: string | null;
  design_file_url?: string | null;
  measurement_type?: string | null;
  measurement_address?: string | null;
  measurement_date?: string | null;
  measurement_chart_url?: string | null;
  full_address?: string | null;
  city?: string | null;
  pincode?: string | null;
  landmark?: string | null;
  pickup_date?: string | null;
  delivery_date?: string | null;
  special_instructions?: string | null;
  created_at?: string | null;
  // attached files returned from server
  files?: Array<{ id?: number; order_id?: number; file_type?: string | null; file_name?: string | null; file_url?: string | null }>;
}

export const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState<"new" | "progress" | "completed" | "cancelled" | "all">("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<"date" | "amount" | "status">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);

  // initialize tab from URL `status` param if provided
  useEffect(() => {
    const s = searchParams.get("status");
    if (s === "new" || s === "progress" || s === "completed" || s === "cancelled") {
      setTab(s as "new" | "progress" | "completed" | "cancelled");
    }
  }, [searchParams]);

  // initialize search term from URL `q` or `customer` param if provided
  useEffect(() => {
    const q = searchParams.get("q") || searchParams.get("customer");
    if (q) setSearchTerm(q);
  }, [searchParams]);

  const statusArg = tab === "all" ? undefined : tab;
  const { data: orders = [], isLoading, update, remove } = useOrders(statusArg as string | undefined);

  // keep URL in sync when tab changes
  useEffect(() => {
    // keep URL in sync when tab changes
    if (tab === "all") {
      const copy = new URLSearchParams(searchParams.toString());
      copy.delete("status");
      setSearchParams(copy, { replace: true });
      return;
    }
    const copy = new URLSearchParams(searchParams.toString());
    copy.set("status", tab);
    setSearchParams(copy, { replace: true });
  }, [tab, searchParams, setSearchParams]);

  // open order view if URL has ?order=ID
  useEffect(() => {
    const orderId = searchParams.get("order");
    if (orderId && Array.isArray(orders) && orders.length) {
      const found = (orders as Order[]).find((o) => String(o.id) === String(orderId));
      if (found) setViewOrder(found);
    }
  }, [orders, searchParams]);

  const statusColors: Record<Order["status"], string> = {
    new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    progress: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const ordersList = useMemo<Order[]>(() => (orders as Order[]) || [], [orders]);

  // Filtered based on search & tab
  const filteredOrders = useMemo(() => {
    return ordersList.filter((order) => {
      const matchesSearch = (order.customer || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (String(order.id) || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = tab === "all" || order.status === tab;
      return matchesSearch && matchesTab;
    });
  }, [ordersList, searchTerm, tab]);

  // Decide which optional columns exist in the current filtered set.
  const hasCustomerId = useMemo(() => filteredOrders.some((o) => !!o.customer_id), [filteredOrders]);
  const hasFabric = useMemo(() => filteredOrders.some((o) => !!o.fabric_type), [filteredOrders]);
  const hasDesign = useMemo(() => filteredOrders.some((o) => !!o.design_file_url), [filteredOrders]);
  const hasMeasurement = useMemo(() => filteredOrders.some((o) => !!o.measurement_chart_url || !!o.measurement_address), [filteredOrders]);
  const hasPickupDelivery = useMemo(() => filteredOrders.some((o) => !!o.pickup_date || !!o.delivery_date), [filteredOrders]);

  // Sorted
  const sortedOrders = useMemo(() => {
    const copy = [...filteredOrders];
    copy.sort((a: Order, b: Order) => {
      if (sortBy === "date") {
        const ta = new Date(a.date).getTime() || 0;
        const tb = new Date(b.date).getTime() || 0;
        return sortDir === "asc" ? ta - tb : tb - ta;
      }
      if (sortBy === "amount") {
        return sortDir === "asc" ? (a.amount || 0) - (b.amount || 0) : (b.amount || 0) - (a.amount || 0);
      }
      // status sort alphabetical
      return sortDir === "asc" ? String(a.status).localeCompare(b.status) : String(b.status).localeCompare(a.status);
    });
    return copy;
  }, [filteredOrders, sortBy, sortDir]);

  // Pagination
  const total = sortedOrders.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return sortedOrders.slice(start, start + perPage);
  }, [sortedOrders, page, perPage]);

  console.log("📊 AdminOrders - ordersList:", ordersList);
  console.log("📊 AdminOrders - filteredOrders:", filteredOrders);

  type TabKey = Order["status"] | "all";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Orders Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage all customer orders</p>
        </div>
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
            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor="sortBy">Sort by</label>
              <select
                id="sortBy"
                className="border rounded px-2 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "amount" | "status")}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="status">Status</option>
              </select>
              <button
                type="button"
                className="px-2 py-1 border rounded text-sm"
                onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                aria-label="Toggle sort direction">
                {sortDir === "asc" ? "↑" : "↓"}
              </button>
              <label className="sr-only" htmlFor="perPage">Per page</label>
              <select
                id="perPage"
                className="border rounded px-2 py-1 text-sm"
                value={perPage}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders ({total})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="p-6">Loading orders...</div>
          ) : (
            <div className="space-y-4">
              {/* Tabs for order status */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
                {([
                  { key: "new" as TabKey, label: "New Orders" },
                  { key: "progress" as TabKey, label: "Order Progress" },
                  { key: "completed" as TabKey, label: "Order Completed" },
                  { key: "cancelled" as TabKey, label: "Order Cancelled" },
                  { key: "all" as TabKey, label: "All Orders" },
                ] as { key: TabKey; label: string }[]).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => { setTab(t.key); setPage(1); }}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                      tab === t.key
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Orders Table - simplified columns for list view */}
              <div className="bg-card rounded-lg shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Order ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Customer</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Garment</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Category</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Amount</th>
                      <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {total === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No orders found</td>
                      </tr>
                    ) : (
                      paginated.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-4 py-3 font-semibold text-primary">{order.id}</td>
                          <td className="px-4 py-3"><p className="font-medium">{order.customer ?? "-"}</p></td>
                          <td className="px-4 py-3">{order.garment ?? "-"}</td>
                          <td className="px-4 py-3">{order.category ?? "-"}</td>
                          <td className="px-4 py-3"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status as Order["status"]]}`}>{String(order.status || "new").charAt(0).toUpperCase() + String(order.status || "new").slice(1)}</span></td>
                          <td className="px-4 py-3">${order.amount ?? 0}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 text-xs"
                                onClick={() => update?.mutate?.({ id: order.id, patch: { status: "progress" } })}
                                disabled={order.status === "progress" || order.status === "cancelled"}
                                title="Move to Progress">
                                <Play className="w-4 h-4" />
                                <span>Progress</span>
                              </Button>

                              <Button
                                size="sm"
                                className="flex items-center gap-2 text-xs"
                                onClick={() => update?.mutate?.({ id: order.id, patch: { status: "completed" } })}
                                disabled={order.status === "completed" || order.status === "cancelled"}
                                title="Mark completed">
                                <Check className="w-4 h-4" />
                                <span>Complete</span>
                              </Button>

                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex items-center gap-2 text-xs"
                                onClick={() => {
                                  if (order.status === "cancelled") return;
                                  if (confirm("Cancel this order? This action cannot be undone.")) {
                                    update?.mutate?.({ id: order.id, patch: { status: "cancelled" } });
                                  }
                                }}
                                title="Cancel order">
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                              </Button>

                              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-xs" onClick={() => setViewOrder(order)} title="View details">
                                <Eye className="w-4 h-4" />
                                <span className="sr-only">View</span>
                              </Button>

                              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-xs" onClick={() => setEditOrder(order)} title="Edit order">
                                <Edit2 className="w-4 h-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Order view dialog - refined card design */}
              <Dialog open={!!viewOrder} onOpenChange={(open) => { if (!open) setViewOrder(null); }}>
                <DialogContent className="max-w-5xl p-6">
                  <div className="w-full">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{viewOrder?.customer ?? "Order Details"} <span className="text-sm text-muted-foreground">#{viewOrder?.id}</span></h3>
                        <div className="mt-2">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[viewOrder?.status as Order["status"]]}`}>
                            {String(viewOrder?.status || "new").charAt(0).toUpperCase() + String(viewOrder?.status || "new").slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => update?.mutate?.({ id: viewOrder!.id, patch: { status: "progress" } })}
                          disabled={viewOrder?.status === "progress" || viewOrder?.status === "cancelled"}
                          title="Move to progress">
                          Progress
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => update?.mutate?.({ id: viewOrder!.id, patch: { status: "completed" } })}
                          disabled={viewOrder?.status === "completed" || viewOrder?.status === "cancelled"}
                          title="Mark completed">
                          Complete
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (viewOrder?.status === "cancelled") return;
                            if (confirm("Cancel this order? This action cannot be undone.")) {
                              update?.mutate?.({ id: viewOrder!.id, patch: { status: "cancelled" } });
                              setViewOrder(null);
                            }
                          }}
                          title="Cancel order">
                          Cancel
                        </Button>

                        <Button size="sm" variant="ghost" onClick={() => setEditOrder(viewOrder)} title="Edit order">Edit</Button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mt-6">
                      {/* Left: Previews */}
                      <div className="md:w-1/2 space-y-4">
                        <div className="rounded-md border p-3 bg-white/50">
                          <div className="text-sm font-medium mb-2">Design</div>
                          {(() => {
                            const d = viewOrder?.design_file_url;
                            const files = viewOrder?.files;
                            const matchFile = files?.find((f) => f.file_name === d || f.file_type === "design");
                            const src = matchFile?.file_url || (d && (/^https?:\/\//i).test(d) ? d : null);

                            if (src && (/\.(jpe?g|png|gif|webp)$/i).test(src)) {
                              return <img src={src} alt={`Design ${viewOrder?.id}`} className="w-full h-64 object-cover rounded-md shadow-sm border" />;
                            }

                            if (src) {
                              return <a href={src} target="_blank" rel="noreferrer" className="text-primary underline">Open design file</a>;
                            }

                            if (d) {
                              return (
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-medium">{d}</div>
                                  <Button size="sm" variant="ghost" onClick={() => navigator.clipboard?.writeText(d)} title="Copy filename">Copy</Button>
                                </div>
                              );
                            }

                            return <div className="text-sm text-muted-foreground">No design file</div>;
                          })()}
                        </div>

                        <div className="rounded-md border p-3 bg-white/50">
                          <div className="text-sm font-medium mb-2">Measurement</div>
                          {(() => {
                            const m = viewOrder?.measurement_chart_url;
                            const files = viewOrder?.files;
                            const matchFile = files?.find((f) => f.file_name === m || f.file_type === "measurement_chart");
                            const src = matchFile?.file_url || (m && (/^https?:\/\//i).test(m) ? m : null);

                            if (src && (/\.(jpe?g|png|gif|webp)$/i).test(src)) {
                              return <img src={src} alt={`Measurements ${viewOrder?.id}`} className="w-full h-48 object-contain rounded-md shadow-sm border" />;
                            }

                            if (src) {
                              return <a href={src} target="_blank" rel="noreferrer" className="text-primary underline">Open measurement chart</a>;
                            }

                            if (m) {
                              return (
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-medium">{m}</div>
                                  <Button size="sm" variant="ghost" onClick={() => navigator.clipboard?.writeText(m)} title="Copy filename">Copy</Button>
                                </div>
                              );
                            }

                            return <div className="text-sm text-muted-foreground">No measurement chart</div>;
                          })()}
                        </div>
                      </div>

                      {/* Right: Details grid (labels right-aligned) */}
                      <div className="md:w-1/2">
                        <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                          <dt className="text-sm text-muted-foreground text-right">Phone</dt>
                          <dd className="text-sm font-medium">{viewOrder?.phone ?? "-"}</dd>

                          <dt className="text-sm text-muted-foreground text-right">Garment</dt>
                          <dd className="text-sm font-medium">{viewOrder?.garment ?? "-"}</dd>

                          <dt className="text-sm text-muted-foreground text-right">Category</dt>
                          <dd className="text-sm font-medium">{viewOrder?.category ?? "-"}</dd>

                          <dt className="text-sm text-muted-foreground text-right">Fabric</dt>
                          <dd className="text-sm font-medium">{viewOrder?.fabric_type ?? "-"}</dd>

                          <dt className="text-sm text-muted-foreground text-right">Amount</dt>
                          <dd className="text-sm font-semibold">${viewOrder?.amount ?? 0}</dd>

                          <dt className="text-sm text-muted-foreground text-right">Pickup</dt>
                          <dd className="text-sm font-medium">{viewOrder?.pickup_date ?? "-"}</dd>

                          <dt className="text-sm text-muted-foreground text-right">Delivery</dt>
                          <dd className="text-sm font-medium">{viewOrder?.delivery_date ?? "-"}</dd>
                        </dl>

                        <div className="mt-4">
                          <div className="text-sm text-muted-foreground mb-1">Address</div>
                          <div className="text-sm font-medium">{viewOrder?.full_address ?? viewOrder?.measurement_address ?? "-"}</div>
                          <div className="text-xs text-muted-foreground mt-1">{viewOrder?.city ?? ""}{viewOrder?.pincode ? ` • ${viewOrder.pincode}` : ""}</div>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm text-muted-foreground mb-1">Special Instructions</div>
                          <div className="text-sm">{viewOrder?.special_instructions ?? "-"}</div>
                        </div>

                        <div className="mt-6 text-xs text-muted-foreground">Created: {viewOrder?.created_at ?? viewOrder?.date ?? "-"}</div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {/* Order edit dialog */}
              <Dialog open={!!editOrder} onOpenChange={(open) => { if (!open) setEditOrder(null); }}>
                <DialogContent className="max-w-2xl p-6">
                  <DialogHeader>
                    <DialogTitle>Edit Order {editOrder?.id}</DialogTitle>
                    <div className="text-sm text-muted-foreground">Modify order fields and save</div>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-3 mt-3">
                    <div>
                      <label className="text-sm block mb-1">Customer</label>
                      <Input value={editOrder?.customer ?? ""} onChange={(e) => setEditOrder((s) => s ? ({ ...s, customer: e.target.value }) : s)} />
                    </div>
                    <div>
                      <label className="text-sm block mb-1">Phone</label>
                      <Input value={editOrder?.phone ?? ""} onChange={(e) => setEditOrder((s) => s ? ({ ...s, phone: e.target.value }) : s)} />
                    </div>
                    <div>
                      <label className="text-sm block mb-1">Amount</label>
                      <Input type="number" value={String(editOrder?.amount ?? "")} onChange={(e) => setEditOrder((s) => s ? ({ ...s, amount: Number(e.target.value) }) : s)} />
                    </div>
                    <div>
                      <label className="text-sm block mb-1">Pickup Date</label>
                      <Input type="date" value={editOrder?.pickup_date ?? ""} onChange={(e) => setEditOrder((s) => s ? ({ ...s, pickup_date: e.target.value }) : s)} />
                    </div>
                    <div>
                      <label className="text-sm block mb-1">Delivery Date</label>
                      <Input type="date" value={editOrder?.delivery_date ?? ""} onChange={(e) => setEditOrder((s) => s ? ({ ...s, delivery_date: e.target.value }) : s)} />
                    </div>
                    <div>
                      <label className="text-sm block mb-1">Special Instructions</label>
                      <Textarea value={editOrder?.special_instructions ?? ""} onChange={(e) => setEditOrder((s) => s ? ({ ...s, special_instructions: e.target.value }) : s)} />
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setEditOrder(null)}>Cancel</Button>
                      <Button onClick={() => {
                        if (!editOrder) return;
                        const { id, created_at, date, ...rest } = editOrder;
                        const patch: Partial<Order> = {
                          customer: rest.customer,
                          phone: rest.phone,
                          amount: rest.amount,
                          pickup_date: rest.pickup_date,
                          delivery_date: rest.delivery_date,
                          special_instructions: rest.special_instructions,
                        };
                        update?.mutate?.({ id: editOrder.id, patch });
                        setEditOrder(null);
                      }}>Save</Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Pagination controls */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, total)} of {total}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    Prev
                  </Button>
                  <div className="px-2">Page {page} / {totalPages}</div>
                  <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
