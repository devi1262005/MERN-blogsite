require ("dotenv").config();
const config =require("./config.json");
const mongoose=require("mongoose");
const bcrypt =require("bcrypt");
const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");


mongoose.connect(config.connectionString);
const User=require("./models/user_model");
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

app.get(
    "/create-account", async (req, res) => {
        const {fullName,email,password}=req.body;
        if(!fullName || !email || !password){
            return res
                .status(400)
                .json({error:true, message: "All fields must be filled"};)
        }
        
        });


app.listen(8000);
module.exports=app;        