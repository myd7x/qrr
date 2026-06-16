// lib/auth/token.ts

export const tokenStorage = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("qrguard_token");
  },

  set(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("qrguard_token", token);
  },

  remove(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("qrguard_token");
  },
};
