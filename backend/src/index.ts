import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


// Use the auth routes for any requests to /auth
app.use("/auth", authRoutes);

// Use the application routes for any requests to /api
app.use("/", applicationRoutes);



app.listen(5000, () => {
    console.log("Server running on port 5000");
});