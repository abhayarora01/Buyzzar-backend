const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('../config/db');
const router = require('../routes');

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// DO NOT use /api prefix
// Vercel already adds /api automatically
app.use(router);

connectDB();

module.exports = app;
