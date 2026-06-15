import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.post("/", (req, res) => {
    res.send("Hello World!");

});
// Temporary endpoint to test receiving application data
app.post("/applications", async (req, res) => {
    const { company, role, location, jobType, salary, source, status, dateApplied, followUpDate, notes } = req.body;

    if (!company || !role || !location || !jobType || !status || !dateApplied) {
        return res.status(400).json({
            error: "Missing required fields. Please provide company, role, location, jobType, status and dateApplied."
        });
    }
    // Insert the application data into the database
    const insertQuery = `INSERT INTO applications (company, role, location, job_type, salary, source, status, date_applied, follow_up_date, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    // The values array should match the order of the columns in the insert query
    const values = [company, role, location, jobType, salary, source, status, dateApplied, followUpDate, notes];
    try {
        const result = await pool.query(insertQuery, values);
        res.status(201).json({ message: "Application added successfully", application: result.rows[0] });
    }
    catch (error) {
        console.error("Error inserting application:", error);
        res.status(500).json({ error: "An error occurred while adding the application" });
    }
});
// Test the database connection
// pool.query("SELECT NOW()")
//   .then((res) => {
//     console.log("Database connected!");
//     console.log(res.rows[0]);
//   })
//   .catch((err) => {
//     console.error("Database connection failed:");
//     console.error(err);
//   });
app.listen(5000, () => {
    console.log("Server running on port 5000");
});