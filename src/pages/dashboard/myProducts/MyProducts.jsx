import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import Loading from "../../loading/Loading";
import useUserFromDB from "../../../hooks/useUserFromDB";
import axios from "axios";
import ProductCart from "../../../components/ProductCart";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const { userFromDb } = useUserFromDB();
  const token = localStorage.getItem("beautyLuxe");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      await axios
        .get(
          `https://beauty-luxe-server.vercel.app/products/${userFromDb?.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res.data) {
            setProducts(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {

        });
    };

    if (userFromDb) {
      fetchProducts();
    }
  }, [userFromDb, token, change]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-primary-light py-10 px-4">
      <div className="container mx-auto">
        <SectionTitle
          title="My Products"
          description="Manage your products here!"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          {products.map((product) => (
            <ProductCart
              key={product._id}
              product={product}
              isSeller
              setChange={setChange}
              change={change}
            />
          ))}
        </div>
        {products.length === 0 && (
          <div>
            <h3 className="text-3xl text-center">Not Product here</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;
