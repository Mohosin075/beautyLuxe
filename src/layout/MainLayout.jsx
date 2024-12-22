import { FaBarsStaggered } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdContactPhone } from "react-icons/md";
import { FaAccusoft } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdLogIn } from "react-icons/io";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import useUserFromDB from "../hooks/useUserFromDB";
import Loading from "../pages/loading/Loading";

function MainLayout() {
  const { loading } = useAuth();
  const { userFromDb, loading: dataLoading } = useUserFromDB();

  console.log(userFromDb);

  const NavLinkList = [
    {
      label: "Home",
      to: "/",
      icon: <IoHome />,
    },
    {
      label: "About",
      to: "/about",
      icon: <FaAccusoft />,
    },
    {
      label: "Contact",
      to: "/contact",
      icon: <MdContactPhone />,
    },
    {
      label: "Product",
      to: "/products",
      icon: <AiOutlineProduct />,
    },
  ];

  const buyerRoutes = [
    {
      label: "Wishlist",
      to: "wishlist",
      icon: <AiOutlineProduct />,
    },
    {
      label: "My Cart",
      to: "my-cart",
      icon: <AiOutlineProduct />,
    },
  ];

  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().then((result) => {
      console.log(result);
    });
  };

  if (loading || dataLoading) {
    return <Loading />;
  }

  return (
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
        <Outlet />
      </div>
      <div className="drawer-side">
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

          {/* for admin and seller */}

          {userFromDb?.role === "admin" || userFromDb?.role === "seller" ? (
            <>
              <li>
                <NavLink to="/dashboard">
                  <span>
                    <LuLayoutDashboard />
                  </span>
                  dashboard
                </NavLink>
              </li>
              <div className="divider"></div>
            </>
          ) : (
            <>
              {buyerRoutes.map((list, i) => (
                <li key={i} className="mb-1">
                  <NavLink to={list.to}>
                    <span>{list.icon}</span>
                    {list.label}
                  </NavLink>
                </li>
              ))}
              <div className="divider"></div>
            </>
          )}

          {/* buyer routes */}
          {/* {userFromDb?.role === "buyer" && (
            <>
              {buyerRoutes.map((list, i) => (
                <li key={i} className="mb-1">
                  <NavLink to={list.to}>
                    <span>{list.icon}</span>
                    {list.label}
                  </NavLink>
                </li>
              ))}
              <div className="divider"></div>
            </>
          )} */}

          {/* for common route */}
          {NavLinkList.map((list, i) => (
            <li key={i} className="mb-1">
              <NavLink to={list.to}>
                <span>{list.icon}</span>
                {list.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainLayout;
