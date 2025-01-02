import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import Loading from "../loading/Loading";
import ProductCart from "../../components/ProductCart";
import FilterSearch from "../../components/FilterSearch";
import useTheme from "../../hooks/useTheme";
import { useGetProductQuery } from "../../redux/api/baseApi";

function Products() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [category, setCategory] = useState("");
  const [latestData, setLatestData] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const { theme } = useTheme();
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductQuery({ title: search, sort, category, page });

  useEffect(() => {
    setTotalPage(Math.ceil(products?.total / Number(12)));
  }, [products]);

  const onSearch = (text) => {
    setSearch(text);
  };
  const onSort = (text) => {
    setSort(text);
  };
  const onFilter = (text) => {
    setCategory(text);
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= totalPage) {
      setPage(newPage);
      refetch();
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      className={`min-h-screen  py-10 px-4 relative ${
        theme === "dark"
          ? "bg-darkBackground text-textLight"
          : "bg-lightBackground text-textDark"
      }`}
    >
      <div className="container mx-auto">
        <div>
          <div className="hidden lg:block">
            <SectionTitle title="All Products" description="" />
          </div>

          <div>
            <FilterSearch
              onSearch={onSearch}
              onSort={onSort}
              onFilter={onFilter}
              categories={products?.categories}
            />
          </div>
        </div>

        {products?.product?.length === 0 ? (
          <div>
            <h3 className="text-3xl text-center">Not Product here</h3>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {products?.product?.map((product) => (
                <ProductCart
                  key={product._id}
                  product={product}
                  latestData={latestData}
                  setLatestData={setLatestData}
                />
              ))}
            </div>
            <div className={`flex justify-center my-8 w-full`}>
              <div className="join gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => handlePagination(page - 1)}
                  className={`join-item px-3 py-2  ${
                    theme === "dark"
                      ? "bg-darkGray text-textLight"
                      : "bg-lightGray text-textDark border"
                  } rounded-md transition-all duration-100 font-semibold flex items-center justify-center gap-1 hover:bg-opacity-90 `}
                >
                  prev
                </button>
                <button
                  className={`join-item px-3 py-2  ${
                    theme === "dark"
                      ? "bg-darkGray text-textLight"
                      : "bg-lightGray text-textDark border"
                  } rounded-md transition-all duration-100 font-semibold flex items-center justify-center gap-1 hover:bg-opacity-90 `}
                >
                  page {page} of {totalPage}
                </button>
                <button
                  disabled={page === totalPage}
                  onClick={() => handlePagination(page + 1)}
                  className={`join-item px-3 py-2  ${
                    theme === "dark"
                      ? "bg-darkGray text-textLight"
                      : "bg-lightGray text-textDark border"
                  } rounded-md transition-all duration-100 font-semibold flex items-center justify-center gap-1 hover:bg-opacity-90 `}
                >
                  next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
