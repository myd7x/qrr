import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://qrguard.onrender.com";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> | { token: string } }
) {
  try {
    const { token } = await Promise.resolve(params);
    const body = await req.json();

    const backendRes = await fetch(`${BACKEND_URL}/resetPassword/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || "Reset password proxy error" },
      { status: 500 }
    );
  }
}
