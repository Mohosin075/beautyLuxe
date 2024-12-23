import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserFromDB from "../hooks/useUserFromDB";

function BuyerRoutes({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/sign-in"} state={{ from: location }} replace />;
}

export default BuyerRoutes;
