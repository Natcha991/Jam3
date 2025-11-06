// app/api/chat/route.ts
import { NextResponse } from "next/server";

type ChatRequest = {
  message: string;
  context?: string;
};

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

async function callGemini(message: string, context?: string) {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const contents: any[] = [];

  if (context) {
    contents.push({ role: "system", parts: [{ text: context }] });
  }

  contents.push({ role: "user", parts: [{ text: message }] });

  const body = {
    contents,
  };

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini error: ${res.status} ${txt}`);
  }

  const data = await res.json();

  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "ขอโทษครับ — โมเดลไม่ส่งข้อความตอบกลับ";

  return reply;
}

export async function POST(req: Request) {
  try {
    const json: ChatRequest = await req.json();

    if (!json?.message || typeof json.message !== "string") {
      return NextResponse.json(
        { error: "Request must include { message: string }" },
        { status: 400 }
      );
    }

    const reply = await callGemini(json.message, json.context);

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("chat api error:", err?.message ?? err);
    return NextResponse.json(
      { error: "Server error", detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
