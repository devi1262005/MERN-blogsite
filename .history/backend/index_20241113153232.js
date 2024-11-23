require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const User = require("./models/user_model");
const BlogStory = require("./models/blog_model");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Endpoint for creating an account
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

// Endpoint for login
app.post("/login", async (req, res) => {
    try {
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
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: true, message: "Something went wrong during login." });
    }
});

// Endpoint to add a blog story
app.post("/add_blog_story", authenticateToken, async (req, res) => {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));
    try {
        const blogStoryEntry = new BlogStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate,
        });
        await blogStoryEntry.save();
        return res.json({ story: blogStoryEntry, message: "Blog story added successfully" });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
});

// Endpoint to get all stories
app.get("/get_all_stories", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    try {
        const blogStories = await BlogStory.find({ userId: userId }).sort({ isFavorite: -1 });
        res.status(200).json({ stories: blogStories });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

// Image upload endpoint
app.post("/image_upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: true, message: "No image was uploaded" });
        }
        const imgUrl = `http://localhost:8000/uploads/${req.file.filename}`;
        res.status(201).json({ imgUrl });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

// Endpoint to delete an image
app.delete("/delete_image", async (req, res) => {
    const { imgUrl } = req.query;
    if (!imgUrl) {
        return res.status(400).json({ error: true, message: "Image parameter required" });
    }
    try {
        const filename = path.basename(imgUrl);
        const filePath = path.join(__dirname, 'uploads', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({ message: "Image deleted successfully" });
        } else {
            res.status(404).json({ message: "Image not found" });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    } 
});

// Edit Travel Story API
app.post('/edit_story/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const userId = req.user.userId; // Extract userId from req.user object

    // Validate required fields
    if (!title || !story || !visitedLocation || !visitedDate) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    // Convert visitedDate from milliseconds to Date object
    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try {
        // Find the travel story by ID and ensure it belongs to the authenticated user
        const blogStory = await BlogStory.findOne({ _id: id, userId: userId });
        
        if (!blogStory) {
            return res.status(404).json({ error: true, message: "Travel story not found" });
        }

        // Update the travel story fields
        blogStory.title = title;
        blogStory.story = story;
        blogStory.visitedLocation = visitedLocation;
        blogStory.imageUrl = imageUrl; // Fallback to placeholder if imageUrl is missing
        blogStory.visitedDate = parsedVisitedDate;

        // Save the updated travel story
        await blogStory.save();

        res.status(200).json({ story: blogStory, message: "Update Successful" });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});


app.post('/edit_story/:id', authenticateToken, async (req, res) => {
    const{id}=req.params;
    const{userId}=req.user;
    try{
        const travelStory=await BlogStory.findOne({_id:id, userId:userId});
        if(!travelStory){
            return res
            .status(404)
            .json({error:true, message:"Blog story not found"});
            
        }
    }



module.exports = app;

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.listen(8000);
module.exports = app;
