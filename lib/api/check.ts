import type { ScanUIResult } from "@/lib/types/check";

function normalizeScanResponse(json: any): ScanUIResult {
  const data = json?.data ?? json;
  const qrGuard = data?.qr_guard ?? data?.my_api ?? {};
  const vt = data?.virustotal ?? {};

  const fullStats = vt?.full_report?.attributes?.stats ?? vt?.stats;
  const vtStats = fullStats ?? {
    harmless: 0,
    malicious: 0,
    suspicious: 0,
    undetected: 0,
  };

  const verdict = (qrGuard.status ?? qrGuard.verdict ?? "safe") as ScanUIResult["verdict"];

  return {
    url: data?.url ?? "",
    score: Number(qrGuard.score ?? qrGuard.risk_score ?? 0),
    verdict,
    color:
      verdict === "safe" || verdict === "clean"
        ? "green"
        : verdict === "suspicious"
        ? "yellow"
        : "red",
    flags: qrGuard.flags ?? [],
    sslValid: qrGuard.sslValid ?? qrGuard.ssl_valid ?? null,
    redirects: Number(qrGuard.redirects ?? 0),
    vtStats: {
      harmless: Number(vtStats.harmless ?? 0),
      malicious: Number(vtStats.malicious ?? 0),
      suspicious: Number(vtStats.suspicious ?? 0),
      undetected: Number(vtStats.undetected ?? 0),
    },
    aiInsight: data?.ai_insight ?? data?.ai_explanation ?? null,
    cached: Boolean(json?.cached),
  };
}

export async function checkUrl(
  url: string,
  token: string | null
): Promise<ScanUIResult> {
  if (!token) {
    throw new Error("Unauthorized. Please login.");
  }

  const res = await fetch("/api/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || json?.error || "Scan failed");
  }

  return normalizeScanResponse(json);
}
