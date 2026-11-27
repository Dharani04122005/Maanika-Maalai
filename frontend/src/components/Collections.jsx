
import CategoryCard from "./CategoryCard";

import hero from "../assets/images/hero/hero.jpeg";
import img1 from "../assets/images/hero/img1.jpeg";
import img3 from "../assets/images/hero/img3.jpeg";
import img4 from "../assets/images/hero/img4.jpeg";

const collections = [
  { title: "Temple Collection", image: hero },
  { title: "Wedding Collection", image: img1 },
  { title: "Stage Decorations", image: img3 },
  { title: "Jewellery Collection", image: img4 },
  { title: "Carpet Model Collection", image: hero },
  { title: "Wall Hanging", image: img1 },
];

function Collections() {
  return (
    <section className="bg-[#FFF9F5] py-12 sm:py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">

        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <p className="uppercase tracking-[2px] sm:tracking-[6px] text-[10px] sm:text-sm text-[#C9A227] font-semibold">
            Crafted For Every Occasion
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7A1F3D] mt-3 sm:mt-4">
            Our Collections
          </h2>

          <p className="text-[#5C4A42] mt-3 sm:mt-5 max-w-2xl mx-auto text-xs sm:text-base lg:text-lg leading-6 sm:leading-8">
            From temple offerings to grand wedding celebrations, explore our handcrafted floral collections designed with tradition and elegance.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-5 lg:gap-8">
          {collections.map((item, index) => (
            <CategoryCard
              key={index}
              title={item.title}
              image={item.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Collections;
