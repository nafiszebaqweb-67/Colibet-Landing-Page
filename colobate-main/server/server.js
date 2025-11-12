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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
