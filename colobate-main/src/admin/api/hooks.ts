import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./mockApi";

export const useOrders = () => {
  const query = useQuery(["orders"], api.getOrders);
  const qc = useQueryClient();
  const create = useMutation(api.createOrder, { onSuccess: () => qc.invalidateQueries(["orders"]) });
  const update = useMutation(({ id, patch }: any) => api.updateOrder(id, patch), { onSuccess: () => qc.invalidateQueries(["orders"]) });
  const remove = useMutation((id: string) => api.deleteOrder(id), { onSuccess: () => qc.invalidateQueries(["orders"]) });
  return { ...query, create, update, remove };
};

export const useUsers = () => {
  const query = useQuery(["users"], api.getUsers);
  const qc = useQueryClient();
  const update = useMutation(({ id, patch }: any) => api.updateUser(id, patch), { onSuccess: () => qc.invalidateQueries(["users"]) });
  return { ...query, update };
};

export const useContent = () => {
  const query = useQuery(["content"], api.getContent);
  const qc = useQueryClient();
  const create = useMutation(api.createContent, { onSuccess: () => qc.invalidateQueries(["content"]) });
  return { ...query, create };
};

export const useSettings = () => {
  const query = useQuery(["settings"], api.getSettings);
  const qc = useQueryClient();
  const update = useMutation((patch: any) => api.updateSettings(patch), { onSuccess: () => qc.invalidateQueries(["settings"]) });
  return { ...query, update };
};
