import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import Swal from "sweetalert2";
import useUserFromDB from "../hooks/useUserFromDB";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

/* eslint-disable react/prop-types */
function ProductCart({
  product,
  isSeller,
  change,
  setChange,
  wishlist,
  latestData,
  setLatestData,
}) {
  const { userFromDb } = useUserFromDB();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const token = localStorage.getItem("beautyLuxe");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://beauty-luxe-server.vercel.app/product/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            if (res.data.deletedCount === 1) {
              setChange(!change);
              toast.success("deleted successfully!");
            }
          });
      }
    });
  };

  const handleWishlist = async () => {
    if (!user) {
      return navigate("/sign-in");
    }

    await axios
      .patch(`https://beauty-luxe-server.vercel.app/add-wishlist`, {
        userEmail: userFromDb?.email,
        productId: product?._id,
      })
      .then((res) => {
        if (res?.data?.modifiedCount === 1) {
          navigate("/wishlist");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Add successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          // if (setLatestData) {
          //   setLatestData(!latestData);
          // }
        }
      });
  };

  const removeFromWishList = async () => {
    await axios
      .patch(`https://beauty-luxe-server.vercel.app/remove-wishlist`, {
        userEmail: userFromDb?.email,
        productId: product?._id,
      })
      .then((res) => {
        if (res?.data?.modifiedCount === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Remove successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          if (setLatestData) {
            setLatestData(!latestData);
          }
        }
      });
  };

  const handleAddToCard = async () => {
    if (!user) {
      return navigate("/sign-in");
    }

    await axios
      .post(`https://beauty-luxe-server.vercel.app/card`, {
        email: userFromDb?.email,
        productId: product?._id,
        quantity: 1,
      })
      .then((res) => {
        if (res?.data?.insertedId === 1) {
          navigate("/my-cart");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const { theme } = useTheme();

  const { name, image, description, stock, price, category, rating } = product;
  return (
    <div
      className={`rounded-lg shadow-md hover:shadow-lg transition-shadow ${
        theme === "dark"
          ? "border border-gray-900 hover:bg-darkGray"
          : "hover:bg-lightGray"
      }`}
    >
      <img src={image} className="h-40 w-full object-cover rounded-md mb-1" />
      <div className="p-4 space-y-0">
        <NavLink to={`/product/${product?._id}`}>
          <h2 className="text-lg font-semibold mb-2 underline cursor-pointer">
            {name?.length < 20 ? name : name?.slice(0, 20)}...
          </h2>
        </NavLink>
        <p className="mb-3">
          {description?.length < 30
            ? description?.length
            : description.slice(0, 30)}
          ...
        </p>

        <div className="flex justify-between items-center">
          <p className="">${price}</p>
          <p className="text-sm ">Stock: {stock}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="mb-3">{category}</p>
          <p className=" mb-3">Rating : {rating}</p>
        </div>
        {isSeller ? (
          <div className="flex flex-col justify-between space-y-2">
            <NavLink className='w-full' to={`/dashboard/update-product/${product._id}`}>
              <button className="my-btn w-full"> Edit Product</button>
            </NavLink>
            <button
              onClick={() => handleDelete(product._id)}
              className="my-btn"
            >
              Delete Product
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-between space-y-2">
            {wishlist ? (
              <>
                <button
                  onClick={removeFromWishList}
                  disabled={
                    userFromDb?.role === "admin" ||
                    userFromDb?.role === "seller"
                  }
                  className="my-btn"
                >
                  remove from wishlist
                </button>
              </>
            ) : (
              <button
                onClick={handleWishlist}
                disabled={
                  userFromDb?.role === "admin" || userFromDb?.role === "seller"
                }
                className="my-btn"
              >
                add to wishlist
              </button>
            )}
            <button
              onClick={handleAddToCard}
              disabled={
                userFromDb?.role === "admin" || userFromDb?.role === "seller"
              }
              className="my-btn"
            >
              Add to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCart;
