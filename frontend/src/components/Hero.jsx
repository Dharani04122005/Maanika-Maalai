
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";

import hero from "../assets/images/hero/hero.jpeg";
import img1 from "../assets/images/hero/img1.jpeg";
import img3 from "../assets/images/hero/img3.jpeg";
import img4 from "../assets/images/hero/img4.jpeg";

import Petals from "./Petals";

const images = [hero, img1, img3, img4];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF4EE] min-h-0 lg:min-h-screen flex items-center py-12 sm:py-16 lg:py-0">

      {/* Falling Petals */}
      <Petals />

      <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 w-full min-w-0"
        >
          <p className="uppercase tracking-[3px] sm:tracking-[5px] lg:tracking-[8px] text-[#C9A227] text-[10px] sm:text-xs lg:text-sm font-medium mb-4 sm:mb-5">
            Traditional Floral Heritage
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#7A1F3D] leading-tight break-words">
            Thovalai Maanikamaalai
          </h1>

          <p className="w-full min-w-0 break-words mt-5 sm:mt-8 text-[#4B3B35] text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 lg:leading-10 max-w-xl">
            Handcrafted flower garlands, temple decorations and wedding floral
            designs made with tradition, elegance and love.
          </p>

          {/* Handmade Badges */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">

            <div className="bg-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-md border border-[#E8D4A2] text-xs sm:text-sm">
              🌸 100% Handmade
            </div>

            <div className="bg-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-md border border-[#E8D4A2] text-xs sm:text-sm">
              🏵 Temple & Wedding Specialist
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-7 sm:mt-10">

            <button className="w-full sm:w-auto bg-[#7A1F3D] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium shadow-lg hover:bg-[#611631] hover:scale-105 transition-all duration-300">
              Explore Collection
            </button>

            <button className="w-full sm:w-auto border-2 border-[#7A1F3D] text-[#7A1F3D] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium hover:bg-[#7A1F3D] hover:text-white duration-300 hover:scale-105 shadow-xl">
              Book Decoration
            </button>

          </div>
        </motion.div>

        {/* Right Slider */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 min-w-0 w-full"
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full rounded-[24px] sm:rounded-[40px] overflow-hidden border-4 border-[#E8D4A2] shadow-[0_20px_60px_rgba(122,31,61,0.18)]"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="overflow-hidden">
                  <img
                    src={image}
                    alt="Flower"
                    className="w-full h-[260px] sm:h-[350px] lg:h-[450px] object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
