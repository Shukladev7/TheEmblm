import React from 'react';
import { motion } from 'framer-motion';

const Work = () => {
  return (
    <div className="pt-16">
      <section className="py-24 bg-[#1C1C1C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-7xl font-light text-[#FFF9F2] mb-8"
          >
            Our Work
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#B0A8A2] mb-12"
          >
            A portfolio of brands transformed, stories told, and futures shaped.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default Work;