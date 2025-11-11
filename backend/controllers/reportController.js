const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

// @desc export all tasks as an Excel file
// @route GET /api/reports/export/tasks
// @access Private(Admin Only)
async function exportTasksReport(req, res) {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Report");

    worksheet.columns = [
      { header: "Task ID", key: "_id", width: 25 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Status", key: "status", width: 20 },
      { header: "Due Date", key: "dueDate", width: 20 },
      { header: "Assigned", key: "assignedTo", width: 30 },
    ];

    tasks.forEach((task) => {
      const assignedTo = task.assignedTo
        .map((user) => `${user.name} (${user.email})`)
        .join(", ");
      worksheet.addRow({
        _id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.toISOString().split("T")[0],
        assignedTo: task.assignedTo || "Unassigned",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="tasks_report.xlsx"'
    );

    return workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error exporting tasks", error: err.message });
  }
}
// @desc export all users as an Excel file
// @route GET /api/reports/export/users
// @access Private(Admin Only)
async function exportUsersReport(req, res) {
  try {
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error exporting users", error: err.message });
  }
}

module.exports = {
  exportTasksReport,
  exportUsersReport,
};
