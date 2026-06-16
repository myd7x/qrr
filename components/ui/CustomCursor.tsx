"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    const targets = document.querySelectorAll("a, button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => setHover(true));
      el.addEventListener("mouseleave", () => setHover(false));
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <motion.div
      animate={{
        x: pos.x - 12,
        y: pos.y - 12,
        scale: hover ? 1.8 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 900,
        damping: 30,
        mass: 0.3,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999]
                 w-6 h-6 rounded-full border
                 border-emerald-400 mix-blend-difference"
    />
  );
}
