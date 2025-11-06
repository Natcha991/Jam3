// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "missing api key" }, { status: 500 });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    }
  );

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "❌ ไม่สามารถตอบได้";

  return NextResponse.json({ reply: text });
}
