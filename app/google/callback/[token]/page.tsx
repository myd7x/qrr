"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GoogleCallbackPage({
  params,
}: {
  params: Promise<{ token: string }>; // ✅ Changed from string[] to string
}) {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      try {
        const resolvedParams = await params;
        console.log("RAW PARAMS:", resolvedParams);

        const token = resolvedParams.token; // ✅ No [0] needed
        console.log("JWT FROM GOOGLE:", token);

        if (!token || token.length < 20) {
          setError("Invalid token received from Google callback.");
          return;
        }

        login(token);
        router.replace("/scan");
      } catch (err) {
        setError("Failed to process authentication.");
        console.error(err);
      }
    }

    handleCallback();
  }, [params, login, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-sm text-zinc-400">
      Signing you in…
    </div>
  );
}