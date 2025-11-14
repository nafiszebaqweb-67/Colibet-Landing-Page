// Simple mock API using localStorage to persist demo data

const ORDERS_KEY = "mock_orders";
const USERS_KEY = "mock_users";
const CONTENT_KEY = "mock_content";
const SETTINGS_KEY = "mock_settings";

const seedIfEmpty = (key: string, seed: any[]) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(seed));
  }
};

// Seed data
seedIfEmpty(ORDERS_KEY, [
  { id: "ORD1001", customer: "Rajesh Kumar", phone: "9876543210", garment: "Formal Shirt", category: "Men", status: "completed", amount: 2500, date: "2024-11-10" },
  { id: "ORD1002", customer: "Priya Singh", phone: "9876543211", garment: "Saree Blouse", category: "Women", status: "progress", amount: 1500, date: "2024-11-12" },
  { id: "ORD1003", customer: "Amit Verma", phone: "9876543212", garment: "Pant", category: "Men", status: "progress", amount: 1200, date: "2024-11-13" },
  { id: "ORD1004", customer: "Neha Gupta", phone: "9876543213", garment: "Lehenga", category: "Women", status: "new", amount: 5000, date: "2024-11-14" },
  { id: "ORD1005", customer: "Vikram Singh", phone: "9876543214", garment: "Blazer", category: "Men", status: "new", amount: 3500, date: "2024-11-14" },
]);

seedIfEmpty(USERS_KEY, [
  { id: "USR001", name: "Rajesh Kumar", email: "rajesh@example.com", phone: "9876543210", orders: 5, totalSpent: 12500, lastOrder: "2024-11-10", status: "active", joinDate: "2024-08-15" },
  { id: "USR002", name: "Priya Singh", email: "priya@example.com", phone: "9876543211", orders: 3, totalSpent: 7500, lastOrder: "2024-11-12", status: "active", joinDate: "2024-09-20" },
]);

seedIfEmpty(CONTENT_KEY, [
  { id: "CNT001", title: "Hero Section Heading", section: "Hero", type: "Text", lastUpdated: "2024-11-14", status: "published" },
  { id: "CNT002", title: "Featured Testimonials", section: "Social Proof", type: "Video", lastUpdated: "2024-11-10", status: "published" },
]);

seedIfEmpty(SETTINGS_KEY, [{ id: "S001", key: "business_name", value: "Collibet Tailoring" }]);

// Utility helpers
const read = (key: string) => JSON.parse(localStorage.getItem(key) || "[]");
const write = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

// Orders
export const getOrders = async () => {
  await new Promise((r) => setTimeout(r, 200));
  return read(ORDERS_KEY);
};

export const createOrder = async (order: any) => {
  const orders = read(ORDERS_KEY);
  const id = `ORD${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder = { ...order, id };
  orders.unshift(newOrder);
  write(ORDERS_KEY, orders);
  return newOrder;
};

export const updateOrder = async (id: string, patch: any) => {
  const orders = read(ORDERS_KEY);
  const idx = orders.findIndex((o: any) => o.id === id);
  if (idx === -1) throw new Error("Order not found");
  orders[idx] = { ...orders[idx], ...patch };
  write(ORDERS_KEY, orders);
  return orders[idx];
};

export const deleteOrder = async (id: string) => {
  let orders = read(ORDERS_KEY);
  orders = orders.filter((o: any) => o.id !== id);
  write(ORDERS_KEY, orders);
  return true;
};

// Users (minimal)
export const getUsers = async () => {
  await new Promise((r) => setTimeout(r, 150));
  return read(USERS_KEY);
};

export const updateUser = async (id: string, patch: any) => {
  const users = read(USERS_KEY);
  const idx = users.findIndex((u: any) => u.id === id);
  if (idx === -1) throw new Error("User not found");
  users[idx] = { ...users[idx], ...patch };
  write(USERS_KEY, users);
  return users[idx];
};

// Content
export const getContent = async () => {
  await new Promise((r) => setTimeout(r, 150));
  return read(CONTENT_KEY);
};

export const createContent = async (item: any) => {
  const content = read(CONTENT_KEY);
  const id = `CNT${Math.floor(100 + Math.random() * 900)}`;
  const newItem = { ...item, id };
  content.unshift(newItem);
  write(CONTENT_KEY, content);
  return newItem;
};

// Settings
export const getSettings = async () => {
  await new Promise((r) => setTimeout(r, 100));
  return read(SETTINGS_KEY)[0] || null;
};

export const updateSettings = async (patch: any) => {
  const settings = read(SETTINGS_KEY);
  if (!settings[0]) settings[0] = { id: "S001", key: "business_name", value: "Collibet Tailoring" };
  settings[0] = { ...settings[0], ...patch };
  write(SETTINGS_KEY, settings);
  return settings[0];
};
