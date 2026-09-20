import { useEffect, useState } from "react";
import UserGrid from "../components/UserGrid";
import { useUsers } from "../hooks/useUsers";
import Pagination from "../components/Pagination";

function UserList() {
  const { users, loading, error } = useUsers();

  const [searchUser, setSearchUser] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const userPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    const matchedSearch = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchUser.toLowerCase());
    const matchedGender =
      selectedGender === "" || user.gender === selectedGender;
    return matchedSearch && matchedGender;
  });

  const totalPages = Math.ceil(filteredUsers.length / userPerPage);
  const startIndex = (currentPage - 1) * userPerPage;
  const paginationUser = filteredUsers.slice(
    startIndex,
    startIndex + userPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchUser, selectedGender]);

  return (
    <section className="max-w-7xl mx-auto p-4 sm:p-6">
      {loading && (
        <p className="text-center text-slate-500 py-12">Loading users...</p>
      )}

      {error && <p className="text-center text-red-600 py-12">{error}</p>}

      <div className="flex  gap-3 mb-6">
        <input
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Search users..."
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />

        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {!loading && !error && users.length === 0 && (
        <p className="text-center text-red-600 py-12">No users found.</p>
      )}

      {!loading && !error && users.length > 0 && filteredUsers.length === 0 && (
        <p className="text-center text-red-600 py-12">
          No users found matching your search
        </p>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <>
          <UserGrid users={paginationUser} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}
export default UserList;
