import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, X } from "lucide-react";

const worksOriginal = [
  {
    id: "1",
    title: "Corporate Rebranding",
    category: "Brand Identity",
    description:
      "Comprehensive corporate rebranding initiative featuring a refreshed logo system, typography, color guidelines, and brand assets to unify global communications.",
    image:
      "https://res.cloudinary.com/ducp6qhg5/image/upload/v1757508835/nifty_kxek41.png",
    bg: "bg-[#1C1C1C]",
    isVideo: false,
  },
  {
    id: "2",
    title: "Digital Campaign",
    category: "Marketing & Advertising",
    description:
      "Cross-channel digital marketing campaign leveraging social media, paid ads, and influencer partnerships to boost engagement and brand visibility.",
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    video:
      "https://res.cloudinary.com/ducp6qhg5/video/upload/v1757441189/IMG_4069_1_pqcav3.mov",
    bg: "bg-[#FFF9F2]",
    isVideo: true,
  },
  {
    id: "3",
    title: "E-commerce Platform",
    category: "Web & Digital Solutions",
    description:
      "Custom-built e-commerce solution with conversion-optimized UX/UI, seamless checkout flow, and scalable CMS for content and product management.",
    image:
      "https://res.cloudinary.com/ducp6qhg5/image/upload/v1757489067/Screenshot_2025-09-10_at_12.45.10_rnpg6a.png",
    bg: "bg-[#1C1C1C]",
    isVideo: true,
  },
  {
    id: "4",
    title: "Market & Sales Strategy",
    category: "Strategy & Consulting",
    description:
      "End-to-end market research and sales strategy design with tailored content pillars, campaign frameworks, and community-driven growth models.",
    image:
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
    video:
      "https://res.cloudinary.com/ducp6qhg5/video/upload/v1757441189/IMG_4069_1_pqcav3.mov",
    bg: "bg-[#FFF9F2]",
    isVideo: true,
  },
  {
    id: "5",
    title: "Motion Graphics Reel",
    category: "Creative & Multimedia",
    description:
      "AI-enhanced motion design and video storytelling showcasing animations, brand visuals, and high-impact social media reels.",
    image:
      "https://res.cloudinary.com/ducp6qhg5/image/upload/v1757490691/Gemini_Generated_Image_n30e7fn30e7fn30e_d2520n.png",
    video:
      "https://res.cloudinary.com/ducp6qhg5/video/upload/v1757429711/IMG_3500_wocdat.mp4",
    bg: "bg-[#1C1C1C]",
    isVideo: true,
  },
  {
    id: "6",
    title: "Press & Interviews",
    category: "Media & Communications",
    description:
      "Strategic press engagement, media training, and production of interviews and highlight reels for brand reputation management.",
    image:
      "https://res.cloudinary.com/ducp6qhg5/image/upload/v1757509352/Screenshot_2025-09-10_at_18.29.04_kbai5s.png",
    bg: "bg-[#1C1C1C]",
    isVideo: false,
  },
  {
    id: "7",
    title: "Events",
    category: "Experiential Marketing",
    description:
      "End-to-end event planning and execution, from live coverage to multimedia content creation, enhancing brand presence at key gatherings.",
    image:
      "https://res.cloudinary.com/ducp6qhg5/image/upload/v1757430293/_DSC8154_2_qriagw.jpg",
    video:
      "https://res.cloudinary.com/ducp6qhg5/video/upload/v1757429711/IMG_3500_wocdat.mp4",
    bg: "bg-[#1C1C1C]",
    isVideo: false,
  },
];

const SignatureWorks = ({ works = worksOriginal }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const openVideo = useCallback((work) => {
    if (!work?.isVideo || !work.video) return;
    setActiveVideo(work);
  }, []);

  const closeVideo = useCallback(() => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch (e) {}
    }
    setActiveVideo(null);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeVideo();
    };
    if (activeVideo) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeVideo, closeVideo]);

  useEffect(() => {
    if (activeVideo) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev || "");
    }
  }, [activeVideo]);

  const useInViewOnce = (rootMargin = "0px", threshold = 0.25) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el || inView) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              io.disconnect();
            }
          });
        },
        { root: null, rootMargin, threshold }
      );
      io.observe(el);
      return () => io.disconnect();
    }, [inView, rootMargin, threshold]);
    return [ref, inView];
  };

