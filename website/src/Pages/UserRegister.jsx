import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function UserRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F7F6] px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#155541]">
          Create Account
        </h1>

        {error && <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</p>}

        <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />

        <button
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-[#155541] py-3 font-bold text-white hover:bg-[#157C5B] disabled:opacity-60"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#155541] underline">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block font-bold text-[#3C3C3C]">{label}</label>
      <input className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#155541]" {...props} />
    </div>
  );
}