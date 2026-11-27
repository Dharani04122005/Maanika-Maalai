
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";

const categories = [
  "All Products",
  "Temple Collection",
  "Wedding Collection",
  "Stage Decorations",
  "Jewellery Collection",
  "Carpet Model Collection",
  "Wall Hanging",
];

function Shop() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [colour, setColour] = useState("All");
  const [length, setLength] = useState("All");
  const [width, setWidth] = useState("All");
  const [design, setDesign] = useState("All");
  const [shape, setShape] = useState("All");

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        if (!response.ok) {
          throw new Error("Unable to load products.");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Collect Available Variants
  const allVariants = products.flatMap((product) =>
    (product.variants || []).filter((variant) => variant.isAvailable)
  );

  const uniqueValues = (key) => [
    ...new Set(allVariants.map((variant) => variant[key])),
  ].sort((a, b) => a - b);

  const colours = [
    ...new Set(allVariants.map((variant) => variant.colour)),
  ].sort();

  // Filter Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name?.toLowerCase().includes(searchText) ||
        product.description?.toLowerCase().includes(searchText) ||
        product.design?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText) ||
        (product.variants || []).some((variant) =>
          variant.colour?.toLowerCase().includes(searchText)
        );

      const matchesCategory =
        category === "All Products" || product.category === category;

      const matchingVariants = (product.variants || []).filter(
        (variant) =>
          variant.isAvailable &&
          (colour === "All" || variant.colour === colour) &&
          (length === "All" || String(variant.lengthFeet) === length) &&
          (width === "All" || String(variant.widthInches) === width)
      );

      return (
        matchesSearch &&
        matchesCategory &&
        matchingVariants.length > 0 &&
        (design === "All" || product.design === design) &&
        (shape === "All" || product.shape === shape)
      );
    });
  }, [products, search, category, colour, length, width, design, shape]);

  // Clear Filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All Products");
    setColour("All");
    setLength("All");
    setWidth("All");
    setDesign("All");
    setShape("All");
  };

  // Filter Select Component
  const FilterSelect = ({ label, value, onChange, options, format }) => (
    <div className="min-w-0">
      <label className="mb-1 block text-[11px] font-semibold text-[#5A3440] sm:text-sm">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 rounded-lg border border-[#E8D4C3] bg-white px-2 py-2 text-xs text-[#5A3440] outline-none focus:border-[#8B2948] sm:px-3 sm:py-2.5 sm:text-sm"
      >
        <option value="All">All</option>

        {options.map((option) => (
          <option key={option} value={String(option)}>
            {format ? format(option) : option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF4EE]">

      {/* Shop Heading */}
      <section className="bg-[#FFF9F5] px-4 py-7 text-center sm:py-12">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#B28A52] sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
          Maanikamaalai Collections
        </p>

        <h1 className="font-serif text-2xl font-bold text-[#7A1F3D] sm:text-4xl md:text-5xl">
          Explore Our Collections
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-[#806B65] sm:mt-4 sm:text-sm sm:leading-7">
          Discover beautifully handcrafted garlands and decorations made
          with love for your special occasions.
        </p>
      </section>

      {/* Category Navigation */}
      <section className="border-y border-[#EADBCB] bg-white px-3 py-2 sm:px-4 sm:py-4">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1 sm:gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-medium transition sm:px-5 sm:py-2.5 sm:text-sm ${
                category === item
                  ? "bg-[#7A1F3D] text-white shadow-md"
                  : "bg-[#FAF4EE] text-[#704653] hover:bg-[#7A1F3D] hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-7xl px-3 pt-4 sm:px-5 sm:pt-8">
        <div className="relative mx-auto max-w-2xl">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#9B7180] sm:text-xl">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, colour or design..."
            className="w-full rounded-full border border-[#E8D4C3] bg-white py-2.5 pl-10 pr-4 text-xs text-[#5A3440] shadow-sm outline-none focus:border-[#8B2948] sm:py-4 sm:pl-12 sm:text-sm"
          />
        </div>
      </section>

      {/* Filters and Products */}
      <section className="mx-auto max-w-7xl px-3 py-5 sm:px-5 sm:py-10">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-[250px_1fr]">

          {/* Filters */}
          <aside className="h-fit rounded-xl border border-[#EADBCB] bg-white p-3 shadow-sm sm:rounded-2xl sm:p-6">

            <div className="mb-3 flex items-center justify-between sm:mb-6">
              <h2 className="font-serif text-lg font-bold text-[#7A1F3D] sm:text-2xl">
                Filters
              </h2>

              <button
                onClick={clearFilters}
                className="text-[10px] font-semibold text-[#A16B48] underline underline-offset-4 sm:text-xs"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-3 sm:mb-5">
              <label className="mb-1 block text-[11px] font-semibold text-[#5A3440] sm:text-sm">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-[#E8D4C3] bg-white px-2 py-2 text-xs text-[#5A3440] outline-none focus:border-[#8B2948] sm:px-3 sm:py-3 sm:text-sm"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Other Filters */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-y-5 lg:grid-cols-1">

              <FilterSelect
                label="Colour"
                value={colour}
                onChange={setColour}
                options={colours}
              />

              <FilterSelect
                label="Length (ft)"
                value={length}
                onChange={setLength}
                options={uniqueValues("lengthFeet")}
                format={(value) => `${value} ft`}
              />

              <FilterSelect
                label="Width (inches)"
                value={width}
                onChange={setWidth}
                options={uniqueValues("widthInches")}
                format={(value) => `${value} inch`}
              />

              <FilterSelect
                label="Design"
                value={design}
                onChange={setDesign}
                options={[
                  ...new Set(products.map((p) => p.design).filter(Boolean)),
                ]}
              />

              <FilterSelect
                label="Shape"
                value={shape}
                onChange={setShape}
                options={[
                  ...new Set(products.map((p) => p.shape).filter(Boolean)),
                ]}
              />

            </div>
          </aside>

          {/* Product Listing */}
          <div className="min-w-0">

            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-6">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#7A1F3D] sm:text-2xl">
                  {category}
                </h2>

                <p className="mt-1 text-[10px] text-[#8B7770] sm:text-sm">
                  Find something beautiful for your occasion.
                </p>
              </div>

              <p className="rounded-full bg-white px-3 py-1.5 text-[10px] text-[#7A1F3D] shadow-sm sm:px-4 sm:py-2 sm:text-sm">
                {filteredProducts.length} Products
              </p>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="rounded-xl bg-white p-8 text-center text-sm text-[#7A1F3D] sm:rounded-2xl sm:p-12">
                Loading our beautiful collections...
              </div>
            ) : error ? (
              <div className="rounded-xl bg-white p-8 text-center text-sm text-red-600 sm:rounded-2xl sm:p-12">
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-xl border border-[#EADBCB] bg-white p-8 text-center sm:rounded-2xl sm:p-12">
                <p className="mb-3 text-3xl sm:text-4xl">🌸</p>

                <h3 className="font-serif text-xl font-bold text-[#7A1F3D] sm:text-2xl">
                  No Products Found
                </h3>

                <p className="mt-2 text-xs text-[#8B7770] sm:text-sm">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-full bg-[#7A1F3D] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#611631] sm:mt-5 sm:px-6 sm:py-3 sm:text-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (

              /* Product Cards - 2 Per Row */
              <div className="grid grid-cols-2 gap-3 sm:gap-5">

                {filteredProducts.map((product) => {
                  const availableVariants = (product.variants || []).filter(
                    (variant) =>
                      variant.isAvailable &&
                      (colour === "All" || variant.colour === colour) &&
                      (length === "All" ||
                        String(variant.lengthFeet) === length) &&
                      (width === "All" ||
                        String(variant.widthInches) === width)
                  );

                  const startingPrice = Math.min(
                    ...availableVariants.map((variant) => variant.price)
                  );

                  const availableColours = [
                    ...new Set(
                      availableVariants.map((variant) => variant.colour)
                    ),
                  ];

                  return (
                    <article
                      key={product._id}
                      onClick={() => navigate(`/shop/${product._id}`)}
                      className="group min-w-0 cursor-pointer overflow-hidden rounded-xl border border-[#EADBCB] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl"
                    >

                      {/* Product Image */}
                      <div className="relative flex h-28 min-[400px]:h-32 sm:h-48 lg:h-64 items-center justify-center overflow-hidden bg-[#F5E9E2]">

                        <span className="absolute text-4xl sm:text-5xl">
                          🌸
                        </span>

                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                            className="relative z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        )}

                        <span className="absolute bottom-1.5 left-1.5 z-20 max-w-[90%] truncate rounded-full bg-white/90 px-2 py-1 text-[8px] font-medium text-[#7A1F3D] sm:bottom-3 sm:left-3 sm:px-3 sm:text-xs">
                          {product.category}
                        </span>
                      </div>

                      {/* Product Details */}
                      <div className="min-w-0 p-2 sm:p-4 lg:p-5">

                        <h3 className="line-clamp-2 font-serif text-xs font-bold text-[#7A1F3D] sm:text-base lg:text-xl">
                          {product.name}
                        </h3>

                        <p className="mt-1.5 line-clamp-1 text-[9px] text-[#806B65] sm:mt-3 sm:text-xs lg:text-sm">
                          Colours: {availableColours.join(", ")}
                        </p>

                        <p className="mt-2 text-sm font-bold text-[#A67C36] sm:mt-4 sm:text-lg lg:text-xl">
                          From ₹{startingPrice.toLocaleString("en-IN")}
                        </p>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/shop/${product._id}`);
                          }}
                          className="mt-2 w-full rounded-full bg-[#7A1F3D] px-2 py-2 text-[10px] font-semibold text-white transition hover:bg-[#611631] sm:mt-5 sm:px-5 sm:py-3 sm:text-sm"
                        >
                          View Details →
                        </button>

                      </div>
                    </article>
                  );
                })}

              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
