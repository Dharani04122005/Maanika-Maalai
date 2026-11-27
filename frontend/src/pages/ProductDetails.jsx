
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
      <div className="min-h-screen bg-[#FAF4EE]">
        
        <div className="flex min-h-[60vh] items-center justify-center text-[#7A1F3D]">
          Loading product details...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FAF4EE]">
        
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
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
      <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-5">
        <button
          onClick={() => navigate("/shop")}
          className="text-sm font-semibold text-[#7A1F3D] transition hover:text-[#A67C36]"
        >
          ← Back to Collections
        </button>
      </div>

      {/* Product Details */}
      <section className="mx-auto max-w-6xl px-4 py-5 sm:px-5 sm:py-8">

        <div className="grid grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-2">

          {/* Product Image */}
          <div className="h-fit overflow-hidden rounded-2xl border border-[#E8D4C3] bg-white p-2 shadow-sm sm:rounded-3xl sm:p-3">

            <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl bg-[#F5E9E2] sm:min-h-[380px] lg:min-h-[450px]">

              {product.image && !imageError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="h-[280px] w-full object-contain sm:h-[380px] lg:h-[450px]"
                />
              ) : (
                <div className="text-center text-[#A67C36]">
                  <p className="text-6xl sm:text-7xl">🌸</p>
                  <p className="mt-3 text-sm">
                    Product image unavailable
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B28A52] sm:text-sm sm:tracking-[0.3em]">
              Maanikamaalai Collections
            </p>

            <h1 className="mt-2 font-serif text-2xl font-bold leading-tight text-[#7A1F3D] sm:mt-3 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 h-1 w-16 rounded-full bg-[#C9A227] sm:mt-5 sm:w-20" />

            {/* Description */}
            <h2 className="mt-5 font-serif text-lg font-bold text-[#7A1F3D] sm:mt-6 sm:text-xl">
              Product Description
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#806B65] sm:text-base sm:leading-7">
              {product.description}
            </p>

            {/* Product Information */}
            <div className="mt-5 rounded-xl border border-[#E8D4C3] bg-white p-4 sm:mt-6 sm:rounded-2xl sm:p-5">

              <h2 className="mb-4 font-serif text-lg font-bold text-[#7A1F3D] sm:text-xl">
                Product Information
              </h2>

              <div className="space-y-3 text-xs text-[#765F59] sm:space-y-4 sm:text-sm">

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
            <div className="mt-5 sm:mt-6">

              <h2 className="font-serif text-lg font-bold text-[#7A1F3D] sm:text-xl">
                Select Colour
              </h2>

              <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
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
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition sm:px-5 sm:text-sm ${
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
            <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">

              {/* Select Length */}
              <div>
                <label className="font-serif text-base font-bold text-[#7A1F3D] sm:text-lg">
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
                  className="mt-2 w-full rounded-xl border border-[#D9B98C] bg-white p-2.5 text-xs text-[#7A1F3D] outline-none sm:mt-3 sm:p-3 sm:text-sm"
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
                <label className="font-serif text-base font-bold text-[#7A1F3D] sm:text-lg">
                  Width
                </label>

                <select
                  value={selectedWidth}
                  onChange={(e) => setSelectedWidth(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#D9B98C] bg-white p-2.5 text-xs text-[#7A1F3D] outline-none sm:mt-3 sm:p-3 sm:text-sm"
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
            <div className="mt-5 rounded-xl border border-[#E8D4C3] bg-white p-4 sm:mt-6 sm:rounded-2xl sm:p-5">

              <p className="text-xs font-medium text-[#806B65] sm:text-sm">
                Selected Product Price
              </p>

              {selectedVariant ? (
                <p className="mt-2 text-2xl font-bold text-[#A67C36] sm:text-3xl">
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
              className="mt-4 w-full rounded-full bg-[#7A1F3D] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#611631] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:mt-5 sm:px-8 sm:py-3.5 sm:text-base"
            >
              Add to Cart
            </button>

            {/* Available Sizes */}
            <div className="mt-5 sm:mt-6">

              <h2 className="font-serif text-lg font-bold text-[#7A1F3D] sm:text-xl">
                Available Sizes
              </h2>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3">

                {availableVariants.map((variant, index) => (
                  <div
                    key={variant._id || index}
                    className="rounded-xl border border-[#E8D4C3] bg-white p-3 text-xs text-[#765F59] sm:p-4 sm:text-sm"
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

            <p className="mt-5 text-xs leading-5 text-[#8B7770] sm:mt-6 sm:text-sm sm:leading-6">
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
