import { FaBarsStaggered } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdLogIn } from "react-icons/io";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardLoyOut() {
  const [userLoading, setUserLoading] = useState(false);
  const [userFromDb, setUserFromDb] = useState(null);

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

  // const { userFromDb ,loadStatus, setLoadStatus} = useUserFromDB();

  useEffect(() => {
    const token = localStorage.getItem("beautyLuxe");
    const fetchUser = async () => {
      setUserLoading(true);
      axios
        .get(`http://localhost:3000/user/${user?.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            setUserFromDb(res.data);
            setUserLoading(false);
          }
        });
    };

    // if (user && token) {
    fetchUser();
    // }
  }, [user]);

  const handleLogOut = () => {
    logOut().then((result) => {
      // setLoadStatus(!loadStatus);
      console.log(result);
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div>
            <header className="bg-purple-400 sticky top-0 flex lg:bg-purple-200  justify-between items-center py-2 lg:py-0 px-4">
              <span className="lg:hidden">
                <Logo />
              </span>
              <label
                htmlFor="my-drawer-2"
                className="drawer-button lg:hidden text-xl text-white cursor-pointer"
              >
                <FaBarsStaggered />
              </label>
            </header>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-purple-200 text-base-content min-h-full w-60 p-4 ">
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
                  <button
                    onClick={handleLogOut}
                    className={"my-btn bg-purple-300"}
                  >
                    <span>
                      <IoMdLogIn />
                    </span>
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex justify-center gap-5">
                  <NavLink to="/sign-up" className={"my-btn bg-purple-300"}>
                    <span>
                      <IoMdLogIn />
                    </span>
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/sign-in"
                    className={
                      "my-btn bg-primary-dark text-purple-100 hover:bg-purple-300 hover:text-black "
                    }
                  >
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
              <>
                <li>
                  <NavLink to="/dashboard">
                    <span>
                      <LuLayoutDashboard />
                    </span>
                    dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <span>
                      <IoHome />
                    </span>
                    Back Home
                  </NavLink>
                </li>

                <div className="divider"></div>
              </>
            )}

            {userFromDb?.role === "admin" &&
              adminRoutes.map((list, i) => (
                <li key={i} className="mb-1">
                  <NavLink to={`/dashboard/${list.to}`}>
                    <span>{list.icon}</span>
                    {list.label}
                  </NavLink>
                </li>
              ))}
            {userFromDb?.role === "seller" &&
              sellerRoutes.map((list, i) => (
                <li key={i} className="mb-1">
                  <NavLink to={`/dashboard/${list.to}`}>
                    <span>{list.icon}</span>
                    {list.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardLoyOut;
