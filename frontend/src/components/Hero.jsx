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
    <section className="relative overflow-hidden bg-[#FAF4EE] min-h-screen flex items-center">

      {/* Falling Petals */}
      <Petals />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 w"
        >
          <p className="uppercase tracking-[8px] text-[#C9A227] text-sm font-medium mb-5">
            Traditional Floral Heritage
          </p>

          <h1 className="text-6xl lg:text-7xl font-bold text-[#7A1F3D] leading-tight">
            Thovalai Maanikamaalai
          </h1>

          <p className="mt-8 text-[#4B3B35] text-xl leading-10 max-w-xl">
            Handcrafted flower garlands, temple decorations and wedding floral
            designs made with tradition, elegance and love.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">

  <div className="bg-white px-5 py-3 rounded-full shadow-md border border-[#E8D4A2]">
    🌸 100% Handmade
  </div>

  <div className="bg-white px-5 py-3 rounded-full shadow-md border border-[#E8D4A2]">
    🏵 Temple & Wedding Specialist
  </div>

</div>

          <div className="flex flex-wrap gap-5 mt-10">
            <button className="bg-[#7A1F3D] text-white px-8 py-4 rounded-full font-medium shadow-lg hover:bg-[#611631] hover:scale-105 transition-all duration-300">
              Explore Collection
            </button>

            <button className="border-2 border-[#7A1F3D] text-[#7A1F3D] px-8 py-4 rounded-full font-medium hover:bg-[#7A1F3D] hover:text-white duration-300 hover:scale-105 shadow-xl">
              Book Decoration
            </button>
          </div>
        </motion.div>

        {/* Right Slider */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20"
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="rounded-[40px] overflow-hidden border-4 border-[#E8D4A2] shadow-[0_20px_60px_rgba(122,31,61,0.18)]"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="overflow-hidden">
                  <img
                    src={image}
                    alt="Flower"
                    className="w-full h-[450px] object-cover object-center transition-transform duration-700 hover:scale-105"
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