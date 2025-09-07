import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

const SignatureWorks = () => {
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);

  const works = [
    {
      id: '1',
      title: 'Corporate Rebranding',
      category: 'Brand Identity',
      description: 'Complete visual identity transformation for a Fortune 500 company, including logo design, brand guidelines, and rollout strategy.',
      image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      video: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      bg: 'bg-[#1C1C1C]'
    },
    {
      id: '2',
      title: 'Digital Campaign',
      category: 'Marketing',
      description: 'Multi-platform digital campaign that increased brand awareness by 340% and drove record-breaking engagement.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      video: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      bg: 'bg-[#FFF9F2]'
    },
    {
      id: '3',
      title: 'E-commerce Platform',
      category: 'Digital',
      description: 'Custom e-commerce solution with advanced UX/UI design that increased conversions by 250%.',
      image: 'https://images.pexels.com/photos/3183164/pexels-photo-3183164.jpeg?auto=compress&cs=tinysrgb&w=800',
      video: 'https://images.pexels.com/photos/3183164/pexels-photo-3183164.jpeg?auto=compress&cs=tinysrgb&w=800',
      bg: 'bg-[#1C1C1C]'
    },
    {
      id: '4',
      title: 'Social Media Strategy',
      category: 'Social',
      description: 'Comprehensive social media overhaul that built a community of 100K+ engaged followers in 6 months.',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800',
      video: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800',
      bg: 'bg-[#FFF9F2]'
    },
    {
      id: '5',
      title: 'Motion Graphics Reel',
      category: 'Multimedia',
      description: 'AI-enhanced motion graphics and video content that elevated brand storytelling across all channels.',
      image: 'https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=800',
      video: 'https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=800',
      bg: 'bg-[#1C1C1C]'
    },
    {
      id: '6',
      title: 'Strategy Workshop',
      category: 'Strategy',
      description: 'Strategic brand positioning and messaging framework that unified company communications.',
      image: 'https://images.pexels.com/photos/3183170/pexels-photo-3183170.jpeg?auto=compress&cs=tinysrgb&w=800',
      video: 'https://images.pexels.com/photos/3183170/pexels-photo-3183170.jpeg?auto=compress&cs=tinysrgb&w=800',
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
            Signature Works
          </h2>
          <p className="text-xl text-[#B0A8A2] max-w-3xl mx-auto">
            A selection of projects that showcase our approach to creating 
            brands that command attention and drive results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${work.bg} aspect-square relative overflow-hidden cursor-pointer group ${
                index === 0 || index === 3 ? 'lg:col-span-2' : ''
              }`}
              onMouseEnter={() => setHoveredWork(work.id)}
              onMouseLeave={() => setHoveredWork(null)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${work.image})` }}
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 ${
                work.bg === 'bg-[#1C1C1C]' 
                  ? 'bg-[#1C1C1C]/60 group-hover:bg-[#C62828]/80' 
                  : 'bg-[#FFF9F2]/60 group-hover:bg-[#1C1C1C]/80'
              } transition-all duration-500`} />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    work.bg === 'bg-[#1C1C1C]' 
                      ? 'bg-[#FFF9F2] text-[#1C1C1C]' 
                      : 'bg-[#1C1C1C] text-[#FFF9F2]'
                  }`}>
                    {work.category}
                  </span>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: hoveredWork === work.id ? 1 : 0,
                      scale: hoveredWork === work.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex space-x-2"
                  >
                    <button className="p-2 bg-[#FFF9F2] text-[#1C1C1C] rounded-full hover:bg-[#C62828] hover:text-[#FFF9F2] transition-colors duration-200">
                      <Play className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-[#FFF9F2] text-[#1C1C1C] rounded-full hover:bg-[#C62828] hover:text-[#FFF9F2] transition-colors duration-200">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredWork === work.id ? 1 : 0,
                    y: hoveredWork === work.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-[#FFF9F2]"
                >
                  <h3 className="text-2xl lg:text-3xl font-light mb-3">
                    {work.title}
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {work.description}
                  </p>
                </motion.div>

                {/* Default State */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ 
                    opacity: hoveredWork === work.id ? 0 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-8 left-8 ${
                    work.bg === 'bg-[#1C1C1C]' ? 'text-[#FFF9F2]' : 'text-[#1C1C1C]'
                  }`}
                >
                  <h3 className="text-xl font-light">
                    {work.title}
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureWorks;