"use client";

import { motion } from "motion/react";


export default function ScanButton({
  scanning,
  onClick,
}: {
  scanning: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      layout
      whileHover={!scanning ? { scale: 1.03 } : {}}
      whileTap={!scanning ? { scale: 0.97 } : {}}
      onClick={onClick}
      disabled={scanning}
      className="w-full py-3 rounded-xl font-medium
                 bg-emerald-500 text-zinc-950
                 flex items-center justify-center gap-2"
    >
      {scanning ? (
        <>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            🔄
          </motion.span>
          Scanning...
        </>
      ) : (
        "Scan Now"
      )}
    </motion.button>
  );
}
