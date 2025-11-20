import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleComplete,
} from "../controllers/taskController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// All routes below require user to be authenticated
router.use(auth);

// Create Task
router.post("/", createTask);

// Get All Tasks
router.get("/", getTasks);

// Get Single Task
router.get("/:id", getTaskById);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

// Toggle Complete / Incomplete
router.patch("/:id/toggle", toggleComplete);

export default router;
