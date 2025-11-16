import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuUsers } from "react-icons/lu";

export default function SelectUsers({ selectedUsers, setSelectedUsers }) {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  async function getAllUsers() {
    try {
      // Fetch all users from the API
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  function toggleUserSelection(userId) {
    setTempSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  }

  function handleAssign() {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  }

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImgUrl);
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }

    return () => {};
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModalOpen(true)}>
          <LuUsers className="text-sm" /> Add Members
        </button>
      )}
    </div>
  );
}
