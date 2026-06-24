import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthRequest } from "../types/authRequest";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// POST /signup endpoint for user registration
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


// POST /login endpoint for user authentication
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const queryText = 'SELECT user_id, password FROM users WHERE email = $1';

    try {
        const result = await pool.query(queryText, [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password); // this give the result in boolean
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Generate JWT token
        const jwtToken = jwt.sign(
            { userId: user.user_id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );
        // Set the token in an HTTP-only cookie
        res.cookie("token", jwtToken, {
            httpOnly: true, // prevents client-side JavaScript from accessing the cookie
            secure: false, //for local development false is fine, set to true in production with HTTPS
            sameSite: "lax",
            maxAge: 60 * 60 * 1000, //browser delete cookie time
        });
        return res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An error occurred while logging in" });
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
});

// GET /me - fetch the currently logged-in user
router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
    const userId = req.user.userId;
    const selectQuery = `SELECT "fullName" FROM users WHERE user_id = $1`;
    try {
        const result = await pool.query(selectQuery, [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "user found", user:result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the user" });
    }
});

export default router;