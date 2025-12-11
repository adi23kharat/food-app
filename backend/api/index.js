import app from "../src/app.js";
import connectDB from "../src/db/db.js";
import serverless from "serverless-http";
import dotenv from "dotenv";

dotenv.config();

// Connect database only once
connectDB();

export const handler = serverless(app);
