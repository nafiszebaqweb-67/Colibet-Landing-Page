// Import dependencies
import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";

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

        // Insert order
        const [orderInsert] = await conn.query(
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
