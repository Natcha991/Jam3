// // app/chatbot/ChatClientPage.tsx
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// type ChatMsg = {
//   from: "user" | "ai";
//   text: string;
//   timestamp: string;
// };

// export default function ChatPage() {
//   const [message, setMessage] = useState("");
//   const [chatLog, setChatLog] = useState<ChatMsg[]>([]);
//   const chatBoxRef = useRef<HTMLDivElement>(null);

//   const genAI = new GoogleGenerativeAI(
//     process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""
//   );

//   const sendMessage = async () => {
//     if (!message) return;

//     const userChat: ChatMsg = {
//       from: "user",
//       text: message,
//       timestamp: new Date().toLocaleTimeString(),
//     };

//     setChatLog((prev) => [...prev, userChat]);
//     setMessage("");

//     // สร้างโมเดลพร้อม systemInstruction
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//       systemInstruction: `
// คุณเป็นนักโภชนาการที่สุภาพและใจดี
// - ตอบสั้น กระชับ ไม่เกิน 4 บรรทัด
// `
//     });

//     // รวม history ของ chatLog ล่าสุด (รวม userChat) พร้อม prompt
//     const prompt = `
// คุณเป็นนักโภชนาการที่สุภาพ ใจดี และตอบเหมือนเพื่อนสนิท
// - เริ่มแนะนำเมนูอาหารทันทีโดยไม่ต้องถามข้อมูลผู้ใช้
// - ถ้าผู้ใช้ไม่ชอบเมนู ให้ถามความชอบ เช่น รสชาติ, ประเภทอาหาร หรือวัตถุดิบ
// - ตอบสั้น กระชับ ไม่เกิน 4 บรรทัด
// - แบ่งย่อหน้าให้อ่านง่าย
// - ตัวอย่างเมนูเริ่มต้น: ข้าวกล้องผัดผัก, ไข่คน, สลัดผักรวม, ซุปใส
// `;

//     const historyText = `${prompt}\nผู้ใช้: ${userChat.text}`;

//     // เรียก AI
//     const result = await model.generateContent(historyText);
//     const aiText = await result.response.text();

//     setChatLog((prev) => [
//       ...prev,
//       { from: "ai", text: aiText, timestamp: new Date().toLocaleTimeString() },
//     ]);
//   };

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [chatLog]);

//   return (
//     <div className="p-4">
//       <div
//         ref={chatBoxRef}
//         className="h-[70vh] overflow-y-auto border p-2 rounded"
//       >
//         {chatLog.map((m, i) => (
//           <div
//             key={i}
//             className={m.from === "user" ? "text-right" : "text-left"}
//           >
//             <div className="inline-block bg-gray-200 rounded px-2 py-1 my-1">
//               {m.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2 mt-3">
//         <input
//           className="flex-1 border p-1 rounded"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           ส่ง
//         </button>
//       </div>
//     </div>
//   );
// }
