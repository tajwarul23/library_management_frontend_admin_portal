import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/Context/AppContext";

const ProtectedRoute = () => {
  const { admin,  isInitializing } = useContext(AuthContext);

  // wait until auth state is restored from localStorage
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;