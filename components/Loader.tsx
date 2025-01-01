import Image from "next/image";
import React, { useEffect, useState } from "react";

const Loader = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#9b7bf7] to-background text-center">
      <div className="bg-white p-1 rounded-full mb-6 shadow-lg">
        <Image
          className="rounded-full"
          height="120"
          width="120"
          alt="Logo"
          src="/logo.png"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold text-[#9b7bf7] mb-4">LinkToIt</h1>
      <p className="text-lg text-muted-foreground mb-8 h-6">
        Connecting your links{".".repeat(dots)}
      </p>
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === dots % 3 ? "bg-[#9b7bf7]" : "bg-[#9b7bf7]/30"
            } transition-all duration-300 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
