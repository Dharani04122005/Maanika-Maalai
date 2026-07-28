import { motion } from "framer-motion";
import Oleander_Nerium from "../assets/petals/Oleander_Nerium-removebg-preview.png";

const petals = Array.from({ length: 15 });

function Petals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: 0,
            opacity: 0.8,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 360,
            opacity: 0.2,
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute text-2xl"
        >
          <img
  src={Oleander_Nerium}
  alt="petal"
  className="w-15 h-15"
/>
        </motion.div>
      ))}
    </div>
  );
}

export default Petals;