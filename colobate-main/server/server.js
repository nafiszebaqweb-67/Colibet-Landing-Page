// Import dependencies
import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
    let payload = req.body || {};
    // Normalize inputs to avoid validation edge-cases
    payload.whatsappNumber = (payload.whatsappNumber || "").toString().trim();
    payload.email = payload.email ? payload.email.toString().trim() : "";

    // Basic server-side validation
    // Validate Indian mobile number: optional +91, 91 or 0 prefix, then 10 digits starting with 6-9
    const rawPhone = (payload.whatsappNumber || "").toString().trim();
    const phoneNorm = rawPhone.replace(/[^0-9+]/g, "");
    const indianRe = /^(?:\+91|91|0)?[6-9][0-9]{9}$/;
    if (!indianRe.test(phoneNorm)) {
        return res.status(400).json({ error: "Invalid whatsappNumber: must be a valid Indian mobile number (10 digits, may include +91/0/91 prefix)." });
    }
    if (payload.email) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(payload.email)) {
            return res.status(400).json({ error: "Invalid email address." });
        }
    }
    if (payload.pickupDate || payload.deliveryDate) {
        const p = new Date(payload.pickupDate);
        const d = new Date(payload.deliveryDate);
        if (isNaN(p.getTime()) || isNaN(d.getTime())) {
            return res.status(400).json({ error: "Invalid pickup/delivery date." });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (p < today) return res.status(400).json({ error: "Pickup date cannot be in the past." });
        if (d < p) return res.status(400).json({ error: "Delivery date cannot be before pickup date." });
    }

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
            try {
                await conn.query(
                    "UPDATE customers SET name = ?, email = ? WHERE id = ?",
                    [payload.fullName || null, payload.email || null, customerId]
                );
            } catch (err) {
                // If email column doesn't exist, fall back to updating only name
                if (err && err.code === "ER_BAD_FIELD_ERROR") {
                    await conn.query(
                        "UPDATE customers SET name = ? WHERE id = ?",
                        [payload.fullName || null, customerId]
                    );
                } else {
                    throw err;
                }
            }
        } else {
            // Try to insert with email column if available
            try {
                const [ins] = await conn.query(
                    "INSERT INTO customers (name, whatsapp_number, email, created_at) VALUES (?, ?, ?, NOW())",
                    [payload.fullName || null, payload.whatsappNumber, payload.email || null]
                );
                customerId = ins.insertId;
            } catch (err) {
                if (err && err.code === "ER_BAD_FIELD_ERROR") {
                    const [ins] = await conn.query(
                        "INSERT INTO customers (name, whatsapp_number, created_at) VALUES (?, ?, NOW())",
                        [payload.fullName || null, payload.whatsappNumber]
                    );
                    customerId = ins.insertId;
                } else {
                    throw err;
                }
            }
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

        // Configure SMTP transporter once (used for admin + customer notifications)
        const transporter = process.env.SMTP_HOST
            ? nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
                secure: process.env.SMTP_SECURE === "true",
                auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
            })
            : null;

        // Send one notification email to the configured admin address (if present)
        const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || null;
        if (adminEmail) {
            if (!transporter) {
                console.warn("⚠️ SMTP not configured; skipping admin notification email");
            } else {
                const subject = `New Order Received — #${orderId}`;
                const htmlParts = [];
                htmlParts.push(`<h2>New Order — ID ${orderId}</h2>`);
                htmlParts.push(`<p><strong>Name:</strong> ${payload.fullName || "-"}</p>`);
                htmlParts.push(`<p><strong>WhatsApp:</strong> ${payload.whatsappNumber || "-"}</p>`);
                htmlParts.push(`<p><strong>Email:</strong> ${payload.email || "-"}</p>`);
                htmlParts.push(`<p><strong>Category:</strong> ${payload.category || "-"}</p>`);
                htmlParts.push(`<p><strong>Garment:</strong> ${payload.garment || "-"}</p>`);
                htmlParts.push(`<p><strong>Fabric Type:</strong> ${payload.fabricType || "-"}</p>`);
                htmlParts.push(`<p><strong>Measurement Type:</strong> ${payload.measurementType || "-"}</p>`);
                htmlParts.push(`<p><strong>Pickup:</strong> ${payload.pickupDate || "-"} &mdash; <strong>Delivery:</strong> ${payload.deliveryDate || "-"}</p>`);
                htmlParts.push(`<p><strong>Address:</strong> ${payload.fullAddress || "-"}, ${payload.city || "-"} (${payload.pincode || "-"})</p>`);
                htmlParts.push(`<p><strong>Special Instructions:</strong> ${payload.specialInstructions || "-"}</p>`);
                if (Array.isArray(payload.files) && payload.files.length) {
                    htmlParts.push(`<h3>Files</h3><ul>`);
                    for (const f of payload.files) {
                        htmlParts.push(`<li>${f.name || f.url || "file"} (${f.type || "-"}) - ${f.url || "-"}</li>`);
                    }
                    htmlParts.push(`</ul>`);
                }

                try {
                    await transporter.sendMail({
                        from: process.env.SMTP_FROM || `no-reply@${process.env.SMTP_HOST || "example.com"}`,
                        to: adminEmail,
                        subject,
                        html: htmlParts.join("\n"),
                    });
                    console.log(`📧 Sent order notification to ${adminEmail} for order ${orderId}`);
                } catch (err) {
                    console.error("❌ Failed to send order notification email:", err);
                }
            }
        } else {
            console.warn("⚠️ ADMIN_NOTIFICATION_EMAIL not set; skipping admin email");
        }

        // Send a thank-you email to the customer if they provided an email
        if (payload.email) {
            if (!transporter) {
                console.warn("⚠️ SMTP not configured; skipping customer thank-you email");
            } else {
                const subject = `Thanks for your order — #${orderId}`;
                const html = `
                    <p>Hi ${payload.fullName || "Customer"},</p>
                    <p>Thank you for your order <strong>#${orderId}</strong>. We've received your request and our team will contact you on WhatsApp shortly to confirm pickup and measurements.</p>
                    <p><strong>Order summary</strong>: ${payload.category || "-"} — ${payload.garment || "-"}</p>

                    <p>Regards,<br/>The Team</p>
                `;

                try {
                    await transporter.sendMail({
                        from: process.env.SMTP_FROM || `no-reply@${process.env.SMTP_HOST || "example.com"}`,
                        to: payload.email,
                        subject,
                        html,
                    });
                    console.log(`📧 Sent thank-you email to customer ${payload.email} for order ${orderId}`);
                } catch (err) {
                    console.error("❌ Failed to send customer thank-you email:", err);
                }
            }
        }

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
        let query = `SELECT o.*, c.name AS customer_name, c.whatsapp_number, c.email AS customer_email
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
                const fallbackQuery = `SELECT o.*, c.name AS customer_name, c.whatsapp_number, c.email AS customer_email
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

// Admin: fetch customers (users) with order counts and total spent
app.get("/api/admin/users", authenticateAdmin, async (req, res) => {
    try {
        const query = `SELECT c.id, c.name, c.email, c.whatsapp_number, c.created_at,
            COUNT(o.id) AS orders_count,
            COALESCE(SUM(o.amount), 0) AS total_spent
            FROM customers c
            LEFT JOIN orders o ON o.customer_id = c.id
            GROUP BY c.id
            ORDER BY c.created_at DESC
            LIMIT 500`;

        const [rows] = await pool.query(query);
        return res.json({ users: rows || [] });
    } catch (err) {
        console.error("❌ Failed to fetch users for admin:", err);
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
