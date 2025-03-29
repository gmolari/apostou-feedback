import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(request: Request) {
  const body = await request.json();
  // faça algo com o body
  return NextResponse.json({ ok: true });
}
