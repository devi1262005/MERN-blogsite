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

// Fixed issues below
app.get("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields must be filled" }); // Fixed syntax error (removed the semicolon and added closing parenthesis)
    }

    const isUser = await User.findOne({ email }); // Corrected to `User.findOne({ email })` instead of `User.User.findOne({ email })`

    if (isUser) {
        return res.status(400).json({ error: true, message: "User already exists" }); // Fixed missing quote at the end of the message
    }
});

app.listen(8000);
module.exports = app;
