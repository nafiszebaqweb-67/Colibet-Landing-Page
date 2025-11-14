import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./mockApi";
import * as serverApi from "./serverApi";

export const useOrders = () => {
  const qc = useQueryClient();
  const token = typeof window !== "undefined" ? localStorage.getItem("collibet_admin_token") : null;

  // Fetch function that tries server API first, then falls back to mock
  const fetchOrders = async () => {
    // If logged in, always try the server API
    if (token) {
      console.log("🔐 Admin token found, using server API");
      return serverApi.getOrdersByStatus();
    }

    // If not logged in, try server API anyway (might work if DB is accessible)
    // If it fails, fall back to mock API
    try {
      console.log("⚠️  No token, trying server API anyway...");
      return await serverApi.getOrdersByStatus();
    } catch (err) {
      console.log("📦 Server API failed, falling back to mock API");
      return api.getOrders();
    }
  };

  const query = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const create = useMutation({
    mutationFn: api.createOrder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: any) => {
      if (token && patch?.status) {
        return serverApi.updateOrderStatus(id, patch.status);
      }
      return api.updateOrder(id, patch);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.deleteOrder(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });

  return { ...query, create, update, remove };
};

export const useUsers = () => {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsers,
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
