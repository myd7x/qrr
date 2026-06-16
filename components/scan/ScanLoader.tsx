"use client";

import { motion } from "motion/react";

export default function ScanLoader() {
  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="relative w-40 h-40 rounded-full border border-emerald-500/30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-0 rounded-full
                     bg-gradient-to-t from-emerald-500/30 to-transparent"
        />
        <div className="absolute inset-6 rounded-full border border-emerald-500/20" />
        <div className="absolute inset-12 rounded-full border border-emerald-500/10" />
      </div>

      <p className="mt-4 text-sm text-zinc-400">
        Analyzing link behavior and threats...
      </p>
    </div>
  );
}
