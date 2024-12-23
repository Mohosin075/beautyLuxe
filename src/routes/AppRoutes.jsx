import { BrowserRouter, Route, Routes } from "react-router";
import About from "../pages/about/About";
import Home from "../pages/home/Home";
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
import WishList from "../pages/dashboard/wishlist/WishList";
import MyCart from "../pages/dashboard/myCart/MyCart";
import DashboardLoyOut from "../layout/DashboardLoyOut";
import UpdateUser from "../pages/dashboard/updateUser/UpdateUser";
import SellerRoutes from "./SellerRoutes";
import AdminRoutes from "./AdminRoutes";
import BuyerRoutes from "./BuyerRoutes";
import PrivateRoutes from "./PrivateRoutes";
import UpdateProduct from "../pages/dashboard/updateProduct/UpdateProduct";

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
          {/* for buyer */}
          <Route
            path="wishlist"
            element={
              <BuyerRoutes>
                <WishList />
              </BuyerRoutes>
            }
          ></Route>
          <Route
            path="my-cart"
            element={
              <BuyerRoutes>
                <MyCart />
              </BuyerRoutes>
            }
          ></Route>
        </Route>

        {/* Dashboard Layout here */}
        <Route
          path="dashboard"
          element={
            <PrivateRoutes>
              <DashboardLoyOut />
            </PrivateRoutes>
          }
        >
          <Route index element={<Overview />}></Route>
          {/* for admin */}
          <Route
            path="users"
            element={
              <AdminRoutes>
                <User />
              </AdminRoutes>
            }
          ></Route>
          <Route
            path="update-user/:email"
            element={
              <AdminRoutes>
                <UpdateUser />
              </AdminRoutes>
            }
          ></Route>
          {/* for seller */}
          <Route
            path="add-product"
            element={
              <SellerRoutes>
                <AddProduct />
              </SellerRoutes>
            }
          ></Route>
          <Route
            path="my-product"
            element={
              <SellerRoutes>
                <MyProducts />
              </SellerRoutes>
            }
          ></Route>
          <Route
            path="update-product/:productId"
            element={
              <SellerRoutes>
                <UpdateProduct />
              </SellerRoutes>
            }
          ></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
