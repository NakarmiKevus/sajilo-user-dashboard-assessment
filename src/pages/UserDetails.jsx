import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserById, deleteUser } from "../services/userService";

function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleting, setDeleting] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    async function fetchUsersById() {
      setLoading(true);
      setError("");

      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        setError("Unable to load user. Please try again");
      } finally {
        setLoading(false);
      }
    }
    fetchUsersById();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteUser(id);
      setActionMessage("User deleted successfully. Redirecting...");
      setActionType("success");
      setTimeout(() => navigate("/"), 1000);
    } catch {
      setActionMessage("Unable to delee user. Please try again.");
      setActionType("error");
      setDeleting(false);
    }
  }

  return (
    <section className="max-w-4xl mx-auto p-4 sm:p-6">
      {loading && (
        <p className="text-center text-slate-500 py-12">Loading user...</p>
      )}

      {error && <p className="text-center text-red-600 py-12">{error}</p>}

      {actionMessage && (
        <p
          className={`mb-4 rounded-lg px-4 py-3 text-sm text-center ${
            actionType === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {actionMessage}
        </p>
      )}

      {!loading && !error && user && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
            >
              ← Back to users
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:bg-slate-300"
            >
              {deleting ? "Deleting..." : "Delete User"}
            </button>
          </div>

          <div>
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-24 w-24 object-cover"
            />
            <p className="text-xl font-semibold text-slate-800">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-slate-500">{user.email}</p>
            <p className="text-sm text-slate-500">{user.phone}</p>
          </div>

          <div className="mt-6 grid grid-cols-[120px_1fr] gap-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm sm:p-6">
            <p className="font-medium text-slate-500 col-span-2 mb-1 text-base text-slate-800">
              Personal Info
            </p>
            <p className="font-medium text-slate-500">Gender</p>
            <p className="text-slate-700 capitalize">{user.gender}</p>
            <p className="font-medium text-slate-500">Age</p>
            <p className="text-slate-700 ">{user.age}</p>
            <p className="font-medium text-slate-500">Birth Date</p>
            <p className="text-slate-700 ">{user.birthDate}</p>
          </div>

          <div className="mt-6 grid grid-cols-[120px_1fr] gap-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm sm:p-6">
            <p className="font-medium text-slate-500 col-span-2 mb-1 text-base text-slate-800">
              Address
            </p>
            <p className="font-medium text-slate-500">Street</p>
            <p className="text-slate-700 ">{user.address?.address}</p>
            <p className="font-medium text-slate-500">City</p>
            <p className="text-slate-700 ">{user.address?.city}</p>
            <p className="font-medium text-slate-500">State</p>
            <p className="text-slate-700 ">{user.address?.state}</p>
            <p className="font-medium text-slate-500">Postal Code</p>
            <p className="text-slate-700 ">{user.address?.postalCode}</p>
          </div>

          <div className="mt-6 grid grid-cols-[120px_1fr] gap-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm sm:p-6">
            <p className="font-medium text-slate-500 col-span-2 mb-1 text-base text-slate-800">
              Company
            </p>
            <p className="font-medium text-slate-500">Name</p>
            <p className="text-slate-700 ">{user.company?.name}</p>
            <p className="font-medium text-slate-500">Title</p>
            <p className="text-slate-700 ">{user.company?.title}</p>
            <p className="font-medium text-slate-500">Department</p>
            <p className="text-slate-700 ">{user.company?.department}</p>
          </div>

          <div className="mt-6 grid grid-cols-[120px_1fr] gap-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm sm:p-6">
            <p className="font-medium text-slate-500 col-span-2 mb-1 text-base text-slate-800">
              Bank
            </p>
            <p className="font-medium text-slate-500">Card Type</p>
            <p className="text-slate-700 ">{user.bank?.cardType}</p>
            <p className="font-medium text-slate-500">Card Number</p>
            <p className="text-slate-700 ">{user.bank?.cardNumber}</p>
            <p className="font-medium text-slate-500">Currency</p>
            <p className="text-slate-700 ">{user.bank?.currency}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default UserDetails;
