// Frontend API client to call admin endpoints via server
// Uses JWT token stored in localStorage for authentication

const ADMIN_TOKEN_KEY = "collibet_admin_token";
const BASE_URL = "http://localhost:5000";

function getAuthHeaders() {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getOrdersByStatus(status?: string) {
    const url = status
        ? `${BASE_URL}/api/admin/orders?status=${encodeURIComponent(status)}`
        : `${BASE_URL}/api/admin/orders`;

    console.log("🔍 Fetching orders from server:", url);

    try {
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const error = await res.text();
            console.error("❌ Server error:", res.status, error);
            throw new Error(`Failed to fetch orders: ${res.status} ${error}`);
        }

        const data = await res.json();
        console.log("✅ Orders fetched from server:", data.orders?.length || 0, "orders");
        console.log("📋 Order data:", data.orders);
        return data.orders || [];
    } catch (err) {
        console.error("❌ Error fetching orders from server:", err);
        throw err;
    }
}

export async function updateOrderStatus(orderId: string, status: "new" | "progress" | "completed" | "cancelled") {
    const res = await fetch(`${BASE_URL}/api/admin/orders/${encodeURIComponent(orderId)}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to update status: ${res.status} ${error}`);
    }

    return await res.json();
}
