import { FaBarsStaggered } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdContactPhone } from "react-icons/md";
import { FaAccusoft } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../Logo";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router";
import { IoMdLogIn } from "react-icons/io";
import useTheme from "../../hooks/useTheme";
import ThemeToggler from "./../ThemeToggler";

function Navbar() {
  const { user, logOut } = useAuth();
  const [userFromDb, setUserFromDb] = useState(null);

  console.log({ userFromDb });

  const [menuOpen, setMenuOpen] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("beautyLuxe");
    if (user && token) {
      axios
        .get(`https://beauty-luxe-server.vercel.app/user/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data) {
            setUserFromDb(res.data);
          }
        });
    }
  }, [user]);

  const NavLinkList = [
    { label: "Home", to: "/", icon: <IoHome /> },
    { label: "Products", to: "/products", icon: <AiOutlineProduct /> },
    { label: "About", to: "/about", icon: <FaAccusoft /> },
    { label: "Contact", to: "/contact", icon: <MdContactPhone /> },
  ];

  const buyerRoutes = [
    { label: "Wishlist", to: "/wishlist", icon: <AiOutlineProduct /> },
    { label: "My Cart", to: "/my-cart", icon: <AiOutlineProduct /> },
  ];

  const handleLogOut = () => {
    logOut().then(() => {
      console.log("Logged out");
    });
  };

  return (
    <nav
      className={`${
        theme === "dark"
          ? "bg-darkBackground text-textLight"
          : "bg-lightBackground text-textDark"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Logo />

        {/* Hamburger Menu */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBarsStaggered />
        </button>

        {/* Navbar Links (Desktop) */}
        <div className="hidden min-h-14 lg:flex flex-row items-center transition-all duration-200 space-x-1">
          {NavLinkList.map((item, idx) => (
            <li key={idx} className="list-none">
              <NavLink
                to={item.to}
                className={`navLink-style ${
                  theme === "dark"
                    ? "hover:bg-backgroundDarkOverlay"
                    : "hover:bg-backgroundLightOverlay"
                }`}
              >
                {item.icon} <span className="ml-1">{item.label}</span>
              </NavLink>
            </li>
          ))}

          {userFromDb?.role === "buyer" &&
            buyerRoutes.map((item, idx) => (
              <li key={idx} className="list-none">
                <NavLink
                  to={item.to}
                  className={`navLink-style ${
                    theme === "dark"
                      ? "hover:bg-backgroundDarkOverlay"
                      : "hover:bg-backgroundLightOverlay"
                  }`}
                >
                  {item.icon} <span className="ml-1">{item.label}</span>
                </NavLink>
              </li>
            ))}

          {(userFromDb?.role === "admin" || userFromDb?.role === "seller") && (
            <div>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={`navLink-style ${
                  theme === "dark"
                    ? "hover:bg-backgroundDarkOverlay"
                    : "hover:bg-backgroundLightOverlay"
                }`}
              >
                <span>
                  <IoHome />
                </span>{" "}
                Dashboard
              </NavLink>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-10 h-10 cursor-pointer rounded-full ring ring-offset-2">
                  <img
                    src={
                      userFromDb?.photoURL ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    }
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
                className="my-btn"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex justify-center gap-5">
              {/* <NavLink to="/sign-up" className={"my-btn"}>
                <span>
                  <IoMdLogIn />
                </span>
                Sign Up
              </NavLink> */}
              <NavLink to="/sign-in" className={"my-btn"}>
                <span>
                  <IoMdLogIn />
                </span>
                Sign In
              </NavLink>
            </div>
          )}
          <ThemeToggler />
        </div>

        {/* </div> */}
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${
          theme === "dark"
            ? "bg-darkBackground text-textLight"
            : "bg-lightBackground text-textDark"
        } transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between px-2">
          <Logo />
          <button className=" text-2xl p-3" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>

        <div className="flex flex-col space-y-2 p-4">
          {!user ? (
            <div className="flex justify-between items-center gap-3 text-center">
              {/* <NavLink
                to="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="my-btn w-full"
              >
                Sign Up
              </NavLink> */}
              <NavLink
                to="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="my-btn w-full"
              >
                Sign In
              </NavLink>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-12 h-12 cursor-pointer rounded-full ring ring-offset-2">
                  <img
                    src={
                      userFromDb?.photoURL ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    }
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
                className="my-btn"
              >
                Log Out
              </button>
            </div>
          )}

          {userFromDb?.role === "buyer" &&
            buyerRoutes.map((item, idx) => (
              <li key={idx} className="list-none">
                <NavLink
                  to={item.to}
                  className={`navLink-style ${
                    theme === "dark"
                      ? "hover:bg-backgroundDarkOverlay"
                      : "hover:bg-backgroundLightOverlay"
                  }`}
                >
                  {item.icon} <span className="ml-1">{item.label}</span>
                </NavLink>
              </li>
            ))}

          {(userFromDb?.role === "admin" || userFromDb?.role === "seller") && (
            <NavLink
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className={`navLink-style ${
                theme === "dark"
                  ? "hover:bg-backgroundDarkOverlay"
                  : "hover:bg-backgroundLightOverlay"
              }`}
            >
              <span>
                <IoHome />
              </span>{" "}
              Dashboard
            </NavLink>
          )}
          <div className="divider"></div>

          {NavLinkList.map((item, idx) => (
            <li key={idx} className="list-none">
              <NavLink
                to={item.to}
                className={`navLink-style ${
                  theme === "dark"
                    ? "hover:bg-backgroundDarkOverlay"
                    : "hover:bg-backgroundLightOverlay"
                }`}
              >
                {item.icon} <span className="ml-1">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
