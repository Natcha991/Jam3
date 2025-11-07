// app/home/page.tsx
"use client";

import Image from "next/image";
import { Pacifico } from "next/font/google";
import menuData from "@/public/menu.json";   // ✅ ดึงข้อมูล
import { useMemo } from "react";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function HomePage() {
  // ✅ เมนู highlight เลือกอันแรก
  const highlight = useMemo(() => menuData[0], []);

  // ✅ เมนู popular (ทั้งหมด)
  const popularMenu = useMemo(() => menuData, []);

  return (
    <div className="w-full min-h-screen bg-[#FFF8E7] px-4 py-6 overflow-y-auto">

      {/* TOP SECTION */}
      <div className="w-full flex items-center justify-between">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <Image
            src="/profile.png"
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-sm font-medium mt-1">Hi Khaokong</p>
        </div>

        {/* 3Tub Chat icon */}
        <div className="flex flex-col items-center">
          <Image
            src="/cat3.png"
            alt="chatbot"
            width={50}
            height={50}
          />
          <p className={`${pacifico.className} text-xs mt-1`}>
            3 Tub chat
          </p>
        </div>
      </div>

      {/* ✅ Highlight */}
      {highlight && (
        <div className="w-full mt-6 bg-white rounded-2xl px-4 py-4 flex items-center shadow-md">
          <div className="flex-1">
            <h2 className="text-xl font-bold leading-tight">
              {highlight.name}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {highlight.calories} kcal
            </p>

          </div>

          <Image
            src={highlight.image}
            alt={highlight.name}
            width={120}
            height={120}
            className="rounded-xl object-cover"
          />
        </div>
      )}

      {/* Popular menu */}
      <p className="mt-8 text-2xl font-bold tracking-wide">
        popular<br />menu
      </p>

      {/* ✅ Popular menu list */}
      <div className="grid grid-cols-2 gap-4 mt-6 pb-8">
        {popularMenu.map((item, index) => (
          <div
            key={index}
            className="bg-white p-3 shadow-md rounded-xl flex flex-col items-center"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
              className="rounded-xl object-cover"
            />
            <p className="text-sm font-semibold mt-2">
              {item.name}
            </p>
            <p className="text-xs text-gray-500 mb-1">
              {item.calories} kcal
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
