// File: Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    // make footer positioned and create its own stacking context so z-50 works
    <footer className="relative isolate bg-[#1C1C1C] text-[#FFF9F2] z-50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-wider mb-6 block">
            <img
              src="/logo.png"
              alt="The Emblm"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain"
            />
            </Link>
            <p className="text-[#B0A8A2] text-lg leading-relaxed mb-8 max-w-md">
              Positioning brands to lead through strategic thinking, 
              creative excellence, and purposeful execution.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-[#FFF9F2]/10 rounded-full hover:bg-[#C62828] transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-[#FFF9F2]/10 rounded-full hover:bg-[#C62828] transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-[#FFF9F2]/10 rounded-full hover:bg-[#C62828] transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#FFF9F2] font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/work?category=brand-identity" className="text-[#B0A8A2] hover:text-[#E57373] transition-colors duration-200">Brand Identity</Link></li>
              <li><Link to="/work?category=creative-design" className="text-[#B0A8A2] hover:text-[#E57373] transition-colors duration-200">Creative Design</Link></li>
              <li><Link to="/work?category=digital" className="text-[#B0A8A2] hover:text-[#E57373] transition-colors duration-200">Digital</Link></li>
              <li><Link to="/work?category=marketing" className="text-[#B0A8A2] hover:text-[#E57373] transition-colors duration-200">Marketing</Link></li>
              <li><Link to="/work?category=strategy" className="text-[#B0A8A2] hover:text-[#E57373] transition-colors duration-200">Strategy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#FFF9F2] font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <a 
                href="mailto:shravy.vj@theemblm.com" 
                className="flex items-center text-[#B0A8A2] hover:text-[#E57373] transition-colors duration-200"
              >
                <Mail className="h-5 w-5 mr-3" />
                shravy.vj@theemblm.com
              </a>
              <a 
                href="tel:+919380824977" 
                className="flex items-center text-[#B0A8A2] hover:text-[#E57373] transition-colors duration-200"
              >
                <Phone className="h-5 w-5 mr-3" />
                +91 9380824977
              </a>
              <div className="flex items-start text-[#B0A8A2]">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>Indore, India<br /></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big Heading (Pentagram style) */}
      <div className="text-center py-12">
        <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-serif font-bold tracking-tight">
          THE EMBLM
        </h1>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#B0A8A2]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-[#B0A8A2]">
            <Link to="/instagram" className="hover:text-[#FFF9F2] transition-colors duration-200">
              Instagram
            </Link>
            <Link to="/linkedin" className="hover:text-[#FFF9F2] transition-colors duration-200">
              LinkedIn
            </Link>
            <Link to="/x" className="hover:text-[#FFF9F2] transition-colors duration-200">
              X
            </Link>
            <Link to="/facebook" className="hover:text-[#FFF9F2] transition-colors duration-200">
              Facebook
            </Link>
            <Link to="/newsletter" className="hover:text-[#FFF9F2] transition-colors duration-200">
              Newsletter
            </Link>
            <Link to="/careers" className="hover:text-[#FFF9F2] transition-colors duration-200">
              Careers
            </Link>
            <Link to="/privacy" className="hover:text-[#FFF9F2] transition-colors duration-200">
              Privacy Policy
            </Link>
            <span>© 2025 The Emblm</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
