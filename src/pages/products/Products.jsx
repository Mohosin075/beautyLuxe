import { useEffect, useState } from "react";
import axios from "axios";

import SectionTitle from "../../components/SectionTitle";
import Loading from "../loading/Loading";
import useUserFromDB from "../../hooks/useUserFromDB";
import ProductCart from "../../components/ProductCart";
import FilterSearch from "../../components/FilterSearch";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [category, setCategory] = useState("");

  const { userFromDb } = useUserFromDB();
  const token = localStorage.getItem("beautyLuxe");

  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  console.log({ search, sort, category });
  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // `http://localhost:3000/all-product?page=${page}&limit=${limit}&title=${search}&brand=${brand}&category=${category}&sort=${sort}

      await axios
        .get(
          `http://localhost:3000/products?page=${page}&title=${search}&category=${category}&sort=${sort}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data) {
            setProducts(res.data);
            setTotalPage(Math.ceil(res.data.total / Number(12)));
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (userFromDb) {
      fetchProducts();
    }
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

        {products.length === 0 ? (
          <div>
            <h3 className="text-3xl text-center">Not Product here</h3>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {products?.product?.map((product) => (
                <ProductCart key={product._id} product={product} />
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
