import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import emptycart from "../assets/empty-cart.png";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
  resetCart,
} from "../redux-toolkit/cartSlice";

const CartRoute = () => {
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const totalPrice = cart.reduce((acc, item) => {
    acc += item.price * item.quantity;
    return acc;
  }, 0);
  return (
    <>
      <Navbar />

      {cart.length > 0 ? (
        <section className="py-24 bg-gray-100 font-poppins ">
          <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
            <div>
              <h2 className="mb-8 text-4xl font-bold">Your Cart</h2>
              <button
                onClick={() => dispatch(resetCart())}
                className="bg-orange-500 text-white font-bold rounded-xl px-4 p-3 mt-3 mb-8"
              >
                Clear Cart
              </button>
              <div className="p-6 mb-8 border bg-gray-50 rounded-xl">
                <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
                  <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                    <h2 className="font-bold text-black">Image & name</h2>
                  </div>
                  <div className="hidden px-4 lg:block lg:w-2/12">
                    <h2 className="font-bold text-black">Price</h2>
                  </div>
                  <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                    <h2 className="font-bold text-black">Quantity</h2>
                  </div>
                  <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                    <h2 className="font-bold text-black"> Subtotal</h2>
                  </div>
                </div>
                {cart.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="py-4 mb-8 border-t border-b border-gray-200 "
                    >
                      <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                        <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                          <div className="flex flex-wrap items-center -mx-4">
                            <div className="w-full px-4 mb-3 md:w-1/3">
                              <div className="w-full h-96 md:h-24 md:w-24">
                                <img
                                  src={item.image}
                                  alt=""
                                  className="object-cover w-full h-full rounded-xl"
                                />
                              </div>
                              <button
                                onClick={() => dispatch(deleteItem(item.id))}
                                className="bg-orange-500 text-white font-bold rounded-xl p-1 mt-2"
                              >
                                Delete Item
                              </button>
                            </div>
                            <div className="w-2/3 px-4">
                              <h2 className="mb-2 text-xl font-bold ">
                                {item.name}
                              </h2>
                              <p className="text-gray-500">{item.category}</p>
                            </div>
                          </div>
                        </div>
                        <div className="hidden px-4 lg:block lg:w-2/12">
                          <p className="text-lg font-bold text-orange-500">
                            $ {item.price}
                          </p>
                        </div>
                        <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                          <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md ">
                            <button
                              onClick={() =>
                                dispatch(decreaseQuantity(item.id))
                              }
                              className="py-2 hover:text-gray-700 text-black font-bold"
                            >
                              -
                            </button>
                            <div className="w-12 text-black font-bold text-3xl flex justify-center px-2 py-4 text-center border-0 rounded-md  bg-gray-50 md:text-right">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() =>
                                dispatch(increaseQuantity(item.id))
                              }
                              className="py-2 hover:text-gray-700 text-black font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                          <p className="text-lg font-bold text-orange-500 dark:text-gray-400">
                            $ {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="w-full px-4 mb-4 lg:w-1/2 ">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-gray-700 dark:text-gray-400">
                      Apply Coupon
                    </span>
                    <input
                      type="text"
                      className="w-full cursor-not-allowed px-8 py-4 font-normal placeholder-gray-400 border lg:flex-1 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-400 dark:bg-gray-800"
                      placeholder="x304k45"
                      required
                    />
                    <button className="inline-block cursor-not-allowed w-full px-8 py-4 font-bold text-center text-gray-100 bg-orange-500 rounded-md lg:w-32 ">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="w-full px-4 mb-4 lg:w-1/2 ">
                  <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-gray-50 md:p-8">
                    <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">
                      Order Summary
                    </h2>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                      <span className="text-gray-700 dark:text-gray-400">
                        Subtotal
                      </span>
                      <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                        $ {totalPrice}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 mb-4 ">
                      <span className="text-gray-700 dark:text-gray-400 ">
                        Shipping
                      </span>
                      <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                        Free
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 mb-4 ">
                      <span className="text-gray-700 dark:text-gray-400">
                        Order Total
                      </span>
                      <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                        $ {totalPrice}
                      </span>
                    </div>
                    <h2 className="text-lg text-gray-500 dark:text-gray-400">
                      We offer:
                    </h2>
                    <div className="flex items-center gap-2 mb-4 ">
                      <img
                        src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png"
                        alt=""
                        className="object-cover h-16 w-26"
                      />

                      <img
                        src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png"
                        alt=""
                        className="object-cover h-16 w-26"
                      />

                      <img
                        src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png"
                        alt=""
                        className="object-cover h-16 w-26"
                      />
                    </div>
                    <div className="flex items-center justify-between ">
                      <button className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-orange-500 rounded-md hover:bg-orange-600">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="mt-[100px] flex flex-col justify-center items-center">
          <h1>Your cart is empty</h1>
          <img src={emptycart} alt="emptycart" />
          <p>Add Something to make me happy :(</p>
          <Link
            to="/"
            className="bg-orange-500 text-white font-bold rounded-xl px-4 p-3 mt-3"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </>
  );
};

export default CartRoute;
