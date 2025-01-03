import Loading from "../pages/loading/Loading";
import { NavLink, useParams } from "react-router";
import { useGetSingleProductQuery } from "../redux/api/baseApi";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProductQuery({
    productId: id,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <div className="text-center">Product not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <div className="flex flex-col md:flex-row items-center border p-4">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:ml-8">
          <h1 className="text-3xl font-semibold ">
            {product.name}
          </h1>
          <p className=" mt-2">{product.description}</p>

          <div className="flex justify-between items-center">
            <p className="text-xl font-bold  mt-4">
              Price: ${product.price}
            </p>
            <p className="text-sm">Stock: {product.stock}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className=" mb-3">{product.category}</p>
            <p className=" mb-3">Rating : {product.rating}</p>
          </div>

          <div className="flex items-center mt-4">
            <NavLink to={"/products"}>
              <button className="my-btn">
                For add to card/wishlist go to product route
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
