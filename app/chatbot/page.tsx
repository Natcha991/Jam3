"use client";

import { useState } from "react";

export default function ChatBotPage() {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);

    try {
      setLoading(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      const botMsg = data?.reply ?? "ไม่สามารถตอบกลับได้";

      setMessages((prev) => [...prev, { sender: "bot", text: botMsg }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "เกิดข้อผิดพลาด" },
      ]);
    }

    setLoading(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Chatbot</h1>

      {/* Chat window */}
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.sender === "user"
                ? "text-right text-blue-600"
                : "text-left text-green-600"
            }`}
          >
            <span>{msg.text}</span>
          </div>
        ))}

        {loading && (
          <div className="text-left text-gray-500 animate-pulse">...</div>
        )}
      </div>

      {/* Input */}
      <div className="flex mt-3 gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="พิมพ์ข้อความ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
}
