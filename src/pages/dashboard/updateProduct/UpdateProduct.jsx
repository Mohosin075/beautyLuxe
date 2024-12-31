import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardTab } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import SectionTitle from "../../../components/SectionTitle";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Loading from "../../loading/Loading";

function UpdateProduct() {
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [singleProduct, setSingleProduct] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("beautyLuxe");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://beauty-luxe-server.vercel.app/product/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSingleProduct(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("Error fetching product details!");
      }
    };

    if (token) {
      fetchProduct();
    }
  }, [productId, token]);

  const { register, handleSubmit, setValue } = useForm();

  // Set form values once the product is loaded
  useEffect(() => {
    if (singleProduct) {
      setValue("name", singleProduct.name);
      setValue("price", singleProduct.price);
      setValue("stock", singleProduct.stock);
      setValue("image", singleProduct.image);
      setValue("description", singleProduct.description);
    }
  }, [singleProduct, setValue]);

  const handleUpdate = (data) => {
    console.log(data);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .patch(
            `https://beauty-luxe-server.vercel.app/product/${singleProduct?._id}`,
            data,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            if (res) {
              toast.success("Product updated successfully!");
              navigate("/dashboard/my-product");
            }
          })
          .catch(() => {
            toast.error("Failed to update product!");
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-around gap-7 bg-primary-light min-h-screen py-8">
      <div className="p-10 rounded-md bg-primary-light w-9/12">
        <div>
          <SectionTitle
            title={"Update Product"}
            description={"Carefully update the product details!"}
          />
          <div className="divider"></div>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="space-y-2">
              <div className="flex justify-between gap-6">
                <div className="text-start space-y-1 w-full">
                  <label>Product Name: </label>
                  <input
                    {...register("name")}
                    className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                  />
                </div>
                <div className="text-start space-y-1 w-full">
                  <label>Price: </label>
                  <input
                    type="number"
                    {...register("price")}
                    className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-6">
                <div className="text-start space-y-1 w-full">
                  <label>Stock: </label>
                  <input
                    type="number"
                    {...register("stock")}
                    className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                  />
                </div>
                <div className="text-start space-y-1 w-full">
                  <label>Image URL: </label>
                  <input
                    type="text"
                    {...register("image")}
                    className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Description:</label>
                <textarea
                  {...register("description", {
                    required: "Product description is required",
                  })}
                  placeholder="Enter product description"
                  className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="my-btn mt-8 text-center bg-primary-dark text-white hover:bg-purple-300 hover:text-purple-900"
                >
                  Update Product
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

export default UpdateProduct;
