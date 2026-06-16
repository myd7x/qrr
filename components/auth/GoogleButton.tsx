"use client";

import { useAppSettings } from "@/context/AppSettingsContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://qrguard.onrender.com";

export default function GoogleAuthButton() {
  const { t } = useAppSettings();
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/google?platform=web`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-700 py-3 text-sm hover:border-emerald-500 transition"
    >
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
      {t("continueWithGoogle")}
    </button>
  );
}
