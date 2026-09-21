import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "male",
    age: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  function validation() {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (Number(formData.age) <= 0 || Number(formData.age) > 120) {
      newErrors.age = "Enter a valid age";
    }
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validation();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await createUser({
        ...formData,
        age: Number(formData.age),
      });
      navigate("/");
    } catch (err) {
      setError("Unable to add user. Please try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-7xl mx-auto p-4 sm:p-6">
      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-600"> {errors.firstName}</p>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-600"> {errors.lastName}</p>
          )}
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone number..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600"> {errors.phone}</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600"> {errors.email}</p>
          )}
        </div>

        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          {errors.age && (
            <p className="mt-1 text-xs text-red-600"> {errors.age}</p>
          )}
        </div>

        <div className="flex items-center gap-6">
          <label>Select Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {submitting ? "Adding..." : "Add User"}
        </button>
      </form>
    </section>
  );
}

export default AddUser;
