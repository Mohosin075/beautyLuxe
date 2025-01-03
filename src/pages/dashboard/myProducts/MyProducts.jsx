import SectionTitle from "../../../components/SectionTitle";
import Loading from "../../loading/Loading";
import useUserFromDB from "../../../hooks/useUserFromDB";
import ProductCart from "../../../components/ProductCart";
import { useGetMyProductQuery } from "../../../redux/api/baseApi";

function MyProducts() {
  const { userFromDb } = useUserFromDB();

  const { data: products, isLoading } = useGetMyProductQuery({
    email: userFromDb?.email,
  });

  if (isLoading) {
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
          {products?.map((product) => (
            <ProductCart key={product._id} product={product} isSeller />
          ))}
        </div>
        {products?.length === 0 && (
          <div>
            <h3 className="text-3xl text-center">Not Product here</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;
