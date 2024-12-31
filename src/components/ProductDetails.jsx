import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../pages/loading/Loading";
import { NavLink, useParams } from "react-router";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://beauty-luxe-server.vercel.app/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:ml-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.name}
          </h1>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-indigo-600 mt-4">
              Price: ${product.price}
            </p>
            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700 mb-3">{product.category}</p>
            <p className="text-gray-700 mb-3">Rating : {product.rating}</p>
          </div>

          <div className="flex items-center mt-4">
            <NavLink to={"/products"}>
              <button className="btn btn-warning">
                For add to card/wishlist go to product route
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
