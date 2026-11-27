
import { motion } from "framer-motion";
import { FiArrowUpRight, FiMessageCircle } from "react-icons/fi";
import { GiFlowerEmblem } from "react-icons/gi";

import hero from "../assets/images/hero/hero.jpeg";

function ContactBanner() {
  return (
    <section className="relative overflow-hidden bg-[#FAF4EE] py-10 sm:py-16 lg:py-20 px-3 sm:px-5 md:px-12 lg:px-20">

      {/* Decorative background circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#E8D4A2]/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#7A1F3D]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#681D37] rounded-2xl sm:rounded-[30px] overflow-hidden
          shadow-[0_20px_60px_rgba(97,22,49,0.18)]"
        >

          {/* Gold decorative border */}
          <div className="absolute inset-2 sm:inset-3 border border-[#C9A66B]/50 rounded-xl sm:rounded-[23px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Left Content */}
            <div className="relative z-10 px-6 py-9 sm:px-10 sm:py-12 md:px-14 lg:py-20 text-center lg:text-left">

              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-6">
                <GiFlowerEmblem className="text-[#D9B56D] text-lg sm:text-xl" />
                <p className="text-[#E6C88E] text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase">
                  Crafted With Love
                </p>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl
                font-serif text-[#FFF8EF] leading-tight mb-4 sm:mb-6">
                Your Celebration,
                <span className="block italic text-[#E6C88E]">
                  Our Floral Masterpiece.
                </span>
              </h2>

              <p className="text-[#F2DFD6] text-xs sm:text-sm md:text-base
                leading-6 sm:leading-8 max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-9">
                Every special moment deserves something beautiful.
                Let us create handcrafted floral designs that bring
                tradition, elegance and happiness to your celebrations.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4
                justify-center lg:justify-start">

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3
                  bg-gradient-to-r from-[#D9B56D] to-[#B58A38]
                  text-white px-5 py-3 sm:px-7 sm:py-4 rounded-full text-sm sm:text-base font-semibold
                  shadow-lg hover:shadow-[#D9B56D]/30
                  hover:-translate-y-1 transition-all duration-300"
                >
                  <FiMessageCircle size={17} />
                  Order Your Design
                  <FiArrowUpRight size={18} />
                </a>

                <a
                  href="#collections"
                  className="inline-flex items-center justify-center gap-2
                  border border-[#E6C88E]/70 text-[#FFF8EF]
                  px-5 py-3 sm:px-7 sm:py-4 rounded-full text-sm sm:text-base
                  hover:bg-[#FFF8EF] hover:text-[#681D37]
                  transition-all duration-300"
                >
                  Explore Collections
                  <FiArrowUpRight size={18} />
                </a>

              </div>

              <p className="text-[#D9B56D] text-[10px] sm:text-xs italic mt-5 sm:mt-8">
                ✦ Every Petal Carries A Touch Of Tradition ✦
              </p>

            </div>

            {/* Right Image */}
            <div className="relative p-6 sm:p-10 md:p-12 lg:pl-0">

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >

                <div className="absolute -inset-2 sm:-inset-3 border border-[#D9B56D]/50
                  rounded-[120px_120px_20px_20px] sm:rounded-[180px_180px_25px_25px]" />

                <img
                  src={hero}
                  alt="Maanikamaalai floral creation"
                  className="relative w-full h-56 sm:h-80 lg:h-[450px]
                  object-cover rounded-[120px_120px_20px_20px] sm:rounded-[180px_180px_25px_25px]
                  border-4 border-[#D9B56D]/30"
                />

                {/* Floating decorative label */}
                <div className="absolute -bottom-3 left-1 sm:-bottom-5 sm:-left-3 md:-left-8
                  bg-[#FAF4EE] px-3 py-2 sm:px-6 sm:py-4 rounded-lg sm:rounded-xl shadow-xl">

                  <p className="text-[#9A6C45] text-[8px] sm:text-[10px]
                    tracking-[2px] sm:tracking-[3px] uppercase">
                    Made With Passion
                  </p>

                  <p className="text-[#681D37] font-serif italic text-sm sm:text-lg">
                    Beautifully Handcrafted
                  </p>

                </div>

              </motion.div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactBanner;
