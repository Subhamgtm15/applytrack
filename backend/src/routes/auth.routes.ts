import { pool } from "../db";
import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();


router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = `INSERT INTO users ("fullName", email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [fullName, email, hashedPassword];
    try {
        const result = await pool.query(insertQuery, values);
        const { password: _, ...safeUser } = result.rows[0];  // Exclude the password from the response
        res.status(201).json({ message: 'User registered successfully', user: safeUser });
    }
    catch (error:any) {
        if (error.code === '23505') {
            return res.status(400).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "An error occurred while registering the user" });
    }
});

export default router;