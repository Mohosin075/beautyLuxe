import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

function BuyerRoutes({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || !role) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (user && role === "buyer") {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace />;
}

export default BuyerRoutes;
