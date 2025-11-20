// server.js

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/auth.js";


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
