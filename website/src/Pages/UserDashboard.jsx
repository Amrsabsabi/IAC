import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("user_profile") || "null");

  const logout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_profile");
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-[#F4F7F6] px-4 py-16">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-4 text-3xl font-bold text-[#155541]">
          User Dashboard
        </h1>

        <p className="mb-2 text-lg">
          Name: <strong>{profile?.name}</strong>
        </p>

        <p className="mb-2 text-lg">
          Email: <strong>{profile?.email}</strong>
        </p>

        <p className="mb-8 text-lg">
          Role: <strong>{profile?.role}</strong>
        </p>

        <button
          onClick={logout}
          className="rounded-xl bg-[#155541] px-6 py-3 font-bold text-white hover:bg-[#157C5B]"
        >
          Logout
        </button>
      </div>
    </main>
  );
}