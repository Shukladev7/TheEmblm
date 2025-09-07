import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-16">
      <section className="py-24 bg-[#FFF9F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-7xl font-light text-[#1C1C1C] mb-8"
          >
            About The Emblm
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#B0A8A2] mb-12"
          >
            Every brand has its empty chair. We make sure yours commands attention.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default About;