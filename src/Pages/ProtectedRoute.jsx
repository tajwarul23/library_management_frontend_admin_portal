import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/Context/AppContext";

const ProtectedRoute = () => {
  const { admin, loading } = useContext(AuthContext);

  // optional loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // not logged in → redirect
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  // logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;