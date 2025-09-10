import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/ducp6qhg5/image/upload/f_auto,q_auto,w_1920,h_1080,c_fill/bg1_ojfzry.png")',
        }}
      >

        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-white"
        />
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full border border-[#C62828]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-8xl font-thin  text-white mb-8 tracking-tight">
            <span className='lg:text-7xl'>POSITIONED TO</span> <br/> <span className='font-serif tracking-wider lg:text-8xl text-6xl' >LEAD</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
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
              className="bg-[#C62828] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-[#C62828] transition-all duration-300 flex items-center group shadow-lg backdrop-blur-sm"
            >
              Explore Our Work
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-[#C62828] transition-all duration-300 flex items-center group shadow-lg backdrop-blur-sm"
            >
              Let's Talk
              <Play className="ml-2 h-5 w-5 transform group-hover:scale-110 transition-transform duration-200" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;