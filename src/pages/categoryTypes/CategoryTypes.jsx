import { useParams } from "react-router";
import SectionTitle from "../../components/SectionTitle";
import Loading from "../loading/Loading";
import ProductCart from "../../components/ProductCart";
import { useGetProductQuery } from "../../redux/api/baseApi";

function CategoryTypes() {
  const { type } = useParams();
  const { data, isLoading } = useGetProductQuery({ category: type });

  if (isLoading) {
    return <Loading />;
  }

  if (data?.product?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          No products found for the category: {type}
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <SectionTitle title={`Category: ${type}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {data?.product?.map((product, index) => (
          <ProductCart product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default CategoryTypes;
