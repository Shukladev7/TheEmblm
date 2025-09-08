// File: FloatingWeDesign.jsx
import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/categories"; // make sure path matches your project

// Data (using paths with spaces between words)
const combos = [
  { design: "BrandIdentity", audiences: ["ConsumerLifestyle", "CorporateBusiness", "Technology"] },
  { design: "CreativeDesign", audiences: ["CorporateBusiness", "SocialImpact", "Education"] },
  { design: "DigitalPresence", audiences: ["ConsumerLifestyle", "SocialImpact", "Healthcare"] },
  { design: "SocialMedia", audiences: ["Education", "Government"] },
  { design: "Marketing", audiences: ["Government", "Technology"] },
  { design: "Multimedia", audiences: ["Healthcare", "ConsumerLifestyle"] },
  { design: "Consulting", audiences: ["Technology", "SocialImpact", "CorporateBusiness"] },
  { design: "ExtendedExperiences", audiences: ["CorporateBusiness", "ConsumerLifestyle"] },
].map(combo => ({
  design: combo.design.replace(/([A-Z])/g, " $1").trim(),       // e.g. BrandIdentity → Brand Identity
  audiences: combo.audiences.map(aud => aud.replace(/([A-Z])/g, " $1").trim()) // e.g. ConsumerLifestyle → Consumer Lifestyle
}));


// Hook to measure element size (unchanged)
function useSize(ref: React.RefObject<HTMLElement>) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      const rect = ref.current!.getBoundingClientRect();
      setSize({ w: Math.ceil(rect.width), h: Math.ceil(rect.height) });
    };

    const ro = new ResizeObserver(updateSize);
    ro.observe(ref.current);
    updateSize();

    return () => ro.disconnect();
  }, [ref]);

  return size;
}

