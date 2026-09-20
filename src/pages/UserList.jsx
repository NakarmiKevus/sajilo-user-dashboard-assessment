import UserGrid from "../components/UserGrid";
import { useUsers } from "../hooks/useUsers";

function UserList() {
  const { users, loading, error } = useUsers();

  return (
    <section className="max-w-7xl mx-auto p-4 sm:p-6">
      {loading && (
        <p className="text-center text-slate-500 py-12">Loading users...</p>
      )}

      {error && <p className="text-center text-red-600 py-12">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="text-center text-red-600 py-12">No users found.</p>
      )}

      {!loading && !error && users.length > 0 && <UserGrid users={users} />}
    </section>
  );
}
export default UserList;
