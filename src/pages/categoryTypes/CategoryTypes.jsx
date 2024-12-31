import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import SectionTitle from "../../components/SectionTitle";
import Loading from "../loading/Loading";
import ProductCart from "../../components/ProductCart";

function CategoryTypes() {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch products based on category type
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://beauty-luxe-server.vercel.app/products?category=${type}`
        );
        setProducts(response.data.product || []);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchProducts();
    }
  }, [type]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          No products found for the category: {type}
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <SectionTitle title={`Category: ${type}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {products.map((product, index) => (
          <ProductCart product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default CategoryTypes;
