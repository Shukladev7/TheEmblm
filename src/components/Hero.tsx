import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-[#FFF9F2] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-[#C62828]"
        />
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full border border-[#B0A8A2]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl lg:text-8xl font-light text-[#1C1C1C] mb-8 tracking-tight">
            Positioned to Lead
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl text-[#1C1C1C] mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Branding creates presence. Marketing creates purpose. 
            <br className="hidden lg:block" />
            We ensure the world listens.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/work"
              className="bg-[#C62828] text-[#FFF9F2] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#1C1C1C] transition-all duration-300 flex items-center group"
            >
              Explore Our Work
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link
              to="/contact"
              className="border-2 border-[#E57373] text-[#C62828] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#E57373] hover:text-[#FFF9F2] transition-all duration-300 flex items-center group"
            >
              Let's Talk
              <Play className="ml-2 h-5 w-5 transform group-hover:scale-110 transition-transform duration-200" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
     <motion.div
  initial={{ opacity: 0, x: "-50%" }}
  animate={{ opacity: 1, x: "-50%" }}
  transition={{ duration: 1, delay: 1 }}
  className="absolute bottom-8 left-1/2"
>
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="w-6 h-10 border-2 border-[#C62828] rounded-full flex justify-center"
  >
    <motion.div
      animate={{ y: [0, 16, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-1 h-3 bg-[#C62828] rounded-full mt-2"
    />
  </motion.div>
</motion.div>

    </section>
  );
};

export default Hero;