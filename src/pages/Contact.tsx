import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-[#C62828]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-7xl font-light text-[#FFF9F2] mb-8"
          >
            Let's Create
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#FFF9F2]/90 mb-12"
          >
            Ready to position your brand to lead? Let's start the conversation.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-[#FFF9F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-light text-[#1C1C1C] mb-8">
                Get in Touch
              </h2>
              
              <p className="text-lg text-[#B0A8A2] mb-12 leading-relaxed">
                Whether you're looking to transform your brand identity, launch a new campaign, 
                or explore strategic partnerships, we're here to help bring your vision to life.
              </p>

              <div className="space-y-8">
                <a 
                  href="mailto:shravy.vj@theemblm.com"
                  className="flex items-center group"
                >
                  <div className="p-4 bg-[#C62828] text-[#FFF9F2] rounded-full mr-6 group-hover:bg-[#1C1C1C] transition-colors duration-200">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-[#1C1C1C] font-medium mb-1">Email Us</h3>
                    <p className="text-[#B0A8A2] group-hover:text-[#C62828] transition-colors duration-200">
                      shravy.vj@theemblm.com
                    </p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/919380824977"
                  className="flex items-center group"
                >
                  <div className="p-4 bg-[#C62828] text-[#FFF9F2] rounded-full mr-6 group-hover:bg-[#1C1C1C] transition-colors duration-200">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-[#1C1C1C] font-medium mb-1">WhatsApp</h3>
                    <p className="text-[#B0A8A2] group-hover:text-[#C62828] transition-colors duration-200">
                      +91 9380824977
                    </p>
                  </div>
                </a>

                <div className="flex items-center">
                  <div className="p-4 bg-[#C62828] text-[#FFF9F2] rounded-full mr-6">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-[#1C1C1C] font-medium mb-1">Location</h3>
                    <p className="text-[#B0A8A2]">
                      Indore, India<br />
                      <span className="text-sm">Creating for brands worldwide</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-3xl font-light text-[#1C1C1C] mb-8">
                Work with Us
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[#1C1C1C] font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#B0A8A2]/30 rounded-lg focus:ring-2 focus:ring-[#C62828] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[#1C1C1C] font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#B0A8A2]/30 rounded-lg focus:ring-2 focus:ring-[#C62828] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-[#1C1C1C] font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#B0A8A2]/30 rounded-lg focus:ring-2 focus:ring-[#C62828] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-[#1C1C1C] font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#B0A8A2]/30 rounded-lg focus:ring-2 focus:ring-[#C62828] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a service...</option>
                    <option value="brand-identity">Brand Identity</option>
                    <option value="creative-design">Creative Design</option>
                    <option value="digital">Digital</option>
                    <option value="marketing">Marketing</option>
                    <option value="strategy">Strategy</option>
                    <option value="multimedia">Multimedia</option>
                    <option value="extended">Extended Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#1C1C1C] font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full px-4 py-3 border border-[#B0A8A2]/30 rounded-lg focus:ring-2 focus:ring-[#C62828] focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#C62828] text-[#FFF9F2] py-4 rounded-lg font-medium hover:bg-[#1C1C1C] transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;