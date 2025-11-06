// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // redirect ไปหน้า chatbot อัตโนมัติ
    router.replace("/chatbot");
  }, [router]);

  return <div>กำลังไปหน้า Chatbot...</div>;
}
