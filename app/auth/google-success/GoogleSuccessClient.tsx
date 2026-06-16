"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GoogleSuccessClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      login(token);
      router.replace("/scan");
    } else {
      router.replace("/auth/sign-in");
    }
  }, [params, login, router]);

  return null;
}
