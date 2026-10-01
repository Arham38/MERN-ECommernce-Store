import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="page">
      {cartItems.length === 0 ? (
        <div className="card p-8 text-center">
          Your cart is empty.{" "}
          <Link to="/shop" className="text-pink-400 hover:underline">
            Go to shop
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div>
            <h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="mb-4 flex items-center gap-4 border-b border-white/10 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <Link to={`/product/${item._id}`} className="text-pink-400">
                    {item.name}
                  </Link>
                  <div className="mt-1 text-sm text-zinc-400">{item.brand}</div>
                  <div className="font-bold">${item.price}</div>
                </div>
                <select
                  className="rounded border p-1 text-black"
                  value={item.qty}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="text-red-400"
                  onClick={() => removeFromCartHandler(item._id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="card h-fit p-5">
            <h2 className="text-lg font-semibold">
              Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            </h2>
            <div className="mt-2 text-2xl font-bold">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </div>
            <button
              className="btn-primary mt-4 w-full"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
