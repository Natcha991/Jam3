// app/chatbot/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ChatMsg = {
  from: "user" | "ai";
  text: string;
  timestamp: string;
};

export default function ChatPage() {
  const router = useRouter();
  const userId = "123";
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatMsg[]>([]);
  const [isBackAnimating, setIsBackAnimating] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleGoBack = () => {
    setIsBackAnimating(true);
    setTimeout(() => {
      router.push(`/home?id=${userId}`);
      setIsBackAnimating(false);
    }, 300);
  };

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""
  );

  const sendMessage = async () => {
    if (!message) return;

    const userChat: ChatMsg = {
      from: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatLog((prev) => [...prev, userChat]);
    setMessage("");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
คุณเป็นนักโภชนาการที่สุภาพ ใจดี 
คุณเชี่ยวชาญเรื่องข้าว โดยเฉพาะข้าวกล้อง
- ถ้าผู้ใช้ไม่ชอบเมนู ให้ถามความชอบ เช่น รสชาติ, ประเภทอาหาร หรือวัตถุดิบ
- ตอบสั้น กระชับ ไม่เกิน 1 บรรทัด
- แบ่งย่อหน้าให้อ่านง่าย
`,
    });

    const historyText = [...chatLog, userChat]
      .map((msg) => `${msg.from === "user" ? "ผู้ใช้" : "AI"}: ${msg.text}`)
      .join("\n");

    const result = await model.generateContent(historyText);
    const aiText = await result.response.text();

    setChatLog((prev) => [
      ...prev,
      { from: "ai", text: aiText, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <div className="h-screen w-screen bg-[#FFF6D1] flex flex-col relative">
      {/* Navigation Header */}
      <div className="absolute z-10 flex justify-between items-center top-4 sm:top-6 md:top-8 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-12 lg:right-12">
        {/* ปุ่มย้อนกลับ */}
        <div
          onClick={handleGoBack}
          className={`bg-white h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mt-6 flex justify-center items-center cursor-pointer transform hover:scale-105 rounded-full shadow-2xl ${
            isBackAnimating ? "animate-press" : ""
          }`}
        >
          <Image
            src="/image%2082.png"
            alt="back"
            width={24}
            height={24}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-[#333333] text-[32px] font-bold font-unbounded text-center mt-8">
        3 Tub chat
      </h1>

      {/* Chat Box */}
      <div
        ref={chatBoxRef}
        className="bg-white rounded-t-[55px] p-4 shadow w-full flex flex-col overflow-y-auto flex-1 mt-6"
        style={{ paddingBottom: "80px" }}
      >
        {chatLog.map((m, i) => (
          <div
            key={i}
            className={`my-2 flex items-end ${
              m.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`relative px-4 py-2 border border-[#C9AF90] bg-white text-[#000000] max-w-[70%] ${
                m.from === "user"
                  ? "rounded-tl-[17px] rounded-tr-[17px] rounded-bl-[17px] rounded-br-none"
                  : "rounded-tl-[17px] rounded-tr-[17px] rounded-br-[17px] rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
            {m.from === "user" && (
              <img
                src="/user-avatar.png"
                alt="user"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center bg-transparent">
        <div className="w-3/4 flex items-center gap-2">
          <input
            type="text"
            className="w-full bg-[#EED9B8] rounded-[55px] p-4 outline-none focus:ring-2 focus:ring-[#C9AF90]"
            placeholder="คุยกับนักโภชนาการของคุณ"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 rounded-full bg-[#C9AF90] text-white"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
