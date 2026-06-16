"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import { useAppSettings } from "@/context/AppSettingsContext";

export default function ForgotPasswordPage() {
  const { t, isArabic } = useAppSettings();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async () => {
    setError(null); setSuccess(null);
    if (!email.trim()) { setError(isArabic ? "من فضلك أدخل بريدك الإلكتروني." : "Please enter your email address."); return; }
    if (!email.includes("@")) { setError(isArabic ? "من فضلك أدخل بريدًا إلكترونيًا صحيحًا." : "Please enter a valid email address."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || (isArabic ? "تعذر إرسال رابط إعادة التعيين. حاول لاحقًا." : "Unable to send reset email. Please try again later."));
      setSuccess(isArabic ? "تم إرسال رابط إعادة تعيين كلمة المرور." : "A password reset link has been sent.");
    } catch (err: any) { setError(err?.message || (isArabic ? "حدث خطأ. تحقق من الاتصال وحاول مرة أخرى." : "Something went wrong. Please check your connection and try again.")); }
    finally { setLoading(false); }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className={isArabic ? "text-right" : "text-left"}>
          <h1 className="text-2xl font-semibold mb-2">{t("resetPasswordTitle")}</h1>
          <p className="text-sm text-zinc-400 mb-6">{isArabic ? "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور." : "Enter your email address and we’ll send you a link to reset your password."}</p>
          <input type="email" placeholder={t("emailAddress")} value={email} onChange={(e) => { setEmail(e.target.value); setError(null); setSuccess(null); }} className="w-full mb-4 rounded-lg bg-black/40 border border-zinc-700 px-4 py-3 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500" />
          {success && <p className="mb-3 text-sm text-emerald-400">{success}</p>}
          {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
          <button onClick={handleForgotPassword} disabled={loading} className="w-full rounded-lg bg-emerald-600 py-3 font-medium text-black hover:bg-emerald-500 transition disabled:opacity-50">{loading ? t("sendingResetLink") : t("sendResetLink")}</button>
          <div className="mt-4 text-xs text-zinc-400 text-center"><Link href="/auth/sign-in" className="hover:text-emerald-400">{t("backToSignIn")}</Link></div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
