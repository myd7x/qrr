"use client";

import { motion } from "motion/react";

export default function ScanProgress({
  progress,
}: {
  progress: number;
}) {
  return (
    <div className="mt-6">
      <div className="flex justify-between text-xs text-zinc-400 mb-1">
        <span>Scanning...</span>
        <span>{progress}%</span>
      </div>

      <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
          className="h-full bg-emerald-500"
        />
      </div>

      <p className="mt-2 text-xs text-zinc-500">
        Analyzing URL structure, redirects, and behavior
      </p>
    </div>
  );
}
