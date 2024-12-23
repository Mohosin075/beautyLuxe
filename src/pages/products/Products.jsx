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
  const { userFromDb } = useUserFromDB();
  const token = localStorage.getItem("beautyLuxe");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      await axios
        .get(`http://localhost:3000/products/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            setProducts(res.data);
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
  }, [userFromDb, token]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-primary-light py-10 px-4">
      <div className="container mx-auto">
        <div>
          <div className="hidden lg:block">
            <SectionTitle title="All Products" description="" />
          </div>

          <div>
            <FilterSearch />
          </div>
        </div>

        {products.length === 0 ? (
          <div>
            <h3 className="text-3xl text-center">Not Product here</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {products?.product.map((product) => (
              <ProductCart key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
