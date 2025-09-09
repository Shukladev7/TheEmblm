import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RotatingLogo from "./RotatingLogo";
const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    // IMPORTANT: overflow-x-hidden prevents layout jumps caused by rotating/absolute children
    <section className="py-24 bg-[#FFF9F2] overflow-x-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 lg:gap-32 items-center">
          {/* Logo Animation */}

        <RotatingLogo/>
          {/* About Text */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-light text-[#1C1C1C] mb-8 leading-tight">
              Every brand has its <em>empty chair</em>
            </h2>

<div className="space-y-6 text-lg text-[#1C1C1C] leading-relaxed text-justify">
  <p>
    Every brand has its <em className="decoration-[#C62828] underline decoration-2 underline-offset-2">empty chair</em> — the space it leaves in people's minds when it's not in the room. 
    At <strong className="decoration-[#C62828] underline decoration-2 underline-offset-2">The Emblm</strong>, We do for that space.
  </p>

  <p>
    We blend branding with marketing to craft <strong className="decoration-[#C62828] underline decoration-2 underline-offset-2">identities that stand out, stories that move mountains, 
    and strategies that turn audiences into communities</strong>. For us, every brand is a masterpiece — 
    because no two are ever the same.
  </p>

  <p>
    The mark we carry isn't drawn by chance. It is built on the <strong className="decoration-[#C62828] underline decoration-2 underline-offset-2">geometry of life itself</strong> — 
    the Fibonacci series, the Gomti Chakra, and the Shaligram. These aren't just symbols, they are 
    signatures of eternity.
  </p>

  <p className="text-[#C62828] font-medium">
    The same way, every emblem we shape is designed to last beyond trends, carrying its own <span className="decoration-[#C62828] underline decoration-2 underline-offset-2">infinite pattern</span>.
  </p>
</div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12"
            >
              <div className="border-l-4 border-[#C62828] pl-6">
                <p className="text-[#B0A8A2] italic text-lg">
                  "Design is not just what it looks like and feels like. Design is how it works — and how it makes
                  people feel."
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;