// Cross cursor SVG (unchanged)
const crossCursor =
  "url('data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16">
      <g fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
        <!-- white filled circle background -->
        <circle cx="8" cy="8" r="7" fill="#ffffff" stroke="#e6e6e6" stroke-width="0"/>

        <!-- smaller rounded X -->
        <line x1="6.2" y1="6.2" x2="9.8" y2="9.8" stroke="#333333" stroke-width=".7"/>
        <line x1="9.8" y1="6.2" x2="6.2" y2="9.8" stroke="#333333" stroke-width=".7"/>
      </g>
    </svg>`
  ) +
  "') 8 8, auto";


const FloatingWeDesign = () => {
  const [atBottom, setAtBottom] = useState(false);
  const [designIdx, setDesignIdx] = useState(0);
  const [audIdx, setAudIdx] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("design"); // "design" or "audience"

  const designSizerRef = useRef<HTMLSpanElement>(null);
  const audienceSizerRef = useRef<HTMLSpanElement>(null);

  const designSize = useSize(designSizerRef);
  const audienceSize = useSize(audienceSizerRef);

  const handleScroll = useCallback(() => setAtBottom(window.scrollY > 200), []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isDialogOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isDialogOpen]);

  // Cycle text
  useEffect(() => {
    const id = setInterval(() => {
      setAudIdx((i) => {
        const next = (i + 1) % combos[designIdx].audiences.length;
        if (next === 0) setDesignIdx((d) => (d + 1) % combos.length);
        return next;
      });
    }, 4500);
    return () => clearInterval(id);
  }, [designIdx]);

  const currentDesign = combos[designIdx].design;
  const currentAudience = combos[designIdx].audiences[audIdx];

  const handleButtonClick = useCallback(() => setIsDialogOpen(true), []);
  const handleBackdropClick = useCallback(() => setIsDialogOpen(false), []);
  const handleDialogClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  const uniqueDesigns = React.useMemo(() => [...new Set(combos.map((c) => c.design))], []);
  const uniqueAudiences = React.useMemo(() => [...new Set(combos.flatMap((c) => c.audiences))], []);


  const makeSlug = (s: string) =>
    s.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "").trim();

  // helper: if item exists in CATEGORIES, link to its exact static path (e.g. /ConsumerBrands)
  const getPathForItem = (item: string) => {
    const found = CATEGORIES.find((c) => c.name.toLowerCase() === item.toLowerCase() || c.path.toLowerCase() === item.toLowerCase());
    if (found) return `/${found.path}`;
    // fallback to dynamic route
    return `/${makeSlug(item)}`;
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed inset-0 z-10 flex justify-center pointer-events-none px-4">
        <motion.div
          className="pointer-events-auto absolute"
          initial={false}
          animate={atBottom ? { bottom: "20px", top: "auto" } : { top: "14vh", bottom: "auto" }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
        >
          <motion.button
            onClick={handleButtonClick}
            className="px-4 sm:px-6 py-3 sm:py-4 bg-white text-[#1C1C1C] rounded-md shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-1 focus:ring-black/5 cursor-pointer w-[calc(100vw-32px)] sm:w-auto sm:max-w-[90vw] min-h-[60px] sm:min-h-[60px] leading-tight sm:leading-normal"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-2 text-center sm:text-left">
              {/* Design line */}
              <div className="flex items-baseline gap-2">
                <span className="text-base sm:text-lg font-light">We do</span>
                <div className="flex items-center gap-1 relative">
                  <motion.div
                    className="relative overflow-hidden"
                    animate={designSize ? { width: designSize.w, height: designSize.h } : {}}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    style={{ willChange: "width, height" }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`design-${designIdx}`}
                        initial={{ y: 22, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -22, opacity: 0 }}
                        transition={{ duration: 0.75, ease: "easeInOut" }}
                        className="text-base sm:text-lg md:text-xl font-medium text-[#C62828] whitespace-nowrap"
                      >
                        {currentDesign}
                      </motion.span>
                    </AnimatePresence>
                    <span
                      ref={designSizerRef}
                      className="invisible inline-block whitespace-nowrap text-base sm:text-lg md:text-xl font-medium px-1"
                      aria-hidden="true"
                    >
                      {currentDesign}
                    </span>
                  </motion.div>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </div>

              {/* Audience line */}
              <div className="flex items-baseline gap-2">
                <span className="text-base sm:text-lg font-light">for</span>
                <div className="flex items-center gap-1 relative">
                  <motion.div
                    className="relative overflow-hidden"
                    animate={audienceSize ? { width: audienceSize.w, height: audienceSize.h } : {}}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    style={{ willChange: "width, height" }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`aud-${designIdx}-${audIdx}`}
                        initial={{ y: 22, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -22, opacity: 0 }}
                        transition={{ duration: 0.75, ease: "easeInOut" }}
                        className="text-base sm:text-lg md:text-xl font-medium text-[#C62828] whitespace-nowrap"
                      >
                        {currentAudience}
                      </motion.span>
                    </AnimatePresence>
                    <span
                      ref={audienceSizerRef}
                      className="invisible inline-block whitespace-nowrap text-base sm:text-lg md:text-xl font-medium px-1"
                      aria-hidden="true"
                    >
                      {currentAudience}
                    </span>
                  </motion.div>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 99999 }}
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              style={{ cursor: crossCursor }}
              onClick={handleBackdropClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Escape") handleBackdropClick();
              }}
              aria-label="Close dialog"
            />

            {/* Floating Close Button Above Dialog */}
            <button
              onClick={handleBackdropClick}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 sm:hidden w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200 z-10"
              aria-label="Close dialog"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                duration: 0.25,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="relative bg-white rounded-md shadow-2xl max-w-2xl md:max-w-xl w-full mx-4 p-6 sm:p-8 border border-gray-200 max-h-[90vh] overflow-y-auto mt-8 sm:mt-0"
              onClick={handleDialogClick}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
            >
              <div className="text-center">
                {/* Tabs */}
                <div className="flex flex-col sm:flex-row justify-center items-center mb-4 sm:mb-6 gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg font-light text-gray-700">We do</span>

                    <button
                      onClick={() => setActiveTab("design")}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-200 ${
                        activeTab === "design"
                          ? "bg-gray-100 text-[#C62828] font-medium"
                          : "text-gray-500 hover:text-gray-700 font-light"
                      }`}
                    >
                      <span className="text-sm sm:text-base">Everything</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeTab === "design" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-base sm:text-lg font-light text-gray-700">for</span>

                    <button
                      onClick={() => setActiveTab("audience")}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-200 ${
                        activeTab === "audience"
                          ? "bg-gray-100 text-[#C62828] font-medium"
                          : "text-gray-500 hover:text-gray-700 font-light"
                      }`}
                    >
                      <span className="text-sm sm:text-base">Everyone</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeTab === "audience" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Organic Flow Layout */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 max-w-4xl mx-auto">
                  {(activeTab === "design" ? uniqueDesigns : uniqueAudiences).map((item, index) => {
                    const to = getPathForItem(item);
                    return (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.08, duration: 0.4, type: "spring", stiffness: 120 }}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer group whitespace-nowrap flex-shrink-0"
                        style={{
                          minWidth: "fit-content",
                        }}
                      >
                        {/* Link inside motion div so we keep the animated wrapper */}
                        <Link
                          to={to}
                          onClick={() => setIsDialogOpen(false)}
                          className="inline-block"
                        >
                          <span className="group-hover:text-[#C62828] transition-colors duration-200">
                            {item}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <p className="text-gray-600 mb-4 sm:mb-5 text-center text-sm sm:text-base font-light leading-relaxed">
                    Ready to transform your vision into reality?
                    <br />
                    Let&apos;s discuss how we can help bring your project to life.
                  </p>

                  <button
                    className="
                      relative group w-full py-3 sm:py-4 px-6 rounded-md font-medium 
                      text-white text-sm sm:text-base shadow-md overflow-hidden
                      bg-[#1C1C1C] 
                      focus:outline-none focus:ring-2 focus:ring-[#1C1C1C] focus:ring-offset-2
                    "
                  >
                    <span className="relative z-10">Start Your Project</span>

                    <span
                      className="
                        absolute top-1/2 left-1/2 
                        w-10 h-10 bg-[#C62828] rounded-full 
                        -translate-x-1/2 -translate-y-1/2 
                        scale-0 group-hover:scale-[15] 
                        transition-transform duration-500 ease-out
                      "
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWeDesign;
