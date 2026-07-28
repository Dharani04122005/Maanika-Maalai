import { FiArrowRight } from "react-icons/fi";

function CategoryCard({ title, image }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#E8D4A2] shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-6">

        <h3 className="text-2xl font-semibold text-[#7A1F3D]">
          {title}
        </h3>

        <p className="text-[#5C4A42] mt-3 leading-7">
          Discover beautifully handcrafted floral creations for every special occasion.
        </p>

        <button className="mt-6 flex items-center gap-2 text-[#C9A227] font-semibold group-hover:gap-4 transition-all duration-300">
          View Collection
          <FiArrowRight />
        </button>

      </div>
    </div>
  );
}

export default CategoryCard;