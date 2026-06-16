"use client";

import { motion } from "motion/react";
import { useAppSettings } from "@/context/AppSettingsContext";

export default function QRDangerSection() {
  const { t, isArabic } = useAppSettings();
  const points = [
    { title: t("danger1Title"), desc: t("danger1Desc") },
    { title: t("danger2Title"), desc: t("danger2Desc") },
    { title: t("danger3Title"), desc: t("danger3Desc") },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950" />

      <div className={`relative max-w-7xl mx-auto px-6 ${isArabic ? "text-right" : "text-left"}`}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-6"
        >
          {t("dangerTitle")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl text-zinc-400 mb-16"
        >
          {t("dangerDesc")}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10">
          {points.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(16, 185, 129, 0.15)" }}
              className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur"
            >
              <h3 className="text-lg font-medium mb-2 text-emerald-400">{item.title}</h3>
              <p className="text-sm text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
