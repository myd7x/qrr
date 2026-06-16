import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://qrguard.onrender.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");

    const backendRes = await fetch(`${BACKEND_URL}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader || "",
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    return NextResponse.json(data, {
      status: backendRes.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Scan proxy failed", details: err?.message },
      { status: 500 }
    );
  }
}
