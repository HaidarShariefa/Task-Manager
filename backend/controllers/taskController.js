const Task = require("../models/Task");

// @desc Get all tasks (Admin: all / User: only assigned)
// @route GET /api/tasks
// @access Private
async function getTasks(req, res) {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImgUrl"
      );
    } else {
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImgUrl"
      );
    }

    // Add completed todoChecklist count
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoChecklist.filter(
          (item) => item.completed
        ).length;
        return { ...task._doc, completedTodoCount: completedCount };
      })
    );

    // Status Summary Count
    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "In Progress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.json({
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// @desc task by id
// @route GET /api/tasks/:id
// @access Private
async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImgUrl"
    );

    if (!task) {
      return res.statu(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// @desc Create a new task
// @route POST /api/tasks
// @access Private (Admin Only)
async function createTask(req, res) {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      attachments,
      todoChecklist,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// @desc Update task details
// @route PUT /api/tasks/:id
// @access Private
async function updateTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "assignedTo must be an array of user ids" });
      }
      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = task.save();
    res.json({ message: "Task updated successfully", updateTask });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// @desc Delete a task
// @route DELETE /api/tasks/:id
// @access Private (Admin Only)
async function deleteTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// @desc Update task status
// @route PUT /api/tasks/:id/status
// @access Private
async function updateTaskStatus(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isAssigned && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not Authorized" });
    }

    task.status = req.body.status || task.status;

    if (task.status === "Completed") {
      task.todoChecklist.forEach((item) => (item.completed = true));
      task.progress = 100;
    }

    await task.save();
    res.json({ message: "Task status updated", task });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// @desc Update task checklist
// @route PUT /api/tasks/:id/todo
// @access Private
async function updateTaskChecklist(req, res) {
  try {
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// @desc Dashboard Data (Admin)
// @route GET /api/tasks/dashboard-data
// @access Private (Admin Only)
async function getDasboardData(req, res) {
  try {
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// @desc User Dashboard Data (User)
// @route GET /api/tasks/user-dashboard-data
// @access Private
async function getUserDasboardData(req, res) {
  try {
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDasboardData,
  getUserDasboardData,
};
