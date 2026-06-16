"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useAppSettings } from "@/context/AppSettingsContext";

export default function HowItWorksPage() {
  const { t, isArabic } = useAppSettings();
  const steps = [
    ["step1Title", "step1Desc"],
    ["step2Title", "step2Desc"],
    ["step3Title", "step3Desc"],
    ["step4Title", "step4Desc"],
  ];

  return (
    <section className="min-h-screen py-28 bg-zinc-950">
      <div className={`max-w-7xl mx-auto px-6 ${isArabic ? "text-right" : "text-left"}`}>
        <div className="max-w-3xl mb-20">
          <h1 className="text-3xl font-semibold mb-4">{t("howItWorksTitle")}</h1>
          <p className="text-sm text-zinc-400 leading-7">{t("howItWorksDesc")}</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {steps.map(([title, desc], index) => (
            <Card key={title}>
              <span className="text-xs text-emerald-400 font-medium">{t("step")} {index + 1}</span>
              <h2 className="text-xl font-semibold mt-2 mb-2">{t(title)}</h2>
              <p className="text-sm text-zinc-400 leading-6">{t(desc)}</p>
            </Card>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/scan"><Button>{t("startScanning")}</Button></Link>
        </div>
      </div>
    </section>
  );
}
