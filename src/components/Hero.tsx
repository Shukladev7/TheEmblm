// File: ReimaginedHero.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import fabric from "../assets/hero-fabric.jpg"; // <-- replace with your image path

export default function ReimaginedHero() {
  const bgRef = useRef(null);

  // small parallax on mouse move
  const handleMouseMove = (e) => {
    const el = bgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // set subtle transform based on cursor
    el.style.transform = `translate(${px * 12}px, ${py * 10}px) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const el = bgRef.current;
    if (!el) return;
    el.style.transform = `translate(0px, 0px) scale(1)`;
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF9F2]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* BACKGROUND FABRIC */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 will-change-transform transition-transform duration-500"
        style={{ transformOrigin: "center" }}
      >
        {/* full bleed image (softly blurred + multiplied for contrast) */}
        <img
          src={fabric}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90 filter blur-[0.6px] saturate-[0.9] mix-blend-multiply"
        />
        {/* soft color wash to harmonize tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#C62828]/10 via-transparent to-[#B0A8A2]/6" />
        {/* subtle animated rings (keeps your original idea) */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0.06 }}
          animate={{ scale: 1.02, opacity: 0.08 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute left-1/4 top-1/6 w-[28rem] h-[28rem] rounded-full border border-[#C62828] pointer-events-none"
        />
      </div>

      {/* GIANT BACKGROUND WORD (LEAD) */}
      <motion.h2
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10vw] lg:text-[12rem] font-extrabold tracking-tight leading-[0.8] -translate-y-6 text-[#C62828] mix-blend-screen"
        style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-2px" }}
      >
        LEAD
      </motion.h2>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* small eyebrow / label */}
            <motion.p variants={headlineVariants} className="max-w-xl mx-auto text-sm uppercase tracking-wider text-[#4a4a4a]">
              Strategy · Identity · Communications
            </motion.p>

            {/* Main headline — two-line editorial serif */}
            <motion.h1
              variants={headlineVariants}
              className="mt-6 text-5xl md:text-6xl lg:text-8xl font-[600] leading-[0.9] max-w-[90ch] mx-auto"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1C1C1C" }}
            >
              <span className="block font-light">Positioned to</span>
              <span className="block font-semibold">Lead — with presence that is felt</span>
            </motion.h1>

            {/* short supporting copy */}
            <motion.p
              variants={headlineVariants}
              className="mt-6 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-[#333333]"
            >
              Branding creates presence. Marketing creates purpose. We design stories and systems
              that make the world listen — and remember.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={headlineVariants}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/work"
                className="inline-flex items-center gap-3 bg-[#C62828] text-[#FFF9F2] px-6 py-3 rounded-full text-lg font-medium hover:scale-[1.02] transition-transform focus:outline-none focus:ring-4 focus:ring-[#C62828]/20"
              >
                Explore Our Work
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border-2 border-[#E57373] text-[#C62828] px-6 py-3 rounded-full text-lg font-medium hover:bg-[#E57373] hover:text-[#FFF9F2] transition-all focus:outline-none focus:ring-4 focus:ring-[#E57373]/20"
              >
                Let's Talk
                <Play className="w-5 h-5" />
              </Link>

              {/* secondary tertiary: small play video CTA */}
              <button
                type="button"
                className="ml-0 sm:ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-sm"
                aria-label="Watch video"
              >
                <span className="rounded-full bg-[#C62828] w-8 h-8 flex items-center justify-center text-white">
                  <Play className="w-4 h-4" />
                </span>
                Watch the Process
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* subtle scroll indicator (keeps your original but tuned) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-7 h-12 border-2 border-[#C62828] rounded-full flex items-start justify-center p-1">
          <motion.span
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="block w-1.5 h-3 rounded-full bg-[#C62828] mt-1"
          />
        </div>
      </motion.div>
    </section>
  );
}
