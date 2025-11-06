// app/api/saveChat/[sessionId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // ดึง sessionId จาก URL params (query string)
    const sessionId = req.nextUrl.searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ success: false, error: "sessionId ไม่ถูกส่งมา" });
    }

    const body = await req.json();

    console.log('sessionId:', sessionId, 'body:', body);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
