"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Languages, LogOut, Moon, ScanLine, Sun, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppSettings } from "@/context/AppSettingsContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, toggleLanguage, t, isArabic } = useAppSettings();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  const links = [
    { label: t("home"), href: "/" },
    { label: t("howItWorks"), href: "/how-it-works" },
    { label: t("features"), href: "/features" },
    { label: t("scan"), href: "/scan" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-zinc-950/85 backdrop-blur border-b border-emerald-500/10 shadow-lg shadow-emerald-950/10"
          : "bg-zinc-950/25 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500 text-emerald-400 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/15">
            Q
          </div>
          <span className="font-semibold text-lg tracking-wide">QRGuard</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map((link) => (
            <NavLink key={link.href} label={link.label} href={link.href} active={pathname === link.href} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === "dark" ? t("themeLight") : t("themeDark")}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-zinc-200 hover:border-emerald-400/50 hover:text-emerald-300 transition"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === "dark" ? t("themeLight") : t("themeDark")}</span>
          </button>
          <button
            type="button"
            onClick={toggleLanguage}
            title="Change language"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-zinc-200 hover:border-emerald-400/50 hover:text-emerald-300 transition"
          >
            <Languages size={16} />
            <span>{t("language")}</span>
          </button>
          {!isAuthenticated ? (
            <>
              <Link href="/auth/sign-in" className="text-zinc-300 hover:text-zinc-100 transition">
                {t("login")}
              </Link>

              <Link
                href="/auth/sign-up"
                className="px-4 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-medium shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition"
              >
                {t("getStarted")}
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((value) => !value)}
                className="flex items-center gap-3 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-sm text-zinc-100 hover:border-emerald-400 hover:bg-emerald-500/15 transition"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/20">
                  <UserRound size={17} />
                </span>
                <span className="font-medium">{t("profile")}</span>
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-950/95 p-2 shadow-2xl shadow-emerald-950/30 backdrop-blur"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-200 hover:bg-emerald-500/10 hover:text-emerald-300 transition"
                    >
                      <UserRound size={17} />
                      {t("editUserInfo")}
                    </Link>
                    <Link
                      href="/scan"
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-200 hover:bg-emerald-500/10 hover:text-emerald-300 transition"
                    >
                      <ScanLine size={17} />
                      {t("scanQr")}
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-300 hover:bg-red-500/10 transition"
                    >
                      <LogOut size={17} />
                      {t("logout")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-zinc-100 text-xl">
          ☰
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-zinc-950 border-t border-zinc-800"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`transition ${pathname === l.href ? "text-emerald-400" : "text-zinc-300 hover:text-emerald-400"}`}
                >
                  {l.label}
                </Link>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-zinc-200"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  {theme === "dark" ? t("themeLight") : t("themeDark")}
                </button>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-zinc-200"
                >
                  <Languages size={16} />
                  {isArabic ? "English" : "العربية"}
                </button>
              </div>

              <div className="border-t border-zinc-800 my-2" />

              {!isAuthenticated ? (
                <>
                  <Link href="/auth/sign-in" onClick={() => setOpen(false)} className="text-zinc-300">
                    {t("login")}
                  </Link>

                  <Link
                    href="/auth/sign-up"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 text-center rounded-lg bg-emerald-500 text-zinc-950 font-medium"
                  >
                    {t("getStarted")}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-emerald-300"
                  >
                    <UserRound size={17} />
                    {t("editUserInfo")}
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-red-300"
                  >
                    <LogOut size={17} />
                    {t("logout")}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ label, href, active }: { label: string; href: string; active?: boolean }) {
  return (
    <motion.div whileHover="hover" className="relative">
      <Link href={href} className={`${active ? "text-emerald-400" : "text-zinc-300 hover:text-zinc-100"} transition`}>
        {label}
      </Link>
      <motion.span
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: active ? 1 : 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        className="absolute left-0 -bottom-1 w-full h-[2px] bg-emerald-400 origin-left"
      />
    </motion.div>
  );
}
