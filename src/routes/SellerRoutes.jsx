import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserFromDB from "../hooks/useUserFromDB";

function SellerRoutes({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const { userFromDb } = useUserFromDB();

  console.log(userFromDb.role);

  if (loading || !userFromDb.role) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (user && userFromDb.role === "seller") {
    return children;
  }

  return <Navigate to={"/sign-in"} state={{ from: location }} replace />;
}

export default SellerRoutes;