const Tile = ({ work, index, extraClasses = "" }) => {
  const onDark = work.bg?.includes("#1C1C1C");
  const [ref, inView] = useInViewOnce("0px", 0.28);
  const tileRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (tileRef.current) tileRef.current.classList.add("tile-hovered");
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      if (tileRef.current) tileRef.current.classList.remove("tile-hovered");
    }, 16);
  }, []);

  // ✅ New: handle click anywhere on tile
  const handleTileClick = useCallback(() => {
    if (work.isVideo && work.video) {
      openVideo(work);
    }
  }, [work, openVideo]);

  return (
    <div
      key={work.id}
      ref={(el) => {
        ref.current = el;
        tileRef.current = el;
      }}
      className={`tile-container ${work.bg} aspect-square relative overflow-hidden cursor-pointer ${extraClasses}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) ${(index % 6) * 0.03}s, transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) ${(index % 6) * 0.03}s`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTileClick} // ✅ added
      aria-labelledby={`tile-${work.id}-title`}
    >
      {/* Image Layer */}
      <div className="tile-image">
        <img src={work.image} alt={work.title} loading="lazy" draggable="false" />
      </div>

      {/* Overlay Layer */}
      <div className={`tile-overlay ${onDark ? "dark-theme" : "light-theme"}`} />

      {/* Content Layer */}
      <div className="tile-content">
        {/* Top Section */}
        <div className="tile-top">
          <span className={`tile-category ${onDark ? "dark-theme" : "light-theme"}`}>
            {work.category}
          </span>
          {/* Keep play button (optional) */}
          {work.isVideo && work.video && (
            <button
              className={`tile-play-btn ${onDark ? "dark-theme" : "light-theme"}`}
              aria-label={`Play ${work.title}`}
            >
              <Play className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Hover Content */}
        <div className={`tile-hover-content ${onDark ? "dark-theme" : "light-theme"}`}>
          <h3 id={`tile-${work.id}-title`}>{work.title}</h3>
          <p>{work.description}</p>
        </div>

        {/* Default Title */}
        <div className={`tile-default-title ${onDark ? "dark-theme" : "light-theme"}`}>
          <h3>{work.title}</h3>
        </div>
      </div>
    </div>
  );
};


  const Group = ({ big, smallA, smallB, index, reverse = false }) => {
    return (
      <div className="mb-6" key={`group-${index}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {reverse ? (
            <>
              <div className="grid grid-cols-1 gap-6 lg:order-1">
                {smallA && <Tile work={smallA} index={index * 3 + 1} />}
                {smallB && <Tile work={smallB} index={index * 3 + 2} />}
              </div>
              {big && <Tile work={big} index={index * 3} extraClasses="lg:col-span-2 lg:order-2" />}
            </>
          ) : (
            <>
              {big && <Tile work={big} index={index * 3} extraClasses="lg:col-span-2" />}
              <div className="grid grid-cols-1 gap-6">
                {smallA && <Tile work={smallA} index={index * 3 + 1} />}
                {smallB && <Tile work={smallB} index={index * 3 + 2} />}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const groups = [];
  for (let i = 0; i < works.length; i += 3) {
    groups.push({
      big: works[i] || null,
      smallA: works[i + 1] || null,
      smallB: works[i + 2] || null,
    });
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-light text-[#1C1C1C] mb-4">
              Signature Works
            </h2>
            <p className="text-lg text-[#B0A8A2] max-w-3xl mx-auto">
              A selection of projects that showcase our approach to creating brands that command attention and drive results.
            </p>
          </div>

          <div>
            {groups.map((g, idx) => (
              <Group 
                key={idx} 
                big={g.big} 
                smallA={g.smallA} 
                smallB={g.smallB} 
                index={idx} 
                reverse={idx % 2 === 1} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 bg-black bg-opacity-60">
          <div onClick={closeVideo} className="absolute inset-0" />
          <div
            className="relative z-10 max-w-4xl w-full mx-auto bg-[#0b0b0b] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'modalSlideIn 0.2s ease-out forwards'
            }}
          >
            <button 
              onClick={closeVideo} 
              className="absolute right-3 top-3 z-20 p-2 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full bg-black flex items-center justify-center max-h-[80vh]">
              <video 
                ref={videoRef} 
                src={activeVideo.video} 
                controls 
                autoPlay 
                playsInline 
                className="w-full h-auto max-h-[80vh] object-contain" 
              />
            </div>
            <div className="p-4 bg-[#0b0b0b] text-white">
              <h3 className="text-lg font-medium">{activeVideo.title}</h3>
              <p className="text-sm opacity-80 mt-1">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pure CSS Styles - No JavaScript conflicts */}
      <style jsx>{`
        .tile-container {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .tile-image {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .tile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
        }

        .tile-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          transition: background-color 0.3s ease;
        }

        .tile-overlay.dark-theme {
          background-color: rgba(28, 28, 28, 0.6);
        }

        .tile-overlay.light-theme {
          background-color: rgba(255, 249, 242, 0.6);
        }

        .tile-container.tile-hovered .tile-overlay {
          background-color: rgba(28, 28, 28, 0.85) !important;
        }

        .tile-content {
          position: absolute;
          inset: 0;
          padding: 1.5rem;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .tile-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tile-category {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          transition: all 0.2s ease;
          pointer-events: none;
        }

        .tile-category.dark-theme {
          background-color: #FFF9F2;
          color: #1C1C1C;
        }

        .tile-category.light-theme {
          background-color: #1C1C1C;
          color: #FFF9F2;
        }

        .tile-container.tile-hovered .tile-category {
          background-color: #FFF9F2 !important;
          color: #1C1C1C !important;
        }

        .tile-play-btn {
          padding: 0.75rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.2s ease;
        }

        .tile-play-btn.dark-theme {
          background-color: #FFF9F2;
          color: #1C1C1C;
        }

        .tile-play-btn.light-theme {
          background-color: #1C1C1C;
          color: #FFF9F2;
        }

        .tile-container.tile-hovered .tile-play-btn {
          opacity: 1;
          transform: scale(1);
        }

        .tile-play-btn:hover {
          transform: scale(1.05);
        }

        .tile-hover-content {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .tile-hover-content.dark-theme {
          color: #FFF9F2;
        }

        .tile-hover-content.light-theme {
          color: #1C1C1C;
        }

        .tile-container.tile-hovered .tile-hover-content {
          opacity: 1;
          transform: translateY(0);
          color: #FFF9F2 !important;
        }

        .tile-hover-content h3 {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
        }

        .tile-hover-content p {
          font-size: 0.875rem;
          opacity: 0.9;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tile-default-title {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          opacity: 1;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .tile-default-title.dark-theme {
          color: #FFF9F2;
        }

        .tile-default-title.light-theme {
          color: #1C1C1C;
        }

        .tile-container.tile-hovered .tile-default-title {
          opacity: 0;
        }

        .tile-default-title h3 {
          font-size: 1.125rem;
          font-weight: 300;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.98) translateY(16px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (min-width: 1024px) {
          .tile-hover-content h3 {
            font-size: 1.875rem;
          }
        }
      `}</style>
    </>
  );
};

export default SignatureWorks;