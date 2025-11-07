import Image from "next/image";
import fs from "fs";
import path from "path";

interface MenuData {
  id: string;
  name: string;
  calories: number;
  image: string;
}

export default async function MenuDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const filePath = path.join(process.cwd(), "public", "menu.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const menus: MenuData[] = JSON.parse(jsonData);

  const menu = menus.find((item) => item.id === params.id);

  if (!menu) {
    return <div className="p-6 text-center text-red-500">Menu not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF7E8] p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/user.png"
            width={40}
            height={40}
            alt="user"
            className="rounded-full"
          />
          <p className="font-medium">Hi Khaokong</p>
        </div>

        <div className="flex flex-col items-center text-xs">
          <Image
            src="/icon_tub.png"
            width={40}
            height={40}
            alt="tub"
            className="rounded-full"
          />
          <span>3 Tub Chat</span>
        </div>
      </div>

      {/* Highlight Card */}
      <div className="mt-4 bg-white rounded-2xl p-4 shadow-lg flex items-center gap-3">
        <div className="flex-1">
          <h1 className="text-xl font-bold">{menu.name.toUpperCase()}</h1>
          <p className="text-gray-500">{menu.calories} kcal</p>
        </div>

        <div className="w-28 h-28 rounded-full overflow-hidden">
          <Image
            src={menu.image}
            alt={menu.name}
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
      </div>

      {/* Popular Menu */}
      <h2 className="mt-6 text-xl font-bold">popular menu</h2>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {menus.map((item) => (
          <a
            key={item.id}
            href={`/menu/${item.id}`}
            className="bg-white rounded-2xl p-3 shadow-md"
          >
            <div className="w-full h-28 overflow-hidden rounded-xl">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-500 text-sm">{item.calories} kcal</p>
          </a>
        ))}
      </div>
    </div>
  );
}
