import { BrowserRouter, Route, Routes } from "react-router";
import About from "../pages/about/About";
import Home from "../pages/home/Home";
import DashboardLoyOut from "../layout/DashboardLoyout";
import AddProduct from "../pages/dashboard/addProduct/AddProduct";
import Overview from "../pages/dashboard/overview/Overview";
import MyProducts from "../pages/dashboard/myProducts/MyProducts";
import App from "./../App";
import Contact from "../pages/contact/Contact";
import Products from "../pages/products/Products";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import NotFound from "../pages/notFound/NotFound";
import User from "../pages/dashboard/admin/users/User";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout here */}
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<Products />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>

        {/* Dashboard Layout here */}
        <Route path="dashboard" element={<DashboardLoyOut />}>
        <Route index element={<Overview />}></Route>
          {/* for admin */}
          <Route path="users" element={<User />}></Route>
          {/* for seller */}
          <Route path="add-product" element={<AddProduct />}></Route>
          <Route path="my-product" element={<MyProducts />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
