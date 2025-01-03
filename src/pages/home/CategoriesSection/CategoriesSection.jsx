import Loading from "../../loading/Loading";
import SectionTitle from "../../../components/SectionTitle";
import { NavLink } from "react-router";
import useTheme from "../../../hooks/useTheme";
import { useGetProductQuery } from "../../../redux/api/baseApi";

function CategoriesSection() {
  const { theme } = useTheme();
  const { data, isLoading } = useGetProductQuery({});
  if (isLoading) {
    return <Loading />;
  }

  if (data?.categories?.length === 0) {
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
          {data?.categories.map((category, index) => (
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
