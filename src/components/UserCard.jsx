import { Link } from "react-router-dom";

function UserCard({ user, onDeleteUser }) {
  return (
    <div className="relative flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md">
      <Link to={`/user/${user.id}`}>
        <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-50">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="mt-1 text-base font-semibold leading-6 text-slate-800">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-[13px] font-medium leading-5 text-slate-600">
          {user.email}
        </p>
        <p className="text-[13px] font-medium leading-5 text-slate-500">
          {user.phone}
        </p>
        <p className="text-[13px] font-medium leading-5 text-slate-600">
          {user.company?.name}
        </p>
      </Link>

      <button
        onClick={() => {
          const confirmed = window.confirm(
            `Are you sure you want to delete ${user.firstName} ${user.lastName}`,
          );

          if (confirmed) {
            onDeleteUser(user.id);
          }
        }}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
export default UserCard;
