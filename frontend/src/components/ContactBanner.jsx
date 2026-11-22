
import { motion } from "framer-motion";
import { FiArrowUpRight, FiMessageCircle } from "react-icons/fi";
import { GiFlowerEmblem } from "react-icons/gi";

import hero from "../assets/images/hero/hero.jpeg";

function ContactBanner() {
  return (
    <section className="relative overflow-hidden bg-[#FAF4EE] py-20 px-5 md:px-12 lg:px-20">

      {/* Decorative background circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#E8D4A2]/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#7A1F3D]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#681D37] rounded-[30px] overflow-hidden
          shadow-[0_20px_60px_rgba(97,22,49,0.18)]"
        >

          {/* Gold decorative border */}
          <div className="absolute inset-3 border border-[#C9A66B]/50 rounded-[23px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Left Content */}
            <div className="relative z-10 px-8 py-14 md:px-14 lg:py-20 text-center lg:text-left">

              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <GiFlowerEmblem className="text-[#D9B56D] text-xl" />
                <p className="text-[#E6C88E] text-xs tracking-[4px] uppercase">
                  Crafted With Love
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl xl:text-6xl
                font-serif text-[#FFF8EF] leading-tight mb-6">
                Your Celebration,
                <span className="block italic text-[#E6C88E]">
                  Our Floral Masterpiece.
                </span>
              </h2>

              <p className="text-[#F2DFD6] text-sm md:text-base
                leading-8 max-w-lg mx-auto lg:mx-0 mb-9">
                Every special moment deserves something beautiful.
                Let us create handcrafted floral designs that bring
                tradition, elegance and happiness to your celebrations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4
                justify-center lg:justify-start">

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-3
                  bg-gradient-to-r from-[#D9B56D] to-[#B58A38]
                  text-white px-7 py-4 rounded-full font-semibold
                  shadow-lg hover:shadow-[#D9B56D]/30
                  hover:-translate-y-1 transition-all duration-300"
                >
                  <FiMessageCircle size={19} />
                  Order Your Design
                  <FiArrowUpRight size={19} />
                </a>

                <a
                  href="#collections"
                  className="inline-flex items-center justify-center gap-2
                  border border-[#E6C88E]/70 text-[#FFF8EF]
                  px-7 py-4 rounded-full
                  hover:bg-[#FFF8EF] hover:text-[#681D37]
                  transition-all duration-300"
                >
                  Explore Collections
                  <FiArrowUpRight size={18} />
                </a>

              </div>

              <p className="text-[#D9B56D] text-xs italic mt-8">
                ✦ Every Petal Carries A Touch Of Tradition ✦
              </p>

            </div>

            {/* Right Image */}
            <div className="relative p-8 md:p-12 lg:pl-0">

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >

                <div className="absolute -inset-3 border border-[#D9B56D]/50
                  rounded-[180px_180px_25px_25px]" />

                <img
                  src={hero}
                  alt="Maanikamaalai floral creation"
                  className="relative w-full h-[350px] md:h-[450px]
                  object-cover rounded-[180px_180px_25px_25px]
                  border-4 border-[#D9B56D]/30"
                />

                {/* Floating decorative label */}
                <div className="absolute -bottom-5 -left-3 md:-left-8
                  bg-[#FAF4EE] px-6 py-4 rounded-xl shadow-xl">
                  <p className="text-[#9A6C45] text-[10px]
                    tracking-[3px] uppercase">
                    Made With Passion
                  </p>
                  <p className="text-[#681D37] font-serif italic text-lg">
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
