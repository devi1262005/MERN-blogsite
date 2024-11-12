require ("dotenv").config();
import { connectionString } from "./config.json";
import { connect } from "mongoose";
import bcrypt from "bcrypt";
import express, { json } from "express";
import cors from "cors";

import jwt from "jsonwebtoken";

connect(connectionString);

const app = express();
app.use(json());
app.use(cors({origin:"*"}));

app.get(
    "/create-account", async (req, res) => {
        
        });


app.listen(8000);
export defaultapp;        