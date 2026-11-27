
import { FiArrowRight } from "react-icons/fi";

function CategoryCard({ title, image }) {
  return (
    <div className="group min-w-0 bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-[#E8D4A2] shadow-md hover:shadow-2xl hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-500">

      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-24 min-[400px]:h-28 sm:h-44 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-1.5 sm:p-3 lg:p-6">

        <h3 className="text-[10px] min-[400px]:text-xs sm:text-lg lg:text-2xl font-semibold text-[#7A1F3D] leading-tight break-words">
          {title}
        </h3>

        <p className="hidden sm:block text-[#5C4A42] mt-2 lg:mt-3 text-xs lg:text-base leading-6 lg:leading-7">
          Discover beautifully handcrafted floral creations for every special occasion.
        </p>

        <button className="mt-2 sm:mt-4 lg:mt-6 flex items-center gap-1 text-[9px] min-[400px]:text-[10px] sm:text-sm lg:text-base text-[#C9A227] font-semibold group-hover:gap-2 transition-all duration-300">
          <span>View Collection</span>
          <FiArrowRight className="shrink-0" />
        </button>

      </div>
    </div>
  );
}

export default CategoryCard;
