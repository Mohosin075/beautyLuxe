import { FaBarsStaggered } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdLogIn } from "react-icons/io";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import Loading from "../pages/loading/Loading";
import useUserFromDB from "../hooks/useUserFromDB";

function DashboardLoyOut() {
  const { theme } = useTheme();

  const adminRoutes = [
    {
      label: "Manage User",
      to: "users",
      icon: <AiOutlineProduct />,
    },
  ];

  const sellerRoutes = [
    {
      label: "My Product",
      to: "my-product",
      icon: <AiOutlineProduct />,
    },
    {
      label: "Add-Product",
      to: "add-product",
      icon: <AiOutlineProduct />,
    },
  ];

  const { user, logOut } = useAuth();
  const { userFromDb, isLoading } = useUserFromDB();

  if (isLoading) {
    return <Loading />;
  }

  const handleLogOut = () => {
    logOut().then(() => {});
  };

  return (
    <div>
      <div
        className={`drawer lg:drawer-open container mx-auto  max-w-[2500px] ${
          theme === "dark"
            ? "bg-darkBackground text-textLight"
            : "bg-lightBackground text-textDark"
        }`}
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div>
            <header className="top-0 flex   justify-between items-center py-2 lg:py-0 px-4">
              <span className="lg:hidden">
                <Logo />
              </span>
              <label
                htmlFor="my-drawer-2"
                className="drawer-button lg:hidden text-xl  cursor-pointer"
              >
                <FaBarsStaggered />
              </label>
            </header>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
        <div className="drawer-side z-50 ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            className={`menu text-base-content min-h-full w-60 p-4 ${
              theme === "dark"
                ? "bg-darkBackground text-textLight"
                : "bg-lightBackground text-textDark"
            }`}
          >
            <div className="flex flex-col space-y-8 mb-4">
              <div className="flex justify-center lg:justify-start">
                <Logo />
              </div>

              {user ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-14 h-14 rounded-full cursor-pointer">
                    <img
                      className="object-cover rounded-full w-full h-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjLlc8_9N9l9qB0fPxZSGMtF4mfEr68qusA&s"
                      alt=""
                    />
                  </div>
                  <h3>{user?.email}</h3>
                  <button onClick={handleLogOut} className={"my-btn"}>
                    <span>
                      <IoMdLogIn />
                    </span>
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex justify-center gap-5">
                  <NavLink to="/sign-up" className={"my-btn"}>
                    <span>
                      <IoMdLogIn />
                    </span>
                    Sign Up
                  </NavLink>
                  <NavLink to="/sign-in" className={"my-btn "}>
                    <span>
                      <IoMdLogIn />
                    </span>
                    Sign In
                  </NavLink>
                </div>
              )}
            </div>
            {/* Sidebar content here */}

            {(userFromDb?.role === "admin" ||
              userFromDb?.role === "seller") && (
              <div className="space-y-1">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `navLink-style transition-all ${
                      theme === "dark"
                        ? "hover:bg-backgroundDarkOverlay text-textLight"
                        : "hover:bg-backgroundLightOverlay"
                    } ${
                      isActive
                        ? "bg-backgroundLightOverlay text-black"
                        : "text-gray-700"
                    }`
                  }
                >
                  <span className="mr-1">
                    <LuLayoutDashboard />
                  </span>
                  Dashboard
                </NavLink>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `navLink-style transition-all ${
                      theme === "dark"
                        ? "hover:bg-backgroundDarkOverlay text-textLight"
                        : "hover:bg-backgroundLightOverlay"
                    } ${
                      isActive
                        ? "bg-backgroundLightOverlay text-black"
                        : "text-gray-700"
                    }`
                  }
                >
                  <span className="mr-1">
                    <IoHome />
                  </span>
                  Back Home
                </NavLink>
                <div className="divider"></div>
              </div>
            )}

            {userFromDb?.role === "admin" &&
              adminRoutes.map((list, i) => (
                <NavLink
                  key={i}
                  to={`/dashboard/${list.to}`}
                  className={({ isActive }) =>
                    `navLink-style transition-all ${
                      theme === "dark"
                        ? "hover:bg-backgroundDarkOverlay text-textLight"
                        : "hover:bg-backgroundLightOverlay"
                    } ${
                      isActive
                        ? "bg-backgroundLightOverlay text-black"
                        : "text-gray-700"
                    }`
                  }
                >
                  <span className="mr-1">{list.icon}</span>
                  {list.label}
                </NavLink>
              ))}
            {userFromDb?.role === "seller" &&
              sellerRoutes.map((list, i) => (
                <NavLink
                  key={i}
                  to={`/dashboard/${list.to}`}
                  className={({ isActive }) =>
                    `navLink-style transition-all ${
                      theme === "dark"
                        ? "hover:bg-backgroundDarkOverlay text-textLight"
                        : "hover:bg-backgroundLightOverlay"
                    } ${
                      isActive
                        ? "bg-backgroundLightOverlay text-black"
                        : "text-gray-700"
                    }`
                  }
                >
                  <span className="mr-2">{list.icon}</span>
                  {list.label}
                </NavLink>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardLoyOut;
