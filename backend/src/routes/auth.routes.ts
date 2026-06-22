import { pool } from "../db";
import express from "express";
const router=express.Router();


router.post("/signup",async(req,res)=>{
    const {fullName,email,password}=req.body;
    if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    // Here you would typically add logic to save the user to a database
    const insertQuery=`INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *`;
    const values=[fullName,email,password];
    try{
        const result=await pool.query(insertQuery,values);
        res.status(201).json({message:'User registered successfully', user: result.rows[0]});
    }
    catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({message:"An error occurred while registering the user"});
    }
});

export default router;