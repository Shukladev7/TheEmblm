import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const SignatureWorks = () => {
  const [hoveredWork, setHoveredWork] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRef = useRef(null);

const works = [
  {
    id: '1',
    title: 'Corporate Rebranding',
    category: 'Brand Identity',
    description:
      'End-to-end visual identity transformation for a Fortune 500 company: new logo system, typography, color palette, and comprehensive brand guidelines. Included stakeholder workshops, rollout strategy and templates for digital & print — creating a cohesive, scalable identity ready for global deployment.',
    image:
      'https://res.cloudinary.com/ducp6qhg5/image/upload/v1757474725/beforeAfter_jlfjog.png',
    video: 'https://res.cloudinary.com/ducp6qhg5/image/upload/v1757474725/beforeAfter_jlfjog.png',
    bg: 'bg-[#1C1C1C]',
    isVideo: true
  },
  {
    id: '2',
    title: 'Digital Campaign',
    category: 'Marketing',
    description:
      'Integrated multi-platform digital campaign that blended paid social, content, and influencer partnerships. Strategy and creative execution drove a 340% lift in brand awareness and delivered record engagement through attention-first creatives and conversion-focused funnels.',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    video:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    bg: 'bg-[#FFF9F2]',
    isVideo: true
  },
  {
    id: '3',
    title: 'E-commerce Platform',
    category: 'Digital',
    description:
      'Custom e-commerce platform with a conversion-first UX/UI design, streamlined checkout, and modular CMS. Focused on product discovery, micro-interactions, and performance optimizations — resulted in a 250% uplift in conversions and measurable improvements in average order value and retention.',
    image:
      'https://res.cloudinary.com/ducp6qhg5/image/upload/v1757489067/Screenshot_2025-09-10_at_12.45.10_rnpg6a.png',
    bg: 'bg-[#1C1C1C]',
    isVideo: true
  },
  {
    id: '4',
    title: 'Market & Sales Strategy',
    category: 'Social',
    description:
      'Comprehensive social media & sales strategy combining audience research, content pillars, and a paid/community growth plan. Execution built a highly engaged community of 100K+ followers in 6 months and established repeatable acquisition channels for long-term growth.',
    image:
      'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800',
    video: 'https://res.cloudinary.com/ducp6qhg5/video/upload/v1757441189/IMG_4069_1_pqcav3.mov',
    bg: 'bg-[#FFF9F2]',
    isVideo: true
  },
  {
    id: '5',
    title: 'Motion Graphics Reel',
    category: 'Multimedia',
    description:
      'AI-augmented motion graphics and video storytelling for brand campaigns, social reels, and hero ads. Deliverables included short-form cuts, broadcast-ready spots, and templated assets to scale creative production — boosting viewer retention and shareability across channels.',
    image:
      'https://res.cloudinary.com/ducp6qhg5/image/upload/v1757490691/Gemini_Generated_Image_n30e7fn30e7fn30e_d2520n.png',
    video:
      'https://res.cloudinary.com/ducp6qhg5/video/upload/v1757429711/IMG_3500_wocdat.mp4',
    bg: 'bg-[#1C1C1C]',
    isVideo: true
  },
  {
    id: '6',
    title: 'Press & Interviews',
    category: 'Multimedia',
    description:
      'Press relations, media training, and interview content production. We prepared spokesperson talking points, media kits, and produced highlight reels that amplified earned media placements and increased positive brand mentions across industry outlets.',
    image:
      'https://res.cloudinary.com/ducp6qhg5/image/upload/v1757430293/_DSC8154_2_qriagw.jpg',
    video:
      'https://res.cloudinary.com/ducp6qhg5/video/upload/v1757429711/IMG_3500_wocdat.mp4',
    bg: 'bg-[#1C1C1C]',
    isVideo: false
  }
];

  const openVideo = (work) => {
    if (!work?.isVideo || !work?.video) return;
    setActiveVideo(work);
  };

  const closeVideo = () => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch (e) {}
    }
    setActiveVideo(null);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeVideo();
    };
    if (activeVideo) {
      document.addEventListener('keydown', onKey);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [activeVideo]);

  // include mov and m4v; keep query-string safe
  const isDirectVideoFile = (url) =>
    !!url && /\.(mp4|webm|ogg|mov|m4v)$/i.test((url || '').split('?')[0]);

  // Convert Cloudinary .mov/.m4v to mp4 on-the-fly for better browser compatibility.
  const getPlayableVideoUrl = (url) => {
    if (!url) return url;
    try {
      const base = url.split('?')[0];
      if (url.includes('res.cloudinary.com') && /\.(mov|m4v)$/i.test(base)) {
        return url.replace('/upload/', '/upload/f_mp4/');
      }
    } catch (e) {}
    return url;
  };

  useEffect(() => {
    // lock body scroll when modal open
    if (activeVideo) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev || '';
      };
    }
    return;
  }, [activeVideo]);

  const getTextColor = (workId, onDark) => {
    if (hoveredWork === workId) {
      return 'text-[#FFF9F2]';
    }
    return onDark ? 'text-[#FFF9F2]' : 'text-[#1C1C1C]';
  };

  const getBadgeClass = (workId, onDark) => {
    if (hoveredWork === workId) {
      return 'bg-[#FFF9F2] text-[#1C1C1C]';
    }
    return onDark
      ? 'bg-[#FFF9F2] text-[#1C1C1C]'
      : 'bg-[#1C1C1C] text-[#FFF9F2]';
  };

  const renderWork = (work, index, extraClasses = '') => {
    const onDark = work.bg.includes('#1C1C1C');
    return (
      <motion.div
        key={work.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`${work.bg} aspect-square relative overflow-hidden cursor-pointer group ${extraClasses}`}
        onMouseEnter={() => setHoveredWork(work.id)}
        onMouseLeave={() => setHoveredWork(null)}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${work.image})` }}
          aria-hidden
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 ${
            onDark
              ? 'bg-[#1C1C1C]/60 group-hover:bg-[#1C1C1C]/80'
              : 'bg-[#FFF9F2]/60 group-hover:bg-[#1C1C1C]/80'
          } transition-all duration-500`}
        />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300 ${getBadgeClass(
                work.id,
                onDark
              )}`}
            >
              {work.category}
            </span>

            {/* Play button for video works */}
            {work.isVideo && work.video ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: hoveredWork === work.id ? 1 : 0,
                  scale: hoveredWork === work.id ? 1 : 0
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center"
              >
                <button
                  onClick={() => openVideo(work)}
                  aria-label={`Play ${work.title}`}
                  className={`p-3 rounded-full transition-colors duration-200 ${
                    onDark
                      ? 'bg-[#FFF9F2] text-[#1C1C1C]'
                      : 'bg-[#1C1C1C] text-[#FFF9F2]'
                  } hover:scale-105`}
                >
                  <Play className="h-5 w-5" />
                </button>
              </motion.div>
            ) : null}
          </div>

          {/* Hover content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: hoveredWork === work.id ? 1 : 0,
              y: hoveredWork === work.id ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={getTextColor(work.id, onDark)}
          >
            <h3 className="text-2xl lg:text-3xl font-light mb-3">
              {work.title}
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {work.description}
            </p>
          </motion.div>

          {/* Default small title */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: hoveredWork === work.id ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-8 left-8 ${getTextColor(
              work.id,
              onDark
            )}`}
          >
            <h3 className="text-xl font-light">{work.title}</h3>
          </motion.div>
        </div>
      </motion.div>
    );
  };

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

        {/* Curated grid arrangement (fixed: now renders all 6 items) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[1fr]">
          {renderWork(works[0], 0, 'lg:col-span-2')}
          {renderWork(works[1], 1)}
          {renderWork(works[2], 2)}
          {renderWork(works[4], 4, 'lg:col-span-2')}
          {renderWork(works[3], 3)}
          {renderWork(works[5], 5)}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center p-4"
          aria-modal="true"
          role="dialog"
          aria-label={`${activeVideo.title} video modal`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
            className="absolute inset-0 bg-black"
          />

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 max-w-4xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0b0b0b] overflow-hidden shadow-2xl">
              {/* Close button */}
              <button
                onClick={closeVideo}
                aria-label="Close video"
                className="absolute right-3 top-3 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60"
                style={{ backdropFilter: 'blur(4px)' }}
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Constrain height so video never exceeds viewport and avoid cropping */}
              <div className="w-full bg-black flex items-center justify-center max-h-[80vh]">
                {isDirectVideoFile(activeVideo.video) ? (
                  <video
                    ref={videoRef}
                    src={getPlayableVideoUrl(activeVideo.video)}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                ) : (
                  <iframe
                    title={activeVideo.title}
                    src={activeVideo.video}
                    className="w-full h-[56.25vw] max-h-[80vh]"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              <div className="p-4 bg-[#0b0b0b] text-[#fff]">
                <h3 className="text-lg font-medium">{activeVideo.title}</h3>
                <p className="text-sm opacity-80 mt-1">
                  {activeVideo.description}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  );
};

export default SignatureWorks;
