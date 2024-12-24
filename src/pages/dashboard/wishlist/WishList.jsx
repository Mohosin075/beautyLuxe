import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./../../loading/Loading";
import SectionTitle from "./../../../components/SectionTitle";
import useUserFromDB from "../../../hooks/useUserFromDB";
import useAuth from "../../../hooks/useAuth";
import ProductCart from "../../../components/ProductCart";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestData, setLatestData] = useState(false);

  const { user } = useAuth();

  const token = localStorage.getItem("beautyLuxe");

  // Fetch wishlist items
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:3000/wishlist/${user?.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWishlist(response.data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchWishlist();
    }
  }, [token, user, latestData]);

  // Loading state
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-primary-light py-10 px-4 relative">
      <div className="container mx-auto">
        <div className="hidden lg:block">
          <SectionTitle title="My Wishlist" description="Your favorite items" />
        </div>

        {wishlist.length === 0 ? (
          <div>
            <h3 className="text-3xl text-center">Your wishlist is empty</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
            {wishlist.map((product) => (
              <ProductCart
                wishlist
                key={product._id}
                product={product}
                latestData={latestData}
                setLatestData={setLatestData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
