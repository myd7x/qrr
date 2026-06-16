"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useAppSettings } from "@/context/AppSettingsContext";

const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function FeaturesPage() {
  const { t, isArabic } = useAppSettings();
  const features = [
    ["featureCore", "featureExtractionTitle", "featureExtractionDesc", "info"],
    ["featureStaticBadge", "featureStaticTitle", "featureStaticDesc", "warning"],
    ["featureDynamicBadge", "featureDynamicTitle", "featureDynamicDesc", "danger"],
    ["featureIntelBadge", "featureIntelTitle", "featureIntelDesc", "info"],
    ["featureRiskBadge", "featureRiskTitle", "featureRiskDesc", "safe"],
    ["featureReportsBadge", "featureReportsTitle", "featureReportsDesc", "info"],
  ] as const;

  return (
    <section className="min-h-screen py-28 bg-zinc-950">
      <div className={`max-w-7xl mx-auto px-6 ${isArabic ? "text-right" : "text-left"}`}>
        <div className="max-w-3xl mb-20">
          <h1 className="text-3xl font-semibold mb-4">{t("featuresTitle")}</h1>
          <p className="text-sm text-zinc-400 leading-7">{t("featuresDesc")}</p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([badge, title, desc, type]) => (
            <motion.div key={title} variants={item} whileHover={{ y: -8, boxShadow: "0px 20px 40px rgba(16, 185, 129, 0.15)" }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Card>
                <Badge label={t(badge)} type={type as any} />
                <h2 className="text-lg font-medium mt-3 mb-2">{t(title)}</h2>
                <p className="text-sm text-zinc-400 leading-6">{t(desc)}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 flex justify-center">
          <Link href="/scan"><Button>{t("startScanning")}</Button></Link>
        </div>
      </div>
    </section>
  );
}
