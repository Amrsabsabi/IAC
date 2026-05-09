import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("admin_token");
  const profile = JSON.parse(localStorage.getItem("admin_profile") || "null");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (profile?.role !== "admin") {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_profile");

    return <Navigate to="/admin/login" replace />;
  }

  return children;
}