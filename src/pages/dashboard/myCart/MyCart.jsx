import { useEffect, useState } from "react";
import axios from "axios";
import useUserFromDB from "../../../hooks/useUserFromDB";
import Loading from "../../loading/Loading";
import SectionTitle from "../../../components/SectionTitle";

function MyCart() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { userFromDb } = useUserFromDB();

  console.log(carts);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:3000/card/${userFromDb?.email}`
        );
        setCarts(response.data.items || []);
      } catch (err) {
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    if (userFromDb) {
      fetchCart();
    }
  }, [userFromDb]);

  // Update item quantity
  const onUpdateQuantity = async (productId, quantity) => {
    console.log({ productId, quantity });

  };

  // Remove item
  const onRemoveItem = async (productId) => {

  };

  const onCheckout = () => {
    console.log("checkout");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (carts?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Your cart is empty!</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <SectionTitle title={"My Carts"} />

      {carts.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty!</div>
      ) : (
        <div>
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Total: ${}</h2>
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
          {carts.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 p-4 border rounded-lg shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-medium text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-600">Price: ${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-200 text-gray-700 rounded px-2 py-1"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    className="bg-gray-200 text-gray-700 rounded px-2 py-1"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => onRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCart;
