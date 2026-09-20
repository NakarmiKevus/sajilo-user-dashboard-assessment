import { useState } from "react";
import UserGrid from "../components/UserGrid";
import { useUsers } from "../hooks/useUsers";

function UserList() {
  const { users, loading, error } = useUsers();

  const [searchUser, setSearchUser] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchedSearch = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchUser.toLowerCase());
    return matchedSearch;
  });

  return (
    <section className="max-w-7xl mx-auto p-4 sm:p-6">
      {loading && (
        <p className="text-center text-slate-500 py-12">Loading users...</p>
      )}

      {error && <p className="text-center text-red-600 py-12">{error}</p>}

      <input
        type="text"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        placeholder="Search users..."
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />

      {!loading && !error && users.length === 0 && (
        <p className="text-center text-red-600 py-12">No users found.</p>
      )}

      {!loading && !error && users.length > 0 && filteredUsers.length === 0 && (
        <p className="text-center text-red-600 py-12">
          No users found matching your search
        </p>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <UserGrid users={filteredUsers} />
      )}
    </section>
  );
}
export default UserList;
