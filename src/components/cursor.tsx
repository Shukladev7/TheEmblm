import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Lenis from 'lenis'

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef<number | null>(null);

  // Motion values (raw)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring (snappy but not bouncy)
  const outerSpringConfig = { stiffness: 500, damping: 40, mass: 0.5 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  // Lenis ref
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const offset = 16; // half cursor size
      mouseX.set(e.clientX - offset);
      mouseY.set(e.clientY - offset);

      setIsMoving(true);
      if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = window.setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Init Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time); // sync scroll + cursor
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current);
      lenis.destroy();
    };
  }, [isDesktop, mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 99999,
        x: outerX,
        y: outerY,
        width: 32,
        height: 32,
        borderRadius: "9999px",
        border: "2px solid #C62828",
        transform: "translate3d(0,0,0)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        willChange: "transform",
      }}
      animate={{
        scale: isMoving ? 1.08 : 1,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    />
  );
}
