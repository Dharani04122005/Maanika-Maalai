
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const savedOrder = JSON.parse(
        localStorage.getItem("lastOrder") || "null"
      );

      if (!savedOrder) {
        navigate("/shop");
        return;
      }

      setOrder(savedOrder);
    } catch {
      navigate("/shop");
    }
  }, [navigate]);

  if (!order) return null;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FAF4EE] px-5 py-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#E8D4C3] bg-white p-6 shadow-md sm:p-9">

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl text-green-600">
              ✓
            </div>

            <h1 className="mt-5 font-serif text-3xl font-bold text-[#7A1F3D]">
              Order Placed Successfully!
            </h1>

            <p className="mt-2 text-sm text-[#806B65]">
              Thank you for choosing Maanikamaalai Collections.
            </p>

            <div className="mt-5 rounded-lg bg-[#FAF4EE] p-4">
              <p className="text-xs text-[#806B65]">
                Your Order ID
              </p>
              <p className="mt-1 break-all text-lg font-bold text-[#A67C36]">
                {order.orderNumber}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-[#E8D4C3] pt-5">
            <h2 className="font-serif text-xl font-bold text-[#7A1F3D]">
              Order Details
            </h2>

            {order.items?.map((item, index) => (
              <div
                key={index}
                className="mt-4 flex items-center gap-3 border-b border-[#F0E4DA] pb-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg bg-[#FAF4EE] object-contain"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#7A1F3D]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#806B65]">
                    {item.colour} · {item.lengthFeet} ft
                  </p>
                  <p className="text-xs text-[#806B65]">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-[#A67C36]">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-[#806B65]">
              <span>Subtotal</span>
              <span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-[#806B65]">
              <span>Shipping</span>
              <span>₹{order.shipping?.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between border-t border-[#E8D4C3] pt-4 text-lg font-bold text-[#7A1F3D]">
              <span>Total Amount</span>
              <span>₹{order.total?.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="mt-7 rounded-lg bg-[#FAF4EE] p-4">
            <h3 className="font-bold text-[#7A1F3D]">
              Delivery Address
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#806B65]">
              {order.address?.doorNo}, {order.address?.street},
              {" "}{order.address?.area}, {order.address?.city},
              {" "}{order.address?.district},
              {" "}{order.address?.state} - {order.address?.pincode}
            </p>
          </div>
          <div className="mt-6 rounded-xl border border-[#E8D4C3] bg-[#FAF4EE] p-5 text-center">
  <h3 className="font-serif text-xl font-bold text-[#7A1F3D]">
    Need Any Help?
  </h3>

  <p className="mt-2 text-sm text-[#806B65]">
    Our team will contact you soon to confirm your order.
    For any enquiries, feel free to contact us.
  </p>

  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

    <a
      href="tel:+918015627764"
      className="rounded-lg bg-[#7A1F3D] px-4 py-3 font-bold text-white transition hover:bg-[#A34460]"
    >
      ☎ Call Now
    </a>

    <a
      href={`https://wa.me/918015627764?text=${encodeURIComponent(
        `Hello Maanikamaalai, I have an enquiry regarding my order ${order.orderNumber}.`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-green-600 px-4 py-3 font-bold text-white transition hover:bg-green-700"
    >
      WhatsApp Enquiry
    </a>

  </div>
</div>

          <button
            onClick={() => navigate("/shop")}
            className="mt-8 w-full rounded-lg bg-gradient-to-r from-[#7A1F3D] to-[#A34460] px-5 py-3 font-bold text-white transition hover:shadow-lg"
          >
            Continue Shopping
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderSuccess;
