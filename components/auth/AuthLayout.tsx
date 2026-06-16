"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950">
      {/* Animated background */}
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0
                   bg-gradient-to-br
                   from-zinc-950 via-zinc-900 to-emerald-950
                   bg-[length:200%_200%]"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-6 py-24">
        {children}
      </div>
    </section>
  );
}
