import { FaBarsStaggered } from "react-icons/fa6";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div>
          <header className="bg-purple-400 flex justify-end">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <FaBarsStaggered />
            </label>
          </header>
        </div>
        this is content
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <div className="mb-5">
            <a href="/" className="inline-block ml-4">
              <img
                className="w-12 rounded-full"
                src="https://styles.redditmedia.com/t5_2ub9j/styles/communityIcon_ljzse76o3u861.png"
                alt=""
              />
            </a>
          </div>
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainLayout;
