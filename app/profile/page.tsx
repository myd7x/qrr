"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2, Mail, Save, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppSettings } from "@/context/AppSettingsContext";
import Button from "@/components/ui/Button";

type UserInfo = {
  username?: string;
  email?: string;
};

export default function EditProfilePage() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuth();
  const { t, isArabic } = useAppSettings();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const storedToken =
      token ||
      (typeof window !== "undefined"
        ? localStorage.getItem("token") || localStorage.getItem("qrguard_token")
        : null);

    setAccessToken(storedToken);

    if (!storedToken) {
      setLoadingUser(false);
      return;
    }

    const loadUser = async () => {
      try {
        setError(null);
        const res = await fetch("/api/update-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || data?.error || t("loadUserFailed"));
        }

        const user: UserInfo = data?.user || data?.data?.user || data;
        setUsername(user?.username || "");
        setEmail(user?.email || "");
      } catch (err: any) {
        setError(err?.message || t("loadUserFailed"));
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [token, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!accessToken) {
      setError(t("mustLoginFirst"));
      router.push("/auth/sign-in");
      return;
    }

    if (!username.trim() || !email.trim()) {
      setError(t("usernameEmailRequired"));
      return;
    }

    if (password || passwordConfirm) {
      if (password.length < 8) {
        setError(t("passwordLength"));
        return;
      }

      if (password !== passwordConfirm) {
        setError(t("passwordsNotMatch"));
        return;
      }
    }

    const payload: {
      username: string;
      email: string;
      password?: string;
      passwordConfirm?: string;
    } = {
      username: username.trim(),
      email: email.trim(),
    };

    if (password) {
      payload.password = password;
      payload.passwordConfirm = passwordConfirm;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/update-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || data?.error || t("updateProfileFailed"));
      }

      const updatedUser: UserInfo = data?.user || data?.data?.user || payload;
      setUsername(updatedUser?.username || payload.username);
      setEmail(updatedUser?.email || payload.email);
      setPassword("");
      setPasswordConfirm("");
      setSuccess(data?.message || t("profileUpdated"));
    } catch (err: any) {
      setError(err?.message || t("updateProfileFailed"));
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/70 focus:bg-zinc-950/70 focus:ring-4 focus:ring-emerald-500/10";

  if (!loadingUser && !isAuthenticated && !accessToken) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-24 text-white">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 bg-[length:220%_220%]"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[130px]" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto max-w-md rounded-3xl border border-white/10 bg-zinc-900/80 p-8 text-center shadow-2xl backdrop-blur-2xl"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
            <ShieldCheck className="h-7 w-7 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-semibold text-white">{t("loginRequiredTitle")}</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {t("loginRequiredDesc")}
          </p>
          <div className="mt-7">
            <Button onClick={() => router.push("/auth/sign-in")} className="w-full py-3">
              {t("goToLogin")}
            </Button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-4 py-24 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-emerald-950/70 to-zinc-950 bg-[length:400%_400%]"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute top-[-12%] left-[-10%] h-[42vw] w-[42vw] rounded-full bg-emerald-900/30 blur-[130px]" />
        <div className="absolute bottom-[-12%] right-[-10%] h-[42vw] w-[42vw] rounded-full bg-blue-900/25 blur-[130px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.035]" />
      </div>

      <div className={`relative z-10 mx-auto max-w-6xl ${isArabic ? "text-right" : "text-left"}`}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t("profileBadge")}
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              {t("profileTitleA")} <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">{t("profileTitleB")}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
              {t("profileDesc")}
            </p>
          </div>

          <Button variant="secondary" onClick={() => router.push("/scan")} className="w-fit px-5 py-3">
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("backToScan")}
            </span>
          </Button>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
                <UserRound className="h-8 w-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">{t("profileControl")}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {t("profileControlDesc")}
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-white">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    {t("jwtProtected")}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">{t("jwtProtectedDesc")}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-white">
                    <KeyRound className="h-5 w-5 text-blue-400" />
                    {t("optionalPassword")}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">{t("optionalPasswordDesc")}</p>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            onSubmit={handleSubmit}
            className="relative rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-2xl md:p-8"
          >
            <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-2xl opacity-40" />

            <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">{t("accountDetails")}</h2>
                <p className="mt-1 text-sm text-zinc-500">{t("accountDetailsDesc")}</p>
              </div>
              <div className="hidden rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 sm:block">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
              </div>
            </div>

            {loadingUser ? (
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-300">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
                {t("loadingUser")}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-zinc-300">
                    <UserRound className="h-4 w-4 text-emerald-400" />
                    {t("username")}
                  </label>
                  <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t("enterUsername")} className={inputClass} />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-zinc-300">
                    <Mail className="h-4 w-4 text-emerald-400" />
                    {t("email")}
                  </label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("enterEmail")} className={inputClass} />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-zinc-300">
                    <KeyRound className="h-4 w-4 text-blue-400" />
                    {t("newPassword")}
                  </label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("leavePassword")} className={inputClass} />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-zinc-300">
                    <KeyRound className="h-4 w-4 text-blue-400" />
                    {t("confirmNewPassword")}
                  </label>
                  <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder={t("confirmPasswordPlaceholder")} className={inputClass} />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                {success}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button disabled={loadingUser || saving} className="px-6 py-3">
                <span className="inline-flex items-center gap-2">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saving ? t("saving") : t("saveChanges")}
                </span>
              </Button>

              <Button type="button" variant="secondary" onClick={() => router.push("/scan")} className="px-6 py-3">
                {t("cancel")}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
