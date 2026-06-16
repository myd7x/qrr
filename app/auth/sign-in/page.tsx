"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useAppSettings } from "@/context/AppSettingsContext";
import GoogleAuthButton from "@/components/auth/GoogleButton";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t, isArabic } = useAppSettings();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError(t("emailPasswordRequired")); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok || !data.token) throw new Error(data.message || "Login failed");
      login(data.token); router.push("/scan");
    } catch (err: any) { setError(err.message || "Failed to connect to server"); }
    finally { setLoading(false); }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 bg-zinc-950 ${isArabic ? "text-right" : "text-left"}`}>
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-white">{t("signInTitle")}</h1>
        <p className="mt-1 text-sm text-zinc-400">{isArabic ? "ادخل إلى نتائج الفحص والتقارير الأمنية الخاصة بك." : "Access your scan results and security reports."}</p>
        <GoogleAuthButton />
        <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-zinc-800" /><span className="text-xs text-zinc-500">{t("scanOr")}</span><div className="h-px flex-1 bg-zinc-800" /></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder={t("email")} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm" />
          <input type="password" placeholder={t("password")} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-emerald-600 py-3 text-black font-medium">{loading ? t("signingIn") : t("signInButton")}</button>
        </form>
        <div className="mt-6 flex justify-between text-sm text-zinc-400">
          <Link href="/auth/forgot-password">{t("forgotPassword")}</Link>
          <Link href="/auth/sign-up">{t("createAccount")}</Link>
        </div>
      </div>
    </div>
  );
}
