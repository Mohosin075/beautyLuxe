import { useEffect, useState } from "react";
import useUserFromDB from "../../../hooks/useUserFromDB";
import Loading from "../../loading/Loading";
import SectionTitle from "../../../components/SectionTitle";
import { IoTrashBin } from "react-icons/io5";
import { toast } from "sonner";
import useTheme from "../../../hooks/useTheme";
import {
  useGetMyCartQuery,
  useRemoveFromMyCartMutation,
  useUpdateQuantityMutation,
} from "../../../redux/api/baseApi";

function MyCart() {
  const [total, setTotal] = useState(0);
  const { userFromDb } = useUserFromDB();
  const { theme } = useTheme();

  const {
    data: carts,
    isLoading,
    refetch,
  } = useGetMyCartQuery({
    email: userFromDb?.email,
  });

  const [removeFromCard] = useRemoveFromMyCartMutation();
  const [updateQuantity] = useUpdateQuantityMutation();

  useEffect(() => {
    setTotal(carts?.totalPrice);
  }, [carts?.totalPrice]);

  // Update item quantity
  const onUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await updateQuantity({
        email: userFromDb?.email,
        productId,
        quantity,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item
  const onRemoveItem = async (productId) => {
    try {
      await removeFromCard({
        email: userFromDb?.email,
        productId,
      });

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckout = () => {
    toast.info("This feature is't available right now");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-4 ${
        theme === "dark"
          ? "bg-darkBackground text-textLight"
          : "bg-lightBackground text-textDark"
      }`}
    >
      <SectionTitle title={"My Carts"} />

      {carts?.items?.length === 0 ? (
        <div className="text-center ">Your cart is empty!</div>
      ) : (
        <div>
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              Total: ${total?.toFixed(2)}
            </h2>
            <button className="my-btn" onClick={onCheckout}>
              Checkout
            </button>
          </div>
          <div className="mt-4">
            {carts?.items?.map((item) => (
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
                  <h3 className="text-xl font-medium ">{item.name}</h3>
                  <p className="">Price: ${item.price}</p>
                  <p className="">
                    Sub Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="my-btn"
                      onClick={() =>
                        onUpdateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="my-btn"
                      onClick={() =>
                        onUpdateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="my-btn "
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
