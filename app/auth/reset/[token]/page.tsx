"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import { useAppSettings } from "@/context/AppSettingsContext";

interface PageProps { params: Promise<{ token: string }> | { token: string }; }

export default function ResetPasswordPage({ params }: PageProps) {
  const router = useRouter();
  const { t, isArabic } = useAppSettings();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => { Promise.resolve(params).then((resolved) => setToken(resolved.token)); }, [params]);

  const handleResetPassword = async () => {
    setError(null); setSuccess(null);
    if (!token) { setError(t("resetTokenMissing")); return; }
    if (!password || !passwordConfirm) { setError(isArabic ? "من فضلك أدخل كلمة المرور الجديدة وقم بتأكيدها." : "Please enter and confirm your new password."); return; }
    if (password.length < 8) { setError(t("passwordMinLong")); return; }
    if (password !== passwordConfirm) { setError(t("passwordsNotMatch")); return; }
    setLoading(true);
    try {
      const response = await fetch(`/api/reset-password/${token}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, passwordConfirm }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || t("resetInvalid"));
      setSuccess(t("resetSuccess"));
      setTimeout(() => router.push("/auth/sign-in"), 2000);
    } catch (err: any) { setError(err?.message || (isArabic ? "تعذر إعادة تعيين كلمة المرور. اطلب رابطًا جديدًا." : "Unable to reset password. Please request a new link.")); }
    finally { setLoading(false); }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className={isArabic ? "text-right" : "text-left"}>
          <h1 className="text-2xl font-semibold mb-2">{isArabic ? "تعيين كلمة مرور جديدة" : "Set a new password"}</h1>
          <p className="text-sm text-zinc-400 mb-6">{isArabic ? "أدخل كلمة مرور جديدة لحسابك." : "Enter a new password for your account."}</p>
          {!token && <p className="mb-4 text-sm text-zinc-400">{isArabic ? "جاري التحميل..." : "Loading..."}</p>}
          <input type="password" placeholder={t("newPassword")} value={password} onChange={(e) => setPassword(e.target.value)} disabled={!token} className="w-full mb-4 rounded-lg bg-black/40 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500 disabled:opacity-50" />
          <input type="password" placeholder={t("confirmNewPassword")} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} disabled={!token} className="w-full mb-4 rounded-lg bg-black/40 border border-zinc-700 px-4 py-3 focus:outline-none focus:border-emerald-500 disabled:opacity-50" />
          {success && <p className="mb-3 text-sm text-emerald-400">{success}</p>}
          {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
          <button onClick={handleResetPassword} disabled={loading || !token} className="w-full rounded-lg bg-emerald-600 py-3 font-medium text-black disabled:opacity-50">{loading ? t("resetting") : t("resetPasswordButton")}</button>
          <div className="mt-4 text-xs text-center text-zinc-400"><Link href="/auth/sign-in">{t("backToSignIn")}</Link></div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
