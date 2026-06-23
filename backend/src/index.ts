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
app.post("/", (req, res) => {
    res.send("Hello World!");

});

// Use the auth routes for any requests to /auth
app.use("/auth", authRoutes);
app.use("/api", applicationRoutes);



app.listen(5000, () => {
    console.log("Server running on port 5000");
});