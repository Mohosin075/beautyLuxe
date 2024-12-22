import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

function SellerRoutes({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (user && user?.role === "seller") {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace />;
}

export default SellerRoutes;
