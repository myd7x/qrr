import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://qrguard.onrender.com";

function getAuthHeader(req: Request) {
  const authorization = req.headers.get("authorization");
  if (!authorization) return null;
  return authorization.startsWith("Bearer ") ? authorization : `Bearer ${authorization}`;
}

async function parseBackendResponse(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text || "Invalid backend response" };
  }
}

export async function GET(req: Request) {
  try {
    const authorization = getAuthHeader(req);

    if (!authorization) {
      return NextResponse.json(
        { message: "Missing authorization token" },
        { status: 401 }
      );
    }

    const backendRes = await fetch(`${BACKEND_URL}/update-user`, {
      method: "GET",
      headers: { Authorization: authorization },
      cache: "no-store",
    });

    const data = await parseBackendResponse(backendRes);
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || "Get user proxy error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const authorization = getAuthHeader(req);

    if (!authorization) {
      return NextResponse.json(
        { message: "Missing authorization token" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const backendRes = await fetch(`${BACKEND_URL}/update-user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify(body),
    });

    const data = await parseBackendResponse(backendRes);
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || "Update user proxy error" },
      { status: 500 }
    );
  }
}
