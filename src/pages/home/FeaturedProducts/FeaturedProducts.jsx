import Loading from "../../loading/Loading";
import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import ProductCart from "../../../components/ProductCart";
import { NavLink } from "react-router";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch products data
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://beauty-luxe-server.vercel.app/products`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-10 px-4 relative">
      <div className="container mx-auto">
        <div>
          <div className="hidden lg:block">
            <SectionTitle
              title="Featured Products"
              description="Explore the most popular and best-selling products in our collection."
            />
            <div className="divider"></div>
          </div>
          {/*   
          <div>
            <FilterSearch />
          </div> */}
        </div>

        {products.length === 0 ? (
          <div>
            <h3 className="text-3xl text-center">Not Product here</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {products?.product.slice(0, 6).map((product) => (
              <ProductCart key={product._id} product={product} />
            ))}
          </div>
        )}
        <NavLink to="/products" className="flex justify-center mt-14">
          <button className="my-btn text-xl">see more</button>
        </NavLink>
      </div>
    </div>
  );
}

export default FeaturedProducts;
