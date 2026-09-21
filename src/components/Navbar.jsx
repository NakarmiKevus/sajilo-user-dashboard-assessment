import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
      <Link
        to="/"
        className="text-lg font-bold text-blue-600 whitespace-nowrap"
      >
        Sajilo Users
      </Link>
      <Link
        to="/add-user"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        + Add User
      </Link>
    </nav>
  );
}
export default Navbar;
