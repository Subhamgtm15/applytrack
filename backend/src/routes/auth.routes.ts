import express from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { pool } from "../db"
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
    catch (error: any) {
        if (error.code === '23505') {
            return res.status(400).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "An error occurred while registering the user" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const queryText = 'SELECT user_id, password FROM users WHERE email = $1';
    const result = await pool.query(queryText, [email]);

    try{
        const result=await pool.query(queryText, [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user=result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password); // this give the result in boolean
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        return res.status(200).json({ message: "Login successful", userId: user.id });
    }
    catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An error occurred while logging in" });
    }
})

export default router;