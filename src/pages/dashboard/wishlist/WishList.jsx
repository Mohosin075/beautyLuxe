import Loading from "./../../loading/Loading";
import SectionTitle from "./../../../components/SectionTitle";

import ProductCart from "../../../components/ProductCart";
import { useGetWishListQuery } from "../../../redux/api/baseApi";
import useUserFromDB from "../../../hooks/useUserFromDB";

function Wishlist() {
  const { userFromDb } = useUserFromDB();
  const { data: wishlist, isLoading, refetch } = useGetWishListQuery({email : userFromDb?.email});

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-primary-light py-10 px-4 relative">
      <div className="container mx-auto">
        <div className="hidden lg:block">
          <SectionTitle title="My Wishlist" description="Your favorite items" />
        </div>

        {wishlist?.length === 0 ? (
          <div>
            <h3 className="text-3xl text-center">Your wishlist is empty</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
            {wishlist?.map((product) => (
              <ProductCart wishlist key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
