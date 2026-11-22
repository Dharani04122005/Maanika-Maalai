
import { motion } from "framer-motion";

import hero from "../assets/images/hero/hero.jpeg";
import img1 from "../assets/images/hero/img1.jpeg";
import img3 from "../assets/images/hero/img3.jpeg";
import img4 from "../assets/images/hero/img4.jpeg";

const reviews = [
  {
    name: "Priya S.",
    location: "Kanyakumari",
    title: "A Garland to Remember",
    review:
      "Beautiful flowers and perfect finishing! The garland made our special occasion even more memorable.",
    image: hero,
    order: "Wedding Garland",
  },
  {
    name: "Anitha R.",
    location: "Nagercoil",
    title: "Tradition in Every Petal",
    review:
      "Amazing traditional craftsmanship. Every little detail was beautifully designed.",
    image: img1,
    order: "Traditional Floral Design",
  },
  {
    name: "Kavitha M.",
    location: "Thovalai",
    title: "Made With Love",
    review:
      "The floral jewellery was elegant and unique. Loved the beautiful handmade finishing!",
    image: img3,
    order: "Floral Jewellery",
  },
  {
    name: "Meena R.",
    location: "Kanyakumari",
    title: "Simply Beautiful!",
    review:
      "Wonderful creativity and attention to detail. The decoration looked absolutely gorgeous!",
    image: img4,
    order: "Floral Decoration",
  },
];

function CustomerReviews() {
  return (
    <section className="bg-[#FAF4EE] py-20 px-5 md:px-12 lg:px-20">

      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-[#B58A38] uppercase tracking-[4px] text-sm font-semibold mb-3">
          Customer Testimonials
        </p>

        <h2 className="text-3xl md:text-5xl text-[#681D37] font-serif mb-4">
          Words That Bloom
        </h2>

        <p className="text-[#80665D] text-sm md:text-base leading-relaxed">
          Every creation tells a story. Every happy customer
          makes our journey more beautiful.
        </p>

        <div className="text-[#C49A35] text-xl mt-5 tracking-widest">
          ★★★★★
        </div>
      </div>

      {/* Review Cards */}
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {reviews.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="group bg-white rounded-2xl overflow-hidden
            shadow-[0_8px_30px_rgba(97,22,49,0.07)]
            hover:shadow-[0_15px_40px_rgba(97,22,49,0.16)]
            transition-all duration-500 border border-[#EADCCF]"
          >

            {/* Customer Order Photo */}
            <div className="relative overflow-hidden h-52">
              <img
                src={item.image}
                alt={item.order}
                className="w-full h-full object-cover
                group-hover:scale-110 transition-transform duration-700"
              />

              <span className="absolute bottom-4 left-4
                bg-white/95 text-[#681D37] text-xs
                font-semibold px-4 py-2 rounded-full shadow">
                {item.order}
              </span>
            </div>

            {/* Review Content */}
            <div className="p-6 md:p-7">

              <div className="flex justify-between items-center mb-4">
                <span className="text-[#C49A35] text-lg tracking-wider">
                  ★★★★★
                </span>

                <span className="text-[#B58A38] text-2xl font-serif">
                  “
                </span>
              </div>

              <h3 className="text-xl text-[#681D37] font-serif mb-3">
                {item.title}
              </h3>

              <p className="text-[#80665D] text-sm leading-7 mb-6">
                {item.review}
              </p>

              <div className="border-t border-[#EFE4DA] pt-4
                flex justify-between items-center">

                <div>
                  <h4 className="text-[#681D37] font-semibold">
                    {item.name}
                  </h4>

                  <p className="text-[#A28C7D] text-xs mt-1">
                    {item.location}
                  </p>
                </div>

                <span className="text-[#B58A38] text-xs
                  uppercase tracking-wider font-semibold">
                  Happy Customer
                </span>

              </div>
            </div>
          </motion.div>
        ))}

      </div>

      {/* Bottom Message */}
      <div className="text-center mt-14">
        <p className="text-[#681D37] font-serif italic text-lg">
          Thank you for being a part of our beautiful journey.
        </p>

        <p className="text-[#B58A38] text-xs tracking-[3px] mt-3">
          WITH LOVE, MAANIKAMAALAI
        </p>
      </div>

    </section>
  );
}

export default CustomerReviews;
