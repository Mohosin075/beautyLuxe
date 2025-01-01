/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import useTheme from "../hooks/useTheme";

function FilterSearch({ onSearch, onSort, onFilter, categories }) {
  console.log(categories);

  const { register, handleSubmit } = useForm();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    rating: "",
    sortBy: "",
  });

  // Handle form submit to trigger the search, sort, and filter
  const handleFilterSubmit = (data) => {
    setFilters({ ...filters, ...data });
    onSearch(data.search);
    onSort(data.sortBy);
    onFilter(data.category, data.rating);
  };

  const { theme } = useTheme();

  return (
    <div className="bg-primary-light p-2 md:p-4 rounded-md mb-8">
      <form
        onSubmit={handleSubmit(handleFilterSubmit)}
        className="flex flex-wrap xl:flex-nowrap space-y-3 md:space-y-0 items-center lg:gap-4 sm:gap-5 md:gap-6"
      >
        {/* Search Bar */}
        <div className="w-full">
          <label
            htmlFor="search"
            className="block text-sm lg:text-lg font-semibold mb-2"
          >
            Search
          </label>
          <div className="flex ">
            <input
              type="text"
              id="search"
              placeholder="Search for products..."
              {...register("search")}
              className={`input-style ${
                theme === "dark" ? "bg-textDark" : "bg-lightBackground"
              }`}
            />
            <button type="submit" className="text-primaryAccent px-3">
              <MdSearch size={20} />
            </button>
          </div>
        </div>

        {/* Sort By Price */}
        <div className="flex justify-between items-center gap-2 w-full">
          <div className="w-full">
            <label
              htmlFor="sortBy"
              className="block text-sm lg:text-lg font-semibold mb-2"
            >
              Sort By Price
            </label>
            <select
              {...register("sortBy")}
              className={`input-style ${
                theme === "dark" ? "bg-textDark" : "bg-lightBackground"
              }`}
            >
              <option value="asc">Low to High</option>
              <option value="dsc">High to Low</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="w-full">
            <label
              htmlFor="category"
              className="block text-sm lg:text-lg font-semibold mb-2"
            >
              Category
            </label>
            <select
              {...register("category")}
              defaultValue={filters.category}
              className={`input-style ${
                theme === "dark" ? "bg-textDark" : "bg-lightBackground"
              }`}
            >
              <option value="">All Categories</option>
              {categories?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          {/* <div className="w-full">
            <label
              htmlFor="rating"
              className="block text-sm lg:text-lg font-semibold mb-2"
            >
              Rating
            </label>
            <select
              {...register("rating")}
              defaultValue={filters.rating}
              className="p-2 w-full border-b-4 outline-none border-primary-dark text-sm bg-purple-200"
            >
              <option value="">All Ratings</option>
              <option value="4">4 Stars & Above</option>
              <option value="4.5">4.5 Stars & Above</option>
              <option value="5">5 Stars</option>
            </select>
          </div> */}
        </div>

        {/* Submit Button */}
        <div className="xl:mt-8">
          <button
            type="submit"
            className="my-btn "
          >
            Filters
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterSearch;
