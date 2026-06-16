"use client";

import Link from "next/link";
import { useAppSettings } from "@/context/AppSettingsContext";

export default function Footer() {
  const { t, isArabic } = useAppSettings();

  const linkClass =
    "group relative inline-block text-sm text-zinc-400 hover:text-emerald-400 transition";

  const underline =
    "absolute left-0 -bottom-1 h-[1px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full";

  const productLinks = [
    { label: t("home"), href: "/" },
    { label: t("howItWorks"), href: "/how-it-works" },
    { label: t("features"), href: "/features" },
    { label: t("scan"), href: "/scan" },
  ];

  const trustItems = [
    t("privacyFirst"),
    t("noLinkExecution"),
    t("sandboxedAnalysis"),
  ];

  return (
    <footer className={`bg-zinc-950 border-t border-zinc-800 ${isArabic ? "text-right" : "text-left"}`}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-zinc-100 hover:text-emerald-400 transition"
            >
              QR<span className="text-emerald-400">Guard</span>
            </Link>

            <p className="mt-4 text-sm text-zinc-400 max-w-sm leading-7">
              {t("footerDesc")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-zinc-200 mb-4">
              {t("product")}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                    <span className={underline} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-zinc-200 mb-4">
              {t("trustSecurity")}
            </h4>
            <ul className="space-y-3">
              {trustItems.map((item) => (
                <li key={item} className={linkClass}>
                  {item}
                  <span className={underline} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-zinc-800 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} QRGuard. {t("rightsReserved")}
        </div>
      </div>
    </footer>
  );
}
