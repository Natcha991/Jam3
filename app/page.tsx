'use client'

import Image from "next/image";
import { Pacifico } from "next/font/google";
import { useRouter } from "next/navigation";

const pacifico = Pacifico({
  weight: "400",
  subsets: ['latin']
});

export default function Page() {

  const router = useRouter();

  const goToHome = () => {
    router.push('/home');   // ✅ เปลี่ยน path ตามต้องการ
  };

  return (
    <div
      onClick={goToHome}
      className="w-screen h-screen flex flex-col items-center justify-center relative cursor-pointer"
      style={{ backgroundColor: "#03AB54" }}
    >
      {/* ข้อความตรงกลาง */}
      <h1
        className={`${pacifico.className} text-[128px] text-white`}
      >
        3TubP
      </h1>

      {/* รูปแมวติดด้านล่างกลาง */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <Image
          src="/cat3.png"
          alt="cat"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  );
}
