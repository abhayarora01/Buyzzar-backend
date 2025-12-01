const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("⚡ Already connected to MongoDB");
    return;
  }

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is missing from Environment Variables!");
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState;
    console.log("✅ MongoDB Connected on Vercel");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    // DO NOT EXIT PROCESS — breaks serverless functions
  }
}

module.exports = connectDB;
