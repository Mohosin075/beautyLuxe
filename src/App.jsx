import { Outlet } from "react-router";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <MainLayout /> */}
    </div>
  );
}

export default App;
