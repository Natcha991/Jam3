"use client";

import { useEffect, useState, useCallback } from "react";
import menuData from "@/data/menu.json";

interface MenuItem {
  name: string;
  calories: number;
  image: string;
  reason?: string;
  description?: string;
}

export default function Home() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [specialMenu, setSpecialMenu] = useState<MenuItem | null>(null);

  useEffect(() => {
    // ✅ load from JSON
    setMenus(menuData);
    setSpecialMenu(menuData[0] || null);
  }, []);

  const renderMenuCard = useCallback((item: MenuItem, index: number) => (
    <div
      key={index}
      className="w-[155px] py-[1rem] rounded-2xl bg-[rgba(255,255,255,0.38)] shadow-lg cursor-pointer hover:scale-105 transition"
    >
      <div className="flex flex-col items-center">
        <img
          src={item.image}
          alt={item.name}
          className="h-[8rem] w-[8rem] object-cover rounded-lg"
        />
        <div className="flex items-center">
          <div className="w-[0.1rem] h-[2rem] mt-[0.8rem] mr-[0.4rem] ml-[0.5rem] bg-[#333333]" />
          <div>
            <h1 className="text-[0.9rem] w-[123px] font-bold mt-2.5 mb-1 font-prompt">
              {item.name}
            </h1>
            <div className="flex items-baseline mt-[-0.3rem]">
              <h1 className="text-[0.8rem] font-Unbounded">{item.calories}</h1>
              <h1 className="text-[0.5rem] ml-[0.3rem] font-Unbounded">KCAL</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), []);

  return (
    <div className="font-prompt flex flex-col items-center">

      <h1 className="font-[600] mt-[2rem] text-[#333333] font-prompt mb-[2rem] mr-[7rem] text-[2rem]">
        เมนูแนะนำ
      </h1>

      {/* ✅ Special menu */}
      {specialMenu && (
        <div
          className="flex items-center h-[140px] w-[340px] bg-white rounded-bl-4xl rounded-tr-4xl rounded-br-md rounded-tl-md cursor-pointer shadow-lg hover:scale-105 transition mb-6"
        >
          <img
            src={specialMenu.image}
            alt={specialMenu.name}
            className="h-[150px] w-[150px] object-cover rounded-lg ml-2"
          />
          <div className="ml-[1rem] flex">
            <div className="w-[0.1rem] h-[4rem] mt-[0.8rem] mr-[0.8rem] ml-[-0.8rem] bg-[#333333]" />
            <div>
              <h1 className="font-prompt font-bold text-[1.1rem] mb-1 w-[140px] text-gray-800">
                {specialMenu.name}
              </h1>
              <div className="flex items-baseline">
                <h1 className="font-Unbounded text-[1rem] font-bold text-gray-600">
                  {specialMenu.calories}
                </h1>
                <h1 className="text-[0.7rem] ml-2 font-Unbounded text-gray-600">
                  KCAL
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Menu grid */}
      <div className="grid grid-cols-2 gap-4 mb-[4rem]">
        {menus.map((item, index) => renderMenuCard(item, index))}
      </div>
    </div>
  );
}
