import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Monitor, Smartphone, Megaphone, Video, Brain, Settings, Plus } from 'lucide-react';

const Services = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      id: 'brand',
      title: 'Brand Identity',
      icon: Palette,
      description: 'Complete visual identity systems that capture your essence and speak to your audience.',
      details: 'Logo design, brand guidelines, color palettes, typography, visual systems, brand positioning, brand architecture, and comprehensive style guides.',
      bg: 'bg-[#B0A8A2]'
    },
    {
      id: 'creative',
      title: 'Creative Design',
      icon: Plus,
      description: 'Compelling creative solutions across all mediums and touchpoints.',
      details: 'Print design, packaging, environmental graphics, exhibition design, publication design, and custom creative solutions tailored to your needs.',
      bg: 'bg-[#FFF9F2]'
    },
    {
      id: 'digital',
      title: 'Digital',
      icon: Monitor,
      description: 'Digital experiences that engage, convert, and delight your users.',
      details: 'Website design, UX/UI design, e-commerce solutions, digital platforms, mobile apps, and interactive experiences.',
      bg: 'bg-[#B0A8A2]'
    },
    {
      id: 'social',
      title: 'Social',
      icon: Smartphone,
      description: 'Social strategies that build communities and drive engagement.',
      details: 'Social media strategy, content creation, community management, influencer partnerships, and social advertising campaigns.',
      bg: 'bg-[#FFF9F2]'
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: Megaphone,
      description: 'Integrated marketing campaigns that deliver measurable results.',
      details: 'Campaign strategy, content marketing, digital advertising, email marketing, SEO/SEM, and performance analytics.',
      bg: 'bg-[#B0A8A2]'
    },
    {
      id: 'multimedia',
      title: 'Multimedia',
      icon: Video,
      description: 'Video and audio content that tells your story with impact.',
      details: 'Video production, motion graphics, animation, podcasts, audio branding, and interactive multimedia experiences.',
      bg: 'bg-[#FFF9F2]'
    },
    {
      id: 'strategy',
      title: 'Strategy',
      icon: Brain,
      description: 'Strategic thinking that aligns your brand with business objectives.',
      details: 'Brand strategy, market research, competitive analysis, positioning, messaging framework, and strategic planning.',
      bg: 'bg-[#B0A8A2]'
    },
    {
      id: 'extended',
      title: 'Extended',
      icon: Settings,
      description: 'Specialized services that extend your brand into new territories.',
      details: 'Innovation consulting, workshop facilitation, brand training, ongoing support, and custom solutions for unique challenges.',
      bg: 'bg-[#FFF9F2]'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-light text-[#1C1C1C] mb-6">
            What We Create
          </h2>
          <p className="text-xl text-[#B0A8A2] max-w-3xl mx-auto">
            Eight core disciplines that work in harmony to build brands 
            that don't just exist, but command attention.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isActive = activeService === service.id;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${service.bg} p-8 cursor-pointer transition-all duration-300 ${
                  isActive ? 'lg:col-span-2 lg:row-span-2' : 'hover:scale-105'
                }`}
                onClick={() => setActiveService(isActive ? null : service.id)}
              >
                <div className="flex flex-col h-full">
                  <IconComponent className={`h-8 w-8 mb-4 ${
                    service.bg === 'bg-[#FFF9F2]' ? 'text-[#C62828]' : 'text-[#FFF9F2]'
                  }`} />
                  
                  <h3 className={`text-2xl font-light mb-3 ${
                    service.bg === 'bg-[#FFF9F2]' ? 'text-[#1C1C1C]' : 'text-[#FFF9F2]'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${
                    service.bg === 'bg-[#FFF9F2]' ? 'text-[#1C1C1C]' : 'text-[#FFF9F2]'
                  } opacity-90`}>
                    {service.description}
                  </p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <div className={`h-px ${
                          service.bg === 'bg-[#FFF9F2]' ? 'bg-[#C62828]' : 'bg-[#FFF9F2]'
                        } mb-4 opacity-30`} />
                        
                        <p className={`text-sm leading-relaxed ${
                          service.bg === 'bg-[#FFF9F2]' ? 'text-[#1C1C1C]' : 'text-[#FFF9F2]'
                        } opacity-80`}>
                          {service.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`mt-auto pt-4 text-xs font-medium ${
                    service.bg === 'bg-[#FFF9F2]' ? 'text-[#C62828]' : 'text-[#E57373]'
                  }`}>
                    {isActive ? 'Click to close' : 'Click to expand'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;