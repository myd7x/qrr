"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useAppSettings } from "@/context/AppSettingsContext";

export default function Hero() {
  const { t, isArabic } = useAppSettings();
  const headline = t("heroTitle");

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 flex items-center">
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-emerald-950 to-zinc-950 bg-[length:400%_400%]"
      />

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/20 blur-[140px]" />

      <div className={`relative z-10 max-w-7xl mx-auto px-6 ${isArabic ? "text-right" : "text-left"}`}>
        <div className="inline-flex mb-6 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm">
          {t("heroBadge")}
        </div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-3xl text-5xl md:text-6xl font-semibold leading-tight mb-6"
        >
          {headline.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="inline-block mx-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <p className="max-w-2xl text-sm md:text-base text-zinc-300 mb-10">
          {t("heroDesc")}
        </p>

        <div className={`flex flex-wrap gap-4 ${isArabic ? "justify-end" : "justify-start"}`}>
          <Link href="/scan">
            <Button>{t("startScanning")}</Button>
          </Link>

          <Link href="/how-it-works">
            <Button variant="secondary">{t("howItWorks")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
