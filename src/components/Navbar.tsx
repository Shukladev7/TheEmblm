import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top (or to hash) and close mobile menu on route change
  useEffect(() => {
    // Close mobile menu when navigation happens
    setIsOpen(false);

    // If there's a hash, try to scroll to that element
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // small timeout gives React time to mount the target element on navigation
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        // fallback to top if element isn't found
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    } else {
      // no hash — jump/scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' }); // use 'auto' for instant jump
    }
  }, [location.pathname, location.hash]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-[#1C1C1C] font-light text-lg sm:text-xl md:text-2xl tracking-wide"
          >
            <img
              src="https://res.cloudinary.com/ducp6qhg5/image/upload/v1757491810/logo_fsayur.png"
              alt="The Emblm"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-12">
            <Link
              to="/work"
              className="text-[#1C1C1C] hover:text-[#C62828] transition-colors duration-200 text-lg"
            >
              Work
            </Link>
            <Link
              to="/about"
              className="text-[#1C1C1C] hover:text-[#C62828] transition-colors duration-200 text-lg"
            >
              About
            </Link>
            <Link
              to="/thought-hub"
              className="text-[#1C1C1C] hover:text-[#C62828] transition-colors duration-200 text-lg"
            >
              News
            </Link>
            <Link
              to="/contact"
              className="text-[#1C1C1C] hover:text-[#C62828] transition-colors duration-200 text-lg"
            >
              Contact
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#1C1C1C]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-6 space-y-4">
              <Link
                to="/work"
                className="block text-[#1C1C1C] hover:text-[#C62828] transition-colors duration-200 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Work
              </Link>
              <Link
                to="/about"
                className="block text-[#1C1C1C] hover:text-[#C62828] transition-colors duration-200 text-lg"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/thought-hub"
                className="block text-[#1C1C1C] hover:text-[#C62828] transition-colors duration-200 text-lg"
                onClick={() => setIsOpen(false)}
              >
                News
              </Link>
              <Link
                to="/contact"
                className="block text-[#1C1C1C] hover:text-[#C62828] transition-colors duration-200 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;