"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Scan, AlertTriangle, Zap, Globe, ArrowRight, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppSettings } from "@/context/AppSettingsContext";
import QRUploadBox from "@/components/scan/QRUploadBox";
import ScanResult from "@/components/scan/ScanResult";
import { checkUrl } from "@/lib/api";

export default function ScanPage() {
  const { token, isAuthenticated } = useAuth();
  const { t, isArabic } = useAppSettings();
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleScan = async () => {
    if (!inputUrl.startsWith("http")) {
      setError(t("scanInvalidUrl"));
      return;
    }

    if (!isAuthenticated || !token) {
      setError(t("scanLoginRequired"));
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkUrl(inputUrl, token);
      setResult(data);
    } catch (err: any) {
      setError(err.message || t("scanFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-24">
        <div className={`w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isArabic ? "text-right" : "text-left"}`}>
          <motion.div initial={{ opacity: 0, x: isArabic ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-zinc-300 font-medium tracking-wide">{t("heroBadge")}</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              {isArabic ? (
                <>
                  حلل. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">تحقق. احمي.</span>
                </>
              ) : (
                <>
                  Analyze. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">Verify. Secure.</span>
                </>
              )}
            </h1>

            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">{t("heroDesc")}</p>

            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{t("instantAnalysis")}</h3>
                  <p className="text-sm text-zinc-500">{t("instantAnalysisDesc")}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{t("bankSecurity")}</h3>
                  <p className="text-sm text-zinc-500">{t("bankSecurityDesc")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-3xl blur-2xl opacity-20" />
            <div className="relative rounded-3xl border border-white/10 bg-zinc-900/80 backdrop-blur-2xl p-6 md:p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Scan className="w-5 h-5 text-emerald-400" />
                  {t("scanNew")}
                </h2>
                <p className="text-sm text-zinc-500 mt-1">{t("scanSubtitle")}</p>
              </div>

              <div className="space-y-4">
                <div className="group relative">
                  <div className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-emerald-400 ${isArabic ? "right-4" : "left-4"}`}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <input
                    value={inputUrl}
                    onChange={(e) => {
                      setInputUrl(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="https://suspicious-link.com"
                    className={`w-full rounded-xl bg-black/40 border border-white/10 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-200 ${isArabic ? "pr-12 pl-4" : "pl-12 pr-4"}`}
                  />
                </div>

                <div className="relative flex items-center py-2">
                  <div className="grow border-t border-white/10" />
                  <span className="mx-4 text-xs font-medium text-zinc-600 uppercase tracking-widest">{t("scanOr")}</span>
                  <div className="grow border-t border-white/10" />
                </div>

                <div className="rounded-xl overflow-hidden border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                  <QRUploadBox onQrExtracted={(url: string) => { setInputUrl(url); setError(null); }} />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="overflow-hidden">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-300 font-medium leading-tight">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={handleScan} disabled={loading || !inputUrl} className="mt-6 w-full group relative overflow-hidden rounded-xl bg-emerald-600 p-4 font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none">
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Activity className="w-5 h-5 animate-spin" />
                      {t("scanButtonLoading")}
                    </>
                  ) : (
                    <>
                      {t("scanButton")}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                    </>
                  )}
                </div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform group-hover:animate-shimmer" />
              </button>

              <AnimatePresence>
                {result && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-6 pt-6 border-t border-white/10">
                    <ScanResult result={result} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
