"use client";

import { motion } from "motion/react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  className,
  type = "submit",
}: ButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition",
        variant === "primary" &&
          "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20",
        variant === "secondary" &&
          "border border-zinc-700 text-zinc-200 hover:border-emerald-500",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
