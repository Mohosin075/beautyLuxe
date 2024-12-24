import { useEffect, useState } from "react";

import SectionTitle from "../../components/SectionTitle";
import Loading from "../loading/Loading";
import useUserFromDB from "../../hooks/useUserFromDB";
import ProductCart from "../../components/ProductCart";
import FilterSearch from "../../components/FilterSearch";

function Products() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [category, setCategory] = useState("");
  const [latestData, setLatestData] = useState(false);

  const { userFromDb } = useUserFromDB();
  const token = localStorage.getItem("beautyLuxe");

  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch products data
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://beauty-luxe-server.vercel.app/products?page=${page}&title=${search}&category=${category}&sort=${sort}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setTotalPage(Math.ceil(data?.total / Number(12)));
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userFromDb, token, page, category, search, sort]);

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
      // window.scroll({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-primary-light py-10 px-4 relative">
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
            <div className="flex justify-center my-8 w-full">
              <div className="join">
                <button
                  disabled={page === 1}
                  onClick={() => handlePagination(page - 1)}
                  className="join-item btn"
                >
                  prev
                </button>
                <button className="join-item btn">
                  page {page} of {totalPage}
                </button>
                <button
                  disabled={page === totalPage}
                  onClick={() => handlePagination(page + 1)}
                  className="join-item btn"
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
