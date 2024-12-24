import { FaUserShield, FaStore, FaUser } from "react-icons/fa"; // Icons for roles
import useUserFromDB from "../hooks/useUserFromDB";
import { useNavigate } from "react-router";

function DashboardOverview() {
  const { userFromDb } = useUserFromDB();

  const navigate = useNavigate()

  if(userFromDb?.role === 'buyer'){
    navigate('/')
  }

  const renderContentByRole = () => {
    switch (userFromDb?.role) {
      case "admin":
        return (
          <div className="bg-blue-100 rounded-lg p-6 shadow-md flex flex-col items-center">
            <FaUserShield className="text-blue-500 text-5xl mb-4" />
            <h2 className="text-xl font-semibold text-blue-600">
              Admin Dashboard
            </h2>
            <p className="text-center text-blue-700 mt-2">
              Manage users, view reports, and maintain platform operations.
            </p>
          </div>
        );
      case "seller":
        return (
          <div className="bg-green-100 rounded-lg p-6 shadow-md flex flex-col items-center">
            <FaStore className="text-green-500 text-5xl mb-4" />
            <h2 className="text-xl font-semibold text-green-600">
              Seller Dashboard
            </h2>
            <p className="text-center text-green-700 mt-2">
              Manage your products, view sales, and interact with customers.
            </p>
          </div>
        );
      case "user":
      default:
        return (
          <div className="bg-yellow-100 rounded-lg p-6 shadow-md flex flex-col items-center">
            <FaUser className="text-yellow-500 text-5xl mb-4" />
            <h2 className="text-xl font-semibold text-yellow-600">
              User Dashboard
            </h2>
            <p className="text-center text-yellow-700 mt-2">
              Explore products, track orders, and update your profile.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Welcome to Your Dashboard
        </h1>
        <div className="flex justify-center">{renderContentByRole()}</div>
      </div>
    </div>
  );
}

export default DashboardOverview;
