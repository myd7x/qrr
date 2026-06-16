"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function ScanLine() {
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { y: "-100%" },
      {
        y: "100%",
        duration: 3,
        ease: "none",
        repeat: -1,
      }
    );
  }, []);

  return (
    <div
      ref={lineRef}
      className="absolute left-0 w-full h-[2px]
                 bg-gradient-to-r
                 from-transparent via-emerald-400 to-transparent
                 opacity-70"
    />
  );
}
