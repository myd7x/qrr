import { tokenStorage } from "@/lib/auth/token";

export async function login(email: string, password: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok || !data.token) {
    throw new Error(data.message || "Login failed");
  }

  tokenStorage.set(data.token);
  return data;
}
