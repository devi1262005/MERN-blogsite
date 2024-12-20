require("dotenv").config();
const config = require('./config.json');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

// Connect to MongoDB
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const User = require("./models/user_model");
const BlogStory = require("./models/blog_l"); // Ensure BlogStory model is correctly imported

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Create Account Route
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

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: true, message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: true, message: "User does not exist." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: true, message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "72h" }
    );

    return res.json({
        error: false,
        message: "Login Successful",
        user: { fullName: user.fullName, email: user.email },
        accessToken,
    });
});

// Get User Route (Protected)
app.get("/get_user", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(401).json({ error: true, message: "User not found" });
    }
    return res.json({
        user: { fullName: user.fullName, email: user.email },
        message: "User details retrieved successfully",
    });
});

// Add Blog Story Route (Protected)
app.post("/add_blog_story", authenticateToken, async (req, res) => {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try {
        const blogStory = new BlogStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate,
        });
        await blogStory.save();
        return res.json({ story: blogStory, message: "Blog story added successfully" });
    } catch (error) {
        console.error("Error adding blog story:", error);
        res.status(500).json({ error: true, message: "Could not add blog story, please try again." });
    }
});

// Start the Server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;
