import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const team = [
    {
      id: 'shravya',
      name: 'Shravya VJ',
      role: 'Founder & Brand Strategist',
      tagline: 'The mind that architects identities the world can’t ignore',
      image: 'https://res.cloudinary.com/ducp6qhg5/image/upload/v1757491800/h1_jnhyq2.jpg',
  
    },
    {
      id: 'om',
      name: 'Om Mehta',
      role: 'Business Generalist',
      tagline: 'The mind that wears every hat and still keeps focus',
      image: 'https://res.cloudinary.com/ducp6qhg5/image/upload/v1757491801/h2_xvz2q7.jpg',

    },
    {
      id: 'milap',
      name: 'Milap Mehta',
      role: 'Chief Advisor',
      tagline: 'The mind that anchors with wisdom and experience',
      image: 'https://res.cloudinary.com/ducp6qhg5/image/upload/v1757491800/h3_gkueum.jpg',
    }
  ];

  return (
    <section className="py-24 bg-[#1C1C1C] relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-light text-[#FFF9F2] mb-6">
            Minds of The Emblm
          </h2>
          <p className="text-xl text-[#B0A8A2] max-w-3xl mx-auto">
            The creative minds behind every brand transformation,
            strategic insight, and innovative solution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.16 }}
              viewport={{ once: true }}
              className="text-center group"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Image Container */}
<div className="relative mb-6">
  <motion.div
    className="rounded-2xl overflow-hidden shadow-lg"
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.28 }}
  >
    <img
      src={member.image}
      alt={`${member.name} portrait`}
      className="w-full h-[400px] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
    />

  </motion.div>
</div>


              {/* Name & Role */}
              <div>
                <h3 className="text-2xl lg:text-3xl font-light text-[#FFF9F2] mb-1">
                  {member.name}
                </h3>

                <p className="text-[#E57373] font-medium mb-2">
                  {member.role}
                </p>

              

                {/* tagline always visible (small), quote appears below on hover (but NOT on the image) */}
                <p className="text-[#B0A8A2] text-sm italic mb-3">
                  {member.tagline}
                </p>

                <motion.div
                  initial={{ height: 1, width: '30px' }}
                  animate={{
                    width: hoveredMember === member.id ? '60px' : '30px'
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-px bg-[#C62828] mx-auto mt-2"
                />


              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-[#B0A8A2] mb-8 max-w-2xl mx-auto">
            Ready to work with minds that understand the intersection 
            of creativity, strategy, and business impact?
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#C62828] text-[#FFF9F2] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#E57373] transition-colors duration-300"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
