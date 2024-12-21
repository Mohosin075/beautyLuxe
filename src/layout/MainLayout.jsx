import { FaBarsStaggered } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdContactPhone } from "react-icons/md";
import { FaAccusoft } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";

function MainLayout() {
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

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div>
          <header className="bg-purple-400 flex lg:hidden justify-between items-center py-2 px-4">
            <Logo />
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
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 ">
          <div className="mb-5">
            <Logo />
          </div>
          {/* Sidebar content here */}
          {NavLinkList.map((list, i) => (
            <li key={i}>
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
