import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";

function FilterSearch({ onSearch, onSort, onFilter }) {
  const { register, handleSubmit } = useForm();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    rating: "",
    sortBy: "priceAsc",
  });

  // Handle form submit to trigger the search, sort, and filter
  const handleFilterSubmit = (data) => {
    setFilters({ ...filters, ...data });
    onSearch(data.search);
    onSort(data.sortBy);
    onFilter(data.category, data.rating);
  };

  return (
    <div className="bg-primary-light p-2 md:p-4 rounded-md mb-8">
      <form
        onSubmit={handleSubmit(handleFilterSubmit)}
        className="flex flex-wrap xl:flex-nowrap items-center lg:gap-4 sm:gap-5 md:gap-6"
      >
        {/* Search Bar */}
        <div className="w-full">
          <label
            htmlFor="search"
            className="block text-sm lg:text-lg font-semibold mb-2"
          >
            Search
          </label>
          <div className="flex border-b-2 border-primary-dark">
            <input
              type="text"
              id="search"
              placeholder="Search for products..."
              {...register("search")}
              className="w-full  py-2 px-2 outline-none text-sm lg:text-lg "
            />
            <button type="submit" className="text-primary-dark px-3">
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
              defaultValue={filters.sortBy}
              className="p-2 w-full border-b-4 outline-none border-primary-dark text-sm bg-purple-200"
            >
              <option value="priceAsc">Low to High</option>
              <option value="priceDesc">High to Low</option>
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
              className="p-2 w-full border-b-4 outline-none border-primary-dark text-sm bg-purple-200"
            >
              <option value="">All Categories</option>
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Haircare">Haircare</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="w-full">
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
          </div>
        </div>

        {/* Submit Button */}
        <div className="xl:mt-8">
          <button
            type="submit"
            className="my-btn text-center bg-primary-dark text-white hover:bg-purple-300 hover:text-purple-900 w-full py-3 text-sm sm:text-lg md:text-xl"
          >
            Filters
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterSearch;
