import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const ThoughtHub = () => {
  const posts = [
    {
      id: 1,
      title: 'The Psychology of Brand Positioning',
      excerpt: 'How brands occupy mental real estate and why some commands more attention than others.',
      date: '2025-01-15',
      category: 'Strategy',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Design Systems That Scale',
      excerpt: 'Building visual identities that grow with your business and adapt to any medium.',
      date: '2025-01-12',
      category: 'Design',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'The Future of Digital Marketing',
      excerpt: 'How AI and emerging technologies are reshaping the way brands connect with audiences.',
      date: '2025-01-10',
      category: 'Digital',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-[#1C1C1C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-7xl font-light text-[#FFF9F2] mb-8"
          >
            Thought Hub
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#B0A8A2] mb-12"
          >
            Insights, perspectives, and provocations from the minds shaping tomorrow's brands.
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 bg-[#FFF9F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#C62828] text-sm font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-[#B0A8A2] text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-light text-[#1C1C1C] mb-4 group-hover:text-[#C62828] transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-[#B0A8A2] mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0A8A2] text-sm">
                      {post.readTime}
                    </span>
                    
                    <div className="flex items-center text-[#C62828] group-hover:text-[#1C1C1C] transition-colors duration-300">
                      <span className="text-sm font-medium mr-2">Read More</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThoughtHub;