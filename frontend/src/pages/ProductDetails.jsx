
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
const [selectedLength, setSelectedLength] = useState("");
const [selectedWidth, setSelectedWidth] = useState("");
  const [imageError, setImageError] = useState(false);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/products/${id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Product not found");
        }

        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
useEffect(() => {
  if (product) {
    const firstVariant = (product.variants || []).find(
      (variant) => variant.isAvailable
    );

    if (firstVariant) {
      setSelectedColour(firstVariant.colour);
      setSelectedLength(String(firstVariant.lengthFeet));
      setSelectedWidth(String(firstVariant.widthInches));
    }
  }
}, [product]);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF4EE] text-[#7A1F3D]">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#FAF4EE]">
        <p className="text-[#7A1F3D]">
          {error || "Product not found"}
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="rounded-full bg-[#7A1F3D] px-6 py-3 text-white"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const availableVariants = (product.variants || []).filter(
    (variant) => variant.isAvailable
  );

  const availableColours = [
    ...new Set(availableVariants.map((variant) => variant.colour)),
  ];
  const availableLengths = [
  ...new Set(
    availableVariants
      .filter((variant) => variant.colour === selectedColour)
      .map((variant) => variant.lengthFeet)
  ),
];

const availableWidths = [
  ...new Set(
    availableVariants
      .filter(
        (variant) =>
          variant.colour === selectedColour &&
          String(variant.lengthFeet) === selectedLength
      )
      .map((variant) => variant.widthInches)
  ),
];

const selectedVariant = availableVariants.find(
  (variant) =>
    variant.colour === selectedColour &&
    String(variant.lengthFeet) === selectedLength &&
    String(variant.widthInches) === selectedWidth
);

const handleAddToCart = () => {
  if (!selectedVariant) {
    alert("Please select an available product variation.");
    return;
  }

  const cartItem = {
    productId: product._id,
    name: product.name,
    image: product.image,
    colour: selectedVariant.colour,
    lengthFeet: selectedVariant.lengthFeet,
    widthPagalam: selectedVariant.widthPagalam,
    widthInches: selectedVariant.widthInches,
    price: selectedVariant.price,
    quantity: 1,
  };

  const existingCart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const existingItem = existingCart.find(
    (item) =>
      item.productId === cartItem.productId &&
      item.colour === cartItem.colour &&
      item.lengthFeet === cartItem.lengthFeet &&
      item.widthInches === cartItem.widthInches
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    existingCart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

  alert("Product added to cart successfully!");
  navigate("/cart");
};


  return (
    <div className="min-h-screen bg-[#FAF4EE]">

      {/* Back Navigation */}
      <div className="mx-auto max-w-7xl px-5 pt-8">
        <button
          onClick={() => navigate("/shop")}
          className="font-semibold text-[#7A1F3D] transition hover:text-[#A67C36]"
        >
          ← Back to Collections
        </button>
      </div>

      {/* Product Details */}
      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* Large Product Image */}
          <div className="overflow-hidden rounded-3xl border border-[#E8D4C3] bg-white p-3 shadow-sm">
            <div className="flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl bg-[#F5E9E2] md:min-h-[550px]">

              {product.image && !imageError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="h-[350px] w-full object-contain md:h-[550px]"
                />
              ) : (
                <div className="text-center text-[#A67C36]">
                  <p className="text-7xl">🌸</p>
                  <p className="mt-3 text-sm">
                    Product image unavailable
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B28A52]">
              Maanikamaalai Collections
            </p>

            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#7A1F3D] md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 h-1 w-20 rounded-full bg-[#C9A227]" />

            {/* Description */}
            <h2 className="mt-8 font-serif text-xl font-bold text-[#7A1F3D]">
              Product Description
            </h2>

            <p className="mt-3 text-base leading-8 text-[#806B65]">
              {product.description}
            </p>

            {/* Product Information */}
            <div className="mt-8 rounded-2xl border border-[#E8D4C3] bg-white p-6">

              <h2 className="mb-5 font-serif text-xl font-bold text-[#7A1F3D]">
                Product Information
              </h2>

              <div className="space-y-4 text-sm text-[#765F59]">

                <div className="flex justify-between gap-4">
                  <span>Category</span>
                  <strong className="text-right text-[#7A1F3D]">
                    {product.category}
                  </strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Design</span>
                  <strong className="text-right text-[#7A1F3D]">
                    {product.design}
                  </strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Shape</span>
                  <strong className="text-right text-[#7A1F3D]">
                    {product.shape}
                  </strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Delivery Time</span>
                  <strong className="text-right text-[#7A1F3D]">
                    {product.deliveryDays} days
                  </strong>
                </div>

              </div>
            </div>

            {/* Available Colours */}
            
{/* Available Colours */}
<div className="mt-6">
  <h2 className="font-serif text-xl font-bold text-[#7A1F3D]">
    Select Colour
  </h2>

  <div className="mt-3 flex flex-wrap gap-3">
    {availableColours.map((colour) => (
      <button
        key={colour}
        onClick={() => {
          const firstVariant = availableVariants.find(
            (variant) => variant.colour === colour
          );

          setSelectedColour(colour);
          setSelectedLength(String(firstVariant.lengthFeet));
          setSelectedWidth(String(firstVariant.widthInches));
        }}
        className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
          selectedColour === colour
            ? "border-[#7A1F3D] bg-[#7A1F3D] text-white"
            : "border-[#D9B98C] bg-white text-[#7A1F3D] hover:bg-[#F5E9E2]"
        }`}
      >
        {colour}
      </button>
    ))}
  </div>
</div>


{/* Length & Width Selection */}
<div className="mt-6 grid grid-cols-2 gap-4">

  {/* Select Length */}
  <div>
    <label className="font-serif text-lg font-bold text-[#7A1F3D]">
      Length
    </label>

    <select
      value={selectedLength}
      onChange={(e) => {
        const newLength = e.target.value;

        const firstVariant = availableVariants.find(
          (variant) =>
            variant.colour === selectedColour &&
            String(variant.lengthFeet) === newLength
        );

        setSelectedLength(newLength);
        setSelectedWidth(String(firstVariant.widthInches));
      }}
      className="mt-3 w-full rounded-xl border border-[#D9B98C] bg-white p-3 text-sm text-[#7A1F3D] outline-none"
    >
      {availableLengths.map((length) => (
        <option key={length} value={String(length)}>
          {length} ft
        </option>
      ))}
    </select>
  </div>

  {/* Select Width */}
  <div>
    <label className="font-serif text-lg font-bold text-[#7A1F3D]">
      Width
    </label>

    <select
      value={selectedWidth}
      onChange={(e) => setSelectedWidth(e.target.value)}
      className="mt-3 w-full rounded-xl border border-[#D9B98C] bg-white p-3 text-sm text-[#7A1F3D] outline-none"
    >
      {availableWidths.map((width) => {
        const variant = availableVariants.find(
          (item) =>
            item.colour === selectedColour &&
            String(item.lengthFeet) === selectedLength &&
            String(item.widthInches) === String(width)
        );

        return (
          <option key={width} value={String(width)}>
            {variant.widthPagalam} pagalam
          </option>
        );
      })}
    </select>
  </div>

</div>

{/* Selected Product Price */}
<div className="mt-7 rounded-2xl border border-[#E8D4C3] bg-white p-5">
  <p className="text-sm font-medium text-[#806B65]">
    Selected Product Price
  </p>

  {selectedVariant ? (
    <p className="mt-2 text-3xl font-bold text-[#A67C36]">
      ₹{selectedVariant.price.toLocaleString("en-IN")}
    </p>
  ) : (
    <p className="mt-2 text-sm text-red-600">
      This combination is unavailable.
    </p>
  )}
</div>

{/* Add to Cart Button */}
<button
  onClick={handleAddToCart}
  disabled={!selectedVariant}
  className="mt-6 w-full rounded-full bg-[#7A1F3D] px-8 py-4 text-base font-semibold text-white shadow-md transition duration-300 hover:bg-[#611631] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
>
  Add to Cart
</button>

            
{/* Available Sizes */}
<div className="mt-7">
  <h2 className="font-serif text-xl font-bold text-[#7A1F3D]">
    Available Sizes
  </h2>

  <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
    {availableVariants.map((variant, index) => (
      <div
        key={variant._id || index}
        className="rounded-xl border border-[#E8D4C3] bg-white p-4 text-sm text-[#765F59]"
      >
        <p>
          <strong className="text-[#7A1F3D]">
            {variant.colour}
          </strong>
        </p>

        <p className="mt-2">
          Length: <strong>{variant.lengthFeet} ft</strong>
        </p>

        <p className="mt-2">
          Width: <strong>{variant.widthPagalam} pagalam</strong>
        </p>

        <p className="mt-2 font-bold text-[#A67C36]">
          ₹{variant.price.toLocaleString("en-IN")}
        </p>
      </div>
    ))}
  </div>
</div>

            

            <p className="mt-6 text-sm leading-6 text-[#8B7770]">
              All our products are handcrafted with care and attention
              to detail.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
