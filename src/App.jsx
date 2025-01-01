import { Outlet } from "react-router";
import Navbar from "./components/shared/Navbar";
import useTheme from "./hooks/useTheme";

function App() {
  const { theme } = useTheme();
  return (
    <div
      className={` ${
        theme === "dark"
          ? "bg-darkBackground text-textLight"
          : "bg-lightBackground text-textDark"
      }`}
    >
      <Navbar />
      <Outlet />
      {/* <MainLayout /> */}
    </div>
  );
}

export default App;
