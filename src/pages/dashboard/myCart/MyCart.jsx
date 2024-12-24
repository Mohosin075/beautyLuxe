import { useEffect, useState } from "react";
import axios from "axios";
import useUserFromDB from "../../../hooks/useUserFromDB";
import Loading from "../../loading/Loading";
import SectionTitle from "../../../components/SectionTitle";
import { IoTrashBin } from "react-icons/io5";
import { toast } from "sonner";

function MyCart() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [cardStatus, setCardStatus] = useState(false);

  const { userFromDb } = useUserFromDB();

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://beauty-luxe-server.vercel.app/card/${userFromDb?.email}`
        );
        setCarts(response.data.items || []);
        setTotal(response.data.totalPrice);
      } catch (err) {
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    if (userFromDb) {
      fetchCart();
    }
  }, [userFromDb, cardStatus]);

  // Update item quantity
  const onUpdateQuantity = async (productId, quantity) => {
    console.log({ productId, quantity });
    if (quantity < 1) return;
    setLoading(true);
    try {
      await axios.patch("https://beauty-luxe-server.vercel.app/card", {
        email: userFromDb?.email,
        productId,
        quantity,
      });
      setCardStatus(!cardStatus);
    } catch (err) {
      setError("Failed to update quantity.");
    } finally {
      setLoading(false);
    }
  };

  // Remove item
  const onRemoveItem = async (productId) => {
    console.log(productId);
    setLoading(true);
    try {
      await axios.delete(
        `https://beauty-luxe-server.vercel.app/card/${userFromDb?.email}/${productId}`
      );
      // setCardStatus(!cardStatus)
      setCarts((prevCart) => prevCart.filter((item) => item._id !== productId));
    } catch (err) {
      setError("Failed to remove item.");
    } finally {
      setLoading(false);
    }
  };

  console.log(carts);

  const onCheckout = () => {
    toast.info("This feature is't available right now");
  };

  if (loading) {
    return <Loading />;
  }

  // if (error) {
  //   return <div className="text-red-500">{error}</div>;
  // }

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
            <h2 className="text-2xl font-semibold text-gray-800">
              Total: ${total.toFixed(2)}
            </h2>
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
          <div className="mt-4">
            {carts.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 px-2  border rounded-lg shadow-md"
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
                  <p className="text-gray-600">
                    Sub Total: ${item.price * item.quantity}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="bg-gray-200 text-gray-700 rounded px-2 py-1"
                      onClick={() =>
                        onUpdateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="bg-gray-200 text-gray-700 rounded px-2 py-1"
                      onClick={() =>
                        onUpdateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="my-btn bg-primary-dark text-white hover:bg-purple-300 hover:text-purple-900"
                  onClick={() => onRemoveItem(item._id)}
                >
                  <IoTrashBin />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCart;
