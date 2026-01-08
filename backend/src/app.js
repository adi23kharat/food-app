// create server
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import foodpartnerRouter from "./routes/food-partner.routes.js";
import foodRouter from "./routes/food.routes.js";
import cors from "cors";

const app = express();

// ---------- CORS SETTINGS ----------
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL || "" // deployed frontend URL from environment
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allows cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---------- ROUTES ----------
app.use("/", authRouter);
app.use("/food", foodRouter);
app.use("/food-partner", foodpartnerRouter);
app.get("/", (req, res) => {
  res.send("API is running...");
});
export default app;
