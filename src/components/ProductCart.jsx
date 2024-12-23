/* eslint-disable react/prop-types */
function ProductCart({ product }) {
  const { image, description, stock, price, category, rating } = product;
  return (
    <div className="bg-secondary-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img src={image} className="h-40 w-full object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold mb-2">{}</h2>
      <p className="mb-3">
        {description?.length < 50
          ? description?.length
          : description.slice(0, 50)}
        ...
      </p>

      <div className="flex justify-between items-center">
        <p className="font-semibold text-primary-dark">${price}</p>
        <p className="text-sm text-gray-600">Stock: {stock}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-700 mb-3">{category}</p>
        <p className="text-gray-700 mb-3">Rating : {rating}</p>
      </div>
      <div className="flex justify-between gap-20">
        <button className="mt-4 w-full py-2 bg-primary-dark text-white rounded-md hover:bg-purple-300 hover:text-purple-900 transition">
          Edit Product
        </button>
        <button className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700  transition">
          Delete Product
        </button>
      </div>
    </div>
  );
}

export default ProductCart;
