import axios from "axios";
import { toast } from "sonner";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
function ProductCart({ product, isSeller, change, setChange }) {
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
          .delete(`http://localhost:3000/product/${id}`, {
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

  const { image, description, stock, price, category, rating } = product;
  return (
    <div className="bg-secondary-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img src={image} className="h-40 w-full object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold mb-2">{}</h2>
      <p className="mb-3">
        {description?.length < 30
          ? description?.length
          : description.slice(0, 30)}
        ...
      </p>

      <div className="flex justify-between items-center">
        <p className="font-semibold text-primary-dark">${price}</p>
        <p className="text-sm text-gray-600">Stock: {stock}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-700 mb-3">{category}</p>
        <p className="text-gray-700 mb-3">Rating : {rating}</p>
      </div>
      {isSeller ? (
        <div className="flex justify-between gap-20">
          <button className="mt-4 w-full py-2 bg-primary-dark text-white rounded-md hover:bg-purple-700 hover:text-white transition">
            Edit
          </button>
          <button
            onClick={() => handleDelete(product._id)}
            className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700  transition"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex justify-between gap-20">
          <button className="mt-4 w-full py-2 bg-primary-dark text-white rounded-md hover:bg-purple-700 hover:text-white transition">
            add to wishlist
          </button>
          <button className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700  transition">
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCart;
