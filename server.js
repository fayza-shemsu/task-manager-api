// server.js

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js"; 
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import errorHandler from "./middleware/errorHandler.js";



// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());
import morgan from "morgan";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); 
}

// Routes
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
