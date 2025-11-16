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

export default function CreateTask() {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueData: null,
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
  async function createTask() {}

  // Update Task
  async function updateTask() {}

  async function handleSubmit() {}

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
                  setSelectedUser={(e) =>
                    handleValueChange("assignedTo", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
