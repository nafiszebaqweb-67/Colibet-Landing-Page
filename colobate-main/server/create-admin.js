import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

dotenv.config();

async function main() {
    const username = process.argv[2];
    const password = process.argv[3];
    if (!username || !password) {
        console.error('Usage: node create-admin.js <username> <password>');
        process.exit(2);
    }

    const hash = bcrypt.hashSync(password, 10);
    console.log('Generated bcrypt hash:', hash);

    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 5,
    });

    try {
        const [result] = await pool.query(
            `INSERT INTO admins (username, password_hash, role, created_at)
       VALUES (?, ?, 'admin', NOW())
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
            [username, hash]
        );

        console.log('Admin upserted. DB result:', result);
    } catch (err) {
        console.error('Failed to insert admin:', err);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

main();
