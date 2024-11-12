require("dotenv").config();
const config = require('./config.json');
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

app.post("/create_account", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: true, message: "All fields must be filled" });
        }

        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await user.save();

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "72h" }
        );

        return res.status(201).json({
            error: false,
            user: { fullName: user.fullName, email: user.email },
            accessToken,
            message: "Registration successful"
        });

    } catch (error) {
        console.error("Error during account creation:", error);
        return res.status(500).json({ error: true, message: "Something went wrong, please try again." });
    }
});

app.post("/login", async (req, res) => {
    const{email,password}=req.body;
    



));



app.listen(8000, () => {
    console.log('Server running on port 8000');
});

module.exports = app;
