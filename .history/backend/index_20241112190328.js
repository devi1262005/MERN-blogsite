require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

mongoose.connect(config.connectionString);
const User = require("./models/user_model");  

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Create Account Route
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    // Validate input fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields must be filled" });
    }

    // Check if user already exists
    const isUser = await User.findOne({ email });
    if (isUser) {
        return res.status(400).json({ error: true, message: "User already exists" });
    }

    // Hash password (optional, but recommended)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        return res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Server error" });
    }
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});

module.exports = app;
