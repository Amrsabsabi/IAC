import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("admin_profile") || "null");

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_profile");

    navigate("/admin/login");
  };

  return (
    <main className="min-h-screen bg-[#F4F7F6] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#155541]">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-[#5A4B3C]">
              Welcome, {profile?.name || "Admin"}
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-red-500 px-6 py-3 font-bold text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/admin/campaigns"
            className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="mb-3 text-2xl font-bold text-[#155541]">
              Campaigns
            </h2>
            <p className="leading-7 text-[#5A4B3C]">
              Add, edit, delete and manage all website campaigns.
            </p>
          </Link>

          <Link
            to="/admin/home-content"
            className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="mb-3 text-2xl font-bold text-[#155541]">
              Home Hero
            </h2>
            <p className="leading-7 text-[#5A4B3C]">
              Edit the homepage hero image, title and description.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}