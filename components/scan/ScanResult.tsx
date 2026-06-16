"use client";

import RiskBar from "./RiskBar";
import { useAppSettings } from "@/context/AppSettingsContext";

type Props = {
  result: {
    url: string;
    score: number;
    verdict: "safe" | "suspicious" | "malicious" | "clean";
    color: "green" | "yellow" | "red";
    flags: string[];
    redirects: number;
    vtStats: {
      harmless: number;
      malicious: number;
      suspicious: number;
      undetected: number;
    };
    aiInsight?: string | null;
    cached?: boolean;
  };
};

const verdictColor = {
  safe: "text-emerald-400",
  suspicious: "text-yellow-400",
  malicious: "text-red-500",
  clean: "text-emerald-400",
};

export default function ScanResult({ result }: Props) {
  const { t } = useAppSettings();
  const visibleFlags = (result.flags || []).filter(
    (flag) => !/ssl|certificate|cert|https/i.test(flag)
  );

  const visibleAiInsight = result.aiInsight
    ? result.aiInsight.replace(/[^.]*\b(SSL|certificate|cert|HTTPS)\b[^.]*\.?/gi, "").trim()
    : null;

  return (
    <div
      className="mt-6 p-6 rounded-2xl
                 border border-white/10
                 bg-black/40"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          {t("scanResult")}
        </h3>

        <span
          className={`text-sm font-semibold uppercase
                     ${verdictColor[result.verdict]}`}
        >
          {result.verdict}
        </span>
      </div>

      {/* Risk Bar */}
      <RiskBar
        score={result.score}
        color={result.color}
      />

      {/* Meta info */}
      <div className="mt-4 grid grid-cols-1 gap-4 text-sm text-zinc-300">
        <p>
          <span className="text-zinc-400">{t("redirects")}:</span>{" "}
          {result.redirects}
        </p>
      </div>

      {/* Flags */}
      {visibleFlags.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-zinc-400 mb-2">
            {t("detectedIssues")}
          </p>
          <ul className="space-y-2">
            {visibleFlags.map((flag, i) => (
              <li
                key={i}
                className="text-sm text-zinc-300
                           flex items-start gap-2"
              >
                <span className="text-yellow-400">⚠</span>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* {t("aiInsight")} */}
      {visibleAiInsight && (
        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <p className="text-xs text-emerald-300 mb-1">{t("aiInsight")}</p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {visibleAiInsight}
          </p>
        </div>
      )}

      {/* VirusTotal */}
      <div className="mt-5 border-t border-white/10 pt-4 text-sm">
        <p className="text-zinc-400 mb-1">
          {t("virusTotalSummary")}
        </p>
        <div className="grid grid-cols-2 gap-2 text-zinc-300">
          <p>{t("harmless")}: {result.vtStats.harmless}</p>
          <p>{t("malicious")}: {result.vtStats.malicious}</p>
          <p>{t("suspicious")}: {result.vtStats.suspicious}</p>
          <p>{t("undetected")}: {result.vtStats.undetected}</p>
        </div>
      </div>
    </div>
  );
}
