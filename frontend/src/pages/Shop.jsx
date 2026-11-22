import { API_URL } from "../services/api";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  // Collect all product variations
  const allVariants = products.flatMap((product) =>
    (product.variants || []).filter((variant) => variant.isAvailable)
  );

  const uniqueValues = (key) => [
    ...new Set(allVariants.map((variant) => variant[key])),
  ].sort((a, b) => a - b);

  const colours = [
    ...new Set(allVariants.map((variant) => variant.colour)),
  ].sort();

  // Filter products and their variations
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

      const matchingVariants = (product.variants || []).filter((variant) => {
        return (
          variant.isAvailable &&
          (colour === "All" || variant.colour === colour) &&
          (length === "All" || String(variant.lengthFeet) === length) &&
          (width === "All" || String(variant.widthInches) === width)
        );
      });

      return (
        matchesSearch &&
        matchesCategory &&
        matchingVariants.length > 0 &&
        (design === "All" || product.design === design) &&
        (shape === "All" || product.shape === shape)
      );
    });
  }, [products, search, category, colour, length, width, design, shape]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Products");
    setColour("All");
    setLength("All");
    setWidth("All");
    setDesign("All");
    setShape("All");
  };

  const FilterSelect = ({ label, value, onChange, options, format }) => (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-[#5A3440]">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#E8D4C3] bg-white px-3 py-3 text-sm text-[#5A3440] outline-none focus:border-[#8B2948]"
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
      <section className="bg-[#FFF9F5] px-5 py-12 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#B28A52]">
          Maanikamaalai Collections
        </p>

        <h1 className="font-serif text-4xl font-bold text-[#7A1F3D] md:text-5xl">
          Explore Our Collections
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#806B65]">
          Discover beautifully handcrafted garlands and decorations made
          with love for your special occasions.
        </p>
      </section>

      {/* Category Navigation */}
      <section className="border-y border-[#EADBCB] bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
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
      <section className="mx-auto max-w-7xl px-5 pt-8">
        <div className="relative mx-auto max-w-2xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#9B7180]">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, colour or design..."
            className="w-full rounded-full border border-[#E8D4C3] bg-white py-4 pl-12 pr-5 text-sm text-[#5A3440] shadow-sm outline-none focus:border-[#8B2948]"
          />
        </div>
      </section>

      {/* Filters and Products */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr]">

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-[#EADBCB] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#7A1F3D]">
                Filters
              </h2>

              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-[#A16B48] underline underline-offset-4"
              >
                Clear All
              </button>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-[#5A3440]">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-[#E8D4C3] bg-white px-3 py-3 text-sm text-[#5A3440] outline-none focus:border-[#8B2948]"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

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
              options={[...new Set(products.map((p) => p.design).filter(Boolean))]}
            />

            <FilterSelect
              label="Shape"
              value={shape}
              onChange={setShape}
              options={[...new Set(products.map((p) => p.shape).filter(Boolean))]}
            />
          </aside>

          {/* Product Listing */}
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#7A1F3D]">
                  {category}
                </h2>

                <p className="mt-1 text-sm text-[#8B7770]">
                  Find something beautiful for your occasion.
                </p>
              </div>

              <p className="rounded-full bg-white px-4 py-2 text-sm text-[#7A1F3D] shadow-sm">
                {filteredProducts.length} Products
              </p>
            </div>

            {loading ? (
              <div className="rounded-2xl bg-white p-12 text-center text-[#7A1F3D]">
                Loading our beautiful collections...
              </div>
            ) : error ? (
              <div className="rounded-2xl bg-white p-12 text-center text-red-600">
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-[#EADBCB] bg-white p-12 text-center">
                <p className="mb-3 text-4xl">🌸</p>

                <h3 className="font-serif text-2xl font-bold text-[#7A1F3D]">
                  No Products Found
                </h3>

                <p className="mt-2 text-sm text-[#8B7770]">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-[#7A1F3D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#611631]"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => {
                  const availableVariants = product.variants.filter(
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
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-[#EADBCB] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Product Image */}
                      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#F5E9E2]">
                        <span className="absolute text-5xl">🌸</span>

                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="relative z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}

                        <span className="absolute bottom-3 left-3 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#7A1F3D]">
                          {product.category}
                        </span>
                      </div>

                      {/* Product Details */}
                      
{/* Product Details */}
<div className="p-5">
  <h3 className="font-serif text-xl font-bold text-[#7A1F3D]">
    {product.name}
  </h3>

  <p className="mt-3 text-sm text-[#806B65]">
    Available Colours: {availableColours.join(", ")}
  </p>

  <p className="mt-4 text-xl font-bold text-[#A67C36]">
    From ₹{startingPrice.toLocaleString("en-IN")}
  </p>

  <button
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/shop/${product._id}`);
    }}
    className="mt-5 w-full rounded-full bg-[#7A1F3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#611631]"
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
