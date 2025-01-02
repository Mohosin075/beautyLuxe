import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardTab } from "react-icons/md";
import { useNavigate } from "react-router";
import SectionTitle from "../../../components/SectionTitle";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Loading from "../../loading/Loading";
import axios from "axios";
import useUserFromDB from "./../../../hooks/useUserFromDB";
import useTheme from "../../../hooks/useTheme";

function AddProduct() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("beautyLuxe");
  const { userFromDb } = useUserFromDB();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddProduct = (data) => {
    console.log(data);

    const productData = {
      ...data,
      sellerEmail: userFromDb?.email,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to add a new product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        await axios
          .post("https://beauty-luxe-server.vercel.app/product", productData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            if (res.data.insertedId) {
              console.log(res);
              toast.success("Product added successfully!");
              setLoading(false);
              reset();
              navigate("/dashboard/my-product");
            }
          })
          .catch(() => {
            toast.error("Failed to add product!");
            setLoading(false);
          });
      }
    });
  };

  const { theme } = useTheme();

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`flex justify-around gap-7  min-h-screen py-8 ${
        theme === "dark"
          ? "bg-background text-textLight"
          : "bg-background text-textDark"
      }`}
    >
      <div className="p-10 rounded-md  w-9/12">
        <div>
          <SectionTitle
            title={"Add Product"}
            description={"Add a new product to the store."}
          />
          <div className="divider"></div>
          <form onSubmit={handleSubmit(handleAddProduct)}>
            <div className="space-y-2">
              <div className="space-y-1">
                <label className="font-semibold">Product Name:</label>
                <input
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  placeholder="Enter product name"
                  className={`input-style ${
                    theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Description:</label>
                <textarea
                  {...register("description", {
                    required: "Product description is required",
                  })}
                  placeholder="Enter product description"
                  className={`input-style ${
                    theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
              <div className="flex justify-between gap-6">
                <div className="space-y-1 w-full">
                  <label className="font-semibold">Price:</label>
                  <input
                    {...register("price", {
                      required: "Product price is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Enter product price"
                    className={`input-style ${
                      theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-500">{errors.price.message}</p>
                  )}
                </div>
                <div className="space-y-1 w-full">
                  <label className="font-semibold">Stock:</label>
                  <input
                    {...register("stock", {
                      required: "Stock quantity is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Enter stock quantity"
                    className={`input-style ${
                      theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                    }`}
                  />
                  {errors.stock && (
                    <p className="text-red-500">{errors.stock.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Category:</label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className={`input-style ${
                    theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Haircare">Haircare</option>
                  <option value="Fragrance">Fragrance</option>
                </select>
                {errors.category && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Image URL:</label>
                <input
                  {...register("image", {
                    required: "Image URL is required",
                  })}
                  type="text"
                  placeholder="Enter image URL"
                  className={`input-style ${
                    theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                  }`}
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="my-btn mt-5"
                >
                  Add Product
                  <span>
                    <MdKeyboardTab />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
