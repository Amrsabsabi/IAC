import { Navigate } from "react-router-dom";
import { useAppAuth } from "../context/AuthContext";

export default function AuthRedirect() {
  const { loading, isSignedIn, isAdmin } = useAppAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F7F6]">
        <p className="text-lg font-semibold text-[#155541]">Loading...</p>
      </main>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/donor" replace />;
}