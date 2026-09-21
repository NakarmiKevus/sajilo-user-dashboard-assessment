import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../services/userService";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [actionMessage, setActionMessage] = useState("");
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError("");
      try {
        const data = await getAllUsers();
        setUsers(data.users || []);
      } catch (err) {
        setError("Unable to load users. Please try again");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function handleDeleteUser(id) {
    setActionMessage("");
    setActionType("");

    try {
      await deleteUser(id);
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
      setActionMessage("User deleted successfully");
      setActionType("success");
    } catch {
      setActionMessage("Unable to delete user");
      setActionType("error");
    }
  }

  return { users, loading, error, actionMessage, actionType, handleDeleteUser };
}
