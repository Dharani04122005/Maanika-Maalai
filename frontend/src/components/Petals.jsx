
import { motion } from "framer-motion";
import Oleander_Nerium from "../assets/petals/Oleander_Nerium-removebg-preview.png";

const petals = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 95}%`,
  duration: 8 + (i % 5) * 1.5,
  delay: (i % 6) * 0.8,
}));

function Petals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: -80,
            rotate: 0,
            opacity: 0.8,
          }}
          animate={{
            y: "110vh",
            rotate: 360,
            opacity: 0.2,
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: "linear",
            delay: petal.delay,
          }}
          style={{ left: petal.left }}
          className="absolute top-0"
        >
          <img
            src={Oleander_Nerium}
            alt=""
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-15 lg:h-15 object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
}

export default Petals;
