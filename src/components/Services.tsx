import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Monitor, Smartphone, Megaphone, Video, Brain, Settings, Plus, Lightbulb } from 'lucide-react';

const Services = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

const imageMap: Record<string, string> = {
  // Represents branding through a mood board with logos, color palettes, and brand aesthetics.
  brand: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=1200&q=80',

  // REPLACED: A team collaborating with a glowing lightbulb graphic, symbolizing creative ideas and teamwork.
  creative: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',

  // Hands on a laptop with code/data overlays, directly representing digital work and technology.
  digital: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80',

  // A collection of popular social media app icons, clearly communicating the "social" theme.
  social: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',

  // An analytics dashboard with charts and graphs, representing the data-driven nature of modern marketing.
  marketing: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',

  // REPLACED: A creator's desk with multiple monitors, headphones, and a microphone, suggesting audio/video production.
  multimedia: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=1200&q=80',

  // REPLACED: A classic top-down view of a chess game in progress, a strong metaphor for strategy.
  strategy: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80',

  // An abstract network of connected nodes, visualizing concepts like extension, networks, and interconnected systems.
  extended: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80'
};
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
      icon: Lightbulb,
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
          <p className="text-lg text-[#B0A8A2] max-w-3xl mx-auto">
            Eight core disciplines that work in harmony to build brands 
            that don't just exist, but command attention.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
{services.map((service, index) => {
  const IconComponent = service.icon;
  const isActive = activeService === service.id;

  // alternate colors based on index
  const iconColor = index % 2 === 0 ? 'text-white' : 'text-red-500';
  const textColor = index % 2 === 0 ? 'text-white' : 'text-black';

  return (
    <motion.div
      key={service.id}
      style={{
        backgroundImage: `url(${imageMap[service.id]})`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative bg-cover bg-center p-8 cursor-pointer shadow-lg transition-all duration-300 ${
        isActive ? 'lg:col-span-2 lg:row-span-2' : 'hover:scale-105'
      }`}
      onClick={() => setActiveService(isActive ? null : service.id)}
    >
      {/* Translucent Overlay */}
      <div
        className={`absolute inset-0 ${
          service.bg === 'bg-[#FFF9F2]' ? 'bg-white/70' : 'bg-black/60'
        }`}
      />

      {/* Content */}
      <div className="flex flex-col h-full relative z-10">
        <IconComponent className={`h-8 w-8 mb-4 ${iconColor}`} />
        <h3 className={`text-2xl font-light mb-3 ${textColor}`}>{service.title}</h3>
        <p className={`text-xs mb-4 opacity-90 ${textColor}`}>{service.description}</p>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="h-px mb-4 opacity-30 bg-white" />
              <p className={`text-sm leading-relaxed opacity-80 ${textColor}`}>
                {service.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

<div className="mt-auto pt-4">
  <motion.div
    animate={{ rotate: isActive ? 45 : 0 }}
    transition={{ duration: 0.3 }}
    className={`w-10 h-10 flex items-center justify-center rounded-full ${iconColor} cursor-pointer`}
  >
    <Plus className="text-2xl" />
  </motion.div>
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