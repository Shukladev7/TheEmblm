import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = React.useRef<number | null>(null);

  // raw mouse positions (no rerenders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Outer ring: smoother spring (higher damping, lower stiffness)
  const outerSpringConfig = { stiffness: 180, damping: 24, mass: 0.8 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const offset = 16; // half of circle size (32px)
      mouseX.set(e.clientX - offset);
      mouseY.set(e.clientY - offset);

      setIsMoving(true);
      if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = window.setTimeout(() => setIsMoving(false), 120);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current);
    };
  }, [isDesktop, mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 99999, // always on top
        x: outerX,
        y: outerY,
        width: 32, // bigger circle
        height: 32,
        borderRadius: 9999,
        border: "2px solid #C62828",
        transform: "translate3d(0,0,0)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        willChange: "transform",
      }}
      animate={{
        scale: isMoving ? 1.05 : 1, // gentler pulse
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
    />
  );
}
