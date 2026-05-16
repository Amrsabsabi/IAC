import { Navigate } from "react-router-dom";
import { useAppAuth } from "../context/AuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { loading, isSignedIn, isAdmin } = useAppAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-[#155541]">
          Loading...
        </p>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}