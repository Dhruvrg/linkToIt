"use client";

import useCreateProjectModal from "@/hooks/useCreateProjectModel";
import { getProject } from "@/lib/actions/project.actions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const createProjectModal = useCreateProjectModal();
  const [dots, setDots] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);

    const fetchProject = async () => {
      const project = await getProject();
      if (!project) {
        createProjectModal.onOpen();
      } else {
        setTimeout(() => router.push(`/dashboard/${project?.id}`), 1500);
      }
    };

    fetchProject();
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#9b7bf7] to-background">
      <div className="w-32 h-32 mb-8 relative">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="linkGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9b7bf7" />
              <stop offset="100%" stopColor="#7c5ce9" />
            </linearGradient>
          </defs>
          <g transform="rotate(45, 50, 50)">
            <path
              d="M35,35 L50,20 65,35 65,50 50,65 35,50 Z"
              fill="none"
              stroke="url(#linkGradient)"
              strokeWidth="6"
              strokeLinejoin="round"
              className="animate-dash"
            />
            <path
              d="M35,65 L50,80 65,65 65,50 50,35 35,50 Z"
              fill="none"
              stroke="url(#linkGradient)"
              strokeWidth="6"
              strokeLinejoin="round"
              className="animate-dash animation-delay-500"
            />
          </g>
          <circle
            cx="50"
            cy="50"
            r="4"
            fill="#ffffff"
            className="animate-pulse"
          />
        </svg>
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

export default Page;
