const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

app.post(
    "\hello", async (req, res) => {
        return res.status(200).json({message: "Hello}));
)