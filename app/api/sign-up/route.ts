import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://qrguard.onrender.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendRes = await fetch(`${BACKEND_URL}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await backendRes.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { message: text || "Invalid backend response" },
        { status: backendRes.status || 500 }
      );
    }

    return NextResponse.json(data, {
      status: backendRes.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Sign-up proxy error" },
      { status: 500 }
    );
  }
}
