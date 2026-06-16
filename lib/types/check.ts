export type ScanUIResult = {
  url: string;
  score: number;
  verdict: "safe" | "suspicious" | "malicious" | "clean";
  color: "green" | "yellow" | "red";
  flags: string[];
  sslValid: boolean | null;
  redirects: number;
  vtStats: {
    harmless: number;
    malicious: number;
    suspicious: number;
    undetected: number;
  };
  aiInsight?: string | null;
  cached?: boolean;
};
