import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return { users, loading, error };
}
