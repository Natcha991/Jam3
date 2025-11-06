"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/chatbot"); // redirect หน้าแรกไป /chatbot
  }, [router]);

  return <div>กำลังไปหน้า Chatbot...</div>;
}
