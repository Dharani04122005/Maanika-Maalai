
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

import {
  getAllStates,
  getDistricts,
} from "india-state-district";

const states = getAllStates();

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    doorNo: "",
    street: "",
    area: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  // Load Cart
  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCartItems(
        Array.isArray(savedCart) ? savedCart : []
      );
    } catch {
      setCartItems([]);
    }
  }, []);

  // Available Districts
  const availableDistricts = address.state
    ? getDistricts(address.state)
    : [];

  // Handle Input Changes
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // Handle State Selection
  const handleStateChange = (e) => {
    setAddress({
      ...address,
      state: e.target.value,
      district: "",
    });
  };

  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  // Shipping Calculation
  const getShippingCharge = () => {
    const district = address.district.trim().toLowerCase();
    const state = address.state.trim().toLowerCase();

    if (!district || !state) return 0;

    if (state === "tn") {
      if (
        district === "kanyakumari" ||
        district === "kanniyakumari"
      ) {
        return 50;
      }

      return 100;
    }

    return 200;
  };

  const shipping = getShippingCharge();
  const total = subtotal + shipping;

  // Place Order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/shop");
      return;
    }

    if (!address.district || !address.state) {
      alert("Please select your State and District.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          cartItems,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to place your order."
        );
      }

      // Clear cart only after successful order
     localStorage.setItem("lastOrder", JSON.stringify(data.order));

localStorage.removeItem("cart");
localStorage.removeItem("checkoutData");

setCartItems([]);

navigate("/order-success");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Input Styling
  const inputClass =
    "w-full rounded-lg border border-[#E8D4C3] bg-white px-3 py-2.5 text-sm text-[#604C47] outline-none transition focus:border-[#7A1F3D]";

  // Input Fields
  const fields = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
    },
    {
      label: "Mobile Number",
      name: "phone",
      type: "tel",
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
    },
    {
      label: "Door No. / House Name",
      name: "doorNo",
    },
    {
      label: "Street",
      name: "street",
    },
    {
      label: "Area / Village",
      name: "area",
    },
    {
      label: "City / Town",
      name: "city",
    },
    {
      label: "Pincode",
      name: "pincode",
    },
    {
      label: "Landmark (Optional)",
      name: "landmark",
      optional: true,
    },
  ];

  return (
    <>
      

      <div className="min-h-screen bg-[#FAF4EE]">

        {/* Header */}
        <section className="bg-white px-5 py-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#A67C36]">
            Maanikamaalai Collections
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-[#7A1F3D]">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-[#806B65]">
            Complete your delivery details and confirm your order.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 px-5 py-8 lg:grid-cols-5"
        >

          {/* Delivery Information */}
          <div className="rounded-xl border border-[#E8D4C3] bg-white p-5 shadow-sm lg:col-span-3">

            <h2 className="font-serif text-xl font-bold text-[#7A1F3D]">
              Delivery Information
            </h2>

            <p className="mb-5 mt-1 text-xs text-[#806B65]">
              Enter your contact details and delivery address.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Normal Fields */}
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={
                    field.name === "landmark"
                      ? "sm:col-span-2"
                      : ""
                  }
                >
                  <label className="mb-1.5 block text-xs font-semibold text-[#806B65]">
                    {field.label}
                  </label>

                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={address[field.name]}
                    onChange={handleChange}
                    required={!field.optional}
                    maxLength={
                      field.name === "pincode"
                        ? 6
                        : undefined
                    }
                    pattern={
                      field.name === "pincode"
                        ? "[0-9]{6}"
                        : field.name === "phone"
                        ? "[0-9]{10}"
                        : undefined
                    }
                    title={
                      field.name === "pincode"
                        ? "Enter a valid 6-digit pincode"
                        : field.name === "phone"
                        ? "Enter a valid 10-digit mobile number"
                        : undefined
                    }
                    className={inputClass}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}

              {/* State Dropdown */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#806B65]">
                  State / Union Territory
                </label>

                <select
                  name="state"
                  value={address.state}
                  onChange={handleStateChange}
                  required
                  className={inputClass}
                >
                  <option value="">
                    Select State / UT
                  </option>

                  {states.map((state) => (
                    <option
                      key={state.code}
                      value={state.code}
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Dropdown */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#806B65]">
                  District
                </label>

                <select
                  name="district"
                  value={address.district}
                  onChange={handleChange}
                  required
                  disabled={!address.state}
                  className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
                >
                  <option value="">
                    Select District
                  </option>

                  {availableDistricts.map((district) => (
                    <option
                      key={district}
                      value={district}
                    >
                      {district}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Shipping Information */}
            <div className="mt-6 rounded-lg bg-[#FAF4EE] p-4">

              <p className="text-sm font-bold text-[#7A1F3D]">
                Delivery Shipping Charge
              </p>

              <p className="mt-1 text-xs text-[#806B65]">
                Shipping charge is calculated based on your district and state.
              </p>

              <p className="mt-3 text-lg font-bold text-[#A67C36]">
                {shipping === 0
                  ? "Select district and state"
                  : `₹${shipping.toLocaleString("en-IN")}`}
              </p>

            </div>

            {/* Back to Cart */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="mt-5 w-full rounded-lg border border-[#E8D4C3] px-4 py-3 text-sm font-semibold text-[#7A1F3D] transition hover:bg-[#FAF4EE]"
            >
              Back to Cart
            </button>

          </div>

          {/* Order Summary */}
          <aside className="rounded-xl border border-[#E8D4C3] bg-white p-5 shadow-sm lg:col-span-2">

            <h2 className="font-serif text-xl font-bold text-[#7A1F3D]">
              Order Summary
            </h2>

            <p className="mb-5 mt-1 text-xs text-[#806B65]">
              Review your selected products.
            </p>

            {/* Cart Items */}
            <div className="max-h-80 space-y-3 overflow-y-auto">

              {cartItems.length === 0 ? (
                <p className="py-5 text-center text-sm text-[#806B65]">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.colour}-${item.lengthFeet}-${item.widthInches}-${index}`}
                    className="flex items-center gap-3 rounded-lg border border-[#F0E4DA] p-2.5"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg bg-[#F5E9E2] object-contain"
                    />

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-sm font-bold text-[#7A1F3D]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#806B65]">
                        {item.colour} · {item.lengthFeet} ft
                      </p>

                      <p className="text-xs text-[#806B65]">
                        {item.widthInches} inch · Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="text-sm font-bold text-[#A67C36]">
                      ₹{(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>
                ))
              )}

            </div>

            {/* Price Details */}
            <div className="mt-5 space-y-3 border-t border-[#E8D4C3] pt-4 text-sm">

              <div className="flex justify-between text-[#806B65]">
                <span>Subtotal</span>

                <span>
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-[#806B65]">
                <span>Shipping Charge</span>

                <span>
                  {shipping === 0
                    ? "Awaiting address"
                    : `₹${shipping.toLocaleString("en-IN")}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-[#E8D4C3] pt-4 text-base font-bold text-[#7A1F3D]">
                <span>Final Total</span>

                <span>
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

            </div>

            {/* Error Message */}
            {error && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {/* Confirm Order */}
            <button
              type="submit"
              disabled={cartItems.length === 0 || loading}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#7A1F3D] to-[#A34460] px-4 py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Placing Order..." : "Confirm Order"}

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <p className="mt-3 text-center text-[11px] text-[#806B65]">
              Your handcrafted order details will be saved.
            </p>

          </aside>

        </form>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
