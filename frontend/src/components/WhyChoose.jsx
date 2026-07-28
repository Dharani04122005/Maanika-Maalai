import { motion } from "framer-motion";
import {
  FiAward,
  FiHeart,
  FiStar,
} from "react-icons/fi";
import { GiFlowerPot } from "react-icons/gi";

const features = [
  {
    icon: <GiFlowerPot size={38} />,
    title: "Fresh Flowers Daily",
    description:
      "Every garland is handcrafted using freshly picked flowers to ensure natural fragrance, freshness and long-lasting beauty.",
  },
  {
    icon: <FiAward size={38} />,
    title: "Award-Winning Heritage",
    description:
      "Recognized for preserving traditional floral craftsmanship and creating premium handmade floral designs.",
  },
  {
    icon: <FiHeart size={38} />,
    title: "Handcrafted With Tradition",
    description:
      "Every floral creation is carefully designed with passion, creativity and years of traditional experience.",
  },
  {
    icon: <FiStar size={38} />,
    title: "Custom Floral Designs",
    description:
      "Beautiful floral decorations specially designed for weddings, temples and every memorable celebration.",
  },
];

const stats = [
  {
    value: "100%",
    label: "Fresh Flowers",
  },
  {
    value: "Handmade",
    label: "Traditional Craft",
  },
  {
    value: "Custom",
    label: "Designs",
  },
  {
    value: "Award",
    label: "Winning Brand",
  },
];

function WhyChoose() {
  return (
    <section className="bg-[#FFF9F5] py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <p className="uppercase tracking-[8px] text-[#C9A227] font-semibold">
            Why Maanikamaalai?
          </p>

          <h2 className="text-5xl font-bold text-[#7A1F3D] mt-4 leading-tight">
            The Art of Traditional
            <br />
            Floral Excellence
          </h2>

          <p className="mt-6 text-lg text-[#5C4A42] max-w-3xl mx-auto leading-8">
            We don't just create flower garlands. We preserve tradition,
            celebrate culture and craft unforgettable floral experiences
            for weddings, temples and every special occasion.
          </p>

        </motion.div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="group bg-white rounded-[30px] p-8 border border-[#E8D4A2] shadow-lg hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(122,31,61,0.18)] hover:border-[#C9A227] transition-all duration-500"
            >

              <div className="w-20 h-20 rounded-full bg-[#FAF4EE] text-[#7A1F3D] flex items-center justify-center mb-6 group-hover:bg-[#7A1F3D] group-hover:text-white group-hover:rotate-12 transition-all duration-500">

                {item.icon}

              </div>

              <h3 className="text-2xl font-bold text-[#7A1F3D] mb-4">
                {item.title}
              </h3>

              <p className="text-[#5C4A42] leading-8">
                {item.description}
              </p>

            </motion.div>

          ))}

        </div>

        {/* Statistics */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24"
        >

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl border border-[#E8D4A2] py-10 text-center shadow-md hover:shadow-xl transition-all duration-300"
            >

              <h3 className="text-4xl font-bold text-[#7A1F3D]">
                {item.value}
              </h3>

              <p className="mt-3 text-[#5C4A42] font-medium">
                {item.label}
              </p>

            </div>

          ))}

        </motion.div>

      </div>

    </section>
  );
}

export default WhyChoose;