const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getDasboardData,
  getUserDasboardData,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../controllers/taskController");

const router = express.Router();

//Task Management Routes
router.get("/dashboard-data", protect, getDasboardData);
router.get("/user-dashboard-data", protect, getUserDasboardData);
router.get("/", protect, getTasks); // Get all tasks (Admin: all / User: assigned)
router.get("/:id", protect, getTaskById); // Get a specific task
router.post("/", protect, adminOnly, createTask); // Creat a new task (Admin Only)
router.put("/:id", protect, updateTask); // Update task details
router.delete("/:id", protect, adminOnly, deleteTask); // Delete task (Admin Only)
router.put("/:id/status", protect, updateTaskStatus); // Update task status
router.put("/:id/todo", protect, updateTaskChecklist); // Update task checklist

module.exports = router;
