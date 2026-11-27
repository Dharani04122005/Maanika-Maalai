
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const changeQuantity = (index, amount) => {
    const updated = [...cartItems];

    updated[index].quantity = Math.max(
      1,
      updated[index].quantity + amount
    );

    updateCart(updated);
  };

  const removeItem = (index) => {
    updateCart(cartItems.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal;

  return (
    <>
      

      <div className="min-h-screen bg-[#FAF4EE]">

        {/* Page Header */}
        <section className="bg-white px-5 py-9 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#A67C36]">
            Maanikamaalai Collections
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-[#7A1F3D]">
            My Shopping Bag
          </h1>

          <p className="mt-2 text-sm text-[#806B65]">
            Your handcrafted favourites, selected with love.
          </p>
        </section>

        {/* Cart Content */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 px-5 py-9 lg:grid-cols-3">

          {/* Product List */}
          <div className="space-y-4 lg:col-span-2">

            {cartItems.length === 0 ? (
              <div className="rounded-xl border border-[#E8D4C3] bg-white p-9 text-center shadow-sm">
                <p className="text-5xl">🌸</p>

                <h2 className="mt-3 text-xl font-bold text-[#7A1F3D]">
                  Your Cart is Empty
                </h2>

                <p className="mt-2 text-sm text-[#806B65]">
                  Explore our beautiful handcrafted collections.
                </p>

                <button
                  onClick={() => navigate("/shop")}
                  className="mt-5 rounded-xl bg-[#7A1F3D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#611631]"
                >
                  Explore Collections →
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={`${item.productId}-${item.colour}-${item.lengthFeet}-${item.widthInches}`}
                  className="flex flex-col gap-4 rounded-xl border border-[#E8D4C3] bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row"
                >

                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-full rounded-lg bg-[#F5E9E2] object-contain sm:w-28"
                  />

                  {/* Product Details */}
                  <div className="flex-1">

                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-serif text-lg font-bold text-[#7A1F3D]">
                        {item.name}
                      </h2>

                      <button
                        onClick={() => removeItem(index)}
                        className="text-xs font-semibold text-red-500 transition hover:text-red-700"
                      >
                        Remove ✕
                      </button>
                    </div>

                    <div className="mt-2 space-y-1 text-xs text-[#806B65]">
                      <p>Colour: {item.colour}</p>
                      <p>Length: {item.lengthFeet} ft</p>
                      <p>
                        Width: {item.widthPagalam} pagalam (
                        {item.widthInches} inch)
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">

                      {/* Quantity */}
                      <div className="flex items-center gap-4 rounded-lg border border-[#E8D4C3] px-3 py-1.5">
                        <button
                          onClick={() => changeQuantity(index, -1)}
                          className="font-bold text-[#7A1F3D] hover:text-[#A67C36]"
                        >
                          −
                        </button>

                        <span className="text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => changeQuantity(index, 1)}
                          className="font-bold text-[#7A1F3D] hover:text-[#A67C36]"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-base font-bold text-[#A67C36]">
                        ₹
                        {(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>

                    </div>
                  </div>
                </div>
              ))
            )}

          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-xl border border-[#E8D4C3] bg-white p-5 shadow-sm lg:sticky lg:top-24">

            <p className="text-xs uppercase tracking-[0.2em] text-[#A67C36]">
              Your Purchase
            </p>

            <h2 className="mt-2 font-serif text-xl font-bold text-[#7A1F3D]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm text-[#806B65]">

              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span>
                  {cartItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <p className="text-xs text-[#A67C36]">
                Shipping charges will be calculated after entering your delivery address.
              </p>

              <div className="border-t border-[#E8D4C3] pt-4">
                <div className="flex justify-between text-base font-bold text-[#7A1F3D]">
                  <span>Total</span>
                  <span>
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

            </div>

            {/* Checkout Button */}
            <button
              disabled={cartItems.length === 0}
              onClick={() => navigate("/checkout")}
              className="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#7A1F3D] to-[#A34460] px-5 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            >
              Proceed to Checkout

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate("/shop")}
              className="mt-3 w-full rounded-xl border border-[#E8D4C3] px-5 py-3 text-sm font-semibold text-[#7A1F3D] transition hover:border-[#7A1F3D] hover:bg-[#FAF4EE]"
            >
              ← Continue Shopping
            </button>

            {/* Clear Cart */}
            {cartItems.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm("Clear your entire cart?")) {
                    updateCart([]);
                  }
                }}
                className="mt-4 w-full text-xs font-medium text-red-500 transition hover:text-red-700 hover:underline"
              >
                Clear Cart
              </button>
            )}

          </aside>

        </section>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
