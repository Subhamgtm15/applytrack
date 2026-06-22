import express from "express";
import cors from "cors";
import {pool} from "./db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.post("/", (req, res) => {
    res.send("Hello World!");

});

// Use the auth routes for any requests to /auth
app.use("/auth", authRoutes); 


// post new application endpoint
app.post("/applications", async (req, res) => { // This endpoint will receive the application data from the frontend and save it to the database. We will also add validation to ensure that the required fields are provided and handle any errors that may occur during the database insertion.
    const { company, role, location, jobType, salary, source, status, dateApplied, followUpDate, notes } = req.body;

    if (!company || !role || !location || !jobType || !status || !dateApplied) {
        return res.status(400).json({
            error: "Missing required fields."
        });
    }
    // Insert the application data into the database
    const insertQuery = `INSERT INTO applications (company, role, location, job_type, salary, source, status, date_applied, follow_up_date, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`; //returning * will return the inserted row, we can use this to send back the inserted application data in the response. 


    // The values array should match the order of the columns in the insert query
    const values = [company, role, location, jobType, salary, source, status, dateApplied, followUpDate||null, notes];
    try {
        const result = await pool.query(insertQuery, values);
        res.status(201).json({ message: "Application added successfully", application: result.rows[0] });
    }
    catch (error) {
        console.error("Error inserting application:", error);
        res.status(500).json({ error: "An error occurred while adding the application" });
    }
});


//for getting the applications 

app.get("/applications",async (req, res) => {
    const selectQuery=`
    SELECT * FROM applications 
    ORDER BY date_applied DESC`;
    try{
        const result=await pool.query(selectQuery);
        res.status(200).json({message:'application fetched' ,applications:result.rows});
    }
    catch(error){
        console.error("Error fetching applications:", error);
        res.status(500).json({error:"An error occurred while fetching applications"});
    }
})
//delete endpoint

app.delete("/applications/:id", async (req, res) => {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM applications WHERE id = $1 RETURNING *`;   
    try {
        const result =await pool.query(deleteQuery, [id]); 
        res.status(200).json({deletedApplication:result.rows[0], message: "Application deleted successfully" });
    }   
    catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({ error: "An error occurred while deleting the application" });
    }
});

//get application by id for edit page

app.get("/applications/:id",async(req,res)=>{
    const {id}=req.params;
    const updateQuery=`
    SELECT * FROM applications WHERE id=$1
    `;
    try{
        const result=await pool.query(updateQuery,[id]);
        if(result.rows.length===0){
            return res.status(404).json({error:"Application not found"});
        }
        console.log(result.rows[0]); // Log the retrieved application data to the console
        res.status(200).json({success:true,application:result.rows[0]}); 
    }
    catch(error){
        console.error("Error fetching application:", error);
        res.status(500).json({error:"An error occurred while fetching the application"});
    }
})

//update application endpoint

app.put("/applications/:id", async (req, res) => {
    const { id } = req.params;
    const { company, role, location, jobType, salary, source, status, dateApplied, followUpDate, notes } = req.body;        
    if (!company || !role || !location || !jobType || !status || !dateApplied) {
        return res.status(400).json({
            error: "Missing required fields."
        });
    }
    const updateQuery = `
    UPDATE applications
    SET company = $1, role = $2, location = $3, job_type = $4, salary = $5, source = $6, status = $7, date_applied = $8, follow_up_date = $9, notes = $10
    WHERE id = $11
    RETURNING *`;
    const values = [company, role, location, jobType, salary, source, status, dateApplied, followUpDate||null, notes, id];
    try {
        const result = await pool.query(updateQuery, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json({ message: "Application updated successfully", application: result.rows[0] });
    }
    catch (error) {
        console.error("Error updating application:", error);
        res.status(500).json({ error: "An error occurred while updating the application" });
    }
});



app.listen(5000, () => {
    console.log("Server running on port 5000");
});