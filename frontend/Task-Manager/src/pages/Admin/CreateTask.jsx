import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import SelectDropDown from "../../components/Inputs/SelectDropDown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";

export default function CreateTask() {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueData: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  function handleValueChange(key, value) {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  }

  function clearData() {
    // reset form
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueData: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  }

  // Create Task
  async function createTask() {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist.map((item) => ({
        task: item,
        completed: false,
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueData).toISOString(),
        todoChecklist: todolist,
      });

      toast.success("Task created successfully");
      clearData();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  }

  // Update Task
  async function updateTask() {}

  async function handleSubmit() {
    setError(null);

    // validate inputs
    if (!taskData.title.trim()) {
      setError("Task Title is required");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Task Description is required");
      return;
    }
    if (!taskData.dueData) {
      setError("Due Date is required");
      return;
    }
    if (taskData.assignedTo.length === 0) {
      setError("Please assign the task to at least one user");
      return;
    }
    if (taskData.todoChecklist.length === 0) {
      setError("Please add at least one TODO task");
      return;
    }
    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  }

  // get task info by ID
  async function getTaskDetailsByID() {}

  // delete task
  async function deleteTask() {}
  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>

            {/* Title Input */}
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-600">
                Task Title
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Create App UI"
                value={taskData.title}
                onChange={(e) => handleValueChange("title", e.target.value)}
              />
            </div>

            {/* Description Input */}
            <div className="mt-3">
              <label className="text-xs font-semibold text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe Task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
              ></textarea>
            </div>

            {/* User Selection Input */}
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-semibold text-slate-600">
                  Priority
                </label>
                <SelectDropDown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  placeholder="Due Date"
                  className="form-input"
                  value={taskData.dueData}
                  onChange={(e) => handleValueChange("dueData", e.target.value)}
                  type="date"
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assigned To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>
            </div>

            {/* TODO Checklist Input */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                TODO Checklist
              </label>

              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>

            {/* Attachments Input */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>

              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
