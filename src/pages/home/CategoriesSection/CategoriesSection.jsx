import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading/Loading";
import SectionTitle from "../../../components/SectionTitle";
import { NavLink } from "react-router";
import useTheme from "../../../hooks/useTheme";

function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { theme } = useTheme();

  // Fetch categories from the /products endpoint
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://beauty-luxe-server.vercel.app/products"
        );
        setCategories(response.data.categories || []);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">No categories available!</h1>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto px-4 py-10 ${
        theme === "dark"
          ? "bg-darkBackground text-textLight"
          : "bg-lightBackground text-textDark"
      }`}
    >
      <div className="container mx-auto">
        <SectionTitle title="Categories" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {categories.map((category, index) => (
            <NavLink
              to={`/categories/${category}`}
              key={index}
              className={`p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                theme === "dark" ? " text-textLight" : " text-textDark"
              }`}
            >
              <h2
                className={`text-xl font-semibold text-gray-800 mb-2 ${
                  theme === "dark" ? " text-textLight" : " text-textDark"
                }`}
              >
                {category}
              </h2>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesSection;
