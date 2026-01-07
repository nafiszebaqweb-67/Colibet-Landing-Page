import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./mockApi";
import * as serverApi from "./serverApi";

export const useOrders = (status?: string) => {
  const qc = useQueryClient();
  const token = typeof window !== "undefined" ? localStorage.getItem("collibet_admin_token") : null;

  // Fetch function that tries server API first, then falls back to mock
  const fetchOrders = async () => {
    // If logged in, always try the server API
    if (token) {
      console.log("🔐 Admin token found, using server API (status)", status);
      return serverApi.getOrdersByStatus(status);
    }

    // If not logged in, try server API anyway (might work if DB is accessible)
    // If it fails, fall back to mock API
    try {
      console.log("⚠️  No token, trying server API anyway... (status)", status);
      return await serverApi.getOrdersByStatus(status);
    } catch (err) {
      console.log("📦 Server API failed, falling back to mock API");
      const all = await api.getOrders();
      // If status provided, filter locally
      if (status) return (all || []).filter((o: any) => String(o.status || "new") === String(status));
      return all;
    }
  };

  const query = useQuery({
    queryKey: ["orders", status || "all"],
    queryFn: fetchOrders,
  });

  const create = useMutation({
    mutationFn: api.createOrder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"], exact: false }),
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: any) => {
      if (token && patch?.status) {
        return serverApi.updateOrderStatus(id, patch.status);
      }
      return api.updateOrder(id, patch);
    },
    // Optimistic update: update all cached orders lists so the UI moves the order between tabs immediately
    onMutate: async ({ id, patch }: any) => {
      await qc.cancelQueries({ queryKey: ["orders"], exact: false });
      const statusKeys = ["all", "new", "progress", "completed", "cancelled"];
      const previous: Record<string, any> = {};
      const prevAll = qc.getQueryData(["orders", "all"]) as any[] | undefined;

      statusKeys.forEach((s) => {
        const key = ["orders", s];
        const data = qc.getQueryData(key) as any[] | undefined;
        previous[s] = data;
        if (!Array.isArray(data)) return;

        // Update or remove the item in this list depending on new status
        let next = data.map((o) => (o.id === id ? { ...o, ...patch } : o));

        if (patch?.status) {
          if (s !== "all" && s !== patch.status) {
            // remove from lists that aren't the new status
            next = next.filter((o) => o.id !== id);
          }

          if (s === patch.status) {
            // ensure it's present in the new status list
            const exists = next.some((o) => o.id === id);
            if (!exists) {
              const source = (prevAll || []).find((o) => o.id === id) || { id, ...patch };
              next = [{ ...source, ...patch }, ...next];
            }
          }
        }

        qc.setQueryData(key, next);
      });

      return { previous };
    },
    onError: (err, variables, context: any) => {
      // rollback
      if (context?.previous) {
        Object.keys(context.previous).forEach((s) => {
          qc.setQueryData(["orders", s], context.previous[s]);
        });
      }
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["orders"], exact: false }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.deleteOrder(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"], exact: false }),
  });

  return { ...query, create, update, remove };
};

export const useUsers = () => {
  const qc = useQueryClient();
  const token = typeof window !== "undefined" ? localStorage.getItem("collibet_admin_token") : null;

  const fetchUsers = async () => {
    if (token) {
      return serverApi.getUsers();
    }
    try {
      return await serverApi.getUsers();
    } catch (err) {
      return api.getUsers();
    }
  };

  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const update = useMutation({
    mutationFn: ({ id, patch }: any) => api.updateUser(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });

  return { ...query, update };
};

export const useContent = () => {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["content"],
    queryFn: api.getContent,
  });

  const create = useMutation({
    mutationFn: api.createContent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["content"] }),
  });

  return { ...query, create };
};

export const useSettings = () => {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["settings"],
    queryFn: api.getSettings,
  });

  const update = useMutation({
    mutationFn: (patch: any) => api.updateSettings(patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });

  return { ...query, update };
};
