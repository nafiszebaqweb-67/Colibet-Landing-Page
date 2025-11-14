// Import dependencies
import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Load environment variables
dotenv.config();

// Validate required envs
const requiredEnvs = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
requiredEnvs.forEach((k) => {
    if (!process.env[k]) console.warn(`⚠️  Environment variable ${k} is not set`);
});

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// MySQL Pool (promise API)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// JWT secret for admin auth
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "dev_admin_secret";

// Simple test route (async/await)
app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT NOW() AS time");
        // rows may be an array; pick first row
        const first = Array.isArray(rows) && rows.length ? rows[0] : rows;
        return res.json({ message: "Database Connected Successfully", server_time: first.time });
    } catch (err) {
        console.error("❌ Test query failed:", err);
        return res.status(500).json({ error: err?.message || String(err) });
    }
});

// Create order endpoint
// Expects JSON body with shape matching the front-end FormData (file fields should be URLs or filenames)
app.post("/api/orders", async (req, res) => {
    const payload = req.body;

    /* Expected payload (example):
        {
            fullName: string,
            whatsappNumber: string,
            category: 'Men'|'Women'|'Kids',
            garment: string,
            fabricType: 'own'|'store',
            designFileUrl?: string,
            measurementType: 'executive'|'chart',
            measurementAddress?: string,
            measurementDate?: string,
            measurementChartUrl?: string,
            fullAddress: string,
            city: string,
            pincode: string,
            landmark?: string,
            pickupDate: string,
            deliveryDate: string,
            specialInstructions?: string
        }
    */

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // Upsert customer by whatsapp number
        const [existing] = await conn.query(
            "SELECT id FROM customers WHERE whatsapp_number = ? LIMIT 1",
            [payload.whatsappNumber]
        );

        let customerId;
        if (Array.isArray(existing) && existing.length > 0) {
            customerId = existing[0].id;
            // update name if changed
            await conn.query(
                "UPDATE customers SET name = ? WHERE id = ?",
                [payload.fullName || null, customerId]
            );
        } else {
            const [ins] = await conn.query(
                "INSERT INTO customers (name, whatsapp_number, created_at) VALUES (?, ?, NOW())",
                [payload.fullName || null, payload.whatsappNumber]
            );
            customerId = ins.insertId;
        }

        // Insert order. Try to include status column; fall back if DB schema doesn't have it yet.
        let orderInsert;
        try {
            [orderInsert] = await conn.query(
                `INSERT INTO orders (
                    customer_id, category, garment, fabric_type, design_file_url,
                    measurement_type, measurement_address, measurement_date, measurement_chart_url,
                    full_address, city, pincode, landmark, pickup_date, delivery_date, special_instructions, status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
                [
                    customerId,
                    payload.category || null,
                    payload.garment || null,
                    payload.fabricType || null,
                    payload.designFileUrl || null,
                    payload.measurementType || null,
                    payload.measurementAddress || null,
                    payload.measurementDate || null,
                    payload.measurementChartUrl || null,
                    payload.fullAddress || null,
                    payload.city || null,
                    payload.pincode || null,
                    payload.landmark || null,
                    payload.pickupDate || null,
                    payload.deliveryDate || null,
                    payload.specialInstructions || null,
                    "new", // default status for new orders
                ]
            );
        } catch (err) {
            // If status column doesn't exist, fall back to old insert (migration not yet run)
            if (err && err.code === "ER_BAD_FIELD_ERROR") {
                console.warn("⚠️  Status column not found on orders table. Please run migration: server/migrations/001-add-order-status.sql");
                [orderInsert] = await conn.query(
                    `INSERT INTO orders (
                        customer_id, category, garment, fabric_type, design_file_url,
                        measurement_type, measurement_address, measurement_date, measurement_chart_url,
                        full_address, city, pincode, landmark, pickup_date, delivery_date, special_instructions, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
                    [
                        customerId,
                        payload.category || null,
                        payload.garment || null,
                        payload.fabricType || null,
                        payload.designFileUrl || null,
                        payload.measurementType || null,
                        payload.measurementAddress || null,
                        payload.measurementDate || null,
                        payload.measurementChartUrl || null,
                        payload.fullAddress || null,
                        payload.city || null,
                        payload.pincode || null,
                        payload.landmark || null,
                        payload.pickupDate || null,
                        payload.deliveryDate || null,
                        payload.specialInstructions || null,
                    ]
                );
            } else {
                throw err;
            }
        }

        const orderId = orderInsert.insertId;

        // Optionally handle files metadata array if provided
        if (Array.isArray(payload.files) && payload.files.length) {
            const fileInserts = payload.files.map((f) => [orderId, f.type || null, f.name || null, f.url || null]);
            await conn.query(
                "INSERT INTO files (order_id, file_type, file_name, file_url) VALUES ?",
                [fileInserts]
            );
        }

        await conn.commit();
        return res.status(201).json({ ok: true, orderId });
    } catch (err) {
        await conn.rollback();
        console.error("❌ Failed to save order:", err);
        return res.status(500).json({ error: err?.message || String(err) });
    } finally {
        conn.release();
    }
});

