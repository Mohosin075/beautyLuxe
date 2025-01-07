import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardTab } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import SectionTitle from "../../../components/SectionTitle";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Loading from "../../loading/Loading";
import useTheme from "../../../hooks/useTheme";
import {
  useGetMyProductQuery,
  useGetSingleProductQuery,
  useUpdateMyProductMutation,
} from "../../../redux/api/baseApi";
import useAuth from "../../../hooks/useAuth";

function UpdateProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { data: singleProduct, isLoading } = useGetSingleProductQuery({
    productId,
  });
  const { refetch } = useGetMyProductQuery({ email: user?.email });
  const { register, handleSubmit, setValue } = useForm();

  const [updateMyProduct] = useUpdateMyProductMutation();

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
        try {
          await updateMyProduct({ productId, body: { ...data } });
          toast.success("update successfully!");
          refetch()
          navigate("/dashboard/my-product");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-around gap-7 bg-background min-h-screen py-8">
      <div className="p-10 rounded-md  border-2 border-background w-9/12">
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
                    className={`input-style ${
                      theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                    }`}
                  />
                </div>
                <div className="text-start space-y-1 w-full">
                  <label>Price: </label>
                  <input
                    type="number"
                    {...register("price")}
                    className={`input-style ${
                      theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                    }`}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-6">
                <div className="text-start space-y-1 w-full">
                  <label>Stock: </label>
                  <input
                    type="number"
                    {...register("stock")}
                    className={`input-style ${
                      theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                    }`}
                  />
                </div>
                <div className="text-start space-y-1 w-full">
                  <label>Image URL: </label>
                  <input
                    type="text"
                    {...register("image")}
                    className={`input-style ${
                      theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                    }`}
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
                  className={`input-style ${
                    theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                  }`}
                />
              </div>

              <div>
                <button type="submit" className="my-btn mt-8 ">
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
