import Task from "../models/Task.js";


export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      user: req.user._id, // user from auth middleware
      title,
      description,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// GET ALL TASKS FOR LOGGED-IN USER
// ==========================
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// GET SINGLE TASK BY ID
// ==========================
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    console.error("Get Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// UPDATE TASK
// ==========================
export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// DELETE TASK
// ==========================
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// TOGGLE COMPLETE STATUS
// ==========================
export const toggleComplete = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      message: `Task marked as ${task.completed ? "completed" : "incomplete"}`,
      task,
    });
  } catch (error) {
    console.error("Toggle Complete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