// --- Admin authentication and dashboard endpoints ---

// Simple admin login: returns JWT on success
app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: "username and password required" });

    try {
        const [rows] = await pool.query("SELECT id, password_hash, role FROM admins WHERE username = ? LIMIT 1", [username]);
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const admin = rows[0];
        // Helpful debug info (no plain password printed): show id, hash prefix and length
        console.log("Admin login attempt:", { username, id: admin.id, hashPrefix: (admin.password_hash || "").slice(0, 4), hashLen: (admin.password_hash || "").length });
        // bcryptjs provides a synchronous compare helper which is reliable cross-platform
        const match = bcrypt.compareSync(password, admin.password_hash);
        console.log("bcrypt compare result:", match);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ adminId: admin.id, username, role: admin.role }, JWT_SECRET, { expiresIn: "8h" });
        return res.json({ token });
    } catch (err) {
        console.error("❌ Admin login error:", err);
        return res.status(500).json({ error: err?.message || String(err) });
    }
});

// Middleware to protect admin routes (optional for demo - allow requests without token)
function authenticateAdmin(req, res, next) {
    const auth = req.headers.authorization;
    
    // If no token, just continue (demo mode)
    if (!auth || !auth.startsWith("Bearer ")) {
        console.log("⚠️  No auth header, continuing in demo mode");
        req.admin = { demo: true };
        return next();
    }
    
    const token = auth.slice(7);
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.admin = payload;
        return next();
    } catch (err) {
        console.log("⚠️  Invalid token, continuing in demo mode");
        req.admin = { demo: true };
        return next();
    }
}

// Example protected route: get recent orders for admin dashboard
// Fetches orders with customer info and files attached
app.get("/api/admin/orders", authenticateAdmin, async (req, res) => {
    try {
        const status = req.query.status ? String(req.query.status) : null;
        
        // Main query: get orders with customer info
        let query = `SELECT o.*, c.name AS customer_name, c.whatsapp_number
             FROM orders o
             LEFT JOIN customers c ON o.customer_id = c.id`;
        
        const params = [];
        if (status) {
            query += ` WHERE COALESCE(o.status, 'new') = ?`;
            params.push(status);
        }
        
        query += ` ORDER BY o.created_at DESC LIMIT 500`;
        
        try {
            const [rows] = await pool.query(query, params);
            console.log(`✅ Fetched ${rows.length} orders (status filter: ${status || 'all'})`);
            
            // For each order, fetch associated files
            const ordersWithFiles = await Promise.all(
                rows.map(async (order) => {
                    try {
                        const [files] = await pool.query(
                            `SELECT * FROM files WHERE order_id = ?`,
                            [order.id]
                        );
                        return {
                            ...order,
                            files: files || []
                        };
                    } catch (err) {
                        console.warn(`⚠️  Could not fetch files for order ${order.id}:`, err.message);
                        return {
                            ...order,
                            files: []
                        };
                    }
                })
            );
            
            return res.json({ orders: ordersWithFiles });
        } catch (err) {
            // If COALESCE fails, the column doesn't exist. Fall back to basic query
            if (err && err.code === "ER_BAD_FIELD_ERROR") {
                console.warn("⚠️  Status column not found. Using fallback query.");
                const fallbackQuery = `SELECT o.*, c.name AS customer_name, c.whatsapp_number
                     FROM orders o
                     LEFT JOIN customers c ON o.customer_id = c.id
                     ORDER BY o.created_at DESC LIMIT 500`;
                
                const [rows] = await pool.query(fallbackQuery);
                console.log(`✅ Fetched ${rows.length} orders (fallback, no status column)`);
                
                // Attach files for each order
                const ordersWithFiles = await Promise.all(
                    rows.map(async (order) => {
                        try {
                            const [files] = await pool.query(
                                `SELECT * FROM files WHERE order_id = ?`,
                                [order.id]
                            );
                            return {
                                ...order,
                                files: files || []
                            };
                        } catch (err) {
                            return {
                                ...order,
                                files: []
                            };
                        }
                    })
                );
                
                return res.json({ orders: ordersWithFiles });
            }
            throw err;
        }
    } catch (err) {
        console.error("❌ Failed to fetch orders for admin:", err);
        return res.status(500).json({ error: err?.message || String(err) });
    }
});

// Update order status endpoint
app.patch("/api/admin/orders/:id/status", authenticateAdmin, async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body || {};
    
    const validStatuses = ["new", "progress", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Allowed: ${validStatuses.join(", ")}` });
    }
    
    try {
        const [result] = await pool.query(
            `UPDATE orders SET status = ? WHERE id = ?`,
            [status, orderId]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Order not found" });
        }
        
        return res.json({ ok: true, message: `Order status updated to ${status}` });
    } catch (err) {
        console.error("❌ Failed to update order status:", err);
        return res.status(500).json({ error: err?.message || String(err) });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
