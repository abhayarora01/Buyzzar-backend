const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('../config/db');
const router = require('../routes');

const app = express();

// -------------------------
// 🔥 FIX 1: Correct CORS for Vercel
// -------------------------
app.use(cors({
    origin: process.env.FRONTEND_URL,         // "https://buyzzar-frontend.vercel.app"
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// -------------------------
// ⚠️ FIX 2: Very Important for Cookies with Vercel
// -------------------------
app.options("*", cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// -------------------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// -------------------------
// 🔥 FIX 3: Set secure cookies globally
// -------------------------
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// -------------------------
app.use("/api", router);

connectDB();

module.exports = app;
