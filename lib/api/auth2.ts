import { tokenStorage } from "@/lib/auth/token";

export async function signUp(
  username: string,
  email: string,
  password: string,
  passwordConfirm: string
) {
  const res = await fetch("/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      passwordConfirm,
    }),
  });

  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text || "Server returned invalid response");
  }

  // 🔴 show REAL backend error
  if (!res.ok) {
    throw new Error(data?.message || "Sign up failed");
  }

  // Save token if returned
  if (data.token) {
    tokenStorage.set(data.token);
  }

  return data;
}
export async function forgotPassword(email: string) {
  const res = await fetch("/api/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to send reset email");
  }

  return data;
}
