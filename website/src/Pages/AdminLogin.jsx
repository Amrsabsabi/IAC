import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  const clearAdminStorage = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_profile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      clearAdminStorage();

      const res = await api.post("/auth/login", form);

      const profile = res.data.profile;

      if (profile?.role !== "admin") {
        setError("Access denied. Admins only.");
        return;
      }

      localStorage.setItem("admin_token", res.data.access_token);
      localStorage.setItem("admin_user", JSON.stringify(res.data.user));
      localStorage.setItem("admin_profile", JSON.stringify(profile));

      navigate("/admin/campaigns");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F7F6] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-8 text-center text-3xl font-bold text-[#155541]">
          Admin Login
        </h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mb-5">
          <label className="mb-2 block font-bold text-[#3C3C3C]">Email</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#155541]"
          />
        </div>

        <div className="mb-7">
          <label className="mb-2 block font-bold text-[#3C3C3C]">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#155541]"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-[#155541] py-3 font-bold text-white transition hover:bg-[#157C5B] disabled:opacity-60"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </main>
  );
}